const errorHandler = {
    error(app, logger) {
        app.use(async(ctx, next)=>{
            try {
                await next();
            } catch (error) {
                ctx.status = 500;
                logger.error(error);
                ctx.body = "网站出错了";
            }

            if(ctx.status !== 404){
                return;
            }
            //不承认网站404，百度降权，强行设置为200
            ctx.status = 200;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        });
    }
};

module.exports = errorHandler;