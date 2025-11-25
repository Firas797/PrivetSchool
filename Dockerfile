FROM node:20

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Remove bcrypt completely and install bcryptjs
RUN npm uninstall bcrypt --save && \
    npm install bcryptjs --save && \
    rm -rf node_modules && \
    npm cache clean --force && \
    npm install --production

# Copy source code
COPY . .

# Remove any remaining bcrypt files
RUN find . -name "*bcrypt*" -type f -delete || true

EXPOSE 80

CMD ["npm", "start"]
