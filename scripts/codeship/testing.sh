# ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha tests.js

# This is now running Coveralls.
./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha tests/tests.js \
--report lcovonly -- -R spec && cat ./coverage/lcov.info | \
./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage
