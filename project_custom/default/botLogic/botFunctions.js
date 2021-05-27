const path = require('path');
const { existsSync } = require('fs')
const appPath = path.dirname(require.main.filename);
const {app_custom_dir_path} = require(path.join(appPath , 'config/config.js'))

//Импорт моделей
var DbModels = require('../../db/models')

//базовый класс
var bot = require('./base_class')

require('./messaging/send_message_telegram')



bot.prototype.addNewClient = async function(client){
    if(!this.clients[client.id]){
        this.clients[client.id] = client;
    }
}

bot.prototype.allowUser = async function(userid,usercanaction){
    if(this.clients[userid]){
        if(this.clients[userid][usercanaction]){
            return true;
        }
    }
    if(this.clients[userid].ishansa){
        return true; 
    }
}

bot.prototype.sendUserMenu = async function(ctx,userid){
    let keyboard = [];
    if(await this.allowUser(userid,'salesreport')){
        keyboard.push(['🔍 Продажи за сегодня']);  
        if(expandsales){
            keyboard.push(['Детализация продаж']); 
            expandsales = false;
        }
        if(this.clients[userid].salesreportperiod){
            keyboard.push(['⭐️ Продажи за сегодня: Отписаться']);  
        }else{
            keyboard.push(['⭐️ Продажи за сегодня: Подписаться']);  
        }
        keyboard.push(['⌚︎Установить время рассылки']);  
        keyboard.push(['🔍 Курс']); 
    }

    
    if(!this.clients[userid].ishansa){
        if(!this.clients[userid].phone_number){
            await this.sendPhoneRequesButton();
        }else{
            keyboard.push(['⭐️ Проверить права']);
        }
       
        
    }
    console.log('keyboard' + keyboard);
    if(keyboard.length>0){
        await ctx.reply('Выберите действие', Markup
            .keyboard(keyboard)
            .resize()
            .oneTime()
        )
    }

    
}