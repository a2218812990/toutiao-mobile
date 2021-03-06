import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') }, // 登录页
  { path: '/',
    component: () => import('@/views/tabbar'), // tabbar切换页面（可以当作home）
    children: [
      { path: '', component: () => import('@/views/home') }, // 默认是首页，所以地址设置为空
      { path: 'question', component: () => import('@/views/question') },
      { path: 'video', component: () => import('@/views/video') },
      { path: 'my', component: () => import('@/views/my') }]
  },
  { path: '/search', component: () => import('@/views/search') },
  { path: '/article/:articleId', component: () => import('@/views/article-details'), props: true }, // 将动态参数隐射到页面上
  { path: '/user/profile', component: () => import('@/views/user-profile') }
]

const router = new VueRouter({
  routes
})

export default router
