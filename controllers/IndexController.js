const bookmodel = require('../models');
const qs = require('querystring');
const {
    URLSearchParams
} = require("url");

class IndexController {

    constructor() {}

    actionIndex() {
        let model = new bookmodel();
        return async (ctx, next) => {
            var queryobj = {};
            for (const k of Object.keys(ctx.query)) {
                if (ctx.query[k]) {
                    queryobj[k] = ctx.query[k].trim();
                }
            }

            var querystring = qs.stringify(queryobj);

            let res = await model.getList('/restfulbooks?' + querystring);
            await ctx.render('index/index', {
                books: res.data.items,
                pages: res.data._meta,
                querys: queryobj
            });
        }
    }

    actionAdd() {
        let model = new bookmodel();
        return async (ctx, next) => {
            let params = new URLSearchParams();
            let body = ctx.request.body;
            params.append("Books[name]", "测试");
            for (const k of Object.keys(body)) {
                params.append(k, body[k]);
            }

            let res = await model.add('/restfulbooks', {
                method: 'post',
                params
            });
            console.log(res);
            ctx.body = res;
        }
    }

}

module.exports = IndexController;