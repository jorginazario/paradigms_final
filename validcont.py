import cherrypy
import re, json

#This controller is needed to handle all Rankings requests
class ValidController(object):
	def __init__(self, tdb=None):
		self.tdb = tdb

	def FULL_GET(self):
		output = {'result': 'success'}
		try:
			output['teams'] = self.tdb.get_valid_teams()
		except:
			output['result'] = 'error'
			output['message'] = 'could not retrieve all valid teams'
		return json.dumps(output)
