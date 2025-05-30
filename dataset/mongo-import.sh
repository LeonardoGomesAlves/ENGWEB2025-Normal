#!/bin/bash

# Nome do ficheiro a importar
FICHEIRO="edicoes.json"
CONTAINER="ewTP"
DB="eurovisao"
COLLECTION="edicoes"

# Iniciar o container (caso não esteja a correr)
docker start $CONTAINER

# Copiar o ficheiro para o container
docker cp $FICHEIRO $CONTAINER:/tmp

# Importar o ficheiro para o MongoDB
docker exec $CONTAINER mongoimport -d $DB -c $COLLECTION /tmp/$FICHEIRO --jsonArray

echo "Importação concluída!"