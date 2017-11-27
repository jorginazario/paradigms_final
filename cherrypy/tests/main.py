import cherrypy
import json
from rcont import ResetController
from mcont import MovieController
from ucont import UserController
from ratcont import RatingsController
from recomcont import RecommendationsController
from _movie_database import _movie_database

def start_service():
	mdb = _movie_database()
	mdb.load_movies('ml-1m/movies.dat')
	mdb.load_users('ml-1m/users.dat')
	mdb.load_ratings('ml-1m/ratings.dat')
	mdb.load_images('ml-1m/images.dat')

	#dispatcher - forwards the request from the HTTPS to the backend 
	#and returns the response from the backend

	dispatcher = cherrypy.dispatch.RoutesDispatcher()		
	#conf is a dictionary with the settings for cherrypy
	conf = { 'global' : {'server.socket_host' : 'student04.cse.nd.edu', 
										'server.socket_port': 51058,},
						'/' : {'request.dispatch' : dispatcher}}
	
	resetController = ResetController(mdb)
	userController = UserController(mdb) 
	movieController = MovieController(mdb)
	ratingsController = RatingsController(mdb=mdb)
	recommendationsController = RecommendationsController(mdb)

	
	#RESET request
	dispatcher.connect('reset', '/reset/',
	controller = resetController,
	action  = 'RESET', conditions = dict (method = ['PUT']))
	
	#RESETKEY request
	dispatcher.connect('reset_key', '/reset/:mid',
	controller = resetController,
	action  = 'RESET_KEY', conditions = dict (method = ['PUT']))	
	
########################################################################
#Recommendations

	#GET Recommendations Key request
	dispatcher.connect('recommendations_key_get', '/recommendations/:uid',
	controller = recommendationsController,
	action  = 'GET_KEY', conditions = dict (method = ['GET']))
	
	#PUT request to recommendations
	dispatcher.connect('recommendations_key_put', '/recommendations/:uid',
	controller = recommendationsController,
	action  = 'PUT_KEY', conditions = dict (method = ['PUT']))

	#DELETE recommendations
	dispatcher.connect('recommendations_delete', '/recommendations/',
	controller = recommendationsController,
	action  = 'DELETE', conditions = dict (method = ['DELETE']))



########################################################################
#Movies

	#FULL GET Movies
	dispatcher.connect('movie_get', '/movies/',
	controller = movieController,
	action  = 'GET', conditions = dict (method = ['GET']))

	#GET Movie Key request
	dispatcher.connect('movie_key_get', '/movies/:mid',
	controller = movieController,
	action  = 'GET_KEY', conditions = dict (method = ['GET']))

	#PUT request to movie
	dispatcher.connect('movie_key_put', '/movies/:mid',
	controller = movieController,
	action  = 'PUT_KEY', conditions = dict (method = ['PUT']))

	#DELETE movie key
	dispatcher.connect('movie_key_delete', '/movies/:mid',
	controller = movieController,
	action  = 'DELETE_KEY', conditions = dict (method = ['DELETE']))
		
	#POST 
	dispatcher.connect('movies_post', '/movies/',
	controller = movieController,
	action  = 'POST', conditions = dict (method = ['POST']))

	#DELETE movies
	dispatcher.connect('movie_delete', '/movies/',
	controller = movieController,
	action  = 'DELETE', conditions = dict (method = ['DELETE']))

################################################################################
#Users

	#GET User Key request
	dispatcher.connect('users_key_get', '/users/:uid',
	controller = userController,
	action  = 'GET_KEY', conditions = dict (method = ['GET']))

	#PUT request to user
	dispatcher.connect('users_key_put', '/users/:uid',
	controller = userController,
	action  = 'PUT_KEY', conditions = dict (method = ['PUT']))

	#DELETE user key
	dispatcher.connect('users_key_delete', '/users/:uid',
	controller = userController,
	action  = 'DELETE_KEY', conditions = dict (method = ['DELETE']))
		
	#FULL GET Users
	dispatcher.connect('users_get', '/users/',
	controller = userController,
	action  = 'GET', conditions = dict (method = ['GET']))
		
	#POST 
	dispatcher.connect('users_post', '/users/',
	controller = userController,
	action  = 'POST', conditions = dict (method = ['POST']))

	#DELETE user
	dispatcher.connect('users_delete', '/users/',
	controller = userController,
	action  = 'DELETE', conditions = dict (method = ['DELETE']))

#######################################################################
#Ratings

	#GET User Key request
	dispatcher.connect('ratings_key_get', '/ratings/:mid',
	controller = ratingsController,
	action  = 'GET_KEY', conditions = dict (method = ['GET']))	


				
	#starting the server
	cherrypy.config.update(conf)
	app = cherrypy.tree.mount(None, config=conf)
	cherrypy.quickstart(app)

if __name__ == '__main__':
	start_service()

