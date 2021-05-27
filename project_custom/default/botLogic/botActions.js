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
        await bot.sendMessageRemoveKeyboard(message.chat.id, 'Спасибо!');
    }
    await this.sendUserMenu(message);
}

bot.action.getDaySales = async function(message) {
    if(allowUser(message.from.id,'salesreport')){
        await this.getSalesReport(message);
        await this.sendUserMenu(message);
    }
})

bot.action.salesDetail =  async function(message) {
    if(await this,allowUser(message.from.id,'salesreport')){
        
        await this.getDaySalesReport(message);
        /*let invoices = salesData.Invoices.map((invoice) => {return {"SerNr" : invoice.SerNr, "Name":invoice.Customer, "Sum":invoice.Sum}});
        console.log(invoices);
        invoices.forEach((Invoice) => {
            ctx.reply('/' + Invoice.SerNr + '   ' + Invoice.Name + '   ' + Invoice.Sum);
        });*/
        
        await this.sendUserMenu(message);
    }
})

bot.action.rate = async function(message) {
    if(await this.allowUser(message.from.id,'salesreport')){
        if(this.otherData['curncyRata']){
            await this.sendMessage(message.chat.id,this.otherData['curncyRata']);
        }
        await this.sendUserMenu(message);
    }
})

bot.action('⭐️ Продажи за сегодня: Отписаться', async ctx => {
    if(allowUser(ctx.message.from.id,'salesreport')){
        clients[ctx.message.from.id].salesreportperiod = false;
        updateClients();
        sendUserMenu(ctx,ctx.message.from.id)
    }
    
})
bot.hears('⭐️ Продажи за сегодня: Подписаться', async ctx => {
    if(allowUser(ctx.message.from.id,'salesreport')){
        clients[ctx.message.from.id].salesreportperiod = true;
        updateClients();
        sendUserMenu(ctx,ctx.message.from.id)
    }
    
})
bot.hears('⭐️ Проверить права',ctx => {
    console.log(ctx.message.from.id);
    if(clients[ctx.message.from.id].phone_number){
        updateSERPUsers();
    }
    sendUserMenu(ctx,ctx.message.from.id);
})

bot.hears('⌚︎Установить время рассылки',ctx => {
    sendUserMenu(ctx,ctx.message.from.id);
    if(clients[ctx.message.from.id].phone_number){
        timeresponse[ctx.message.from.id] = true;
        ctx.reply('Укажите время рассылки');
    }
})


bot.on('text',(ctx) => {
    if(timeresponse[ctx.message.from.id]){
        if(moment(ctx.message.text,'HH:mm').format('HH:mm')){
            clients[ctx.message.from.id]['reporttime'] = moment(ctx.message.text,'HH:mm').format('HH:mm');
            ctx.reply('Установлено время ' + clients[ctx.message.from.id]['reporttime']);
            updateClients();  
        }
        console.log(moment(ctx.message.data,'HH:mm').format('HH:mm'));
        //updateClients(); 
    }
    timeresponse[ctx.message.from.id] = false;
    if(!clients[ctx.message.from.id]){
        addNewCleint(ctx.message.from);
        if(!clients[ctx.message.from.id].phone_number){
            sendContactButton(ctx);
        }
    }
    
    if(clients[ctx.message.from.id].phone_number){
        sendUserMenu(ctx,ctx.message.from.id);
        if(!clients[ctx.message.from.id].chat_id){
            clients[ctx.message.from.id]['chat_id'] = ctx.chat.id;
            updateClients();
        }
    }
})