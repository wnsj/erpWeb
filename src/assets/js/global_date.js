import moment from "moment";
/*获取当前时间*/
const currentTime =() => {
  return moment().format("YYYY-MM-DD HH:mm:ss")
}
/*获取当前日期*/
const currentDate =() => {
  return moment().format("YYYY-MM-DD")
}
/*格式化YYYY_MM_DD_HH_mm*/
const YYYY_MM_DD_HH_mm =(time) => {
  return moment(time).format("YYYY-MM-DD HH:mm")
}
/*查询时间转换*/
const queryStartTime =(time) => {
  return moment(time).format("YYYY-MM-DD 00:00:00")
}
const queryEndTime =(time) => {
  return moment(time).format("YYYY-MM-DD 23:59:59")
}
/*初始化添加时间*/
const addStartTime = () =>{
  return moment().format("YYYY-MM-DD 08:30")
}
const addEndTime = () =>{
  return moment().format("YYYY-MM-DD 17:30")
}

export default {
  install (Vue){
    Vue.prototype.$currentTime = currentTime
    Vue.prototype.$currentDate = currentDate
    Vue.prototype.$YYYY_MM_DD_HH_mm = YYYY_MM_DD_HH_mm
    Vue.prototype.$queryStartTime = queryStartTime
    Vue.prototype.$queryEndTime = queryEndTime
    Vue.prototype.$addStartTime = addStartTime
    Vue.prototype.$addEndTime = addEndTime
  }
}
