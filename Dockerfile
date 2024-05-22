# Choose the Node.js version
FROM node:22

# Update packages and install curl and procps (ps and top)
RUN apt-get update && apt-get -y install curl procps

# Set the working directory
WORKDIR /workspace

# Add the "node_modules/.bin" to $PATH
ENV PATH /workspace/node_modules/.bin:$PATH

# Install your project's dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . ./