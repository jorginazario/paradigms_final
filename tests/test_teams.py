import unittest
import requests
import json

class TestTeams(unittest.TestCase):

    PORT_NUM = '51019' #change port number to match your port number
    print("Testing Port number: ", PORT_NUM)
    SITE_URL = 'http://student04.cse.nd.edu:' + PORT_NUM
    TEAMS_URL = SITE_URL + '/teams/'
    RESET_URL = SITE_URL + '/reset/'

    def reset_data(self):
        m = {}
        r = requests.put(self.RESET_URL, data = json.dumps(m))

    def is_json(self, resp):
        try:
            json.loads(resp)
            return True
        except ValueError:
            return False

    def test_teams_get(self):
        self.reset_data()
        team_name = 'Man City'
        r = requests.get(self.TEAMS_URL + str(team_name))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['id'], 124)
        self.assertEqual(resp['wins'], 27)
        self.assertEqual(resp['losses'], 6)
        self.assertEqual(resp['draws'], 5)
        self.assertEqual(resp['scoresFor'], 102)
        self.assertEqual(resp['scoresAgainst'], 37)
        self.assertEqual(resp['name'], 'Man City')

    def test_teams_put(self):
        self.reset_data()
        team_name = 'Man City'

        m = {}
        m['W'] = '100'
        m['L'] = '101'
        m['D'] = '102'
        m['SFor'] = '103'
        m['SAgainst'] = '104'
        r = requests.put(self.TEAMS_URL + str(team_name), data = json.dumps(m))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['result'], 'success')

        r = requests.get(self.TEAMS_URL + str(team_name))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['wins'], int(m['W']))
        self.assertEqual(resp['losses'], int(m['L']))
        self.assertEqual(resp['draws'], int(m['D']))
        self.assertEqual(resp['scoresFor'], int(m['SFor']))
        self.assertEqual(resp['scoresAgainst'], int(m['SAgainst']))
        self.reset_data()

    def test_teams_delete(self):
        self.reset_data()
        team_name = 'Man City'

        m = {}
        r = requests.delete(self.TEAMS_URL + str(team_name), data = json.dumps(m))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['result'], 'success')

        r = requests.get(self.TEAMS_URL + str(team_name))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['result'], 'error')

if __name__ == "__main__":
    unittest.main()

