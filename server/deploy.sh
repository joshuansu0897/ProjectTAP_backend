#!/bin/bash

ssh -v $USER_SERVER@$IP_SERVER << EOF

echo 'Down docker-compose'
docker-compose down

echo 'Update and Run docker-compose'
docker-compose up --build -d

echo 'Done!'

EOF