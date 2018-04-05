This is a website to discover electronic music, the website is available [here](http://electronicmusicforpeoplewhodontlikeelectronicmusic.com)

# General Information about the project

This website was built on the following stack :

- Front-end : React.js
- Back-end (as a REST API): NodeJs/express
- Database : [Neo4j](https://neo4j.com/) (an amazing graph database)

## Principle

Electronic music for people who don't like electronic music is a website which lead people into discovering album of electronic music by asking what genre they like and by guiding them through questions about what they think about each of the albums they are proposed.

There is no algorithm for selecting the albums and the questions, this is curated by myself because :
1. I'm a big fan of music, so I know some stuff
2. Algorithm can't beat human curation (yet)
3. Music recommendation algorithm is already done so nicely by Spotify
4. Anyway I don't have 1/10th the skills to even think about making a serious music recommendation algorithm

## A few words about me

I'm a french developper located in Paris, I have been learning computer science and web development by myself for a few years, oh, and I'm currently looking for a job as a full-stack  developper(node/react) in the Paris Area.

**This is why I'm explaining stuff in this readme. I don't think this is revolutionnary in any ways, I just want to explain what I did and why I did it so I can eventually improve and learn how to be a better developper**

## Goal of the website

This website was an opportunity for me to put my web-coding skills in action by creating a nice website that possibly some people would find kind of fun/interesting.

My goals were the following :

- Creating a Rest-ish API using NodeJs and Express
- Interfacing with the spotify API for data related to Albums and Artists (I'm a BIG FAN of spotify and their api)
- Storing this data in graph database aka Neo4j which I discovered for this project (by the way it's an amazing product)
- Creating two clients which would consume this api, a public website for reading from the database and a private website for administration which would get data from spotify and then write it to the database
- Creating those clients using React.js and React-router 4 for routing
- Having a strong focus on great/smooth user experience and fast performance
- Having an original design with nice animations
- Deploy a project in production (on Heroku) and learn a few things about this process

## General structure of the project
This project is made of three part :

1. The API which manage everything database-related
2. The admin section which allow me to manage albums and path between them
3. The front-end section which is the public site fetching info from the database via the API

# 1. API

The api is developed with nodeJs and express.
The core of the logic of the API is located in the controllers folder
This logic is then accessible via the routes which are consumed by the two clients.

## Spotify Controller

The spotify controller exports a module which exposes the different methods managing the fetching of data from the Spotify Api.
Every album added in the database is first fetched from spotify in order to have basic trusted and structured information.

## Neo4J Controller

Graph database was an obvious design choice for this application since the core of the logic is about creating relationship between albums and then going from one album to another.
A previous implementation of this application I have made was done with MongoDb but I had the constant feeling that the structure of a NoSQL JSON-like documents database was not fit to what I was building, even if it was not a real issue since this app is quite low scale.
Switching to Neo4j allowed me to sleep better as this is is way better data structure for my needs and also to discover this great product which is neo4J that I'm definetly going to keep using every change I have.  

Anyway, the Neo4j controller exports a module which exposes the different methods managing CRUD Operations to the database via the Neo4j api.

# 2. ADMIN

The admin website was boilerplate with create-react-app, it uses auth0 for authentification to prevent anyone but me to mess around with albums.

Basically the administration allow me to search for album from the spotify Api (via the api app of course), to add them to the database and to create relationships between them.

The admin website was built with [material-ui](https://www.material-ui.com/) which is a great way to fastly build a nice user-friendly not-so-ugly admin interface.

# 3. FRONT-END

The front-end website was boilerplate with create-react-app, it uses the three.js library to display the 3D related stuff via the great [react-three-renderer library](https://github.com/toxicFork/react-three-renderer) which allows to use three.js in react components.
