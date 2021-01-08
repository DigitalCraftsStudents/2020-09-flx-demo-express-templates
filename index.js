const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const data = require('./data')
const logger = require('./middleware/logger')
const bodyParser = require('body-parser');

const PORT = 3000;

// set up express server
const app = express();

// set up template engine
  // register the es6renderer engine with html files
app.engine('html', es6Renderer);
  // set the 'views' setting to look for the 'views' folder
app.set('views', 'views');
  // set the view engine to use the newly registered 'html' engine
app.set('view engine', 'html');

app.use(logger);
app.use(express.static('./public'));
// app.use('/friends', passwordCheck);
app.use(bodyParser.urlencoded({ extended: true }))

/** Routes **/
// Home page
app.get('/', (req, res) => {
  // render the views/home.html template
  res.render('home');
})

// GET /friends
app.get('/friends', (req, res) => {
  // render the views/friends.html template with extra data
  res.render('friends', {
    locals: {
      title: 'Super Friends', // title of the page
      friends: data // data from the import (top of file)
    }
  });
})

// GET /friend/@thecaptain
app.get('/friend/:handle', (req, res) => {
  // find the friend we are looking for in the data
  const friendData = data.find((friend) => {
    // if the current friend's "handle" is the same as the one in the url
    if (friend.handle === req.params.handle) {
      // return true (and store the current friend in the 'friendData' variable)
      return true;
    } else {
      // otherwise, keep looking
      return false;
    }
  })

  // if we were unable to find the correct friend
  if (!friendData) {
    // send a 404 with a message
    res.status(404).send(`Could not find friend ${req.params.handle}`);
    // return, so we don't also try to render the template
    return;
  }

  // render the 'views/profile.html' template
  res.render('profile', {
    locals: {
      friend: friendData // this is the data we found using the handle
    }
  });
})

// GET /newfriend
app.get('/newfriend', (req, res) => {
  // show the new friend page
  res.render('newFriend');
})

// POST /newfriend
app.post('/newfriend', (req, res) => {
  // confirm that the request body has all the info we need
  if (!req.body.name || !req.body.handle || !req.body.description) {
    // if it doesn't, send back an error message
    res.status(400).send('Please fill in all required fields');
  }
  // add the new data to our data array
  data.push({
    name: req.body.name,
    handle: '@' + req.body.handle,
    description: req.body.description
  })
  // redirect to the main friends list
  res.redirect('/friends');
})

// start the server
app.listen(PORT, () => {
  console.log(`Address Book App listening at http://localhost:${PORT}`);
})