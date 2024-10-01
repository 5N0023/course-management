import sys
import requests


username = 'admin'
password = 'admin'
role = 'admin'

def login():
    response = requests.post('http://localhost:5000/auth/login', json={'username': username, 'password': password})
    print(response.text)

def register():
    response = requests.post('http://localhost:5000/auth/register', json={'username': username, 'password': password, 'role': role})
    print(response.text)
    
if __name__ == '__main__':
    if (sys.argv[1] == 'login'):
        login()
    if (sys.argv[1] == 'register'):
        register()