#!/usr/bin/env python3

##################
# import modules #
##################
import sys
import os


#########
# class #
#########
class _sports_database:
	def __init__(self):
		self.teams = {} # {"Arsenal": 1}
		self.data = {} # {1: {"W": 5, "L": 2, "D": 1, "SFor": 87, "SAgainst": 78} }

	# LOADS #
	def load_teams(self, teams_file):
		self.teams.clear()
		myFile = open(teams_file)
		for line in myFile:
			line = line.strip()
			line = line.split(',')
			self.teams[line[1]] = int(line[0])
		myFile.close()
	
	def load_data(self, data_file):
		self.data.clear()
		myFile = open(data_file)
		for line in myFile:
			line = line.strip()
			line = line.split(',')
			team1 = self.get_team_id(line[1])
			team2 = self.get_team_id(line[2])
			teamScores = [int(x) for x in line[3].split('-')]
			if team1 not in self.data:
				self.data[team1] = {"W": 0, "L": 0, "D": 0, "SFor": 0, "SAgainst": 0}
			if team2 not in self.data:
				self.data[team2] = {"W": 0, "L": 0, "D": 0, "SFor": 0, "SAgainst": 0}
			self.data[team1]["SFor"] += teamScores[0]
			self.data[team1]["SAgainst"] += teamScores[1]
			self.data[team2]["SFor"] += teamScores[1]
			self.data[team2]["SAgainst"] += teamScores[0]
			if teamScores[0] > teamScores[1]:
				self.data[team1]["W"] += 1
				self.data[team2]["L"] += 1
			elif teamScores[0] < teamScores[1]:
				self.data[team2]["W"] += 1
				self.data[team1]["L"] += 1
			else:
				self.data[team1]["D"] += 1
				self.data[team2]["D"] += 1
		myFile.close()
		
	# GETS #
	def get_team_id(self, teamName):
		return self.teams[teamName]
		
	def get_team_wins(self, teamName):
		return self.data[self.get_team_id(teamName)]["W"]
	
	def get_team_losses(self, teamName):
		return self.data[self.get_team_id(teamName)]["L"]
	
	def get_team_draws(self, teamName):
		return self.data[self.get_team_id(teamName)]["D"]
	
	def get_team_scoresFor(self, teamName):
		return self.data[self.get_team_id(teamName)]["SFor"]
	
	def get_team_scoresAgainst(self, teamName):
		return self.data[self.get_team_id(teamName)]["SAgainst"]
	
	# SETS #
	def set_team_wins(self, teamName, wins):
		self.data[self.get_team_id(teamName)]["W"] = int(wins)
	
	def set_team_losses(self, teamName, losses):
		self.data[self.get_team_id(teamName)]["L"] = int(losses)
	
	def set_team_draws(self, teamName, draws):
		self.data[self.get_team_id(teamName)]["D"] = int(draws)
	
	def set_team_scoresFor(self, teamName, scoresFor):
		self.data[self.get_team_id(teamName)]["SFor"] = int(scoresFor)
	
	def set_team_scoresAgainst(self, teamName, scoresAgainst):
		self.data[self.get_team_id(teamName)]["SAgainst"] = int(scoresAgainst)
	
	# RESETS #
	def reset_full_data(self):
		for team in self.data:
			self.data[team]["W"] = 0
			self.data[team]["L"] = 0
			self.data[team]["D"] = 0
			self.data[team]["SFor"] = 0
			self.data[team]["SAgainst"] = 0

	def reset_team_data(self, teamName):
		self.data[self.get_team_id(teamName)]["W"] = 0
		self.data[self.get_team_id(teamName)]["L"] = 0
		self.data[self.get_team_id(teamName)]["D"] = 0
		self.data[self.get_team_id(teamName)]["SFor"] = 0
		self.data[self.get_team_id(teamName)]["SAgainst"] = 0

##################
# main execution #
##################
if __name__ == "__main__":
	tdb = _sports_database()
	tdb.load_teams('data_files/teams1.csv')
	tdb.load_data('data_files/1-premierleague.csv')
	for team in tdb.data.items():
		print(team)
