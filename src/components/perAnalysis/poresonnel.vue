<template>

  <div id="page-inner">
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>在职人员分析表</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <!-- Advanced Tables -->
        <div class="panel panel-default">
          <div class="panel-heading">
            在职人员分析表
          </div>
          <div>

          </div>
          <ul class="panel-condition">
            <li>
              <span class="countdate">部门：</span>
              <department ref='department' @departChange='departChange'></department>
            </li>
            <li>
              <span class="countdate">统计日期：</span>
              <!-- <input type="date" class="form-control" id="firstTime" v-model="datastatistics"> -->
              <datePicker id="firstTime" v-model="datastatistics"></datePicker>
            </li>
            <li>
              <span class="countdate">日期类型：</span>
              <select class="form-control" title="全部" v-model="state">
                <option value="0">入职日期</option>
                <option value="1">转正日期</option>
              </select>
            </li>
            <li>
              <span>包含非正式员工</span>
              <input type="checkbox" v-on:click="CheckItem(item)" v-model="item" name="checkbox">
            </li>

            <button type="button" class="btn btn-default" @click="queryPoresonnelPlan">查询</button>
          </ul>

          <div class="panel-body">
            <div class="table-responsive">
              <div class="col-md-7">
                <table id="table_zz_01" class="table table-bordered context-menu-one">
                  <caption>工龄分析</caption>
                  <tbody>
                    <tr>
                      <td>1-3月</td>
                      <td>4-6月</td>
                      <td>7月-1年</td>
                      <td>满1年</td>
                      <td>满2年</td>
                      <td>3年以上</td>
                      <td>平均工龄</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.work.oneThreeCount}}</td>
                      <td>{{poresonnel.work.fourSixCount}}</td>
                      <td>{{poresonnel.work.sevenCount}}</td>
                      <td>{{poresonnel.work.oneYearCount}}</td>
                      <td>{{poresonnel.work.twoYearCount}}</td>
                      <td>{{poresonnel.work.threeYearCount}}</td>
                      <td>{{poresonnel.work.avgWorkCount}}</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.work.oneThreeMix}}</td>
                      <td>{{poresonnel.work.fourSixMix}}</td>
                      <td>{{poresonnel.work.sevenMix}}</td>
                      <td>{{poresonnel.work.oneYearMix}}</td>
                      <td>{{poresonnel.work.twoYearMix}}</td>
                      <td>{{poresonnel.work.threeYearMix}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-5">
                <table id="table_zz_02" class="table table-bordered context-menu-one">
                  <caption>教育结构分析</caption>
                  <tbody>
                    <tr>
                      <td>初中及以下</td>
                      <td>高中/中专</td>
                      <td>大专</td>
                      <td>本科及以上</td>
                      <td>其他</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.education.chuzhong}}</td>
                      <td>{{poresonnel.education.gaozhong}}</td>
                      <td>{{poresonnel.education.zhuanke}}</td>
                      <td>{{poresonnel.education.benke}}</td>
                      <td>{{poresonnel.education.qita}}</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.education.chuzhongMix}}</td>
                      <td>{{poresonnel.education.gaozhongMix}}</td>
                      <td>{{poresonnel.education.zhuankeMix}}</td>
                      <td>{{poresonnel.education.benkeMix}}</td>
                      <td>{{poresonnel.education.qitaMix}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-7">
                <table id="table_zz_03" class="table table-bordered context-menu-one">
                  <caption>年龄结构分析</caption>
                  <tbody>
                    <tr>
                      <td>20及以下</td>
                      <td>21-25</td>
                      <td>26-30</td>
                      <td>31-35</td>
                      <td>36-40</td>
                      <td>40岁以上</td>
                      <td>平均年龄</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.age.twentyAge}}</td>
                      <td>{{poresonnel.age.twentyOneAge}}</td>
                      <td>{{poresonnel.age.twentySixAge}}</td>
                      <td>{{poresonnel.age.thirtyOneAge}}</td>
                      <td>{{poresonnel.age.thirtySixAge}}</td>
                      <td>{{poresonnel.age.fortyAge}}</td>
                      <td>{{poresonnel.age.avgAge}}</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.age.twentyAgeMix}}</td>
                      <td>{{poresonnel.age.twentyOneAgeMix}}</td>
                      <td>{{poresonnel.age.twentySixAgeMix}}</td>
                      <td>{{poresonnel.age.thirtyOneAgeMix}}</td>
                      <td>{{poresonnel.age.thirtySixAgeMix}}</td>
                      <td>{{poresonnel.age.fortyAgeMix}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-md-5">
                <table id="table_zz_04" class="table table-bordered context-menu-one">
                  <caption>性别分析</caption>
                  <tbody>
                    <tr>
                      <td>总人数</td>
                      <td>男</td>
                      <td>女</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.sumCount}}</td>
                      <td>{{poresonnel.sex.man}}</td>
                      <td>{{poresonnel.sex.girl}}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{{poresonnel.sex.manMix}}</td>
                      <td>{{poresonnel.sex.girlMix}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-md-12">
                <table id="table_zz_05" class="table table-bordered context-menu-one">
                  <caption>层次分析</caption>
                  <tbody>
                    <tr>
                      <td rowspan="2" class="tab-lh">月末人数</td>
                      <td colspan="2">特殊岗位</td>
                      <td colspan="2">基础岗位</td>
                      <td colspan="2">资深岗位</td>
                      <td colspan="2">组长岗位</td>
                      <td colspan="2">主管岗位</td>
                      <td colspan="2">部长总监</td>
                      <td colspan="2">主力岗位</td>
                    </tr>
                    <tr>
                      <td>人数</td>
                      <td>比例</td>
                      <td>人数</td>
                      <td>比例</td>
                      <td>人数</td>
                      <td>比例</td>
                      <td>人数</td>
                      <td>比例</td>
                      <td>人数</td>
                      <td>比例</td>
                      <td>人数</td>
                      <td>比例</td>
                      <td>人数</td>
                      <td>比例</td>
                    </tr>
                    <tr>
                      <td>{{poresonnel.sumCount}}</td>
                      <td>{{poresonnel.teShuPuGang.positionTypeCount}}</td>
                      <td>{{poresonnel.teShuPuGang.positionTypeMix}}</td>
                      <td>{{poresonnel.jiChuPuGang.positionTypeCount}}</td>
                      <td>{{poresonnel.jiChuPuGang.positionTypeMix}}</td>
                      <td>{{poresonnel.ziShenGangWei.positionTypeCount}}</td>
                      <td>{{poresonnel.ziShenGangWei.positionTypeMix}}</td>
                      <td>{{poresonnel.zuZhangGangWei.positionTypeCount}}</td>
                      <td>{{poresonnel.zuZhangGangWei.positionTypeMix}}</td>
                      <td>{{poresonnel.zhuGuanGangWei.positionTypeCount}}</td>
                      <td>{{poresonnel.zhuGuanGangWei.positionTypeMix}}</td>
                      <td>{{poresonnel.buZhangZongJian.positionTypeCount}}</td>
                      <td>{{poresonnel.buZhangZongJian.positionTypeMix}}</td>
                      <td>{{poresonnel.zhuLiGangWei.positionTypeCount}}</td>
                      <td>{{poresonnel.zhuLiGangWei.positionTypeMix}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <p class="text-right"><small>鼠标右键可全选、复制</small></p>
          </div>
        </div>
        <!--End Advanced Tables -->
      </div>
    </div>
    <!-- /. ROW  -->

  </div>

</template>


<script>
  import axios from 'axios'
  import $ from 'jquery'
  import department from '../vuecommon/department.vue'
  import datePicker from 'vue2-datepicker'

  /**
   * 这个导入路径没有提示。按照自己的路径写，按提示可能不能实现，具体原因不详
   */
  export default {
    name: 'poresonnel',
    components: {
      department,
      datePicker
    },
    data() {
      return {
        state: 0,
        datastatistics: this.getCurrentDay,
        item: '',
        itemer: '0',
        newRecruitDepartmentId: '',
        poresonnel: {
          sumCount: '', //总数
          education: {}, //教育列表
          work: {}, //工作
          sex: {}, //性别
          age: {}, //年龄
          zhuGuanGangWei: {}, //主管岗位
          teShuPuGang: {}, //特殊普岗
          zuZhangGangWei: {}, //组长普岗
          buZhangZongJian: {}, //部长总监
          zhuLiGangWei: {}, //主力岗位
          jiChuPuGang: {}, //基础普岗
          ziShenGangWei: {} //资深岗位
        },
      }
    },
    mounted() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = '@/../static/js/copyexcel.js';
      document.body.appendChild(s);
    },
    methods: {
      //获取部门名字和id
      departChange(departId) {
        this.newRecruitDepartmentId = departId
      },
      //勾选
      CheckItem: function(item) {
        if (item == false) {
          this.itemer = ''
        } else {
          this.itemer = '0'
        }
      },
      //查询在职分析
      queryPoresonnelPlan() {
        if (this.isBlank(this.datastatistics)) {
          alert("查询时间不能为空!");
          return;
        }
        axios({
          method: 'post',
          url: this.url + '/ryxxlController/queryZzryReport',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.newRecruitDepartmentId == '0' ? '' : this.newRecruitDepartmentId, //部门id
            date: this.moment(this.datastatistics,'YYYY-MM-DD'),
            flag: this.state,
            incude: this.itemer,
          },
          dataType: 'json',
        }).then((response) => {
          //console.log(response.data.retMsg)
          if (response.data.retCode == '0000') {
            this.poresonnel = response.data.retData
          } else {
            alert(response.data.retMsg);
          }
          // this.sumCount = response.data.retData.sumCount//总数
          // this.education = response.data.retData.education//教育列表
          // this.teShuPuGang = response.data.retData.teShuPuGang//特殊普岗
          // this.zuZhangGangWei = response.data.retData.zuZhangGangWei//组长普岗
          // this.buZhangZongJian = response.data.retData.buZhangZongJian//部长总监
          // this.work = response.data.retData.work//工作
          // this.sex = response.data.retData.sex//性别
          // this.zhuLiGangWei = response.data.retData.zhuLiGangWei//主力岗位
          // this.jiChuPuGang = response.data.retData.jiChuPuGang//基础普岗
          // this.age = response.data.retData.age//年龄
          // this.zhuGuanGangWei = response.data.retData.zhuGuanGangWei//主管岗位
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },

    },
    created() {
      this.queryPoresonnelPlan()
    }
  }
</script>

<style>
  @import '../../assets/css/poresonnel.css';
</style>
