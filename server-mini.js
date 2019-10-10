// 一个基础版本的ssr的实现
const server = require('express')()
const Vue = require('vue')
const fs = require('fs')
const vueServerRender= require('vue-server-renderer');
// 生成一个render函数
const Renderer = vueServerRender.createRenderer({
    // 定义一个基础的模板页面
    template:fs.readFileSync('./src/index.template.html', 'utf-8')
})
server.get('*', (req, res) => {
    // 创建一个vue组件
    const app = new Vue({
        data: {
            name: 'this is vue ssr basic demo',
            url: req.url
        },
        template:'<div> {{name}}, current url is: {{url}}</div>'
    })
    const context = {
        title: 'SSR test#'
    }
    // 将vue实例和对应的传参转换成html字符串
    Renderer.renderToString(app, context, (err, html) => {
        if(err) {
            console.log(err)
            res.status(500).end('server error')
        }
        // 返回渲染完成的页面
        res.end(html)
    })

})

const port = process.env.PORT || 8008;
// 运行服务器端
server.listen(port, () => {
  console.log(`server started at localhost:${port}`);
})