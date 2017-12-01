import json
import cherrypy

class DictionaryController(object):
	def __init__(self):
	#instantiate dictionary
		self.myd = {}
		#self.myd['a4'] = '1995'

		
	#####################################################
	def GET(self, key):	#handler for get rquest
		output = {"result":"success"}
		key = str(key)
		try:
			value = self.myd[key]
			output['key'] = key
			output['value'] = value
		except KeyError as  ex:
			output['result'] = 'error'
			output['message'] = 'key not found'
		return json.dumps(output)
	
	def GET_DICT(self):
		output = {'result': 'success'}
		myList = []
		output2={}
		try:
			for pair in self.myd.items():
				output2['key'] = pair[0]
				output2['value'] = pair[1]
			
			myList.append(output2)
			output['entries'] = myList
		except KeyError as ex:
			output['result'] = 'error'
			output['message'] = 'key not found'
		return json.dumps(output)

	######################################################	
	#add or replace a value for a key
	#keys: 'key'->'a4' and 'value'->'1995'
	def PUT(self, key):	#handler for put request     
		output = {'result':'success'}
		the_body = cherrypy.request.body.read().decode()
		the_body = json.loads(the_body)
		try:
			value = the_body['value']	#{'value':'1995'}
			self.myd['a4'] = value	#in myd -> {'a4': '1995'}
		except KeyError as ex:
			output['result'] = 'error'
			output['message'] = 'key not found'
		return json.dumps(output)

	#######################################################
	#add or replace a new key-value pair
	def POST(self):	#handler for post requesting
		output = {'result': 'success'}
		try:
			the_body = cherrypy.request.body.read().decode()
			the_body = json.loads(the_body)
			nKey = str(the_body['key'])	#nKey = 'a4'
			value = str(the_body['value'])	#value = '1995'
			self.myd[nKey] = value	#myd -> {'a4': '1995'}
		except KeyError as ex:
			output['result'] = 'error'
			output['message'] = 'key not found'
		return json.dumps(output)
		

	######################################################
	def DELETE(self, key):	#handler for delete request
		output = {'result': 'success'}
		try:
			self.myd.pop(key)
		except KeyError as ex:
			output['result'] = 'error'
			output['message'] = 'key not found'
		return json.dumps(output)

	def DELETE_DICT(self):
		output = {'result': 'success'}
		try:
			self.myd.clear()
		except KeyError as ex:
			output['result'] = 'error'
			output['message'] = 'key not found'
		return json.dumps(output)

		

