# paradigms_final
Final Project for Programming Paradigms. Using Pygame and Cherrypy libraries for web application. The project includes web server and web client.

Stats Data:
- Keep track of the amount of goals each team has scored in a given year
- Keep track of the amount of goals that were scored against them
- Keep track of each teams wins 
- Keep track of each teams losses
- Recommendation as to which team you should bet on 

Requests:
- GET http://URL/#
- the get request will return the name of the team ranked in that #

- PUT https://URL/#
{"W" = 34, }

Self Dictionaries:
- self.teams = {"name": "Arsenal", "tid": 1}
- self.data = {"W": 17, "L": 5, "D": 2, "SFor": 87, "SAgainst": 78}
- self.recommendations = {tid: 1.35}

