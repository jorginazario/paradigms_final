import cherrypy
import re, json

#This controller is needed to handle RESET requests
class ResetController(object):
	def __init__(self, tdb=None):
		self.tdb = tdb

	def FULL_RESET(self):
		output = {'result': 'success'}
		the_body = cherrypy.request.body.read().decode()
		try:
			the_body = json.loads(the_body)
			self.tdb.load_teams('data_files/teams1.csv')
			self.tdb.load_data('data_files/1-premierleague.csv')
		except:
			output['result'] = 'error'
			output['message'] = 'could not recreate database from .csv files'
		return json.dumps(output)
	
	def RESET(self, team_name):
		output = {'result': 'success'}
		the_body = cherrypy.request.body.read().decode()
		try:
			the_body = json.loads(the_body)		
			self.tdb.restore_original_team('data_files/1-premierleague.csv', team_name)
		except:
			output['result'] = 'error'
			output['message'] = 'could not reset one team from .csv files'
		return json.dumps(output)
