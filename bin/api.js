#!/usr/bin/env node
var models = require('../models');

if (process.env.NODE_ENV !== 'production') {
    if (!require('piping')({
        hook: true,
        ignore: /(\/\.|~$|\.json$)/i
    })) {
        return;
    }
}

models.sequelize.sync().then(function () {
    require('../server.babel'); // babel registration (runtime transpilation for node)
    require('../api/api');
});
