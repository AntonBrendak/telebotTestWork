

var bot = require('./../base_class')

//axios
// базовые классы для работы с телеграм апи
const axios = require('axios');

bot.prototype.telegramAxiosSend = async function(url, request) {

    let res = false

    await axios.post(url, request).then((response) => {
        if (response.data) {
            if(response.data.ok){
                res = true
            }
        }

    }, (err) => {
        console.log(err.response.data);
        this.console_log(err.response.data, 'yellow');
    });

    return res
}
bot.prototype.sendMessageButtons = async function(customer_chat_id,text,buttons) {
    let url = 'https://api.telegram.org/bot' + process.env.TOKEN + '/sendMessage'

    let reply_markup = {
        "inline_keyboard": buttons
    }

    let request = {
        reply_markup: reply_markup,
        chat_id: customer_chat_id,
        text: text
    }

    try {
        await this.telegramAxiosSend(url, request)
    } catch (error) {
        console.log('send error');
    }
}

bot.prototype.sendMessage = async function(customer_chat_id,text) {
    let url = 'https://api.telegram.org/bot' + process.env.TOKEN + '/sendMessage'

   

    let request = {
        chat_id: customer_chat_id,
        text: text
    }

    try {
        await this.telegramAxiosSend(url, request)
    } catch (error) {
        console.log('send error');
    }
}

bot.prototype.sendPhoneRequesButton = async function(customer_chat_id,text) {
    let url = 'https://api.telegram.org/bot' + process.env.TOKEN + '/sendMessage'

    let reply_markup = {
        "keyboard": [
            text="Отправить номер телефона", 
            request_contact=True
        ]
    }

    let request = {
        reply_markup: reply_markup,
        chat_id: customer_chat_id,
        text: text
    }

    try {
        await this.telegramAxiosSend(url, request)
    } catch (error) {
        console.log('send error');
    }
}
// message_id for updating message instead og send new 
bot.prototype.slider(id, text, buttons, message_id) {
    if(!message_id) {
        let url = 'https://api.telegram.org/bot' + process.env.TOKEN + '/sendMessage'

        let reply_markup = {
            "inline_keyboard": buttons
        }

        let request = {
            reply_markup: reply_markup,
            chat_id: id,
            text: text
        }
        let res = false

        await axios.post(url, request).then((response) => {
            if (response.data) {
                if(response.data.ok){
                    url = 'https://api.telegram.org/bot' + process.env.TOKEN + '/editMessageText'
                    res = response.data.message.message_id
                    for(let button of buttons){
                        let callback = await this.parseCallBackData(button.callback_data)
                        callback[0] = res
                    }
                    let reply_markup = {
                        "inline_keyboard": buttons
                    }
            
                    let request = {
                        reply_markup: reply_markup,
                        chat_id: id,
                        text: text,
                        message_id: message_id
                    }
                    await axios.post(url, request).then((response) => {
                        if (response.data) {
                            res = response.data.message_id;
                        }
                    }, (err) => {
                        console.log(err.response.data);
                        this.console_log(err.response.data, 'yellow');
                    });
            
                }
            }

        }, (err) => {
            console.log(err.response.data);
            this.console_log(err.response.data, 'yellow');
        });
    } else {
        url = 'https://api.telegram.org/bot' + process.env.TOKEN + '/editMessageText'
        res = message_id;
        let reply_markup = {
            "inline_keyboard": buttons
        }

        let request = {
            reply_markup: reply_markup,
            chat_id: id,
            text: text,
            message_id: message_id
        }
        await axios.post(url, request).then((response) => {
            if (response.data) {
                res = response.data.message_id;
            }
        }, (err) => {
            console.log(err.response.data);
            this.console_log(err.response.data, 'yellow');
        });

    }

        return res;
    }
}
//Export
module.exports = bot;