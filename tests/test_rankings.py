import unittest
import requests
import json

class TestTeams(unittest.TestCase):

    PORT_NUM = '51019' #change port number to match your port number
    print("Testing Port number: ", PORT_NUM)
    SITE_URL = 'http://student04.cse.nd.edu:' + PORT_NUM
    RANKINGS_URL = SITE_URL + '/rankings/'
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

    def test_rankings_get(self):
        self.reset_data()
        team_name = 'Liverpool'
        r = requests.get(self.RANKINGS_URL + str(team_name))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['result'], 'success')
        self.assertEqual(resp['ranking'], 2)

if __name__ == "__main__":
    unittest.main()

