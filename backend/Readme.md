# To Run:

- npm i
- npm start

## Environment variables

- locally create a '.env' file in the root of the project (this directory) and add appropiate environment variables

example:

- MONGO_PASSWORD=password
  
- MONGO_USER=username

# Architecture

Brief explanation of some of the parts of this backend

## Models

Here you define any models needed for the MongoDB backend. define each field and its type. Make a new file for each model

## Routes

All api enpoints go here. define each endpoint and its type (post, get, delete, update) as well as its appropiate controller. seperate routes by model


## Controllers

The controllers will interact with the models and the DB and will read, change, or add new data
