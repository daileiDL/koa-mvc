const config = require('../config');

const initHandler = {
    init(app, logger) {
        app.use(async (ctx, next) => {
            ctx.state.__COM_DIR__ = config.COMPONENTS_DIR;
            await next();
        });
    }
};

module.exports = initHandler;