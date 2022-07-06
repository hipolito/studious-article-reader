# studious-article-reader

API to read RSS Articales from a xml URL

## 1. Setup

### 1.1 Clone repository

```bash
git clone https://github.com/hipolito/studious-article-reader.git
```

### 1.2 Dowload dependencies

```bash
cd studious-article-reader
npm install
```

### 1.3 Configure the environment

This project used environment variables to be configure so, export the following variables pointed to your database and expected api port exposed
```
DATABASE_PASSWORD='some_incredible_password'
DATABASE_NAME='database_name'
DATABASE_USER='root'
DATABASE_PORT=3306
DATABASE_HOST='localhost'
SERVER_PORT=8080
DATABASE_DIALECT='mysql'
```

I use ``.env`` file with this variables for my docker-compose.yml solution

### 1.4 Configure the database

#### 1.4.1 Sequelize ORM

In this project I used Sequelize ORM to create the interface between my models and the database, and in case mysql is used the database creation must be made previously running the sequelize commands

```
mysql -u root -p
create database studious_article_reader_db
```

After creating the database run the migrations to create the tables

```
npm run migrate:up
```

#### 1.4.2 Manual configuration

If needed, the database DDL init.sql can be executed run the script so after creating the database, just open the database and run the commands inside the file to create the structure

```
mysql -u root -p
create database studious_article_reader_db
exit
mysql -u root -p studious_article_reader_db < init.sql
```

### 1.5 Run
To run the application 

```
npm run start
```

## 2. Docker

### 2.1 Configure
docker needs
If docker is used in your environment, please configure a ``.env`` in the root of this project:

```
DATABASE_PASSWORD='some_incredible_password'
DATABASE_NAME='studious_article_reader_db'
DATABASE_USER='root'
DATABASE_PORT=3306
DATABASE_HOST='localhost'
SERVER_PORT=8080
DATABASE_DIALECT='mysql'
```

### 2.2 Run
```
docker-compose up
```
