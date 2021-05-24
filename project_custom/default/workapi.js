
var bot = require('./base_class')
const axios = require('axios');

//Импорт моделей
var DbModels = require('./../../db/models')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Api для запроса к внешним адрессам
/* bot.prototype.getMatches = async function() {
    let request = {
        query: 'query getMatchesList($id: ID!, $status: MatchStatus, $game: String, $paging: PagingInput) {' 
            + 'project(id: $id, isPublic: true) {'
            +  'matches(status: $status, game: $game, paging: $paging) {'
            +    'items {'
            +      'startedAt'
            +      '     tournamentName'
            +      '      opponent {'
            +      '        shortName'
            +      '        name'
            +      '        __typename'
            +      '      }'
            +      '      player {'
            +      '        shortName'
            +      '        name'
            +      '        __typename'
            +      '      }'
            +      '      status'
            +      '      __typename'
            +      '    }'
            +      '    cursors {'
            +      '      after'
            +      '      hasNext'
            +      '      __typename'
            +      '    }'
            +      '    __typename'
            +      '  }'
            +      '  __typename'
            +      '}'
            +      '  }',
        variables: { 
            id:"1", 
            "paging": {
                "after": "WzEwXQ=="
            } 
        } 
    }
    let url = 'https://uwatch.live/graphql';
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let matches;
    await axios.post(url, request).then((response) => {
            matches = response.data.data.project.matches.items
    }, (err) => {
        this.console_log(err, 'yellow');
    });
    return matches.slice(0,5)
}*/
//Export
module.exports = bot;