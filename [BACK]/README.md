# Server-side of Be-Happik


## API schema
Visit online API doc : [API Be Happik](http://rodpil.me/Be-Happik/)

## Installing

#### Docker 

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

- [x] Install schema & datas:

```
make db-install
```

- [x] You can go in the containers if needed :

```
docker exec -i -t name_from_docker_ps bash
```

## Run tests

Run test :

```
npm test
```

Run coverage: 

```
npm run coverage
```

