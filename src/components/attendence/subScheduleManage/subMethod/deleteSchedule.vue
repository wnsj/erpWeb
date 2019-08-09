<template>
  <!-- 删除排班计划 -->
  <div class="tab-pane fade" id="pbjhsc">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="table-responsive">
        <div class="col-lg-8 mtr_a"> <span>时间：</span> <span>
            <!-- <input type="date" v-model="begDate" id="begDate" /> -->
            <DatePicker v-model="begDate" @change="initPage()"></DatePicker>
          </span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
            <!-- <input type="date" value="" v-model="endDate" id="endTime" /> -->
            <DatePicker v-model="endDate" @change="initPage()"></DatePicker>
          </span> <span class="search">
            <button class="btn btn-warning" @click="getAllShiftsInfor">查询</button>
          </span> <span class="search">
            <button class="btn btn-danger" @click="deleteShiftsInfor">删除</button>
          </span> </div>
        <table class="table table-bordered table-hover" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
          infinite-scroll-distance="5">
          <thead>
            <tr>
              <th class="text-center">员工</th>
              <th class="text-center">工号</th>
              <th class="text-center">班次</th>
              <th class="text-center">排班日期</th>
              <th class="text-center">开始</th>
              <th class="text-center">结束</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in AllShiftsInfor" :key="index" @click="getShiftsId(item)">
              <td class="text-center">{{item.EMPNAME}}</td>
              <td class="text-center">{{item.JOBNUM}}</td>
              <td class="text-center">{{item.NAME}}</td>
              <td class="text-center">{{item.SHIFTDATE | dateFormat}}</td>
              <td class="text-center">{{item.STARTTIME | dateFormat}}</td>
              <td class="text-center">{{item.ENDTIME | dateFormat}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    isBlank
  } from '@/assets/js/constant.js'

  import $ from 'jquery'
  import DatePicker from 'vue2-datepicker'

  export default {
    components: {
      DatePicker
    },
    data() {
      return {
        AllShiftsInfor: [],
        begDate: this.moment(new Date(), 'YYYY-MM-DD'),
        endDate: this.moment(new Date(), 'YYYY-MM-DD'),
        busy: false,
        page: 1,
        limit: 10,
        pages: 1
      }
    },
    methods: {
      // -1) 查询所有人当天排班计划
      getAllShiftsInfor: function() {
        if (isBlank(this.begDate) || isBlank(this.endDate)) {
          alert("查询时间不能为空！");
          return;
        }
        this.page = 1;
        this.pages = 1;
        var url = this.url + "/kqParamSetContr/queryAllEmpAttShift";
        axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": this.contentType,
            "Access-Token": this.accessToken
          },
          data: {
            begDate: this.moment(this.begDate, 'YYYY-MM-DD'),
            endDate: this.moment(this.endDate, 'YYYY-MM-DD'),
            page: this.page,
            limit: this.limit
          },
          dataType: "json"
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.AllShiftsInfor = response.data.retData.records;
          } else {
            alert(response.data.retMsg);
          }
        }).catch(
          (error) => {
            console.log("请求失败处理");
          }
        );
      },
      deleteShiftsInfor() {
        if (isBlank(this.begDate) || isBlank(this.endDate)) {
          alert("查询时间不能为空！");
          return;
        }
        if (!confirm("确定删除?")) return;
        var url = this.url + "/kqParamSetContr/updateEmpAttShift";
        axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": this.contentType,
            "Access-Token": this.accessToken
          },
          data: {
            begDate: this.begDate,
            endDate: this.endDate
          },
          dataType: "json"
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.AllShiftsInfor = response.data.retData.records;
          } else {
            alert(response.data.retMsg);
          }
        }).catch((error) => {
          console.log("请求失败处理");
        });
      },
      //滚动加载
      loadMore() {
        if (isBlank(this.begDate) || isBlank(this.endDate) || this.AllShiftsInfor.length <= 0 || this.page > this.pages) {
          return;
        }
        this.page = this.page == 1 ? ++this.page : this.page;
        this.busy = true;
        var url = this.url + "/kqParamSetContr/queryAllEmpAttShift";
        axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": this.contentType,
            "Access-Token": this.accessToken
          },
          data: {
            begDate: this.moment(this.begDate, 'YYYY-MM-DD'),
            endDate: this.moment(this.endDate, 'YYYY-MM-DD'),
            page: this.page,
            limit: this.limit
          },
          dataType: "json"
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.pages = response.data.retData.pages;
            if (response.data.retData.records.length <= 0) return;
            response.data.retData.records.forEach(item => {
              this.AllShiftsInfor.push(item);
            })
            this.page++;
            this.busy = false;
          }
        }).catch(
          (error) => {
            console.log("请求失败处理");
          }
        );
      },
      initPage() {
        this.page = 1;
        this.pages = 1;
        this.AllShiftsInfor = [];
      }
    },
    mounted() {

    }
  }
</script>

<style>
</style>
<!--
vue-infinite-scroll官网
https://www.npmjs.com/package/vue-infinite-scroll
-->
