isAuth=`mongo --eval "db.getUsers()" $1 | grep "not auth"`

if [ -z "$isAuth" ] ;
then
   echo "mongod auth is NOT enabled"
   exit 1
else
   echo "mongod auth is ENABLED"
   exit 0
fi
