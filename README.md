# Project Task Management API

## Configuration and Running Instructions

To configure and run the application, follow these steps:

1. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project and add the following configuration:

   ```plaintext
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASS=docker
   DB_NAME=db_name_example
   ```

2. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then, run:

   ```bash
   npm install
   ```

3. **Run Database Services**:
   Use Docker to start the required services:

   ```bash
   make infra
   ```

4. **Run the Application**:
   To start the application in development mode, run:

   ```bash
   make dev
   ```

5. **Access the API**:
   The application will be running on `http://localhost:3000`. You can use tools like Postman or curl to interact with the API.

## End Generation Here
