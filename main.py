import cherrypy
from tcont import TeamController
from rcont import ResetController
from ocont import OptionsController
from rankcont import RankingsController
from reccont import RecommendationsController
from _sports_database import _sports_database


def CORS():
	cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
	cherrypy.response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE"
	cherrypy.response.headers["Access-Control-Allow-Credentials"] = "*"
	

def start_service():
	# initialize tdb class
	tdb = _sports_database()
	tdb.load_teams('data_files/teams1.csv')
	tdb.load_data('data_files/1-premierleague.csv')
	tdb.load_rank()

	# dispatcher
	dispatcher = cherrypy.dispatch.RoutesDispatcher()

	# controllers
	teamController = TeamController(tdb=tdb)
	resetController = ResetController(tdb=tdb)
	rankingsController = RankingsController(tdb=tdb)
	recommendationsController = RecommendationsController(tdb=tdb)
	optionsController = OptionsController()

	# for /recommendations/
	dispatcher.connect('full_recommendations_get', '/recommendations/',
		controller = recommendationsController,
		action = 'FULL_GET', conditions = dict(method=['GET']))

	dispatcher.connect('full_recommendations_options', '/recommendatoins/',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /recommendations/:team_team
	dispatcher.connect('recommendations_get', '/recommendations/:team_team',
		controller = recommendationsController,
		action = 'GET', conditions = dict(method=['GET']))
	
	dispatcher.connect('recommendations_options', '/recommendations/:team_team',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /rankings/:team_name
	dispatcher.connect('rankings_get', '/rankings/:team_name',
		controller = rankingsController,
		action = 'GET', conditions = dict(method=['GET']))

	dispatcher.connect('rankings_options', '/rankings/:team_name',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /rankings/
	dispatcher.connect('full_rankings_get', '/rankings/',
		controller = rankingsController,
		action = 'FULL_GET', conditions = dict(method=['GET']))

	dispatcher.connect('full_rankings_options', '/rankings/',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /teams/
	dispatcher.connect('full_teams_get', '/teams/',
		controller = teamController,
		action = 'FULL_GET', conditions = dict(method=['GET']))

	dispatcher.connect('full_teams_post', '/teams/',
		controller = teamController,
		action = 'FULL_POST', conditions = dict(method=['POST']))

	dispatcher.connect('full_teams_delete', '/teams/',
		controller = teamController,
		action = 'FULL_DELETE', conditions = dict(method=['DELETE']))

	dispatcher.connect('full_teams_options', '/teams/',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /teams/:team_name
	dispatcher.connect('teams_get', '/teams/:team_name',
		controller = teamController,
		action = 'GET', conditions = dict(method=['GET']))

	dispatcher.connect('teams_put', '/teams/:team_name',
		controller = teamController,
		action = 'PUT', conditions = dict(method=['PUT']))

	dispatcher.connect('teams_delete', '/teams/:team_name',
		controller = teamController,
		action = 'DELETE', conditions = dict(method=['DELETE']))

	dispatcher.connect('teams_options', '/teams/:team_name',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /reset/
	dispatcher.connect('full_reset', '/reset/',
		controller  = resetController,
		action = 'FULL_RESET', conditions = dict(method=['PUT']))

	dispatcher.connect('full_reset_options', '/reset/',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# for /reset/:team_name
	dispatcher.connect('reset', '/reset/:team_name',
		controller = resetController,
		action = 'RESET', conditions = dict(method=['PUT']))

	dispatcher.connect('reset_options', '/reset/:team_name',
		controller = optionsController,
		action = 'OPTIONS', conditions = dict(method=['OPTIONS']))

	# configuration for server
	conf = {'global': {'server.socket_host': 'student04.cse.nd.edu',
				'server.socket_port': 51019},
		'/'	: {'request.dispatch': dispatcher, 'tools.CORS.on': True}
		}
	
	# start server
	cherrypy.config.update(conf)
	app = cherrypy.tree.mount(None, config=conf)
	cherrypy.quickstart(app)

if __name__ == '__main__':
	cherrypy.tools.CORS = cherrypy.Tool('before_finalize', CORS)
	start_service()
