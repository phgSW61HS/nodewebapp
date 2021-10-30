## ejs

## dockerization

usually, for our rest api, the docker file looks like this:

```
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY * ./

RUN npm install

EXPOSE 8084
CMD [ "npm", "start" ]
```

Basically we only have to copy the files in our local dir to the working dir /usr/src/app.

With the folder structure of our web app, we add to change the dockerfile to copy not only files but create subdirectories:

```
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY app/ /usr/src/app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
```

The wild card did not work, and we had to give an absolute path for our container. We also had to move the dockerfile to make sure it was at the same level as the app directory.
