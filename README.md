# Be-Happik

Run the app : 

## Docker 

- [x] Clone the repo
- [x] Download docker.
- [x] Build : 
```
docker-compose build
```
- [x] Start using -d for daemon mode:  
```
docker-compose up -d
```
- [x] Check running containers:
```
docker ps
```
- [x] Use MakeFile to deploy DB: 
Using just make, it will prompt all the possible operations :

```
make 
```
- [x] Install tables:

```
make db-migrations
```
- [x] Install datas:

```
make db-seed
```

- [ ] You can go in the containers if needed :
```
docker exec -i -t name_from_docker_ps bash
```



