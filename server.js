const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('This is working! ')
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
});


// API Plan

/* 

legend:

endpoint --> via this type of request = respond with

/ --> res = this is working
/signin --> POST = success / fail
/register --> POST = user object
/profile/:userId --> GET = user

// We want to work with a ranking; when someone submits a new photo
// their ranking will go up, and a variable as a counter that goes up,
// and checks against other users score to give them a rank.

/image --> PUT = user


*/
