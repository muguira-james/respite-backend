#  docker run -it -e MONGO_INITDB_ROOT_USERNAME=magoo -e MONGO_INITDB_ROOT_PASSWORD=mysql --rm mongo 

FROM mongo
WORKDIR /home/mongodb

ADD create_mongo.sh /docker-entrypoint-initdb.d/
ADD create_user.js /docker-entrypoint-initdb.d/

