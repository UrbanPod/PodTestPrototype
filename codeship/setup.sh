# By default we use the Node.js version set in your package.json or 0.10.25
# You can use nvm to install any Node.js version.
# i.e.: nvm install 0.10.25
# npm cache clean -f
# npm install npm -g
# npm install -g n
rm -rf node_modules
npm install
node_modules/bower/bin/bower install
