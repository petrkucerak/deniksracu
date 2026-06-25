FROM node:20-alpine

RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
USER root
RUN chown -R app:app /app
USER app
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]