#!/usr/bin/env python3
import sys
import os
class _sports_database:
	def __init__(self):
# your code here
		self.teams = {}	#initialize my movie dict
		#self.stats = {}
	
# also write load_movies() and print_sorted_movies()
	def load_teams(self, teams_file):	#load movies
		myfile = open(teams_file)		#open and save file 
		counter = 1
		for line in myfile:					#traverse each line in the file
			team = line.rstrip()
			self.teams[counter] = team	#{1: "AFC B	Bournemouth", 2: "AFC Telford"}
			counter+=1
	
	def load_one_team(self, team_file, tid):
		myfile = open(team_file)
		for line in myfile:
			team = line.rstrip().split("::")
			if mov[0] == mid:
				team.movies[mov[0]] = mov[1:]

	#Given a movie ID, returns a list with two elements or None 
	#First string is movie name, second string is movie genre
	def get_movie(self,mid):
		if str(mid) in self.movies.keys():
			#mov = self.movies[str(mid)]
			return self.movies[str(mid)]
		else:
			return None

	#Returns a list of integers containing all movie IDs (ints)
	def get_movies(self):
		mlist = []
		for i in self.movies.keys():
			mlist.append(int(i))
		return mlist
	
	#Updates the movie data member entry with the specified movie ID
	#Or creates a new entry if data for the movie that IS is not present
	def set_movie(self, mid, mlist):
		title = mlist[0]
		genre = mlist[1]
		new = [title, genre]		
		self.movies[str(mid)] = new

	#This method will delete the entry with the specified movie ID
	def delete_movie(self,mid):
		if str(mid) in self.movies.keys():
			del self.movies[str(mid)]
		
	#######################
	#User related functions
	#######################

	###################################################
	#ratings.dat: UserID::MovieID::Rating::TimeStamp
	#users.dat: UserID::Gender::Age::Occupation:Zip-code
	#movies.dat: MovieID::Title::Genres
	###################################################

	#Opens the file with the name given as a parameter and loads the user 
	#data from that file into a dictinary or list of dictionaries.
	def load_users(self, usersfile):
		ufile = open(usersfile)
		for line in ufile:
			l = line.rstrip().split("::")
			self.users[l[0]] = l[1:]	#[l[1],l[2],l[3],l[4]]

	def get_user(self, uid):
		userinfo = []
		if str(uid) in self.users.keys():
				user = self.users[str(uid)]
				userinfo.append(user[0])
				userinfo.append(int(user[1]))
				userinfo.append(int(user[2]))
				userinfo.append(user[3])
				return userinfo
		else:
			return None
	
	def get_users(self):
		ulist = []
		for i in self.users.keys():
			ulist.append(int(i))
		return ulist

	def set_user(self, uid, ulist):
		gender = ulist[0]
		age = ulist[1]
		occup = ulist[2]
		zipcode = ulist[3]
		new = [gender, age, occup, zipcode]
		self.users[str(uid)] = new
	
	def delete_user(self, uid):
		if str(uid) in self.users.keys():
			del self.users[str(uid)]

	####################################
	#Ratings
	####################################
	
	def load_ratings(self, ratings_file):
		rfile = open(ratings_file)

		for line in rfile:
			l = line.split("::")
			uid = int(l[0])
			mid = int(l[1])
			rating = int(l[2])		
			if mid not in self.ratings.keys():
				self.ratings[mid] = {}
			self.ratings[mid][uid] = rating
		

	def get_rating(self, mid):
		mySum = 0.0
		#print(self.ratings.keys())
		if mid not in self.ratings.keys():
			return 0
		else:
			for i in self.ratings[mid].values():
				mySum += i
			
		average = mySum/float(len(self.ratings[mid]))
		return average
	
	def get_highest_rated_movie(self):
		high = 0
		high_name = None
		low_mid = 4000
		for mid in self.ratings.keys():
			average = self.get_rating(mid)
			if average > high:
				high = average
				high_name = self.get_movie(mid)[0]
			elif average == high and mid < low_mid:
				low_mid = mid
				high = average
				high_name = self.get_movie(mid)[0]
		
		return high_name			
	
	def set_user_movie_rating(self,uid,mid,rating):
		self.ratings[mid][uid] = rating

	def get_user_movie_rating(self, uid, mid):
		if mid not in self.ratings:
			if uid not in self.ratings[mid]:
				return None

		else:																					#CHECK TABS
			return self.ratings[mid][uid]

	def delete_all_ratings(self):
		del self.ratings
		self.ratings = {}

#	def print_sorted_movies(self):		#print movies
#		sorted_movies = sorted(self.movies)			#sort the list
#		for line in self_movies:		#traverse the list, element by element and print each one
#			print (line)

	

if __name__ == "__main__":
	mdb = _movie_database()
#### MOVIES ########
	mdb.load_movies('ml-1m/movies.dat')
	mdb.load_ratings('ml-1m/ratings.dat')
	mdb.load_users('ml-1m/users.dat')
#	mdb.get_rating(2490)
	mdb.get_rating(2490)
#	mdb.print_sorted_movies()

