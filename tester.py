import sys
import requests


username = 'admin3'
password = 'admin'
role = 'admin'

def login():
    response = requests.post('http://localhost:5000/auth/login', json={'username': username, 'password': password})
    print(response.text)
    return response.json()['access_token']

def register():
    response = requests.post('http://localhost:5000/auth/register', json={'username': username, 'password': password, 'role': role})
    print(response.text)

def checkToken(token):
    response = requests.get('http://localhost:5000/auth/checkToken', headers={'Authorization': 'Bearer ' + token})
    print(response.text)
    print(response.status_code)
if __name__ == '__main__':
    if (sys.argv[1] == 'login'):
        login()
    if (sys.argv[1] == 'register'):
        register()
    if (sys.argv[1] == 'check'):
        token = login()
        checkToken(token)