# ColorFinder

ColorFinder is an app by Eli Blaney as a final project for CSC 581 at Creighton University.

## Requirements

This app requires Node to run. If you have node installed, then you can download the project's dependencies by typing:

	npm install

## Environment

The app additionally requires Firebase and the Google Vision API. To make use of these core app features, you must obtain a Firebase API key and service account key (for authentication) and a Google Vision service account key. The Firebase API key must be added to a .env file (see .env.example), while both service account keys must be included as /src/server/serviceAccountKey.json and /vision.json, respectively.

At this point, you may run the app in development mode (provided .env contains a DEVELOPMENT key set to 1) by typing:

	npm run start:dev

## Building

To build the app to a production-ready state, type the following command:

	npm run build

## Deployment

To serve the app (port 3001 by default), first ensure that the DEVELOPMENT key in .env is set to 0. Then, type the following command:

	npm start

Then, you may navigate to http://localhost:3001/ to use the app.
