FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

COPY . .

FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD ["npm", "start"]
