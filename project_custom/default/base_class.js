
const axios = require('axios');
const qs = require('querystring')
//Класс
function bot() {
    this.chat_id = null
    this.chat_user_id = null

    this.state = {}             //состояние
    this.dialog = {}            //объект диалога


    this.system = {
        request_body: null,         //тело входящего запроса
        send_message: {},           //буфер для отправки сообщений
        message_sent_time: null,   //время последнего отправленного сообщения. Нужно для выдержки времени между отправкой сообщений
        message_time_pause: 1000,   //время задержки между отправкой сообщений в мс
    }

    this.token_data = {}            //объект токена для авторизации
    this.console_log = async function(text, color = null) {

        let show = true
        if(show) {
            let color_code = "\x1b[0m"   //default
    
            //ANSI_escape_code
            switch (color) {
                case 'blue':
                    color_code = '\x1b[34m'
                    break
                case 'green':
                    color_code = '\x1b[42m\x1b[30m'
                    break
                case 'yellow':
                    color_code = '\x1b[33m'
                    break
            }
    
            if(!color){
                console.log(text);
            }else {
                // %s\x1b[0m - вторая приставка сбрасывает цвет к изначальному после текущего вывода
                console.log(color_code + '%s\x1b[0m', '***' + text + '***');
            }
        }
    };
    // установка хука ответов телеграм
    this.setTelegramHook = async function(server_url, token) {

        let url = 'https://api.telegram.org/bot'+ token +'/setWebhook'
        let request = {
            url: server_url
        }
    
        const params = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        let request_str = qs.stringify(request)
        let success = false
        await axios.post(url, request_str, params).then((response) => {
            if (response.data && response.data.ok === true) {
                success = true
            }
        }, (err) => {
            this.console_log(err, 'yellow');
        });
        await axios.post('https://api.telegram.org/bot'+ token +'/getWebhookInfo', request, params).then((response) => {
            if (response.data && response.data.ok === true) {
                success = true
            }
        }, (err) => {
            this.console_log(err, 'yellow');
        });
    
        return success
    };
}

//Export
module.exports = bot;