FROM node:20 as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN npm install --force
#RUN npm install react-scripts@3.4.1 -g --silent 
COPY . /usr/src/app
#RUN CI=true npm test
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
