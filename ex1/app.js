var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')


// entregas é o nome da database
var db_name = 'eurovisao'
var mongoDB = `mongodb://localhost:27017/${db_name}`
mongoose.connect(mongoDB)
var connection = mongoose.connection
connection.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB'))
connection.once('open', () => console.log('Conexão ao MongoDB realizada com sucesso'))


// routers
var edicaoRouter = require('./routes/edicao');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', edicaoRouter);

module.exports = app;
