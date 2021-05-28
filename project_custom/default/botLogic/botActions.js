const path = require('path');
const { existsSync } = require('fs')
const appPath = path.dirname(require.main.filename);
const {app_custom_dir_path} = require(path.join(appPath , 'config/config.js'))

//Импорт моделей
var DbModels = require('../../db/models')

//базовый класс
var bot = require('./base_class')

require('./messaging/send_message_telegram')

bot.actions = {};

bot.actions.contact = async function(message) {
    if(message.contact.user_id==message.from.id){
        this.clients[message.from.id].phone_number = message.contact.phone_number;
        clients[message.from.id].chat_id = message.chat.id;
        await this.sendMessageRemoveKeyboard(message.chat.id, 'Спасибо!');
    }
    await this.sendUserMenu(message.from.id);
    await this.updateClient();
}

bot.action.getDaySales = async function(message) {
    if(allowUser(message.from.id,'salesreport')){
        await this.getSalesReport(message);
        await this.sendUserMenu(message.from.id);
    }
}

bot.action.salesDetail =  async function(message) {
    if(await this,allowUser(message.from.id,'salesreport')){
        
        await this.getDaySalesReport(message);
        /*let invoices = salesData.Invoices.map((invoice) => {return {"SerNr" : invoice.SerNr, "Name":invoice.Customer, "Sum":invoice.Sum}});
        console.log(invoices);
        invoices.forEach((Invoice) => {
            ctx.reply('/' + Invoice.SerNr + '   ' + Invoice.Name + '   ' + Invoice.Sum);
        });*/
        
        await this.sendUserMenu(message.from.id);
    }
}

bot.action.rate = async function(message) {
    if(await this.allowUser(message.from.id,'salesreport')){
        if(this.otherData['curncyRata']){
            await this.sendMessage(message.chat.id,this.otherData['curncyRata']);
        }
        await this.sendUserMenu(message.from.id);
    }
}

bot.action.inSignDaySales = async function(message) {
    if(allowUser(message.from.id,'salesreport')){
        this.clients[message.from.id].salesreportperiod = false;
        await this.sendUserMenu(message.from.id);
        await this.updateClient();
    }
    
}

bot.action.signDaySales = async function(message) {
    if(this.allowUser(message.from.id,'salesreport')){
        this.clients[ctx.message.from.id].salesreportperiod = true;
        sendUserMenu(message.from.id)
        await this.updateClient();
    }
    
}

bot.action.checkRights = async function(message){
    if(clients[message.from.id].phone_number){
        await this.updateSERPUsers();
    }
    await this.sendUserMenu(message.from.id);
}

bot.action.setBroadcustTime = async function(message) {
    await this.sendUserMenu(message.from.id);
    if(clients[message.from.id].phone_number){
        this.timeresponse[message.from.id] = true;
        await this.sendMessage(message.chat.id, 'Укажите время рассылки');
    }
}


bot.action.changeBroadcustTime = async function(message) {
    if(this.timeresponse[message.from.id]){
        if(moment(message.text,'HH:mm').format('HH:mm')){
            this.clients[ctx.message.from.id]['reporttime'] = moment(message.text,'HH:mm').format('HH:mm');
            await this.sendMessage(message.chat.id, 'Установлено время ' + clients[ctx.message.from.id]['reporttime']);  
        } else {
            await this.sendMessage('Неправильный формат времени, необходимо указать HH:MM \n где HH - часы, MM - минуты'); 
            await this.sendUserMenu(message.from.id);
            return;
        }
    }
    this.timeresponse[message.from.id] = false;
    if(!this.clients[message.from.id]){
        await this.addNewClient(message.from);
        if(!this.clients[message.from.id].phone_number){
            await this.sendPhoneRequesButton(message.from.id,'Укажите свой телефон для авторизации!');
        }
    }
    
    if(clients[ctx.message.from.id].phone_number){
        await this.sendUserMenu(message.from.id);
        if(!this.clients[message.from.id].chat_id){
            this.clients[message.from.id]['chat_id'] = message.from.id;
        }
    }
    await this.updateClient();
}