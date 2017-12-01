import json
import cherrypy

class ResetController(object):
	def __init__(self, mdb): 
		self.mdb = mdb
	#recreates database from .dat files
	#questions:
	#in a dictionary form or list?
	#will I be copying them from scratch from the original ml-1m .dat files?
	#self.ratings: the key is the second value (mid) 
	#and then there is a dictionary with the key being 
	#the user and the value being the rating

#####################################################
	def RESET(self):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)

		try:
			self.mdb.load_movies('ml-1m/movies.dat')
			self.mdb.load_users('ml-1m/users.dat')
			self.mdb.load_ratings('ml-1m/ratings.dat')

		except:
			output['result'] = 'error'
			output['message'] = 'RESET not working'

		return json.dumps(output)

#####################################################
	def RESET_KEY(self,mid):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)

		try:
			self.mdb.load_one_movie('ml-1m/movies.dat', mid)
			
		except:
			output['result'] = 'error'
			output['message'] = 'RESETKEY not working'

		return json.dumps(output)

	
	
