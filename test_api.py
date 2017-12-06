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
		self.tdb.load_rank()
	
	def test_match(self):
		self.reset_data()
		winner = self.tdb.match("Liverpool_Aston Villa")
		self.assertEqual(winner, "Liverpool")
		winner = self.tdb.match("Man United_Fulham")
		self.assertEqual(winner, "Man United")
	
	def test_delete_teams(self):
		self.reset_data()

	def test_get_team_id(self):
		self.reset_data()
		team = self.tdb.get_team_id("Arsenal")
		self.assertEqual(team, 11)
		team = self.tdb.get_team_id("team_that_doesn't_exist")
		self.assertEqual(team, None)
	def test_get_team_wins(self):
		self.reset_data()
		teamWins = self.tdb.get_team_wins("Arsenal")
		self.assertEqual(teamWins, 24)
		teamWins = self.tdb.get_team_wins("team_that_doesn't_exist")
		self.assertEqual(teamWins, None)
	
	def test_get_team_losses(self):
		self.reset_data()
		teamLosses = self.tdb.get_team_losses("Arsenal")
		self.assertEqual(teamLosses, 7)
		teamLosses = self.tdb.get_team_losses("team_that_doesn't_exist")
		self.assertEqual(teamLosses, None)
	
	def test_get_team_draws(self):
		self.reset_data()
		teamDraws = self.tdb.get_team_draws("Arsenal")
		self.assertEqual(teamDraws, 7)
		teamDraws = self.tdb.get_team_draws("team_that_doesn't_exist")
		self.assertEqual(teamDraws, None)
	
	def test_get_team_scoresFor(self):
		self.reset_data()
		teamScoresFor = self.tdb.get_team_scoresFor("Arsenal")
		self.assertEqual(teamScoresFor, 68)
		teamScoresFor = self.tdb.get_team_scoresFor("team_that_doesn't_exist")
		self.assertEqual(teamScoresFor, None)
	
	def test_get_team_scoresAgainst(self):
		self.reset_data()
		teamScoresAgainst = self.tdb.get_team_scoresAgainst("Arsenal")
		self.assertEqual(teamScoresAgainst, 41)
		teamScoresAgainst = self.tdb.get_team_scoresAgainst("team_that_doesn't_exist")
		self.assertEqual(teamScoresAgainst, None)
	
	def test_delete_one_team(self):
		self.reset_data()
		team_id = self.tdb.get_team_id("Arsenal")
		self.assertEqual(team_id, 11)
		self.tdb.delete_team_data("Arsenal")
		team_id = self.tdb.get_team_id("Arsenal")
		self.assertEqual(team_id, None)
	
	def test_delete_all_teams(self):
		self.reset_data()
		number_of_teams = len(self.tdb.teams)
		self.assertEqual(number_of_teams, 229)
		self.tdb.delete_all_data()
		number_of_teams = len(self.tdb.teams)
		self.assertEqual(number_of_teams, 0)
	
	def test_set_team_wins(self):
		self.reset_data()
		self.tdb.set_team_wins("Arsenal", 100)
		teamWins = self.tdb.get_team_wins("Arsenal")
		self.assertEqual(teamWins, 100)
	
	def test_set_team_losses(self):
		self.reset_data()
		self.tdb.set_team_losses("Arsenal", 100)
		teamLosses = self.tdb.get_team_losses("Arsenal")
		self.assertEqual(teamLosses, 100)
	
	def test_set_team_draws(self):
		self.reset_data()
		self.tdb.set_team_draws("Arsenal", 100)
		teamDraws = self.tdb.get_team_draws("Arsenal")
		self.assertEqual(teamDraws, 100)

	def test_set_team_scoresFor(self):
		self.reset_data()
		self.tdb.set_team_scoresFor("Arsenal", 138)
		teamScoresFor = self.tdb.get_team_scoresFor("Arsenal")
		self.assertEqual(teamScoresFor, 138)

	def test_set_team_scoresAgainst(self):
		self.reset_data()
		self.tdb.set_team_scoresAgainst("Arsenal", 140)
		teamScoresAgainst = self.tdb.get_team_scoresAgainst("Arsenal")
		self.assertEqual(teamScoresAgainst, 140)

if __name__ == "__main__":
	unittest.main()
