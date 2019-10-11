# vue-ssr-demo
Vue SSR初探

1. 不要再beforeCreate和created生命周期产生全局副作用的代码,因为这两个生命周期钩子是在服务端渲染的过程中被调用的.
2. 除了beforeCreate和created生命周期之外的钩子函数都在客户端执行
3. Vue2.5以下的版本中,服务端渲染时异步组件只能用在路由组件上,然而在2.5+的版本中,异步组件可以在应用的任何地方使用.
4. 在服务端渲染(SSR)期间,我们本质上是在渲染我们应用程序的"快照",如果应用程序依赖于一些异步数据,那么在开始渲染过程之前,需要先预取和解析好这些数据.
5. 再挂载到客户端应用程序之前,需要获取到与服务器端应用程序完全相同的数据,否则,客户端应用程序会使用与服务器端应用程序不同的状态,然后导致混合失败.为了结局这个问题,获取的数据需要位于试图组件之外,即放置在专门的数据预取存储容器或状态容器中.将数据填充到store中,在挂载到客户端应用程序之前,可以从store获取到内联预置状态.

6. 服务端的数据预取主要是靠组件暴露出来asyncData函数,服务器在获取到匹配的组件后,滴啊用足尖暴露的asyncData方法获取数据,然后解析完成后,渲染数据.

7. 客户端数据预取有两种方式:

* 1.在路由导航之前解析数据.

* 2.匹配要渲染的视图后,再获取数据.

8. 组件重用时要调用asyncData时可以通过全局mixin来处理

        Vue.mixin({
            beforeRouteUpdate(to,from,next) {
                const { asyncData } = this.$options
                if(asyncData) {
                    asyncData({
                        store: this.$store,
                        route: to
                    }).then(next).catch(next)
                } else {
                    next()
                }
            }
        })
9. 我们可以在asyncData中使用store.registerModule 惰性注册store模块

10. `data-server-rendered`特殊属性,让客户端知道这部分HTML是由Vue在服务端渲染的,并且应该以激活模式进行挂载.

11. `vue-server-renderer` 的createBundleRenderer 方法会自动的为我们进行代码分割和数据资源的预加载和预取.

12. 渲染缓存

13. 组件缓存

14. 流式渲染
