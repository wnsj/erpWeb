<template>
  <div class="tab-pane fade" id="rypbjh">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="position:inherit;">
      <div class="table-responsive col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="centent">
          <div class="treebox">
            <departmentEmployee @retEmpObj="getEmpData" ref='deptEmp'></departmentEmployee>
          </div>
        </div>
      </div>
      <div class="table-responsive col-xs-9 col-sm-9 col-md-9 col-lg-9" style="position:relative; padding-bottom:30px;">
        <div class="col-lg-4 mtr_a clearfix"> <span>查找：</span> <span>
            <input type="text" name="" class="form-control" placeholder="输入姓名,快速查找..." style="width:200px;"
              v-model.lazy="searchWords" />
          </span> <span>
            <button class="btn btn-infor" @click="searchShifts">查询</button>
          </span> </div>
        <div class="col-lg-8 mtr_a big_font_size">
          <span>
            <a href="#monday" data-toggle="tab" aria-expanded="true" @click="changeToMon()">月</a>
          </span>
          |
          <span>
            <a href="#rypbjh" data-toggle="tab" aria-expanded="true">周</a></span>
          |
          <span>
            <a href="#rypbjh" data-toggle="tab" aria-expanded="true">刷新</a></span>
          |
          <span>
            <button id="last-week" @click="prevWeek()">&lt;</button>
          </span>
          <span id="sub"></span>
          <span>
            <button id="next-week" @click="nextWeek()">&gt;</button>
          </span>
          <font class="pull-right"> 员工:<span id="uname">{{ryScheduleListName}}</span>
          </font>
        </div>
        <!-- <div id="main" style="width: 1000px;height:1000px; margin-bottom:30px; top:50px; position:static;"></div> -->
        <childWeekTable ref="child" :ryScheduleListObj="ryScheduleListObj"></childWeekTable>
        <table id="monitor">
          <thead>
            <th></th>
          </thead>
          <tr>
            <td id="firstweek"></td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td id="lastweek"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<!-- <template id="child">
    <div id="main" style="width: 1000px;height:1000px; margin-bottom:30px; top:50px; position:static;"></div>
 </template> -->
