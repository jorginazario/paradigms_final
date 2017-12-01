import cherrypy
import re, json

class RecommendationsController(object):
	def __init__(self, tdb=None):
		self.tdb = tdb
	
	def GET(self, team_team):
		output = {'result': 'success'}
		try:
			output['recommendation'] = self.tdb.match(team_team)
		except:
			output['result'] = 'error'
			output['message'] = 'could not match up teams'
		return json.dumps(output)
	
	def FULL_GET(self):
		output = {'result': 'success'}
		try:
			allRankings = self.tdb.ranked
			for team in allRankings:
				if allRankings[team] == 1:
					output['recommendation'] = team
		except:
			output['result'] = 'error'
			output['message'] = 'could not get best recommendation'
		return json.dumps(output)
