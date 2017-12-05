Final Project for Programming Paradigms
Team Members: Jorge Nazario and Daniel Burns
Short Description: Using Pygame and Cherrypy libraries for web application. The project includes web server and web client.


##EXPLANATION FOR OO API:##

We chose a soccer statistics data source for this project and built an OO API to handle the following features: 
	1) one can request to see all the teams in the league 
	2) one can request to see the performance (stats) for a single team 
	3) one can request to see which team is more likely to win a match
	4) one can add new teams into the league and include the team's stats
	5) one can modify a team's stats
	6) one can modify a team's ranking
	7) one can delete all the teams (to start from scratch / create a new league if yout want))
	8) one can delete a single team

##EXPLANATION FOR THE WEB SERVER:##

Web server port number: 51019

Resource RESET:
1) PUT request to /reset/:team_name with empty body {} will reset the a team's stats
2) PUT request to /reset/ with empty body {} will reset all the team's data

Resource TEAMS:
1) GET request to /teams/:team_name will return a team's stats
2) GET request to /teams/ will return all of the teams' stats
3) PUT request to /teams/:team_name with body {"W": "3", "L": "2", "D": "5", "SFor": "100, "SAgainst": "88"} will modify a team's stats
4) POST request to /teams/ with body {"team_name": "Arsenal", "W": "44", "L": "22", "D": "10", "SFor": "88", "SAgainst": "68"} will add team to the league with the specified stats
5) DELETE request to /teams/:team_name will delete a single team
6) DELETE request to /t/ will delete all teams

Resource Rankings:
1) GET request to /rankings/:team_name 
2) GET request to /rankings/

Resource RECOMMENDATIONS:
1) GET request to /recommendations/:team_team (you will provide to different team names separated by an underscore) will give you a predicted winner based on each team's stats 
2) GET request to /recommendations/ will return the number best team in the league

##ADDITIONAL COMMENTS:##

Stats Data:
- Keep track of the amount of goals each team has scored in a given year
- Keep track of the amount of goals that were scored against them
- Keep track of each teams wins 
- Keep track of each teams losses
- Recommendation as to which team you should bet on 

Self Dictionaries:
- self.teams = {"name": "Arsenal", "tid": 1}
- self.data = {"W": 17, "L": 5, "D": 2, "SFor": 87, "SAgainst": 78}
- self.recommendations = {tid: 1.35}
- self.ranked = {"Man United"": "1", ...}
- self.unranked = (team names)
- get functions for all data in self.teams and self.data
- set functions for all data in self.data
- reset functions for all/individuals data in self.data
- delete functions for all/individual data in self.data



