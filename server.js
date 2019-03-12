const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// reuqire bodyParser to convern incoming json to an object, otherwise, when
// you send a req from the site, you'll get a response that looks like:
/* 
<pre>TypeError: Cannot read property &#39;email&#39; of undefined
<br> &nbsp; &nbsp;at app.post (/home/jayfiled/Documents/git/smartbrain-api/server.js:34:18)
<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/home/jayfiled/Documents/git/smartbrain-api/node_modules/express/lib/router/layer.js:95:5)
 */

app.use(bodyParser.json()); //Middleware

// Remember that when nodemon restarts after a save, the variables will be reset, i.e.
// if you add more users to your "database" variable, and then make some changes, then they will be reset

const database = {
    users: [
        {
            id: 123,
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'banannas',
            entries: 0,
            joined: new Date()
        }

    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    // res.send('signin') you could use .send(), but you get some more features with
    // .json()
    if (req.body.email === 
        database.users[0].email && 
        req.body.password === 
        database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('Error logging in')
        }
})  


app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push(
        {
            id: 1235,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        })
    res.json(database.users[database.users.length -1])
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
});



/* 

API Plan

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
