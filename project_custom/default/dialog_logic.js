
var bot = require('./base_class')
const axios = require('axios');
const moment = require('moment')
//Импорт моделей
var DbModels = require('./../../db/models')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

bot.prototype.getDataFromMessengerHost = async function(req = null) {
    //req - запрос от сервера
    if(req.message) {
        let text = req.message.text
        let user_id = req.message.chat.id
        let name = req.message.from.first_name
        if(text === '/start') {
            await this.sendUserMenu(user_id);
        }
    }
    if(req.callback_query) {
        let id = req.callback_query.from.id
        let reply = req.callback_query.data;
        let call_back = await this.parseCallBackData(reply);
        if(call_back.command) {
            await this.action[call_back.command](callback_query);
        }
    }
};

module.exports = bot;