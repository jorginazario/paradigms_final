import cherrypy
import re, json

class TeamController(object):
	def __init__(self, tdb=None):
		self.tdb = tdb

	def FULL_GET(self):
		output = {'result': 'success'}
		output['teams'] = []
		try:
			for team_id in self.tdb.data:
				team_id = int(team_id)
				team_name = self.tdb.get_team_name(team_id)
				JSONString = self.GET(team_name)
				JSONString = json.loads(JSONString)
				output['teams'].append(JSONString)
		except Exception as ex:
			output['result'] = 'error'
			output['message'] = 'could not list all available teams'
		return json.dumps(output)
	
	def FULL_POST(self):
		output = {'result': 'success'}
		the_body = cherrypy.request.body.read().decode()
		try:
			the_body = json.loads(the_body)
			new_team_name = the_body['team_name']
			new_team_wins = int(the_body['W'])
			new_team_losses = int(the_body['L'])
			new_team_draws = int(the_body['D'])
			new_team_SFor = int(the_body['SFor'])
			new_team_SAgainst = int(the_body['SAgainst'])
			listParameter = [new_team_name, new_team_wins, new_team_losses, new_team_draws, \
				new_team_SFor, new_team_SAgainst]
			self.tdb.set_complete_team(listParameter)
		except Exception as ex:
			output['result'] = 'error'
			output['message'] = 'could not add a new team'
		return json.dumps(output)

	def FULL_DELETE(self):
		output = {'result': 'success'}
		try:
			self.tdb.teams.clear()
			self.tdb.data.clear()
		except Exception as ex:
			output['result'] = 'error'
			output['message'] = 'could not clear teams database'
		return json.dumps(output)

	def GET(self, team_name):
		output = {'result': 'success'}
		team_name = str(team_name)
		try:
			output['id'] = self.tdb.get_team_id(team_name)
			output['wins'] = self.tdb.get_team_wins(team_name)
			output['losses'] = self.tdb.get_team_losses(team_name)
			output['draws'] = self.tdb.get_team_draws(team_name)
			output['scoresFor'] = self.tdb.get_team_scoresFor(team_name)
			output['scoresAgainst'] = self.tdb.get_team_scoresAgainst(team_name)
			output['name'] = team_name
		except:
			output['result'] = 'error'
			output['message'] = 'could not retrieve team information'
		if output['id'] == None:
			output = {'result': 'error', 'message': 'could not retrieve team information'}
		return json.dumps(output)
	
	def PUT(self, team_name):
		output = {'result': 'success'}
		the_body = cherrypy.request.body.read().decode()
		try:
			the_body = json.loads(the_body)
			listParameter = [team_name, int(the_body['W']), int(the_body['L']), int(the_body['D']), \
			int(the_body['SFor']), int(the_body['SAgainst'])]
			self.tdb.set_complete_team(listParameter)
		except:
			output['result'] = 'error'
			output['message'] = 'could not replace (or create) team'
		return json.dumps(output)

	def DELETE(self, team_name):
		output = {'result': 'success'}
		team_name = str(team_name)
		try:
			self.tdb.delete_team_data(team_name)
		except:
			output['result'] = 'error'
			output['message'] = 'could not delete the team'
		return json.dumps(output)
