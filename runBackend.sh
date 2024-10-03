#!/bin/bash


MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
JWT_SECRET='secret'
MONGODB_URL="mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/coursesdb?authSource=admin"

# backend .env

echo "JWT_SECRET=$JWT_SECRET" > ./course-management-backend/.env
echo "MONGODB_URL=$MONGODB_URL" >> ./course-management-backend/.env


# mongodb .env

echo "MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME" > .env
echo "MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD" >> .env

docker compose -f docker-compose-mongodb.yml up -d --build
cd course-management-backend
npm install
npm run start