# Be-Happik


## Docker

### Build the container 

‘‘‘docker
docker build -t node-docker .
‘‘‘

### Run the server (without DB)

‘‘‘docker
docker run --rm -v $(pwd)/app:/src/app -v $(pwd)/public:/src/public -p 3000:3000 node-docker
‘‘‘

Go to http:localhost:3000

### Database

‘‘‘docker
docker run -d --rm -p 5432:5432 -e POSTGRES_USER=admin -v $(pwd)/.data:/var/lib/postgresql/data -v $(pwd)/sql:/sql --name nd-db postgres:9.6
‘‘‘
 
 
#### Migration 

‘‘‘docker
docker exec nd-db psql admin admin -f /sql/migrations.sql
‘‘‘

#### Seed

‘‘‘docker
docker exec nd-db psql admin admin -f /sql/seeds.sql
‘‘‘

### Run the server (with DB)

Link the node & the postregesql containers with --link
‘‘‘docker
docker run --rm -p 3000:3000 -d -v $(pwd)/app:/src/app -v $(pwd)/public:/src/public --link nd-db --name nd-app node-docker
‘‘‘


### Shutdown 

‘‘‘docker
docker ps //will print the id 
docker stop id_from_docker_ps
‘‘‘

