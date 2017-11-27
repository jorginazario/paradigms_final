import json
import cherrypy

class UserController(object):
	def __init__(self, mdb): 
		self.mdb = mdb

######################################################
	def GET(self):
		output = {'result': 'success'}
		myList = []
		try:
			for uid in self.mdb.users.keys():
				myBody = self.GET_KEY(uid)
				myBody = json.loads(myBody)
				myBody.pop('result')
				myList.append(myBody)
			output['users'] = myList
		except:
			output['result'] = 'error'
			output['message'] = 'FULL GET movies not working'

		return json.dumps(output)

####################################################
	def POST(self):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)
		myMax = max(self.mdb.get_users())
		print(self.mdb.get_users())
		nextVal = int(myMax) + 1

		try:
			output['id'] = nextVal

			gender = the_body['gender']
			age = the_body['age']
			zipcode = the_body['zipcode']
			occupation = the_body['occupation']
			myList = [gender, age, occupation, zipcode]
	
			self.mdb.set_user(nextVal, myList)

		except:
			output['result'] = 'error'
			output['message'] = 'POST not working'

		return json.dumps(output)
			
	
#####################################################
	def GET_KEY(self, uid):
		output = {"result": "success"}
		try:
			
			myUser = self.mdb.get_user(uid)
			output['gender'] = myUser[0]
			output['age'] = myUser[1]
			output['occupation'] = myUser[2]
			output['zipcode'] = myUser[3]
			output['id'] = int(uid)	
									
		except:
			output['result'] = 'error'
			output['message'] = 'GET_KEY users not working'

		return json.dumps(output)

#####################################################
	def PUT_KEY(self,uid):
		output = {"result": "success"}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)

		try:
			gender = the_body['gender']
			age = the_body['age']
			zipcode = the_body['zipcode']
			occupation = the_body['occupation']
			myList = [gender, age, occupation, zipcode]
			self.mdb.set_user(uid, myList)
		except:
			output['result'] = 'error'
			output['message'] = 'PUT_KEY not working'

		return json.dumps(output)

###################################################
	def DELETE(self):
		output = {"result": "success"}
		try:
			self.mdb.users.clear()
		except:
			output['result'] = 'error'
			output['message'] = 'DELETE_KEY not working'

		return json.dumps(output)


###################################################
	def DELETE_KEY(self,uid):
		output = {"result": "success"}
		try:
			self.mdb.users.pop(uid)
		except:
			output['result'] = 'error'
			output['message'] = 'DELETE_KEY not working'

		return json.dumps(output)




	
	
