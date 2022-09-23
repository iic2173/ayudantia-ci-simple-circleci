###########
# BUILDER #
###########

FROM node:18.9.0-alpine3.16 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Command to run to build the app
CMD [ "npm", "run", "build"]


#########
# FINAL #
#########

FROM node:18.9.0-alpine3.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/dist ./dist

# Command to run when the container is ready
CMD [ "npm", "run", "start"]