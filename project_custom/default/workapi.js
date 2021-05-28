
var bot = require('./base_class')
const axios = require('axios');

//Импорт моделей
var DbModels = require('./../../db/models')
const http = require('http');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

bot.prototype.updateSERPUsers = async function() {
    let path = 'http://' + process.env.SERP_IP + ':' + process.env.SERP_PORT + '/WebPhoneIsUsers.hal';
    http.get(path, async (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', async () => {
        try{
            let phones = JSON.parse(data);
            Object.values(this.clients).forEach((client) =>{
                if(client.phone_number){
                    if(phones[client.phone_number]){
                        this.clients[client.id]['ishansa'] = true; 
                    }
                }
            });
            await this.updateClient();
        }catch(error){console.log(error);}
        //console.log(JSON.parse(data).explanation);
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

bot.prototype.getSalesReport = async function(message){
    console.log('getSalesReport');
    let path = 'http://' + process.env.SERP_IP + ':' + process.env.SERP_PORT + '/WebSalesReportRn.hal';
    await http.get(path, async (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
        console.log('daa');
    });

    // The whole response has been received. Print out the result.
    resp.on('end', async () => {
        await this.sendMessage(message.from.id, JSON.stringify(data))
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

bot.prototype.getDaySalesReport  = async function(ctx) {
    let path = 'http://' + process.env.SERP_IP + ':' + process.env.SERP_PORT + '/WebGetDaySales.hal';
    await http.get(path, async (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', async () => {
        //console.log(JSON.parse(data).explanation);
        this.DaySalesReport = data;
        fs.writeFile(process.env.SALES_DATA || 'Sales', JSON.stringify(this.salesData, null, 2), { overwrite: true }, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

//Export
module.exports = bot;