/**
 * Created by Bezsmertnyi Ievgen on 18.02.2020.
 */

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

require('./messaging/send_message_telegram')












bot.prototype.getVariables = async function() {

    let variables = {}

    //Получение строки  переменными. Переменные лежать в виде json строки
    let variables_raw = await DbModels.KwBotVariables.findOne({
        where: {
            bot_id: this.bot_id
        },
        attributes: ['id', 'json_data']
    })

    //Получение объекта с переводами
    if(variables_raw && variables_raw.json_data){
        variables_raw.json = JSON.parse(variables_raw.json_data)
    }

    //Если есть объект с переводами
    if(variables_raw && variables_raw.json){
        let j = variables_raw.json

        //Валидация имени
        const name_pattern = /^[a-z_]+$/

        //Если есть список переменных и есть объект с переводами
        if(j.translations && j.list){

            //Формирование объекта переменных, где в качестве ключа используется айди перевода
            j.list_obj = {}
            for(let el of j.list){
                if(el && el.value){
                    j.list_obj[el.value] = el
                }
            }
        }

        //Цикл по объкту переводов
        for(let lang_code in j.translations){

            //Создание объекта языка если его нет
            if(!variables[lang_code]){
                variables[lang_code] = {}
            }

            if(j.translations[lang_code]){
                //Цикл по переводам текущего языка
                for(let translation_id in j.translations[lang_code]){
                    //Получение перевода
                    let translation = j.translations[lang_code][translation_id]

                    //Если объект с переменными содержит элемент с ключом айди перевода и его имя проходит валидацию - запись переменной в объект переменных по текущему языку
                    if(j.list_obj[translation_id] && j.list_obj[translation_id].name && name_pattern.test(j.list_obj[translation_id].name)){
                        variables[lang_code][j.list_obj[translation_id].name] = translation
                    }
                }
            }
        }
    }

    //Пример свформированного объекта:
    //{ ru: { test: 'test ru val' }, uk: { test: 'test uk val' } }

    this.variables = variables

    return true

};

//Callbacks
//Обработка параметров callback`а
// пример парсера ответа телеги
bot.prototype.parseCallBackData = function() {
    let arr = this.user_request.callback.data.split('|')

    let obj = {
        node_id: 1,
        page: 2,
        slide_id: 3,
        command: 4,
        value: 5,

    }
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