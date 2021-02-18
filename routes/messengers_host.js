/**
 * Хост для мессенджеров
 * @module messengers_host
 */

var express = require('express');
var router = express.Router();

//Настройка middleware
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

var bot = require('../project_custom/default/base_class')

router.get('messengers_host/telegram/hooks', async function (req, res) {

    // Your verify token. Should be a random string.
   
    res.status(200).send(challenge);

    


});


router.post('/telegram/hooks', async function (req, res) {

    console.clear();
    console.log('start');
    console.log('start_time:',Date.now());
    // console.log(JSON.stringify(req.body, null, 5));

    let bt = new bot()

    //инициализация и проверка входящих данных
    let pre_init_res = await bt.botPreInit(req)
    if(pre_init_res.status === 'error'){
        console.log('botPreInit error');
        return res.send(bt.createSuccessResponse());
        //return res.send(kw.createErrorResponse(pre_init_res.message));
    }

    //асинхронный запуск бота и возврат ответа не дожидаясь обработки
    //ответ
    return res.send(bt.createSuccessResponse());

});

module.exports = router;