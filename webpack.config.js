const path = require("path")
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    devServer: {
        port: 3000, // 端口号
        open: true,
    },
    mode: 'development',
    entry: "./src/main.js", // 入口
    output: {
        path: path.resolve(__dirname, "dist"), // 出口路径 绝对路径
        filename: "bundle.js" // 出口文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // 告诉webpack使用插件时, 以我们自己的html文件作为模板去生成dist/html文件
            filename: 'index.html' // 生成文件的名称
        }),
        new CleanWebpackPlugin(), // 删除的是ouput path 里配置的那个输出文件的文件夹
    ],
    module: {
        rules: [
            // loader的规则
            {
                test: /\.css$/, // 匹配所有的css文件
                // loader 执行的顺序： use数组里从右向左运行
                // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
                // 再用 style-loader 将样式, 把css插入到dom中
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/, // 匹配所有的css文件
                // loader 执行的顺序： use数组里从右向左运行
                // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
                // 再用 style-loader 将样式, 把css插入到dom中
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ]
    }
}