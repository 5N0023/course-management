#!/bin/bash

API_URL=http://localhost:5000 
NEXT_PUBLIC_API_URL=http://localhost:5000

echo "API_URL=$API_URL" > ./course-management-frontend/.env
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> ./course-management-frontend/.env

cd course-management-frontend
npm run build
npm run start