# # Dockerfile สำหรับเซิร์ฟเวอร์
# FROM node:16-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# EXPOSE 5000

# CMD ["npm", "run", "dev"]  # รันเซิร์ฟเวอร์ด้วยคำสั่ง npm run dev

FROM oven/bun
RUN apt-get update && apt-get install -y iputils-ping
WORKDIR /usr/src/app
# Copy the package.json, bun.lockb, and other source code files
COPY package*.json ./
COPY . .
# Set the environment to production
ENV NODE_ENV=production
# Install dependencies using bun
RUN bun install --save-dev

COPY . .

EXPOSE 5001

CMD ["bun", "run", "start"]



