<template>
  <div class="container user-container" id="report-app" v-cloak>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-title">
        <h2>离职管理</h2>
      </div>
    </div>
    <div class="form-group clearfix col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding: 0;">
          <deptPosition></deptPosition>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <label class="control-label text-left nopad">日期类型：</label>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding-right: 0;">
          <select class="form-control" v-model="leaveOffice.dateType">
            <option v-for="(item,index) in dateTypeList" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0;">
          <date-picker v-model="leaveOffice.beginDate" type="date" class="queryDate"></date-picker>
        </div>
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
          <span class="nopad">~</span>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0;">
          <date-picker v-model="leaveOffice.endDate" type="date" class="queryDate"></date-picker>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1" style="padding: 0;">
          <input name="date" type="radio" @click="lastMonth"/>
          <label class="control-label text-left nopad">上月</label>
          <input name="date" type="radio" @click="currentMonth"/>
          <label class="control-label text-left nopad">本月</label>
          <input name="date" type="radio" @click="nextMonth"/>
          <label class="control-label text-left nopad">次月</label>
          <input name="date" type="radio" @click="currentDate"/>
          <label class="control-label text-left nopad">自定义</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import moment from 'moment'
  import Cookies from 'js-cookie'
  import deptPosition from '../vuecommon/departLinkPosition.vue'

  export default {
    components: {
      deptPosition,
      DatePicker,
    },
    name: "leaveOffice",
    data() {
      return {
        leaveOffice: {
          beginDate: this.$currentDate(),
          endDate: this.$currentDate(),
          dateType: ''
        },
        dateTypeList: [
          {value: '', label: '全部'}, // 默认为空 动态SQL不执行这个条件
          {value: '1', label: '入职日期'},
          {value: '2', label: '申请日期'},
          {value: '3', label: '离职日期'}
        ]
      }
    },
    methods: {
      lastMonth() {
        this.leaveOffice.beginDate = this.$queryStartLastMonth()
        this.leaveOffice.endDate = this.$queryEndLastMonth()
        // 调用查询方法
      },
      currentMonth() {
        this.leaveOffice.beginDate = this.$queryStartMonth()
        this.leaveOffice.endDate = this.$queryEndMonth()
        // 调用查询方法
      },
      nextMonth() {
        this.leaveOffice.beginDate = this.$queryStartNextMonth()
        this.leaveOffice.endDate = this.$queryEndNextMonth()
        // 调用查询方法
      },
      currentDate() {
        this.leaveOffice.beginDate = this.$currentDate()
        this.leaveOffice.endDate = this.$currentDate()
        // 调用查询方法
      }
    },
  }
</script>

<style scoped>
  @-moz-document url-prefix() {
    fieldset {
      display: table-cell;
    }
  }

  .form-control {
    width: 100% !important;
  }

  .nopad {
    padding-left: 0;
    padding-right: 0;
    line-height: 34px;
  }

  .user-container {
    background-color: #fff;
    width: 100%;
    padding: 0 20px;
  }

  .main-title h2 {
    line-height: 50px;
  }

  .m_r_10 {
    margin-right: 10px;
  }

  .textarea {
    resize: none;
    width: 79%;
    height: 80px;
  }

  input[type="date"] {
    line-height: 30px !important;
  }

  .queryDate {
    position: relative;
    display: inline-block;
    width: 100% !important;
  }

  .table > tbody > tr > td {
    vertical-align: middle;
  }

  .table > tbody > tr > td {
    vertical-align: middle;
  }
</style>
