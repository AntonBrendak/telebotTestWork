
var bot = require('./base_class')
const axios = require('axios');
const moment = require('moment')
//Импорт моделей
var DbModels = require('./../../db/models')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

bot.prototype.getDataFromMessengerHost = async function(req = null) {
    //req - запрос от сервера
    if(req.message) {
        let text = req.message.text
        let user_id = req.message.chat.id
        let name = req.message.from.first_name
        if(text==='/start' || 'матчи') {
           await this.sendMatchInfo(text, user_id, name)
        }
    }
    if(req.callback_query) {
        let id = req.callback_query.from.id
        let reply = req.callback_query.data;
        let answerArray = reply.split('|')
        if(answerArray[1]==='result') {
            await this.viewVoteInfo(id,answerArray)
        } else {
            await this.vote(answerArray,id)
        }
    }
};

bot.prototype.sendMatchInfo = async function(text, user_id, name) {
    let matches = await this.getMatches();
    await this.sendMessage(user_id,'Привет ' + name + ' для просмотра нового списка напиши - матчи')
    for(let match of matches){
        let Match = await DbModels.Matches.findOne({
            where:{
                date:match.startedAt,
                player1:match.opponent.name,
                player2:match.player.name
            },
            attributes:['id']
        })
        if(!Match) {
            Match = await DbModels.Matches.create({
                date:match.startedAt,
                player1:match.opponent.name,
                player2:match.player.name
            })
        }
        let keyboard =[
            [{
                    "text": "голосовать за " + match.opponent.name,
                    "callback_data": Match.id + '|1'
                },
                {
                    "text": "голосовать за " + match.player.name,
                    "callback_data": Match.id + '|2'
                },
                {
                    "text": "посмотреть результат",
                    "callback_data": Match.id + '|result'
                }
            ],
        ]
        let data = moment(match.startedAt).format('DD/MM/YY kk:mm');
        let text_to_send = data + '\n' 
        + ' Событие ' + match.tournamentName + '\n' 
        + match.opponent.name + ' VS ' +  match.player.name + '\n' 
        + ' status:' + match.status;
        await this.sendMatches(user_id,text_to_send,keyboard)
    }
}

bot.prototype.vote = async function(answerArray,id) {
    let Match = await DbModels.Matches.findOne({
        where:{
            id:answerArray[0]
        }
    })
    let voters
    if(Match.voters) voters = JSON.parse(Match.voters);
    else voters = {};
    if(!voters || !voters[id]) {
        voters[`${id}`] = true;
        Match.voters = JSON.stringify(voters);
        if(answerArray[1]==='1') Match.voute1 = Match.voute1 + 1
        else Match.voute2 = Match.voute2 + 1
        await DbModels.Matches.update(Match.dataValues,{
            where:{
                id:answerArray[0]
            }
        })
    }
}

bot.prototype.viewVoteInfo = async function(user_id,answerArray) {
    let Match = await DbModels.Matches.findOne({
        where:{
            id:answerArray[0]
        }
    })
    let text = ' За ' + Match.player1 + ' проголосовало - '  + Match.voute1 + '\n'
    + ' За ' + Match.player2 + ' проголосовало - '  + Match.voute2 + '\n'
    await this.sendMessage(user_id,text)
}
module.exports = bot;