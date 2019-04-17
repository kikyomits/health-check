 export POD_ID=${HOSTNAME##*-}
 echo "POD ID: ${POD_ID}"
 node app/index.js