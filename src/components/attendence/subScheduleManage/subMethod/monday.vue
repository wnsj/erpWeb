<template>
  <div class="tab-pane fade" id="monday">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="position:inherit;">
      <div class="table-responsive col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="centent">
          <div class="treebox">
            <departmentEmployee @retEmpObj="getEmpData" ref="deptEmp"></departmentEmployee>
          </div>
        </div>
      </div>
      <div class="table-responsive col-xs-9 col-sm-9 col-md-9 col-lg-9" style="position:relative; padding-bottom:30px;">
        <div class="col-lg-4 mtr_a clearfix">
          <span>查找：</span>
          <span>
            <input type="text" name="" class="form-control" placeholder="输入姓名,快速查找..." style="width:200px;"
              v-model.lazy="searchWords" />
          </span>
          <span>
            <button class="btn btn-infor" @click="searchShifts()">查询</button>
          </span>
        </div>
        <div class="col-lg-8 mtr_a big_font_size">
          <span><a href="#monday" data-toggle="tab" aria-expanded="true" @click="searchMonthEmployee">月</a></span>
          |
          <span><a href="#rypbjh" data-toggle="tab" aria-expanded="true">周</a></span>
          |
          <span><a href="#rypbjh" data-toggle="tab" aria-expanded="true">刷新</a>
          </span>
          <span id="sub"></span>
          <font class="pull-right"> 员工:<span id="uname">{{ryScheduleListName}}</span>
          </font>
        </div>
      </div>
      <div id="firstLayer">
        <div id="secondLayer">
          <button @click="last()">上个月</button>
          <div id="yearMonth"></div>
          <button @click="next()">下个月</button>
        </div>
        <div id="day">
          <div class="everyday">日</div>
          <div class="everyday">一</div>
          <div class="everyday">二</div>
          <div class="everyday">三</div>
          <div class="everyday">四</div>
          <div class="everyday">五</div>
          <div class="everyday">六</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import departmentEmployee from '@/components/vuecommon/departmentEmployee.vue'
  import {
    CallVueMethod,
    isBlank
  } from '@/assets/js/constant.js'


  export default {
    components: {
      departmentEmployee
    },
    data() {
      return {
        ryScheduleListName: '未选择员工',
        ryScheduleList: [
          '公休_1', '公休_2', '公休_3', '公休_4', '公休_5', '公休_6', '公休_7', '公休_8', '公休_9', '公休_10',
          '公休_11', '公休_12', '公休_13', '公休_14', '公休_15', '公休_16', '公休_17', '公休_18', '公休_19', '公休_20',
          '公休_21', '公休_22', '公休_23', '公休_24', '公休_25', '公休_26', '公休_27', '公休_28', '公休_29', '公休_30',
          '公休_31'
        ],
        searchWords: '',
        userId: '',
        flag: 30,
        ss: new Date(),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        allday: 0,
        empId: '',
        empName: ''
      }
    },
    methods: {
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
            this.ryScheduleList = response.data.retData.monData;
            this.clearAll();
            this.Day();
            this.Month_Day();
          } else {
            alert(response.data.retMsg);
          }
        }).catch(
          function(error) {
            console.log("请求失败处理");
          }
        );
      },
      searchMonthEmployee() {
        var Uid = this.userId = this.empId;
        this.ryScheduleListName = this.empName;
        var obj = new Object();
        obj.userId = Uid;
        obj.startTime = this.year + "-" + this.month + "-" + this.day;
        obj.endTime = this.year + "-" + this.month + "-" + this.day;
        obj.flag = this.flag;
        if (isBlank(Uid)) {
          console.log("未选择员工!");
        } else {
          this.requestData(obj);
        }
        this.clearAll();
        this.Day();
        this.Month_Day();
      },
      getEmpData(emp) {
        var Uid = this.userId = emp.account;
        this.ryScheduleListName = emp.name;
        var obj = new Object();
        obj.userId = Uid;
        obj.startTime = this.year + "-" + this.month + "-" + this.day;
        obj.endTime = this.year + "-" + this.month + "-" + this.day;
        // obj.userId = 1061;
        // obj.startTime = '2017-01-01';
        // obj.endTime = '2017-01-31';
        obj.flag = this.flag;
        if (isBlank(Uid)) {
          console.log("未选择员工!");
        } else {
          this.requestData(obj);
        }
        this.clearAll();
        this.Day();
        this.Month_Day();
      },
      last() {
        if (this.month > 1) {
          this.month = this.month - 1;
        }
        if (this.month === 1) {
          this.month = 12;
          this.year = this.year - 1;
        }

        var Uid = this.userId;
        var obj = new Object();
        obj.userId = Uid;
        obj.startTime = this.year + "-" + this.month + "-" + this.day;
        obj.endTime = this.year + "-" + this.month + "-" + this.day;
        obj.flag = this.flag;
        if (isBlank(Uid)) {
          console.log("未选择员工!");
        } else {
          this.requestData(obj);
        }

        this.clearAll();
        this.Day();
        this.Month_Day();
      },
      next() {
        if (this.month < 12) {
          this.month = this.month + 1;
        }
        if (this.month === 12) {
          this.month = 1;
          this.year = this.year + 1;
        }
        this.clearAll();
        this.Day();
        this.Month_Day();

        var Uid = this.userId;
        var obj = new Object();
        obj.userId = Uid;
        obj.startTime = this.year + "-" + this.month + "-" + this.day;
        obj.endTime = this.year + "-" + this.month + "-" + this.day;
        obj.flag = this.flag;
        if (isBlank(Uid)) {
          console.log("未选择员工!");
        } else {
          this.requestData(obj);
        }
      },
      clearAll() {
        var daterow = document.getElementById("day");
        var child = document.getElementsByClassName("everyday");
        var length = child.length;
        for (var i = 7; i < length; i++) {
          daterow.removeChild(child[7]);
        }
      },
      Month_Day() {
        document.getElementById("yearMonth").innerHTML = this.year + "年" + this.month + "月";
      },
      Month() {
        //判断月分是大月还是小月
        //就可以得出这个月除了2月外是30天还是31天
        if (this.month !== 2) {
          if (this.month === 4 || this.month === 6 || this.month === 9 || this.month === 11)
            this.allday = 30;
          else
            this.allday = 31;
        } else {
          //判断是否是闰年
          if (this.year % 4 === 0 && this.year % 100 !== 0 || this.year % 400 === 0)
            this.allday = 29;
          else
            this.allday = 28;
        }
      },
      Day() {
        //得到界面上上一个月和下一月按钮之间的时间更新显示
        this.Month_Day();
        //得到月的天数
        this.Month();
        var firstday = new Date(this.year, this.month - 1, 1);
        var xinqi = firstday.getDay();

        var daterow = document.getElementById("day");

        //显示星期
        if (xinqi !== 0) {
          for (var i = 0; i < xinqi; i++) {
            var dayelement = document.createElement("div");
            dayelement.className = "everyday";
            dayelement.innerHTML = "";
            daterow.appendChild(dayelement);
          }
        }

        //显示每一天的号数
        for (var j = 1; j <= this.allday; j++) {
          var dayelement = document.createElement("div");
          dayelement.className = "everyday";
          if (this.ryScheduleList.length > 0) {
              dayelement.innerHTML = j + "<br/><span>" + this.ryScheduleList[j - 1] + "</span>";
          } else {
            dayelement.innerHTML = j;
          }
          if (day === j)
            dayelement.style.color = "red";
          daterow.appendChild(dayelement);
        }
      },
      //将day方法导出
      sendApproves() {
        CallVueMethod.setApproves(this.Day());
      },
      retEmpData(emp) {
        var v = {};
        v = emp;
        if (this.isBlank(v.name)) {
          this.userId = "";
          this.ryScheduleListName = '未选择员工';
        } else {
          this.userId = v.account;
          this.ryScheduleListName = v.name;
        }

        var obj = new Object();
        obj.userName = this.searchWords;
        obj.startTime = this.year + "-" + this.month + "-" + this.day;
        obj.endTime = this.year + "-" + this.month + "-" + this.day;
        obj.flag = this.flag;
        this.requestData(obj);
        this.clearAll();
        this.Day();
        this.Month_Day();
      },
      //根据姓名查询排班计划
      searchShifts() {
        if (isBlank(this.searchWords)) {
          alert('名字不能为空！');
          return;
        }
        this.$refs.deptEmp.searchEmp(this.searchWords);
      },
      setEmp(emp) {
        alert(emp.id + "##" + emp.name)
        this.userId = emp.id;
        this.ryScheduleListName = emp.name;
      }
    },
    mounted() {
      this.sendApproves();
      $(function() {
        CallVueMethod.getApproves();
      });
      //this.init();
    }
  }
  /*日历表格
  * init() {
  			$(function() {
  				var ss = new Date();
  				var year = ss.getFullYear();
  				var month = ss.getMonth() + 1;
  				var day = ss.getDate();
  				var allday = 0;

  				function last() {
  					if (month > 1) {
  						month = month - 1;
  					}
  					if (month === 1) {
  						month = 12;
  						year = year - 1;
  					}
  					clearAll();
  					Day();
  					Month_Day();
  				}

  				function next() {
  					if (month < 12) {
  						month = month + 1;
  					}
  					if (month === 12) {
  						month = 1;
  						year = year + 1;
  					}
  					clearAll();
  					Day();
  					Month_Day();
  				}

  				function clearAll() {
  					var daterow = document.getElementById("day");
  					var child = document.getElementsByClassName("everyday");
  					var length = child.length;
  					for (var i = 7; i < length; i++) {
  						daterow.removeChild(child[7]);
  					}
  				}

  				function Month_Day() {
  					document.getElementById("yearMonth").innerHTML = year + "年" + month + "月";
  				}
  				//Month() 获取每个月里面有多少天
  				function Month() {
  					//判断月分是大月还是小月
  					//就可以得出这个月除了2月外是30天还是31天
  					if (month !== 2) {
  						if (month === 4 || month === 6 || month === 9 || month === 11)
  							allday = 30;
  						else
  							allday = 31;
  					} else {
  						//判断是否是闰年
  						if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)
  							allday = 29;
  						else
  							allday = 28;
  					}
  				}

  				function Day() {
  					//得到界面上上一个月和下一月按钮之间的时间更新显示
  					Month_Day();
  					//得到月的天数
  					Month();
  					var firstday = new Date(year, month - 1, 1);
  					var xinqi = firstday.getDay();

  					var daterow = document.getElementById("day");

  					//显示星期
  					if (xinqi !== 0) {
  						for (var i = 0; i < xinqi; i++) {
  							var dayelement = document.createElement("div");
  							dayelement.className = "everyday";
  							dayelement.innerHTML = "";
  							daterow.appendChild(dayelement);
  						}
  					}
  					//显示每一天的号数
  					for (var j = 1; j <= allday; j++) {
  						var dayelement = document.createElement("div");
  						dayelement.className = "everyday";
  						dayelement.innerHTML = j + "排班";
  						if (day === j)
  							dayelement.style.color = "red";
  						daterow.appendChild(dayelement);
  					}
  				}

  				Day();
  			});
  		},*/
</script>

<style>
  /*@import url("../../../../assets/css/kalendar.css");*/
  #firstLayer {
    width: 400px;
    /*让整个日历在页面中间显示*/
    margin: 0 auto;
  }

  /* button {
		width: 25%;
		float: left;
	} */

  #yearMonth {
    width: 50%;
    float: left;
    text-align: center;
  }

  .everyday {
    width: 14%;
    float: left;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: center;
  }
</style>
