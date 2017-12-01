import cherrypy
import re, json

class OptionsController(object):
	def OPTIONS(self, *args, **kargs):
		return ""
