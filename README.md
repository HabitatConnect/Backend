# Habitat Connect - Backend Environment

This repository contains the backend code of Habitat Connect, a project developed for our Software Engineering (CSE4006) class at Hanyang University. It is a web application built using Node.js runtime and Express framework. We have used MongoDB Atlas and have defined the models using Mongoose.

# Getting started

The following instructions will help you set up Habitat Connect on your local machine.

## Prerequisites

Before setting up Habitat Connect, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): ensure you have Node.js installed on your system
- [Visual Studio Code](https://code.visualstudio.com/): you can use any code editor, but Visual Studio Code is recommended for a seamless development experience

## Setup

We will create a folder containing three repositories: Backend (server), Frontend, and Documentation. If you don't wish to clone every feature of Habitat Connect, feel free to skip the corresponding steps.

1. **Create a main folder:**
   - Create a folder on your desktop and name it Habitat Connect

2. **Open main folder in Visual Studio Code:**
   - Open Visual Studio Code (or the code editor of you preference) and select "File" > "Open Folder" > "Habitat Connect"

3. **Clone repositories:**
   - In the Visual Studio Code terminal, clone our GitHub repositories for [Backend](https://github.com/HabitatConnect/Backend), [Frontend](https://github.com/HabitatConnect/Frontend), and [Documentation](https://github.com/HabitatConnect/Documentation) using the following commands:
     ```
     git clone https://github.com/HabitatConnect/Backend.git
     git clone https://github.com/HabitatConnect/Frontend.git
     git clone https://github.com/HabitatConnect/Documentation.git
     ```
   - Again, if you don't wish to clone every repository, skip the corresponding commands.
4. **Install dependencies:**
   - Inside the Backend folder, open a new terminal and run the following commands to install the required dependencies:
     ```
     npm init -y
     npm install connect-mongo dotenv ejs express express-ejs-layouts express-session method-override mongoose passport passport-google-oauth20 express-flash passport-local bcrypt
     npm install nodemon --save-dev
     ```
5. **Create .env:**
   - In the Backend folder, create a file named `.env`. You will use this file to store environment specific configuration settings.

6. **.env and MongoDB Atlas Setup:**
   - The `.env` file contains the necessary environment variables for the server, including the MongoDB connection string and other sensitive information. For security reasons, this file is included in the `.gitignore` file.
     ##### MONGODB_URI
      - For a full tutorial, access the [following page](https://www.mongodb.com/docs/atlas/getting-started/). If you are familiar with MongoDB Atlas, you will need to create a project and a user instance (with read and write priviledges). You will need to connect the cluster to Visual Studio Code. So, click on the connect button and MongoDB will generate the connection string. Copy this string in your `.env` file.
     ##### GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET
      - Follow [these](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) steps to generate the necessary strings. Once generated, copy them in your `.env` file.
     ##### GOOGLE_REGISTER_CALLBACK_URL & GOOGLE_LOGIN_CALLBACK_URL
     If Habitat Connect is running in port 5000, you can use the following. If not, make sure to change the port in the URL string
     ```
      GOOGLE_REGISTER_CALLBACK_URL=http://localhost:5000/google/callback/register
      GOOGLE_LOGIN_CALLBACK_URL=http://localhost:5000/google/callback/login
     ```
7. **Start running the server:**
   - Be sure to run the server inside the Backend folder:
     ```
     cd .\Backend\
     ```
   - To start Habitat Connect on you local machine, running the following command:
     ```
     npm start
     ```
8. Congrats! HabitatConnect should now be up and running.

# Backend Architecture
![image](https://github.com/HabitatConnect/Backend/assets/124285890/069e4168-1a1a-4131-bf4e-6407d352f5e8)

# Frontend and Documentation

Don't forget to check out the HabitatConnect [Frontend](https://github.com/HabitatConnect/Frontend) and [Documentation](https://github.com/HabitatConnect/Documentation) repositories!
