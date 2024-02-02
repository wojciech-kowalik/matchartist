FROM node:4.2

RUN mkdir -p /app  
WORKDIR /app

# Copy package.json separately so it's recreated when package.json
# changes.
ADD package.json ./package.json  
RUN npm -q install  
ADD . /app  
RUN npm -q install -g phantomjs bower ember-cli@2.6 ;\  
    bower --allow-root install

EXPOSE 4200  
EXPOSE 49152

CMD [ "ember", "server" ]
