# Evernote clone

[Evernote clone app](https://evernote-e077e.web.app/)

![Demo](/demo.gif)

## Overview

This is a clone of Evernote with some features, including:

- Authentication
- Create new note, edit note
- Create new notebook, add or remove a note from notebook
- Add a note to shortcut and remove note from shortcut
- Move a note or notebook (including all notes in it) to trash
- Permanently delete a note or notebook

## Technologies used

Here are the primary technologies used in this project (in no particular order)

- React: for the UI
- TypeScript: for type-safe
- Material-UI: for styling
- Redux: state management library
- Firebase: database, authentication and hosting
- react-route: handling routing

## How to start

[How to deploy a React app to Firebase Hosting](https://www.youtube.com/watch?v=gMZaKtTPFqs)

- Install Firebase CLI

  ```bash
  npm install -g firebase-tools
  ```

- Sign in to your Firebase account

  ```bash
  firebase login
  ```

- Make sure you have a project already created on Firebase

- Initiate the project

  ```bash
  firebase init
  ```

  Make sure to select hosting option and maybe emulator for local development. For hosting setup, make sure to choose the `build` directory since it's the place where our project will be compiled into

- Build the project

  ```bash
  npm run build
  ```

- Deploy it

  ```bash
  firebase deploy
  ```
