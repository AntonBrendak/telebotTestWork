

var bot = require('./base_class')
const fs  = require('fs');
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

    try{
        console.log(process.env.USERS_FILE)
        fs.readFile(process.env.USERS_FILE || 'Users', (err, content) => {
            if (err) return console.log('Error loading clientsfile:', err);
            if(content.length>0){
                    this.clients = JSON.parse(content);
            }
        });
    }catch(error){
        console.log(error)
    }
    
    try{
        fs.readFile(process.env.OTHER_DATA || 'Other', (err, content) => {
            if (err) return console.log('Error loading other data:', err);
            if(content.length>0){
                otherData = JSON.parse(content);
            };
        });
    } catch(error){
        console.log(error)
    }
    
    try{
        fs.readFile(process.env.SALES_DATA || 'Sales', (err, content) => {
            if (err) return console.log('Error loading other data:', err);
            if(content.length>0){
                salesData = JSON.parse(content);
            }
                
        });
    }catch(error){
        console.log(error)
    }

   

    //Получение пользовательских данных
    await this.getDataFromMessengerHost(req.body);

   
   

    return res

};



//Export
module.exports = bot;