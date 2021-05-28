var bot = require('./base_class')
/* Объект коллбека, если нужно добавить что-то добавляем в конец и прописываем в bot_class
let obj = {
        message_id: arr[0],
        page: arr[1],
        slider: arr[2],
        command: arr[3],
        value: arr[4],

    }
    */

bot.buttons.getDaySales = {
    text: '🔍 Продажи за сегодня',
    callback_data: '|||getDaySales|'
}

bot.buttons.salesDetail = {
    text: 'Детализация продаж',
    callback_data: '|||salesDetail|'
}

bot.buttons.inSignDaySales = {
    text: '⭐️ Продажи за сегодня: Отписаться',
    callback_data: '|||inSignDaySales|'
}

bot.buttons.signDaySales = {
    text: '⭐️ Продажи за сегодня: Подписаться',
    callback_data: '|||signDaySales|'
}

bot.buttons.setBroadcustTime = {
    text: '⌚︎Установить время рассылки',
    callback_data: '|||setBroadcustTime|'
}

bot.buttons.rate = {
    text: '🔍 Курс',
    callback_data: '|||rate|'
}

bot.buttons.checkRights = {
    text: '⭐️ Проверить права',
    callback_data: '|||checkRights|'
}