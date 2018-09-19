const pxtorem = require('postcss-pxtorem');

module.exports = {
    plugins: [
        require('autoprefixer'),
        pxtorem({
            rootValue: 75,
            unitPrecision: 3,
            propList: ['*']
        })
    ]
};
