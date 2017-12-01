import json
import cherrypy

class RecommendationsController(object):
	def __init__(self, mdb): 
		self.mdb = mdb
	
#####################################################
	def GET_KEY(self, uid):
		output = {"result": "success"}
		
		try:
			
			high_movie = self.mdb.get_highest_rated_movie(int(uid))
			output['movie_id'] = high_movie	
						
		except:
			output['result'] = 'error'
			output['message'] = 'GET_KEY movies not working'

		return json.dumps(output)

#####################################################
	def PUT_KEY(self,uid):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)

		try:
			mid = the_body['movie_id']
			rating = the_body['rating']
			rating = int(rating)
			print('Before')
			self.mdb.ratings[int(mid)][int(uid)] = rating
			self.mdb.track[int(uid)].add(int(mid))
			
		except:
			output['result'] = 'error'
			output['message'] = 'PUT_KEY not working'

		return json.dumps(output)


###################################################
	def DELETE(self):
		output = {"result": "success"}
		try:
			self.mdb.ratings.clear()
		except:
			output['result'] = 'error'
			output['message'] = 'DELETE_KEY not working'

		return json.dumps(output)





	
	
