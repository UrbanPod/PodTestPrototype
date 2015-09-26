#!/bin/bash
. /root/.bashrc
nvm use stable
forever start -l /indikit/out.log /pod/app.js
forever logs 0 -f
