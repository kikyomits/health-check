
#!/bin/bash

# Get directory path
SCRIPT_DIR=$(cd $(dirname $0); pwd)
# Get pearent directory, which is root.
PARENT_DIR=$(dirname  ${SCRIPT_DIR})

# Create project
oc create namespace build

# Switch to build project
oc project build

# create build config
oc create -f build.yml

# Start build. input is root directory
# Will run 'docker build' with the Dockerfile at root directory as defined in build config.
oc start-build health-check  --from-dir=${PARENT_DIR} --follow

# Create deploy conifg
oc create -f deploy.yml

# Automati deployment will run
oc tag build/health-check:latest health-check:1.0.0 -n build
