const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');


const app = express();

// require bodyParser to convert incoming json to an object, otherwise, when
// you send a req from the site, you'll get a response that looks like:
/* 
<pre>TypeError: Cannot read property &#39;email&#39; of undefined
<br> &nbsp; &nbsp;at app.post (/home/jayfiled/Documents/git/smartbrain-api/server.js:34:18)
<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/home/jayfiled/Documents/git/smartbrain-api/node_modules/express/lib/router/layer.js:95:5)
 */

app.use(bodyParser.json()); //Middleware

// Remember that when nodemon restarts after a save, the variables will be reset, i.e.
// if you add more users to your "database" variable, and then make some changes, then they will be reset
// this is why we need a database
// saves looping through our variables, and saves losing our work if the server gets restarted.

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }

    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    // res.send('signin') you could use .send(), but you get some more features with
    // .json()
    bcrypt.compare("licketysplit", '$2a$10$FmN.NKakjNV2vJAw4lusKeXsVxpagN2ibHacIDvfYlC2Ri8FGfsgC', function(err, res) {
        console.log(res);
        });
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
    // Store password (sent to server via HTTPS) as a hash in the DB
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
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

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json("User not found");
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json("user not found");
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('App is running on port 3000')
});
