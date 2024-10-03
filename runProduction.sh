#!/bin/bash
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
API_URL=http://backend:5000 
NEXT_PUBLIC_API_URL=http://localhost:5000
JWT_SECRET='secret'
MONGODB_URL="mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@mongo:27017/coursesdb?authSource=admin"


echo "Starting the production environment"

# create .env file for the frontend
echo "API_URL=$API_URL" > ./course-management-frontend/.env
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> ./course-management-frontend/.env

# create .env file for the backend
echo "JWT_SECRET=$JWT_SECRET" > ./course-management-backend/.env
echo "MONGODB_URL=$MONGODB_URL" >> ./course-management-backend/.env

# create .env file for the mongodb
echo "MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME" > .env
echo "MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD" >> .env

# build docker images

docker-compose up -d --build
