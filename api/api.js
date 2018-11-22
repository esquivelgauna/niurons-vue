
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
    res.append('Access-Control-Allow-Origin', ['http://localhost:8081']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

io.use(socketioJwt.authorize({
	secret: 'NvTfMrR',
	handshake: true
}));
require('./application/config/config');
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
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'ejs');
//Routes
app.get('/', function (req, res) {
	let mipa = path.join( __dirname,'../index.html');
	console.log(mipa);
	res.sendFile(mipa);
  });
  
app.use('/api', API_Routes);
//require('./application/config/API_Routes')(app);

server.listen(process.env.api_port, function (err) {
	if (err) return console.log(err);
	console.log("Servidor corriendo en http://localhost:"+ process.env.api_port);
});
