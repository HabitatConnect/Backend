# Backend readme

This is a Express JS Project. 

# HabitatConnect Backend Setup

## Prerequisites

Before setting up the HabitatConnect backend, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): Ensure you have Node.js installed on your system.
- [Visual Studio Code](https://code.visualstudio.com/): You can use any code editor, but Visual Studio Code is recommended for a seamless development experience.

## Backend Setup

Follow these steps to set up the HabitatConnect backend:

1. **Create a Main Folder:**
   - Create a folder on your desktop and name it "HabitatConnect."

2. **Open Main Folder in Visual Studio Code:**
   - Open Visual Studio Code and select "File" > "Open Folder," then navigate to the "HabitatConnect" folder you created.

3. **Clone Repositories:**
   - In the Visual Studio Code terminal, clone the necessary GitHub repositories for Backend, Frontend, and Documentation using the following commands:
     ```
     git clone https://github.com/HabitatConnect/Backend.git
     git clone https://github.com/HabitatConnect/Frontend.git
     git clone https://github.com/HabitatConnect/Documentation.git
     ```

4. **Install Dependencies:**
   - Inside the "Backend" folder, open a new terminal and run the following commands to install the required dependencies:
     ```
     cd Backend
     npm init -y
     npm install express-flash passport-local bcrypt connect-mongo dotenv ejs express express-ejs-layouts express-session method-override mongoose passport passport-google-oauth20
     npm install nodemon --save-dev
     ```

5. **Create Environment Variables File:**
   - In the "Backend" folder, create a file named `.env`. You'll use this file to store environment-specific configuration settings.

6. **Environment Setup and MongoDB:**
   - Configure your `.env` file with the necessary environment variables, including your MongoDB connection string and other sensitive information.
   - Ensure you have MongoDB set up and running. You can use a local MongoDB instance or a cloud-based service like MongoDB Atlas.

7. **Start the Backend:**
   - In the "Backend" folder, start the backend server by running the following command:
     ```
     npm run start
     ```
   - Your HabitatConnect backend should now be up and running, ready to serve API requests.

## Frontend and Documentation

Don't forget to set up the [HabitatConnect Frontend](https://github.com/HabitatConnect/Frontend) and [Documentation](https://github.com/HabitatConnect/Documentation) repositories as well to complete the full setup of the HabitatConnect application.

You are now ready to develop and run the HabitatConnect application with a fully configured backend. Happy coding!
