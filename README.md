
# Be-Happik [![Build Status](https://travis-ci.org/TimPrd/Be-Happik.svg?branch=master)](https://travis-ci.org/TimPrd/Be-Happik)

Project created for BeHappik.
> Be Happik is a SAAS solution which offers to improve the wellbeing in company by proposing more commitment on the part of the collaborators

## Getting Started

- [x] Clone the repo
- [x] Download docker.

## Installing

### Server-side

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

## Built With

- Backend
  * [Node](https://nodejs.org/) - Javascript server-side
  * [Sequelize](http://docs.sequelizejs.com) - ORM
  * [PostgreSQL](https://www.postgresql.org/) - Database

- Frontend
  * [React](https://reactjs.org/) - Used to generate front app

