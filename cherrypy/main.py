import cherrypy
import json
from dcont import DictionaryController

	
def start_service():
	dispatcher = cherrypy.dispatch.RoutesDispatcher()	#dispatcher - forwards the request from the HTTPS to the backend and returns the response from the backend
	
	#conf is a dictionary with the settings for cherrypy
	conf = { 'global' : {'server.socket_host' : 'student04.cse.nd.edu', 
										'server.socket_port': 51058,},
						'/' : {'request.dispatch' : dispatcher}}
	
	dictionaryController = DictionaryController()	#reference class

	#get request to dictionary
	dispatcher.connect('dict_get', '/dictionary/',
	controller = dictionaryController,
	action  = 'GET_DICT', conditions = dict (method = ['GET']))

	#get request to dictionary key
	dispatcher.connect('dict_key_get', '/dictionary/:key',
	controller = dictionaryController,
	action  = 'GET', conditions = dict (method = ['GET']))
	
	#post request to dictionary key
	dispatcher.connect('dict_key_post', '/dictionary/',
	controller = dictionaryController,
	action  = 'POST', conditions = dict (method = ['POST']))

	#put request to dictionary key
	dispatcher.connect('dict_key_put', '/dictionary/:key',
	controller = dictionaryController,
	action  = 'PUT', conditions = dict (method = ['PUT']))

	#DELETE request to dictionary
	dispatcher.connect('dict_delete', '/dictionary/',
	controller = dictionaryController,
	action  = 'DELETE_DICT', conditions = dict (method = ['DELETE']))

	#DELETE request to dictionary key
	dispatcher.connect('dict_key_delete', '/dictionary/:key',
	controller = dictionaryController,
	action  = 'DELETE', conditions = dict (method = ['DELETE']))	
				
	#starting the server
	cherrypy.config.update(conf)
	app = cherrypy.tree.mount(None, config=conf)
	cherrypy.quickstart(app)

if __name__ == '__main__':
	start_service()

