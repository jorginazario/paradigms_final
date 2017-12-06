#!/usr/bin/env python3

##################
# import modules #
##################
import sys
import os
import heapq


#########
# class #
#########
class _sports_database:
	def __init__(self):
		self.teams = {} # {"Arsenal": 1}
		self.data = {} # {1: {"W": 5, "L": 2, "D": 1, "SFor": 87, "SAgainst": 78} }
		self.ranked = {} # {"Arsenal": 2}
		self.unranked = set()
		self.team_ids = {} # {1: "Arsenal"}

	# RECOMMENDATION of Match Winner#
	def load_rank(self):
		priority_queue = []
		for team_name in self.teams:
			if self.teams[team_name] not in self.data:
				self.unranked.add(team_name)
			else:
				wins = self.get_team_wins(team_name)
				losses = self.get_team_losses(team_name)
				win_loss_ratio = wins / losses
				priority_queue.append((win_loss_ratio, team_name))
		orderOfRankings = []
		while len(priority_queue) > 0:
			newTeam = priority_queue.pop()
			if len(orderOfRankings) == 0:
				orderOfRankings.append(newTeam)
			else:
				newIndex = 0			
				while newTeam[0] < orderOfRankings[newIndex][0] and newIndex < len(orderOfRankings) - 1:
					newIndex += 1
				orderOfRankings.insert(newIndex, newTeam)

		for index, team in enumerate(orderOfRankings):
			self.ranked[team[1]] = index + 1


	def match(self, two_teams):
		two_teams = two_teams.split("_")
		team1 = two_teams[0]
		team2 = two_teams[1]
		invalid_team1 = False
		invalid_team2 = False
		output_error = "One of inputted teams is unranked"
		if self.get_team_rank(team1) != -1 and self.get_team_rank(team2) != -1:
			if self.ranked[team1] < self.ranked[team2]:
				return team1
			else:
				return team2
		return output_error
			

	# LOADS #
	def load_teams(self, teams_file):
		self.teams.clear()
		myFile = open(teams_file)
		for line in myFile:
			line = line.strip()
			line = line.split(',')
			self.teams[line[1]] = int(line[0])
			self.team_ids[int(line[0])] = line[1]
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
	def get_valid_teams(self):
		return sorted(list(self.ranked.keys()))

	def get_invalid_teams(self):
		return sorted(list(self.unranked))

	def get_team_name(self, team_id):
		if int(team_id) in self.team_ids:
			return str(self.team_ids[int(team_id)])
		else:
			return None

	def get_team_id(self, teamName):
		if teamName in self.teams:
			return self.teams[teamName]
		else:
			return None
		
	def get_team_wins(self, teamName):
		if teamName in self.teams:
			return self.data[self.get_team_id(teamName)]["W"]
		else:
			return None
	
	def get_team_losses(self, teamName):
		if teamName in self.teams:
			return self.data[self.get_team_id(teamName)]["L"]
		else:
			return None
	
	def get_team_draws(self, teamName):
		if teamName in self.teams:
			return self.data[self.get_team_id(teamName)]["D"]
		else:
			return None
	
	def get_team_scoresFor(self, teamName):
		if teamName in self.teams:
			return self.data[self.get_team_id(teamName)]["SFor"]
		else:
			return None
	
	def get_team_scoresAgainst(self, teamName):
		if teamName in self.teams:
			return self.data[self.get_team_id(teamName)]["SAgainst"]
		else:
			return None
	
	def get_team_rank(self, teamName):
		if teamName in self.unranked:
			return -1
		else:
			return self.ranked[teamName]


	
	# SETS #
	# [teamName, wins, losses, draws, scoresFor, scoresAgainst]

	def set_complete_team(self, fullDataList):
		if fullDataList[0] in self.teams: team_id = self.get_team_id(fullDataList[0])
		else: team_id = len(self.teams) + 1
		self.teams[fullDataList[0]] = team_id
		if int(team_id) not in self.data:
			self.data[int(team_id)] = {}
		self.data[int(team_id)]["W"] = int(fullDataList[1])
		self.data[int(team_id)]["L"] = int(fullDataList[2])
		self.data[int(team_id)]["D"] = int(fullDataList[3])
		self.data[int(team_id)]["SFor"] = int(fullDataList[4])
		self.data[int(team_id)]["SAgainst"] = int(fullDataList[5])

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
	def delete_all_data(self):
		self.teams.clear()
		self.data.clear()
	
	def delete_team_data(self, teamName):
		team_id = self.get_team_id(teamName)
		del self.data[team_id]
		del self.teams[teamName]

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
	
	def restore_entire_database(self, data_File):
		pass

	def restore_original_team(self, data_File, team_name):
		if team_name not in self.teams:
			myFile = open('data_files/teams1.csv')
			for line in myFile:
				line = line.strip()
				line = line.split(',')
				if line[1] == team_name:
					self.teams[line[1]] = int(line[0])
					self.team_ids[int(line[0])] = line[1]
			myFile.close()
		self.data[self.get_team_id(team_name)] = {"W": 0, "L": 0, "D": 0, "SFor": 0, "SAgainst": 0}
		myFile = open(data_File)
		for line in myFile:
			line = line.strip()
			line = line.split(',')
			team1 = self.get_team_id(line[1])
			team2 = self.get_team_id(line[2])
			if team1 == self.get_team_id(team_name) or team2 == self.get_team_id(team_name):
				teamScores = [int(x) for x in line[3].split('-')]
				if team1 == self.get_team_id(team_name):
					self.data[team1]["SFor"] += teamScores[0]
					self.data[team1]["SAgainst"] += teamScores[1]
				if team2 == self.get_team_id(team_name):
					self.data[team2]["SFor"] += teamScores[1]
					self.data[team2]["SAgainst"] += teamScores[0]
				if teamScores[0] > teamScores[1]:
					if team1 == self.get_team_id(team_name): self.data[team1]["W"] += 1
					if team2 == self.get_team_id(team_name): self.data[team2]["L"] += 1
				elif teamScores[0] < teamScores[1]:
					if team2 == self.get_team_id(team_name): self.data[team2]["W"] += 1
					if team1 == self.get_team_id(team_name): self.data[team1]["L"] += 1
				else:
					if team1 == self.get_team_id(team_name): self.data[team1]["D"] += 1
					if team2 == self.get_team_id(team_name): self.data[team2]["D"] += 1
		myFile.close()






##################
# main execution #
##################
if __name__ == "__main__":
	tdb = _sports_database()
	tdb.load_teams('data_files/teams1.csv')
	tdb.load_data('data_files/1-premierleague.csv')
	tdb.load_rank()
