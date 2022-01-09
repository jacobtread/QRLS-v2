#!/usr/bin/fish

set ME_CONFIG_MONGODB_ADMINUSERNAME root
set ME_CONFIG_MONGODB_ADMINPASSWORD test
set DATABASE_URL mongodb://root:test@localhost:27017/
yarn && yarn start