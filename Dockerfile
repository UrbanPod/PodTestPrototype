FROM debian

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y sudo && \
    sudo apt-get install -y git build-essential python curl postgresql postgresql-contrib && \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash

ADD . /PodTestPrototype
WORKDIR /PodTestPrototype

RUN . /root/.bashrc && \
    nvm install stable && \
    nvm use stable && \
    npm install -g node-gyp && \
    npm install -g forever

RUN . /root/.bashrc && \
    nvm use stable && \
    npm install && \
    touch .env && echo "PORT=8000" >> .env && \
                  echo "PG_DB=podbase" >> .env && \
                  echo "PG_USER=admin" >> .env && \
                  echo "PG_PASSWORD=password" >> .env && \
    sudo service postgresql start && \
    sudo -u postgres createuser -s admin && \
    sudo -u postgres createdb -O admin podbase && \
    sudo -u postgres psql -c "ALTER USER admin WITH PASSWORD 'password';" && \
    node_modules/.bin/gulp build

CMD ["/pod/scripts/start.sh"]
