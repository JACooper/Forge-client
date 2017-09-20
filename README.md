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

This will compile the source - provided it passes ESlint tests - into a bundle and output it to the build directly, as specified in webpack.config.js. Copy this bundle to the hosted directory of Forge server to use. The specifics of the webpack configuration may be altered as needed, so long as the name of the output file matches with what the server expects (app-bundle.js by default).

Additionally, this command watches files and automatically recompiles when it detects changes. To run this same process for production, run

```
npm run webpack-prod
```

This will compile and minify the source. To compile and test locally (of limited use unless you mock or remove logins), run

```
npm start
```

to start webpack dev server (reachable on localhost:8080, as specified in webpack.config.js). Lastly, if you wish to run ESlint _without_ running webpack (helpful if you want to isolate linter error output from build error output), run

```
npm run test
```


License
-------

Forge is under the MIT License. Details can be found in the repo.