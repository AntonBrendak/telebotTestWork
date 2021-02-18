
var bot = require('./base_class')

bot.prototype.createResponse = function(status = '', message = '', data = {}) {
    //status - success|error

    let obj = {
        status: status,
        message: message,
        data: data
    }

    return obj

};

bot.prototype.createErrorResponse = function(message = '', data = {}) {

    let obj = this.createResponse('error', message, data)

    return obj

};

bot.prototype.createSuccessResponse = function(message = '', data = {}) {

    let obj = this.createResponse('success', message, data)

    return obj

};

//Export
module.exports = bot;