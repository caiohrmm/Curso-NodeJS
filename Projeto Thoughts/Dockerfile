# Primeira coisa -> Colocar de onde vem a imagem
FROM node
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]