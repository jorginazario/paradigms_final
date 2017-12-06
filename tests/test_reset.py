import unittest
import requests
import json

class TestReset(unittest.TestCase):

    PORT_NUM = '51019' #change port number to match your port number
    print("Testing Port number: ", PORT_NUM)
    SITE_URL = 'http://student04.cse.nd.edu:' + PORT_NUM
    RESET_URL = SITE_URL + '/reset/'

    def is_json(self, resp):
        try:
            json.loads(resp)
            return True
        except ValueError:
            return False

    def reset_data(self):
        m = {}
        r = requests.put(self.RESET_URL, data = json.dumps(m))

    def test_reset_data(self):
        self.reset_data()
        m = {}
        r = requests.put(self.RESET_URL)

        r = requests.put(self.RESET_URL, data = json.dumps(m))
        self.assertTrue(self.is_json(r.content.decode('utf-8')))
        resp = json.loads(r.content.decode('utf-8'))
        self.assertEqual(resp['result'], 'success')
	

if __name__ == "__main__":
    unittest.main()

