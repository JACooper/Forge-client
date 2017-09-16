Forge client
============

Client repository for Forge, a task tracking app that helps you prioritize on the things you can do right now. Most solutions, be they simple todo lists or complex kanban workflows, operate under the principle of the user conforming to the application model. Forge takes a different approach: tasks are assigned difficulties in three categories (time, effort, and focus), and are presented to the user based on what they specify they're prepared to tackle at that point in their day.


Stack
-----

The Forge client is built using React, Redux, Superagent (for GET and POST requests), and Webpack. Familiarity with React and Redux is strongly recommended to make sense of and edits to the source, as is familiarity with ES6 syntax (classes, arrow functions, and decorators, specifically).


Building
--------

Make sure you have [Node](https://nodejs.org) installed. To start, navigate to the project directory and run

```
npm install
npm run webpack
```

This will compile the source into a bundle and output it to the build directly, as specified in webpack.config.js. Copy this bundle to the hosted directory in the Forge server to use. The specifics of the webpack configuration may be altered as needed, so long as the name of the output file matches with what the server expects (app-bundle.js by default).

To recompile after making changes, run ```npm run webpack``` again. Letting webpack watch files and automatically recompile on save is recommended. To do this, run

```npm run webpacklive```


License
-------

Forge is under the MIT License. Details can be found in the repo.