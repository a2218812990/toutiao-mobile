import Vue from 'vue'
import moment from 'moment'

// 配置中文语言
moment.locale('zh-cn')

// 相对时间
Vue.filter('relativeTime', value => {
  return moment(value).startOf('second').fromNow()
})
// 日期格式化
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
