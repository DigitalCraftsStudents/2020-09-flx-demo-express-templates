const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const data = require('./data')

const PORT = 3000;

const app = express();
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/friends', (req, res) => {
  res.render('friends', {
    locals: {
      title: 'Super Friends',
      friends: data
    }
  });
})

app.get('/friend/:handle', (req, res) => {
  // res.send(req.params.handle);
  const friendData = data.find((friend) => {
    if (friend.handle === req.params.handle) {
      return true;
    } else {
      return false;
    }
  })

  if (!friendData) {
    res.status(404).send(`Could not find friend ${req.params.handle}`);
  }

  res.render('profile', {
    locals: {
      friend: friendData
    }
  });
})


app.listen(PORT, () => {
  console.log(`Address Book App listening at http://localhost:${PORT}`);
})