<script>
  import moment from 'moment'
  moment.locale('zh-cn');
  //或者moment.lang('zh-cn');即可显示中文
  import axios from 'axios'
  import $ from 'jquery'
  import departmentEmployee from '@/components/vuecommon/departmentEmployee.vue'
  import childWeekTable from './subMethod/childWeekTable.vue'
  import {
    CallVueMethod,
    isBlank
  } from '@/assets/js/constant.js'

  export default {
    components: {
      departmentEmployee,
      childWeekTable
      /* child: {
      	props: ['ryScheduleListObj'],
      	template: "<div id='main' style='width: 1000px;height:1000px; margin-bottom:30px; top:50px; position:static;'></div>",
      	methods: {},
      	mounted() {

      	}
      } */
    },
    data() {
      return {
        //人员排班
        ryScheduleList: [],
        ryScheduleListUid: "",
        ryScheduleListArr: [],
        ryScheduleListName: "未选择员工",
        ryScheduleListFlag: "7",
        searchWords: '',
        ryScheduleListObj: {
          // timeList: [8.5, 1.5, 5.5, 4.8, 8.4, 3.5, 8.5],
          // startTime: [8, 6.3, 5, 10, 5.5, 3, 8],
          // endTime: [-8, 0, -2, 0, 0, 0, -5.5, 0]
        },
        begDate: '',
        endDate: ''
      }
    },
    methods: {
      // 前端的js
      getInit: function() {
        this.innerHTML(this.begDate, this.endDate);
        $("#sub").text(moment(this.begDate).format("YYYY年MM月DD日") + "--" + moment(this.endDate).format("YYYY年MM月DD日"));
      },
      //上一周
      prevWeek() {
        //上一周
        var v = moment(this.begDate).subtract(6, 'day');
        this.getDate(v);
        this.innerHTML(this.begDate, this.endDate);
        $("#sub").text(moment(this.begDate).format("YYYY年MM月DD日") + "--" + moment(this.endDate).format("YYYY年MM月DD日"));
        var Uid = this.ryScheduleListUid;
        var obj = new Object();
        obj.userId = Uid;
        obj.startTime = this.begDate;
        obj.endTime = this.endDate;
        obj.flag = this.ryScheduleListFlag;
        if (isBlank(Uid)) {
          console.log("未选择员工!");
        } else {
          this.requestData(obj);
        }
        //console.log("上一周开始和结束日期" + this.ryScheduleListPrevStime + "," + this.ryScheduleListPrevEtime);
      },
      //下一周
      nextWeek() {
        var v = moment(this.endDate).add(6, 'day');
        this.getDate(v);
        this.innerHTML(this.begDate, this.endDate);
        $("#sub").text(moment(this.begDate).format("YYYY年MM月DD日") + "--" + moment(this.endDate).format("YYYY年MM月DD日"));
        var Uid = this.ryScheduleListUid;
        var obj = new Object();
        obj.userId = Uid;
        obj.startTime = this.begDate;
        obj.endTime = this.endDate;
        obj.flag = this.ryScheduleListFlag;
        if (isBlank(Uid)) {
          console.log("未选择员工!");
        } else {
          this.requestData(obj);
        }
        //console.log("下一周开始和结束日期" + this.ryScheduleListNextStime + ',' + this.ryScheduleListNextEtime);
      },
      //请求数据
      requestData(obj) {
        var url = this.url + "/kqParamSetContr/queryEmpAttShift";
        axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": this.contentType,
            "Access-Token": this.accessToken
          },
          data: obj,
          dataType: "json"
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.ryScheduleListObj = response.data.retData;
            this.$refs.child.setPara(this.ryScheduleListObj);
          } else {
            alert(response.data.retMsg);
          }
        }).catch(
          function(error) {
            console.log("请求失败处理");
          }
        );
      },
      //选择员工请求数据
      getEmpData(emp) {
        this.ryScheduleListUid = emp.account;
        this.ryScheduleListName = emp.name;
        var obj = new Object();
        obj.userId = this.ryScheduleListUid;
        obj.startTime = this.begDate;
        obj.endTime = this.endDate;
        // obj.userId = 860;
        // obj.startTime = '2017-02-03';
        // obj.endTime = '2017-02-09';
        obj.flag = this.ryScheduleListFlag;
        this.requestData(obj);
      },
      retEmpData(emp) {
        var v = {};
        v = emp;
        if (this.isBlank(v.name)) {
          this.ryScheduleListUid = "";
          this.ryScheduleListName = '未选择员工';
        } else {
          this.ryScheduleListUid = v.account;
          this.ryScheduleListName = v.name;
        }
        var obj = new Object();
        obj.userName = this.searchWords;
        obj.startTime = this.begDate;
        obj.endTime = this.endDate;
        obj.flag = this.ryScheduleListFlag;
        this.requestData(obj);
      },
      //根据姓名查询排班计划
      searchShifts() {
        if (isBlank(this.searchWords)) {
          alert('名字不能为空！');
          return;
        }
        this.$refs.deptEmp.searchEmp(this.searchWords);
      },
      //获取时间
      getDate(date) {
        let now = new Date(date);
        let oneDayLong = 24 * 60 * 60 * 1000;
        let mondayTime = now.getTime() - (now.getDay() - 1) * oneDayLong;
        let sundayTime = now.getTime() + (7 - now.getDay()) * oneDayLong;
        let startimeer = moment(mondayTime).format("YYYY-MM-DD");
        let endtimeer = moment(sundayTime).format("YYYY-MM-DD");
        this.begDate = startimeer;
        this.endDate = endtimeer;
      },
      //生成横坐标
      innerHTML(begDate, endDate) {
        var cells = $("#monitor td");
        for (var i = 0; i < 7; i++) {
          var t = moment(begDate).add(i, 'day');
          cells[i].innerHTML = t.format("MM月DD日") + "/" + t.format('dddd');
        }
      },
      //切换月表
      changeToMon() {
        if (!this.isBlank(this.ryScheduleListUid) && this.ryScheduleListName != '未选择员工') {
          alert("ryScheduleListUid:" + this.ryScheduleListUid + ",ryScheduleListName:" + this.ryScheduleListName)
          //{id:this.ryScheduleListUid,name:this.ryScheduleListName}
          var obj = {};
          obj.id = this.ryScheduleListUid;
          obj.name = this.ryScheduleListName;
          //this.$refs.deptEmp.setEmp(obj);
        }
      }
    },
    mounted() {
      //本周
      this.getDate(new Date());
      this.getInit();
    }
  }
