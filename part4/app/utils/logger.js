const config = require('./config');

const info = (...params) => {
    if (config.MODE !== 'test') {
        console.log('--- ', ...params);
    }
};

const error = (...params) => {
    console.error(...params);
};

module.exports = {
    info,
    error,
};
