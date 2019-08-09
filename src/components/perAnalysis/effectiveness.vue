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
                <dlp @departChange='departChange' @positionChange='positionChange'></dlp>
                <li class="m-l-s">
                  <span class="countdate">统计日期：</span>
                  <!-- <input type="date" class="form-control" v-model="startTime"> -->
                  <datePicker v-model="startTime"></datePicker>
                </li>
                <li class="m-l-s">
                  <span class="countdate">~ &nbsp;&nbsp;&nbsp;</span>
                  <!-- <input type="date" class="form-control" v-model="endTime"> -->
                  <datePicker v-model="endTime"></datePicker>
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
                          <td>{{item.begMonCount}}</td>
                          <td>{{item.planNum}}</td>
                          <td>{{item.faceCount}}</td>
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
                          <td colspan="2">{{item.candidates}}</td>
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
  import datePicker from 'vue2-datepicker'
  import dlp from "../vuecommon/departLinkPosition.vue";

  export default {
    name: "poresonnel",
    components: {
      dlp,
      datePicker
    },
    data() {
      return {
        startTime: this.getCurrentDay, //统计开始日期
        endTime: this.getCurrentDay, //统计结束日期
        inforEffect: [],
        recruitDepartmentId: '',
        positionId: ''
      };
    },
    mounted() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '@/../static/js/copyexcel.js';
        document.body.appendChild(s);
    },
    methods: {
      //获取部门名字和id
      departChange: function(departId, department) {
        this.recruitDepartmentId = departId == 0 ? '' : departId;
        this.positionId = '';
      },
      positionChange: function(positionId, positionName) {
        this.positionId = positionId == 0 ? '' : positionId;
      },
      // 获取招聘效果评估表内容
      getEffectiveness() {
        if (this.isBlank(this.startTime) || this.isBlank(this.endTime)) {
          alert("查询时间不能为空!");
          return;
        }
        var url = this.url + "/ryxxlController/queryRecruit";
        axios({
            method: "post",
            url: url,
            headers: {
              "Content-Type": this.contentType,
              "Access-Token": this.accessToken
            },
            data: {
              begDate: this.moment(this.startTime,"YYYY-MM-DD"),
              endDate: this.moment(this.endTime,"YYYY-MM-DD"),
              deptId: this.recruitDepartmentId,
              posId: this.positionId
            },
            dataType: "json"
          })
          .then(response => {
            if (response.data.retCode == "0000") {
              this.inforEffect = response.data.retData;
              console.log(response.data.retData);
            } else {
              console.log(response.data);
            }
          })
          .catch(function(error) {
            console.log("请求失败处理");
          });
      }
    },
    created() {
      this.getEffectiveness();
    }
  }
</script>




<style>
  @import "../../assets/css/effectiveness.css";
</style>
