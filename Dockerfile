# Step 1: Use a Node.js base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /src/app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Remove node_modules folder
RUN rm -rf node_modules/

# Step 5: Install dependencies
RUN yarn install

# Step 6: Copy the entire project into the container
COPY . .

# Step 7: Build the React application
RUN yarn build

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Define the command to run your app
CMD [ "yarn", "start"]