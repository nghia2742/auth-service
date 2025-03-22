#!/bin/bash

# Define container name
CONTAINER_NAME="postgres-local"

# Check if the container already exists
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container '$CONTAINER_NAME' already exists. Starting it..."
    docker start $CONTAINER_NAME
else
    echo "Creating and running new PostgreSQL container..."
    docker run --name $CONTAINER_NAME -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
fi

echo "PostgreSQL is running!"
