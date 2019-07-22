#! /bin/bash
docker-compose down -v
docker-compose up -d
sleep 20
yarn test
docker-compose down -v