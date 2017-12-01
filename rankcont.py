import cherrypy
import re, json

class RankingsController(object):
	def __init__(self, tdb=None):
		self.tdb = tdb

	def GET(self, team_name):
		output = {'result': 'success'}
		try:
			output['ranking'] = self.tdb.get_team_rank(str(team_name))
		except:
			output['result'] = 'error'
			output['message'] = 'could not retrieve team rank'
		return json.dumps(output)
	
	def FULL_GET(self):
		output = {'result': 'success'}
		output['teams'] = []
		try:
			for team in self.tdb.ranked:
				output['teams'].append({team: self.tdb.get_team_rank(team)})
		except:
			output['result'] = 'error'
			output['message'] = 'could not retrieve all rankings'
		return json.dumps(output)
