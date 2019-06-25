<template>
  <div id="wrapper">
    <!-- /. NAV SIDE  -->
    <div id="page-wrapper">
      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <h1 class="page-header">
              招聘效果评估分析表
              <!-- <small>Responsive tables</small> -->
            </h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <!-- Advanced Tables -->
            <div class="panel panel-default">
              <div></div>
              <ul class="panel-condition">
                <dlp></dlp>
                <li class="m-l-s">
                  <span class="countdate">统计日期：</span>
                  <input type="date" class="form-control" v-model="startTime">
                </li>
                <li class="m-l-s">
                  <span class="countdate">~ &nbsp;&nbsp;&nbsp;</span>
                  <input type="date" class="form-control" v-model="endTime">
                </li>

                <button class="btn btn-default m-l-h" @click="getEffectiveness">查询</button>
              </ul>

              <div class="panel-body">
                <div>
                  <div class="col-md-12">
                    <table id="table_zz_01" class="table table-bordered context-menu-one">
                      <caption>招聘分析</caption>
                      <tbody>
                        <tr>
                          <td>部门</td>
                          <td>岗位</td>
                          <td>缺编人数</td>
                          <td>月初人数</td>
                          <td>计划招聘</td>
                          <td>到面人数</td>
                          <td>合格人数</td>
                          <td>入职人数</td>
                          <td>月末人数</td>
                          <td>有效率</td>
                          <td>达成率</td>
                        </tr>
                        <tr v-for="(item,index) in inforEffect.candidates" :key="index">
                          <td>{{item.department}}</td>
                          <td>{{item.position}}</td>
                          <td>{{item.lackNum}}</td>
                          <td>{{item.planNum}}</td>
                          <td>{{item.faceCount}}</td>
                          <td>{{item.begMonCount}}</td>
                          <td>{{item.qualifiedCount}}</td>
                          <td>{{item.entryCount}}</td>
                          <td>{{item.endMonCount}}</td>
                          <td>{{item.effectiveMix}}</td>
                          <td>{{item.reachMix}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p class="text-right">
                    <small>招聘有效率=合格人数+到面人数×100% 招聘达成率=入职人数+到面人数×100%</small>
                  </p>

                  <div class="col-md-12">
                    <table id="table_zz_05" class="table table-bordered context-menu-one">
                      <caption>渠道分析</caption>
                      <tbody>
                        <tr>
                          <td colspan="2">招聘渠道</td>
                          <td colspan="2">岗位</td>
                          <td colspan="2">发布人数</td>
                          <td colspan="2">应聘人数</td>
                          <td colspan="2">合格人数</td>
                          <td colspan="2">入职人数</td>
                          <td colspan="2">反馈率</td>
                          <td colspan="2">有效率</td>
                          <td colspan="2">达成率</td>
                        </tr>

                        <tr v-for="(item,index) in inforEffect.recruitChannel" :key="index">
                          <td colspan="2">{{item.channel}}</td>
                          <td colspan="2">{{item.position}}</td>
                          <td colspan="2">{{item.publishNum}}</td>
                          <td colspan="2">{{item.faceCount}}</td>
                          <td colspan="2">{{item.begMonCount}}</td>
                          <td colspan="2">{{item.entryCount}}</td>
                          <td colspan="2">{{item.feedbackMix}}</td>
                          <td colspan="2">{{item.effectiveMix}}</td>
                          <td colspan="2">{{item.reachMix}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p class="text-right">
                  <small>渠道反馈率=应聘人数+发布人数×100% 渠道有效率=合格人数+发布人数×100% 渠道达成率=入职人数×100%</small>
                </p>
              </div>
            </div>
            <!--End Advanced Tables -->
          </div>
        </div>
        <!-- /. ROW  -->
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import dlp from "../vuecommon/departLinkPosition.vue";
import datetime from "../vuecommon/datetime.vue";

/**
 * 这个导入路径没有提示。按照自己的路径写，按提示可能不能实现，具体原因不详
 */
export default {
  name: "poresonnel",
  components: {
    dlp,
    datetime
  },
  // props:['faasdfsdfsadfasdf'],
  data() {
    return {
      // 部门列表
      departmentList: [], //排序后添加级别前缀
      departmentListSource: [], //没有进行排序的源数据

     

      state: 1,
      sumCount: "", //总数
      education: {}, //教育列表
      teShuPuGang: {}, //特殊普岗
      zuZhangGangWei: {}, //组长普岗
      buZhangZongJian: {}, //部长总监
      work: {}, //工作
      sex: {}, //性别
      zhuLiGangWei: {}, //主力岗位
      jiChuPuGang: {}, //基础普岗
      age: {}, //年龄
      zhuGuanGangWei: {}, //主管岗位

      startTime: this.getCurrentDay, //统计开始日期
      endTime: this.getCurrentDay, //统计结束日期
      inforEffect: [],
      departmentPosition: [],
      recruitDepartmentId: ""
    };
  },
  mounted(){  
			const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = '../../static/js/copyexcel.js';
			document.body.appendChild(s);
	},
  methods: {
    requireAllInfo: function() {
      // 				alert(this.$store.state.count)
      // 				console.log(this.$store.state.count)
      //alert(this.getMonthFirstDay);
    },
    //获取部门名字和id
    departChange:function(departId,department) {
      this.recruitDepartmentId = departId;
      this.newRecruitDepartmentId = departId;
    },
    positionChange:function(positionId,positionName){
			alert(positionId+'positionId----positionName'+positionName)
		},

    // 获取招聘效果评估表内容
    getEffectiveness() {
      //alert(this.recruitDepartmentId);
      var url = this.url + "/ryxxlController/queryRecruit";
      axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": this.contentType,
          "Access-Token": this.accessToken
        },
        data: {
          begDate: this.startTime,
          endDate: this.endTime,
          deptId: this.departId,
          posId: ""
        },
        dataType: "json"
      })
        .then(response => {
          if (response.data.retCode == "0000") {
            this.inforEffect = response.data.retData;
            console.log(response.data.retData);
          } else {
            console.log(response.data);
            //alert(response.data.retMsg);
          }
        })
        .catch(function(error) {
          console.log("请求失败处理");
        });
    },

    getdepartmentPosition() {
      var url = this.url + "/kqParamSetContr/queryDepartmentPosition";
      axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": this.contentType,
          "Access-Token": this.accessToken
        },
        data: {
          deptId: this.recruitDepartmentId
        },
        dataType: "json"
      })
        .then(response => {
          if (response.data.retCode == "0000") {
            this.departmentPosition = response.data.retData;
            console.log(response.data.retData);
          } else {
            console.log(response.data);
            //alert(response.data.retMsg);
          }
        })
        .catch(function(error) {
          console.log("请求失败处理");
        });
    }
  },
  created() {
    this.getEffectiveness();
    this.getdepartmentPosition();
  }
};
</script>




<style>
@import "../../assets/css/effectiveness.css";
</style>
