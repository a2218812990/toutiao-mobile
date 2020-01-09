// 表单验证配置项 使用了vee-validate 为了能在全局使用使用了全局注册对象
import Vue from 'vue'
// 加载需要使用的验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// 加载内置的验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
// 官方文档：https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示消息
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// 添加自定义验证规则  自带的几种简单验证规则不符合我们的要求，因此自定义
// extend

// 最简单的用法
// extend('positive', value => {
//   return value >= 0;
// });
// 手机号验证规则
extend('mobile', {
  validate: value => /^1(3|5|6|7|8|9)\d{9}$/.test(value),
  message: '{_field_}格式不对'
})
// 验证码规则
extend('code', {
  validate: value => /^\d{6}$/.test(value),
  message: '{_field_}格式不对'
})
