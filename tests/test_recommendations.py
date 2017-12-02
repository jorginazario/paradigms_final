import unittest
import requests
import json

class TestTeams(unittest.TestCase):

    PORT_NUM = '51019' #change port number to match your port number
    print("Testing Port number: ", PORT_NUM)
    SITE_URL = 'http://student04.cse.nd.edu:' + PORT_NUM
    RECOMMENDATIONS_URL = SITE_URL + '/recommendations/'
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

    def test_recommendations_get(self):
        self.reset_data()
        team_team = 'Man City_West Ham'
        r = requests.get(self.RECOMMENDATIONS_URL + str(team_team))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['result'], 'success')
        self.assertEqual(resp['recommendation'], 'Man City')

if __name__ == "__main__":
    unittest.main()

