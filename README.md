# COVID Help Desk System

This is a system developed by a group of volunteers to help patients find hospital beds. 

This system helps in submitting, assignment and tracking of bed requests.


## Tech Components

There are 3 parts to the system that has been developed.

1. Zoho Creator based backend system
2. Webpage that helps patient / attender to submit and track the bed requests
3. Slack app that integrates the backend system with Slack channels set up for notifications


This repo has the source code for 1 and 2 above and has instructions for how to set up 3.

## Backend Application
We have developed the backend application using Zoho Creator. Before you use this application, please set up Zoho Creator account (which is free) and import this application using "Import a File" option into your workspace. 

## Webpage
This is a simple VueJS application that uses Firebase Functions and Firebase Realtime DB to store the status of bed requests that powers the track status functionality. 

VueJS is used in the trackstatus page to make API calls to firebase functions to get the status of a bed request.

## Slack App
This volunteer team used Slack as the platform to communicate between volunteers. Two dedicated Slack channels were set up to notify the volunteers of the assignment of requests. 

A Slack App was created and incoming webhooks were set up to notify the Slack channels of the requests. 

If you have any questions or are facing issues in setting up this project then you can reach out to nssundar (at) gmail (dot) com.

