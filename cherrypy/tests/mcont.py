import json
import cherrypy

class MovieController(object):
	def __init__(self, mdb): 
		self.mdb = mdb

######################################################
	def GET(self):
		output = {'result': 'success'}
		myList = []
		try:
			for mid in self.mdb.movies.keys():
				myBody = self.GET_KEY(mid)
				myBody = json.loads(myBody)
				myBody.pop('result')
				myList.append(myBody)
			output['movies'] = myList
		except:
			output['result'] = 'error'
			output['message'] = 'FULL GET movies not working'

		return json.dumps(output)
			
	
#####################################################
	def GET_KEY(self, mid):
		output = {"result": "success"}
		
		try:
			self.mdb.load_images('ml-1m/images.dat')
			myMovie = self.mdb.get_movie(mid)
			output['title'] = myMovie[0]
			output['genres'] = myMovie[1]
			output['id'] = int(mid)
			if mid in self.mdb.images:
				output['img'] = self.mdb.images[mid]
			else:
				output['img'] = 'noimgpath.jpg'	
						
		except:
			output['result'] = 'error'
			output['message'] = 'GET_KEY movies not working'

		return json.dumps(output)

#####################################################
	def PUT_KEY(self,mid):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)

		try:
			title = the_body['title']
			genres = the_body['genres']
			myList = [title, genres]
			self.mdb.set_movie(mid, myList)
		except:
			output['result'] = 'error'
			output['message'] = 'PUT_KEY not working'

		return json.dumps(output)

####################################################
	def POST(self):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)
		
		myMax = max(self.mdb.get_movies())
		nextVal = int(myMax) + 1
		
		try:
			output['id'] = nextVal

			title = the_body['title']
			genres = the_body['genres']
			myList = [title, genres]

			self.mdb.set_movie(nextVal, myList)

		except:
			output['result'] = 'error'
			output['message'] = 'POST not working'

		return json.dumps(output)

###################################################
	def DELETE(self):
		output = {"result": "success"}
		try:
			self.mdb.movies.clear()
		except:
			output['result'] = 'error'
			output['message'] = 'DELETE_KEY not working'

		return json.dumps(output)


###################################################
	def DELETE_KEY(self,mid):
		output = {"result": "success"}
		try:
			self.mdb.movies.pop(mid)
		except:
			output['result'] = 'error'
			output['message'] = 'DELETE_KEY not working'

		return json.dumps(output)




	
	
