const jsonServer = require('json-server')
const server = jsonServer.create();

const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*'
    });

    next();
});

server.post('/api/login', (req, res, next) => {
    if (req.body.email === 'admin@admin.com' && req.body.password === 'pAssword123') {
        res.jsonp({
            token: 'private_token'
        }).send();
    } else {
        res.status(403).jsonp({
            msg: 'Incorrect auth data'
        });
    }
})

server.get('/api/profile', (req, res) => {
    if (req.headers.token === 'private_token') {
        res.jsonp({
            firstName: 'Kamil',
            lastName: 'Wilk',
            avatarUrl: 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'
        });
    } else {
        res.status(403).jsonp({
            msg: 'You must be logged'
        });
    }
});

server.use(middlewares)
server.listen(8080, () => {
    console.log('JSON Server is running')
})