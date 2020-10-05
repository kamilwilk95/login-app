const express = require('express');
const path = require('path');
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'build')));
server.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*'
    });

    next();
});

server.post('/api/login', (req, res, next) => {
    if (req.body.email === 'admin@admin.com' && req.body.password === 'pAssword123') {
        res.json({
            token: 'private_token'
        });
    } else {
        res.status(403).json({
            msg: 'Incorrect auth data'
        });
    }
})

server.get('/api/profile', (req, res) => {
    if (req.headers.token === 'private_token') {
        res.json({
            firstName: 'Kamil',
            lastName: 'Wilk',
            avatarUrl: 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'
        });
    } else {
        res.status(403).json({
            msg: 'You must be logged'
        });
    }
});

server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(process.env.PORT || 8080, () => {
    console.log('JSON Server is running')
})