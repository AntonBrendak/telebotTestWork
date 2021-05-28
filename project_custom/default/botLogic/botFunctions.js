const path = require('path');
const { existsSync } = require('fs')
const appPath = path.dirname(require.main.filename);
const {app_custom_dir_path} = require(path.join(appPath , 'config/config.js'))

//Импорт моделей
var DbModels = require('../../db/models')

//базовый класс
var bot = require('./base_class')

require('./messaging/send_message_telegram')

bot.prototype.updateClient = async function(){
    fs.writeFile(process.env.USERS_FILE || 'Users', JSON.stringify(this.clients), { overwrite: true }, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

bot.prototype.addNewClient = async function(client){
    if(!this.clients[client.id]){
        this.clients[client.id] = client;
    }
    await this.updateClient();
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

bot.prototype.sendUserMenu = async function(userid){
    let buttons = [];
    if(await this.allowUser(userid,'salesreport')){
        buttons.push(this.buttons.getDaySales);  
        if(expandsales){
            keyboard.push(this.buttons.salesDetail); 
            expandsales = false;
        }
        if(this.clients[userid].salesreportperiod){
            keyboard.push(this.buttons.inSignDaySales);  
        }else{
            keyboard.push(this.buttons.signDaySales);  
        }
        keyboard.push(this.buttons.setBroadcustTime);  
        keyboard.push(this.buttons.rate); 
    }

    
    if(!this.clients[userid].ishansa){
        if(!this.clients[userid].phone_number){
            await this.sendPhoneRequesButton();
        }else{
            keyboard.push(this.buttons.checkRights);
        }
       
        
    }
    if(keyboard.length>0){
        await this.sendMessageGenericButtons(userid,'',buttons)
    }
    
}