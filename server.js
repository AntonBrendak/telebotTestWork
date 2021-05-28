

//nodemon server.js - запуск сервера в режиме демона

require('dotenv').config()

var express = require('express');


//cors
var cors = require('cors')


var bot = require('./project_custom/default/base_class')
var bot_functions = require('./project_custom/default/bot_class')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Импорт sequelize
var sequelize = require('./db/connect')

//Импорт моделей
var DbModels = require('./db/models')



//Синхронизация с БД при старте

/* sequelize.sync().then(result => {
        //console.log(result);
}).catch(err => console.log(err)); */

var app = express();

//CORS-enabled for all requests
app.use(cors({credentials: true, origin: [process.env.LOCALHOST, process.env.CONSTRUCTOR_ORIGIN]}))

//middleware для обработки запросов
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());


//Сервер
app.listen(process.env.PRODUCTION_PORT, function () {
    console.log('Bot server started - ' + process.env.PRODUCTION_PORT);
});

const MessengersHostRoutes = require('./routes/messengers_host');
app.use('/messengers_host', MessengersHostRoutes);
var bt = new bot();
let server_url = process.env.SERVER_ADDRESS + '/messengers_host/telegram/hooks'
bt.setTelegramHook(server_url,process.env.TOKEN);
module.exports = app