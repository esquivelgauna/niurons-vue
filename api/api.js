require('./application/config/config');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketioJwt = require("socketio-jwt");
var path = require('path');
var morgan = require('morgan');
var API_Routes = require('./application/config/API_Routes');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Middle

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(morgan('dev')); 
app.use((req, res, next) => {
	console.log( req.headers.authorization );
    res.append('Access-Control-Allow-Origin', ['http://localhost:8081']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

io.use(socketioJwt.authorize({
	secret: process.env.jwt_secret,
	handshake: true
}));

var Chats = require('./application/class/Chats').Chats;
var chat = new Chats(); 
chat.io = io;

io.sockets.on('connection', (socket) => {
	console.log('Usuario:', socket.decoded_token.data.nombre);
	require('./application/controllers/chat')(socket, io , chat);
	require('./application/controllers/socket_notifications')(socket, io );
	require('./application/controllers/socket_sales')(socket, io );
	require('./application/controllers/purchases')(socket, io, chat ); 

});

//Public 
// console.log( path.join(__dirname, '../dist/static') );
app.use('/static', express.static(path.join(__dirname, '../dist/static')));

app.use('/assets', express.static(path.join(__dirname, '../src/assets')));



app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'ejs');
//Routes
app.get('/', function (req, res) {
	let mipa = path.join( __dirname,'../dist/index.html');
	console.log(mipa);
	res.sendFile(mipa);
  });
  
app.use('/api', API_Routes);

server.listen(process.env.api_port, function (err) {
	if (err) return console.log(err);
	console.log("Servidor corriendo en http://localhost:"+ process.env.api_port);
});
