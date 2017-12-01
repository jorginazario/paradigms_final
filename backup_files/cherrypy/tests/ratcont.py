import cherrypy
import json

class RatingsController(object):
	def __init__(self, mdb=None):
		self.mdb = mdb
	
	def GET_KEY(self,mid):
		output = {'result': 'succes'}
	
		try:
			self.mdb.load_ratings('ml-1m/ratings.dat')
			print(self.mdb.get_rating(mid))
			myMovieRating = self.mdb.get_rating(mid)
			output['rating'] = myMovieRating
			output['movie_id'] = int(mid)
			
		except:
			output['result'] = 'error'
			output['message'] = 'GET_KEY ratings not working'

		return json.dumps(output)

