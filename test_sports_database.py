from _sports_database import _sports_database
import unittest

class TestSportsDatabase(unittest.TestCase):
	"""unit tests for testing the sports database"""

	#@classmethod
	#def setUpClass(self):
	tdb = _sports_database()

	def reset_data(self):
		"required because we cannot guarentee order of execution"
		self.tdb.delete_all_data()
		self.tdb.load_teams('data_files/teams1.csv')
		self.tdb.load_data('data_files/1-premierleague.csv')

	def test_get_movie_id(self):
		self.reset_data()
		movie = self.tdb.get_team_id("Arsenal")
		self.assertEquals(movie, 11)
		movie = self.tdb.get_team_id("asl;dkfj")
		self.assertEquals(movie, None)
	def test_set_movie_wins(self):
		self.reset_data()
		movie = self.tdb.get_team_id("a;lskdfj")
		self.assertEquals(movie, None)

if __name__ == "__main__":
	unittest.main()
