#!/usr/bin/env bash

rm -rf node_modules/cerebral
ln -s ../cerebral/packages/cerebral node_modules

rm -rf node_modules/cerebral-provider-firebase
ln -s ../cerebral/packages/cerebral-provider-firebase node_modules

rm -rf node_modules/cerebral-router
ln -s ../cerebral/packages/cerebral-router node_modules
