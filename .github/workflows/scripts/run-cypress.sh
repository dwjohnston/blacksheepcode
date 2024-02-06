#!/bin/bash

set -e 
output=$(node .github/workflows/scripts/wait-for-netlify-deploy.js 2>&1)
echo $output
exit_code=$?

# Check if the process exited with a non-zero status
if [ $exit_code -ne 0 ]; then
    echo "The process exited with a non-zero status: $exit_code"
    exit $exit_code
fi

deploy_url=$(echo "$output" | grep -o 'Deploy URL: https://[^ ]*' | awk '{print $3}')
echo "Deploy URL is: $deploy_url"
CYPRESS_BASE_URL=$deploy_url yarn test:cypress:ci
