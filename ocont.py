import cherrypy
import re, json

#This controller is used as an added layer of security
class OptionsController(object):
	def OPTIONS(self, *args, **kargs):
		return ""
