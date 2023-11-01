#!/bin/bash

MAX_RETRIES=10
RETRIES=0

# We need to be careful that this script doesn't get the result of a _previous_ deploy 
# Unfortunately it appears that there is no way to detect that Netlify's deployment for this run was successful
# So we'll just wait for 30 seconds and pray for the best 🤷
# Really the robust way to do this would be to do the deploy here and wait for that, but then we'd have two deploys and that might be messy/confusing.
# https://answers.netlify.com/t/can-netlify-deliver-deploy-event-to-github-api-after-successful-deployment/10905/11
sleep 30 

# Poll Netlify API to check if the current deploy preview is complete
while [ $RETRIES -lt $MAX_RETRIES ]; do

  echo $GITHUB_REF
  echo $NETLIFY_SITE_ID
  echo $GITHUB_REF_NAME
  echo $PR_NUMBER
  echo $BRANCH_NAME
  echo $GITHUB_BASE_REF

  
  CURL_RESULT=$(curl --location "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys" --header "Authorization: Bearer $NETLIFY_TOKEN")
  DEPLOY_ITEM=$(echo $CURL_RESULT | jq -r "[.[] | select(.review_id == $PR_NUMBER && .)] | sort_by(.created_at) | last")
  DEPLOY_STATE=$(echo $DEPLOY_ITEM | jq -r '.state')

  echo $DEPLOY_ITEM
  echo $DEPLOY_STATE

  if [ "$DEPLOY_STATE" == "ready" ]; then
    # Get the deploy URL
    DEPLOY_URL=$(echo $DEPLOY_ITEM | jq -r '.deploy_url')

    export CYPRESS_BASE_URL="$DEPLOY_URL"
    # Run Cypress tests
    yarn test:cypress:ci
    break
  elif [ "$DEPLOY_STATE" == "error" ]; then
    echo "Deploy preview failed. Aborting."
    break
  else
    echo "Waiting for the deploy preview to complete..."
    sleep 5
  fi

  RETRIES=$((RETRIES + 1))
done

if [ $RETRIES -eq $MAX_RETRIES ]; then
  echo "Exceeded maximum retry attempts. Exiting with an error code."
  exit 1
fi
