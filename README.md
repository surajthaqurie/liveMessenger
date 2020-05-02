## liveMessenger(ChatApp)

## Introduction
This is a code repository for the corresponding video tutorial. 

In this video, we will create a full Realtime Chat Application. We're going to use  React on the front end, with NodeJS + Socket.io web socket library on the back end. 

By the end of this video, you will have a strong understanding of how to send and receive messages using web sockets and Socket.io to make any real-time application.

Setup:
- run ```npm i && npm start``` for both client and server side to start the development server

- Heroku is used for deploy Server.
  - First install heroku cli in system and create project in heroku (similar as gi)then login to heroku run ```heroku login```.
  - Then Heroku works similar to Git commend. In push comment ``` git push heroku master```.
- Netlify is used For deploy client. For deployment on Netlify:
   - First install netlify cli in system and drag and drop the client folder in [netlify ](https://app.netlify.com/teams/surajchan68/sites) then login to heroku run ```netlify login```.
  - In client we have to give heroku deploy domain instead of Localhost.
  - Then bulid the project  run ```npm run build```.
  - Then run ```netlify deploy```. It ask for Published directory ~~~./bulid~~~ (give path of builded directory).
