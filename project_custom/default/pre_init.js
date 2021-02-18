/**
 * Created by Bezsmertnyi Ievgen on 18.02.2020.
 */

var bot = require('./base_class')

//Импорт моделей
var DbModels = require('./../../db/models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const axios = require('axios');

//Метод возвращает результат проверки входящих данных и инициализации параметров. Результатом является ок или не ок и сообщение
bot.prototype.botPreInit = async function(req) {

    //результат по умолчанию
    let res = {
        'status': 'success',
        'message': null
    }

  

   

    //Получение пользовательских данных
    await this.getDataFromMessengerHost(req.body);

   
   

    return res

};



//Export
module.exports = bot;