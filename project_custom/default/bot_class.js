
//Файловая система
const path = require('path');
const { existsSync } = require('fs')
const appPath = path.dirname(require.main.filename);
const {app_custom_dir_path} = require(path.join(appPath , 'config/config.js'))

//Импорт моделей
var DbModels = require('../../db/models')

//базовый класс
var bot = require('./base_class')

//Предварительная инициализация и проверка входящих данных
require('./pre_init')

require('./dialog_logic')
require('./responses')
require('./workapi')
require('./buttons')
require('./botLogic/botFunctions')
require('./botAdditionalVariables')
require('./messaging/send_message_telegram')


//Callbacks
//Обработка параметров callback`а
// пример парсера ответа телеги
bot.prototype.parseCallBackData = function(callback) {
    let arr = callback.data.split('|')

    let obj = {
        message_id: arr[0],
        page: arr[1],
        slider: arr[2],
        command: arr[3],
        value: arr[4],

    }
    return obj;
}
//Callbacks

//Проверка статуса


bot.prototype.runSeeds = async function() {

    return true

};
// погрузить бота в ожидание
bot.prototype.sleep = function(ms) {

    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

};

//Export
module.exports = bot;