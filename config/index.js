const {join} = require('path');
const _ = require('lodash');

let config={
    VIEWS_DIR: join(__dirname, '..', 'views'),
    STATIC_DIR: join(__dirname, '..', 'assets'),
    COMPONENTS_DIR: join(__dirname, '..', 'components'),
}

if(process.env.NODE_ENV === 'development'){
    let devConfig = {
        PROT: 3000,
        baseUrl: "http://www.book.com"
    }
    config = _.extend(config, devConfig);
}
if(process.env.NODE_ENV === 'production'){
    let proConfig = {
        PROT: 80,
    }
    config = _.extend(config, proConfig);
}

module.exports = config;