FROM node:latest

WORKDIR /frontend

COPY . /frontend
COPY package.json /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
RUN npm install 
RUN npm install react-scripts

EXPOSE 3000
CMD ["npm", "start"]