</script>

<style>
</style>

<!--        $(function() {
          var cells = $("#monitor td");
          var clen = cells.length;
          var currentFirstDate;
          var formatDate = function(date) {
            var year = date.getFullYear() + "年";
            var month = date.getMonth() + 1 + "月";
            var day = date.getDate() + "日";
            var week = [
              "星期天",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六"
            ][date.getDay()];
            var newyears = year.substr(5, 5);
            return newyears + month + day + "/" + week;
          };

          var addDate = function(date, n) {
            date.setDate(date.getDate() + n);
            return date;
          };
          var setDate = function(date) {
            var week = date.getDay() - 1;
            date = addDate(date, week * -1);
            currentFirstDate = new Date(date);
            for (var i = 0; i < clen; i++) {
              cells[i].innerHTML = formatDate(i == 0 ? date : addDate(date, 1));
            }
          };
          $("#last-week").click(function() {
            setDate(addDate(currentFirstDate, -7));
            let ftma = $("#firstweek").text();
            let ftm;
            if (ftma.length > 8) {
              ftm = ftma.slice(0, 5);
            } else {
              ftm = ftma.slice(0, 4);
            }

            let lstma = $("#lastweek").text();
            let lstm;
            if (lstma.length > 8) {
              lstm = lstma.slice(0, 5);
            } else {
              lstm = lstma.slice(0, 4);
            }

            $("#sub").text(ftm + "--" + lstm);
          });
          $("#next-week").click(function() {
            setDate(addDate(currentFirstDate, 7));
            let ftma = $("#firstweek").text();
            let ftm;
            if (ftma.length > 8) {
              ftm = ftma.slice(0, 5);
            } else {
              ftm = ftma.slice(0, 4);
            }

            let lstma = $("#lastweek").text();
            let lstm;
            if (lstma.length > 8) {
              lstm = lstma.slice(0, 5);
            } else {
              lstm = lstma.slice(0, 4);
            }

            $("#sub").text(ftm + "--" + lstm);
          });
          setDate(new Date());

          let ftm;
          let ftma = $("#firstweek").text();
          if (ftma.length > 8) {
            ftm = ftma.slice(0, 5);
          } else {
            ftm = ftma.slice(0, 4);
          }

          let lstm;
          let lstma = $("#lastweek").text();
          if (lstma.length > 8) {
            lstm = lstma.slice(0, 5);
          } else {
            lstm = lstma.slice(0, 4);
          }

          $("#sub").text(ftm + "--" + lstm);
        });

         //获取当前一周开始和结束日期
        getWeekStartDateAndEndDateRange() {
          //alert("ryScheduleListCount:"+this.ryScheduleListCount);
          // 日和月不足10 补 0
          function add0(m) {
            return m < 10 ? "0" + m : m;
          }
          let oneDayLong = 24 * 60 * 60 * 1000;
          let now = new Date();
          let mondayTime = now.getTime() - (now.getDay() - 1) * oneDayLong;
          let sundayTime = now.getTime() + (7 - now.getDay()) * oneDayLong;

          //上一周开始和结束日期
          let prevmondayTime = now.getTime() - (now.getDay() - 1) * oneDayLong - 7 * this.ryScheduleListCount *
            oneDayLong;
          let prevsundayTime = now.getTime() + (7 - now.getDay()) * oneDayLong - 7 * this.ryScheduleListCount *
            oneDayLong;
          let prevYeara = new Date(prevmondayTime).getFullYear();
          let prevMontha = new Date(prevmondayTime).getMonth() + 1;
          let prevmondaya = new Date(prevmondayTime).getDate();
          let prevtimeera = prevYeara + "-" + add0(prevMontha) + "-" + add0(prevmondaya);
          this.ryScheduleListPrevStime = prevtimeera;

          let prevYearb = new Date(prevsundayTime).getFullYear();
          let prevMonthb = new Date(prevsundayTime).getMonth() + 1;
          let prevmondayb = new Date(prevsundayTime).getDate();
          let prevtimeerb = prevYearb + "-" + add0(prevMonthb) + "-" + add0(prevmondayb);
          this.ryScheduleListPrevEtime = prevtimeerb;
          //console.log("上一周开始和结束日期:" + this.ryScheduleListPrevStime + "," + this.ryScheduleListPrevEtime);

          //下一周开始和结束日期
          let nextmondayTime = now.getTime() - (now.getDay() - 1) * oneDayLong + 7 * this.ryScheduleListCount *
            oneDayLong;
          let nextsundayTime = now.getTime() + (7 - now.getDay()) * oneDayLong + 7 * this.ryScheduleListCount *
            oneDayLong;
          let nextmonday = new Date(nextmondayTime).getDate();
          let nextsunday = new Date(nextsundayTime).getDate();

          let nextYearc = new Date(nextmondayTime).getFullYear();
          let nextMonthc = new Date(nextmondayTime).getMonth() + 1;
          let nextmondayc = new Date(nextmondayTime).getDate();
          let nextimeerc =
            nextYearc + "-" + add0(nextMonthc) + "-" + add0(nextmondayc);
          this.ryScheduleListNextStime = nextimeerc;

          let nextYeard = new Date(nextsundayTime).getFullYear();
          let nextMonthd = new Date(nextsundayTime).getMonth() + 1;
          let nextmondayd = new Date(nextsundayTime).getDate();
          let nextimeerd =
            nextYeard + "-" + add0(nextMonthd) + "-" + add0(nextmondayd);
          this.ryScheduleListNextEtime = nextimeerd;
          //console.log("下一周开始和结束日期:" + this.ryScheduleListNextStime + "," + this.ryScheduleListNextEtime);

          //当前周的第一天日期
          let timestart = new Date(mondayTime);
          let ystart = timestart.getFullYear();
          let mstart = timestart.getMonth() + 1;
          let dstart = timestart.getDate();
          let startimeer = ystart + "-" + add0(mstart) + "-" + add0(dstart);
          this.ryScheduleListStime = startimeer;

          //当前周的最后一天日期
          let timeend = new Date(sundayTime);
          let yend = timeend.getFullYear();
          let mend = timeend.getMonth() + 1;
          let dend = timeend.getDate();
          let endtimeer = yend + "-" + add0(mend) + "-" + add0(dend);
          let weekRange = [startimeer, endtimeer];
          this.ryScheduleListEtime = endtimeer;
          //console.log("当前周的开始和结束日期:"+this.ryScheduleListStime+","+this.ryScheduleListEtime);
        },
          //上一周
        prevWeek() {
          this.firstBtn = "left";
          if (this.isClick == "left") {
            this.ryScheduleListCount++;
          } else if (this.isClick == "right") {
            this.ryScheduleListCount = 0;
            //this.ryScheduleListCount = this.ryScheduleListCount > 0 ? this.ryScheduleListCount - 1 : 0;
            this.isClick = "left";
          }
          this.firstBtn = 'left';
          this.getWeekStartDateAndEndDateRange(); //获取时间方法
          var Uid = this.ryScheduleListUid;
          var obj = new Object();
          obj.userId = Uid;
          obj.startTime = this.ryScheduleListPrevStime;
          obj.endTime = this.ryScheduleListPrevEtime;
          obj.flag = this.ryScheduleListFlag;
          if (isBlank(Uid)) {
            console.log("未选择员工!");
          } else {
            this.requestData(obj);
          }
          //console.log("上一周开始和结束日期" + this.ryScheduleListPrevStime + "," + this.ryScheduleListPrevEtime);
        },
        //下一周
        nextWeek() {
          this.firstBtn = "right";
          if (this.isClick == "right") {
            this.ryScheduleListCount++;
          } else if (this.isClick == "left") {
            this.ryScheduleListCount = 0;
            //this.ryScheduleListCount = this.ryScheduleListCount > 0 ? this.ryScheduleListCount - 1 : 0;
            this.isClick = "right";
          }

          var Uid = this.ryScheduleListUid;
          this.getWeekStartDateAndEndDateRange(); //获取时间方法
          var obj = new Object();
          obj.userId = Uid;
          obj.startTime = this.ryScheduleListNextStime;
          obj.endTime = this.ryScheduleListNextEtime;
          obj.flag = this.ryScheduleListFlag;
          if (isBlank(Uid)) {
            console.log("未选择员工!");
          } else {
            this.requestData(obj);
          }
          //console.log("下一周开始和结束日期" + this.ryScheduleListNextStime + ',' + this.ryScheduleListNextEtime);
        },
      -->
