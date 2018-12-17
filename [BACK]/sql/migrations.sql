CREATE TABLE public.roles
(
    id  SERIAL PRIMARY KEY NOT NULL,
    name          varchar(45) NOT NULL
);


CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY NOT NULL,
    lastname     varchar(45) NOT NULL ,
    firstname     varchar(45) NOT NULL ,
    email         varchar(45) NOT NULL UNIQUE,
    avatar        varchar(45) ,
    birthday      varchar(45) ,
    password      varchar(45) NOT NULL  ,
    role          int ,
    FOREIGN KEY (role) REFERENCES public.roles(id)
);

CREATE TABLE public.moods
(
     userID int NOT NULL ,
     date     date NOT NULL ,
     mood     varchar(45) NOT NULL ,
     FOREIGN KEY (userID) REFERENCES public.users(id)

);


CREATE TABLE public.answers
(
     id          int NOT NULL ,
     surveyID   int NOT NULL ,
     userID     int NOT NULL ,
     questionID int NOT NULL ,
     result       varchar(45) NOT NULL ,
     FOREIGN KEY (surveyID) REFERENCES public.survey(id)
     FOREIGN KEY (userID) REFERENCES public.users(id)
     FOREIGN KEY (questionID) REFERENCES public.question(id)

);


CREATE TABLE public.question
(
 _id`             int NOT NULL ,
 title`           varchar(45) NOT NULL ,
`   date NOT NULL ,
 creation_update` date NOT NULL ,
 description`     varchar(45) NOT NULL ,
 _id_author`      int NOT NULL ,
PRIMARY KEY (`_id`),
KEY `fkIdx_42` (`_id_author`),
CONSTRAINT `FK_42` FOREIGN KEY `fkIdx_42` (`_id_author`) REFERENCES `User` (`_id`)
);



CREATE TABLE public.questionsurvey
(
    surveyID   int NOT NULL ,
    questionID int NOT NULL ,
    FOREIGN KEY (questionID) REFERENCES public.question(id),
    FOREIGN KEY (surveyID) REFERENCES public.survey(id)
);









