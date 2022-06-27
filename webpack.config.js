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
            /* {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {//webpack 4
                        loader: 'url-loader', // 匹配文件, 尝试转base64字符串打包到js中
                        // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
                        options: {
                            limit: 8 * 1024,
                        },
                    },
                ],
            } */
            { // 图片文件的配置(仅适用于webpack5版本)
                test: /\.(png|jpg|gif|jpeg)$/i,
                // type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
                // 如果你设置的是asset模式
                // 以8KB大小区分图片文件
                // 小于8KB的, 把图片文件转base64, 打包进js中
                // 大于8KB的, 直接把图片文件输出到dist下

                // type: 'asset/resource' // 发送一个单独的文件并导出 URL
                // type: 'asset/inline' // 导出一个资源的 data URI
                type: 'asset',
                parser: {//解析器 规则
                    dataUrlCondition: {// datafrl的情况
                        maxSize: 8 * 1024,
                        // maxSize 限制最大值
                    }
                },
                generator: {//生成器
                    filename: '[hash:6][ext]'
                }
            },
            { // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font-[name].[hash:6][ext]'
                }
            },
            { // 处理字体图标的解析//webpack4
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1 * 1024,
                            // 配置输出的文件名
                            name: '[name].[ext]',
                            // 配置输出的文件目录
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            // {webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
            //   test: /\.(eot|svg|ttf|woff|woff2)$/,//匹配所有的字体图标的文件
            //   type: 'asset',//文件直接输出
            //   generator: {//生产器
            //     filename: 'font-[name].[hash:6][ext]'
            //   },
            //   parser: {// 解析器 规则
            //     dataUrlCondition: {// dataUrl的h况
            //       maxSize: 1 * 1024,
            //       // maxSize 限制最大值、
            //     }
            //   }
            // }
            {
                test: /\.js$/,
                exclude: /(node_modules)/, // 排除在外 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
                    }
                }
            },

        ]
    }
}