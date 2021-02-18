
const { existsSync } = require('fs')
const path = require('path');
const appPath = path.dirname(require.main.filename);

let app_config = {
}
let app_custom_dir = "default"

//Подключение кастомного конфига если он есть
let custom_config_file_path = path.join(appPath , 'project_custom/custom_config.js')

let custom_config
if(existsSync(custom_config_file_path)){
    let custom_config = require(custom_config_file_path)
    if(custom_config.app_custom_dir){
        app_custom_dir = custom_config.app_custom_dir
    }
}

let app_custom_dir_path = path.join(appPath, 'project_custom', app_custom_dir)

module.exports = {app_config, app_custom_dir, app_custom_dir_path}