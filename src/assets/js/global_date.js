import moment from "moment";
/*获取当前时间*/
const currentTime =() => {
  return moment().format("YYYY-MM-DD HH:mm:ss")
}
/*获取当前时分*/
const currentHHmm =() => {
  return moment().format("YYYY-MM-DD HH:mm")
}
/*获取当前日期*/
const currentDate =() => {
  return moment().format("YYYY-MM-DD")
}
/*获取当前月份*/
const currentMonth =() => {
  return moment().format("YYYY-MM")
}
/*格式化YYYY_MM_DD_HH_mm*/
const YYYY_MM_DD_HH_mm =(time) => {
  return moment(time).format("YYYY-MM-DD HH:mm")
}
/*格式化YYYY_MM_DD_HH_mm_ss*/
const YYYY_MM_DD_HH_mm_ss =(time) => {
  return moment(time).format("YYYY-MM-DD HH:mm:ss")
}
/*查询时间转换*/
const queryStartTime =(time) => {
  return moment(time).format("YYYY-MM-DD 00:00:00")
}
const queryEndTime =(time) => {
  return moment(time).format("YYYY-MM-DD 23:59:59")
}
/*查询月份转换*/
const queryStartMonth =(month) => {
  return moment(month).startOf('month').format("YYYY-MM-DD 00:00:00")
}
const queryEndMonth =(month) => {
  return moment(month).endOf('month').format("YYYY-MM-DD 23:59:59")
}
/*查询上个月起止时间*/
const queryStartLastMonth =(month) => {
  return moment(month).subtract(1,'month').startOf('month').format("YYYY-MM-DD 00:00:00")
}
const queryEndLastMonth =(month) => {
  return moment(month).subtract(1,'month').endOf('month').format("YYYY-MM-DD 23:59:59")
}
/*查询下个月起止时间*/
const queryStartNextMonth =(month) => {
  return moment(month).add(1,'month').startOf('month').format("YYYY-MM-DD 00:00:00")
}
const queryEndNextMonth =(month) => {
  return moment(month).add(1,'month').endOf('month').format("YYYY-MM-DD 23:59:59")
}
/*初始化添加时间*/
const addStartTime = () =>{
  return moment().format("YYYY-MM-DD 08:30")
}
const addEndTime = () =>{
  return moment().format("YYYY-MM-DD 17:30")
}
/*格式化YYYY_MM_DD_17_30*/
const YYYY_MM_DD_17_30 = (time) =>{
  return moment(time).format("YYYY-MM-DD 17:30")
}
/*计算年龄getAge*/
const getAge = (time) =>{
  return moment().diff(time,'years')
}

export default {
  install (Vue){
    Vue.prototype.$currentTime = currentTime
    Vue.prototype.$currentHHmm = currentHHmm
    Vue.prototype.$currentDate = currentDate
    Vue.prototype.$currentMonth = currentMonth
    Vue.prototype.$YYYY_MM_DD_HH_mm = YYYY_MM_DD_HH_mm
    Vue.prototype.$YYYY_MM_DD_HH_mm_ss = YYYY_MM_DD_HH_mm_ss
    Vue.prototype.$queryStartTime = queryStartTime
    Vue.prototype.$queryEndTime = queryEndTime
    Vue.prototype.$queryStartMonth = queryStartMonth
    Vue.prototype.$queryEndMonth = queryEndMonth
    Vue.prototype.$queryStartLastMonth = queryStartLastMonth
    Vue.prototype.$queryEndLastMonth = queryEndLastMonth
    Vue.prototype.$queryStartNextMonth = queryStartNextMonth
    Vue.prototype.$queryEndNextMonth = queryEndNextMonth
    Vue.prototype.$addStartTime = addStartTime
    Vue.prototype.$addEndTime = addEndTime
    Vue.prototype.$YYYY_MM_DD_17_30 = YYYY_MM_DD_17_30
    Vue.prototype.$getAge = getAge
  }
}
