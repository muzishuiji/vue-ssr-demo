// 创建应用程序,并且将其挂载到DOM中
import { createApp } from './app'
const { app, router, store } = createApp()

// 获取到服务端的状态同步到客户端的vm实例中
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
// 需要在挂载app之前调用router.onReady.因为路由器必须要
// 提前解析路由配置中的异步组件,,才能正确的调用组件中可能存在的路由钩子
router.onReady(() => {
    // 添加路由钩子函数,用于处理asyncData
    // 在初始路由resolve后执行
    // 以便我们不会二次预取已有的数据
    // 使用router.beforeResolve(),以确保所有异步组件都resolve
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心非预渲染的组件
        // 所以我们对比它们,找出两个匹配列表的差异组件
        let diffed = false
        // 需要激活的组件
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if(!activated.length) {
            return next()
        }
        // 这里如果有加载指示器,就触发
        Promise.all(activated.map(component => {
           if (component.asyncData) {
              component.asyncData({
                store,
                route: to
              });
            }
        })).then(() => {
            // 停止加载指示器
            next()
        }).catch(next)
    })
    app.$mount('#app')
})