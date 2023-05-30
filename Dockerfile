FROM node:16.15.0

# Create app directory
WORKDIR /Users/altankhuusukhbaatar/Desktop/saback

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3040
CMD [ "node", "lib/index.js" ]