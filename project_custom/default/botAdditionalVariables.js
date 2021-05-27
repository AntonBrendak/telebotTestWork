//Файловая система
const path = require('path');
const { existsSync } = require('fs')
const appPath = path.dirname(require.main.filename);
const {app_custom_dir_path} = require(path.join(appPath , 'config/config.js'))

//Импорт моделей
var DbModels = require('../../db/models')

//базовый класс
var bot = require('./base_class')
