<template>

  <div id="page-inner">
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2> 人力资源异动分析表</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <!-- Advanced Tables -->
        <div class="panel panel-default">
          <div class="panel-heading">
            人力资源异动分析表
          </div>
          <div>

          </div>
          <ul class="panel-condition">
            <li>
              <span class="countdate">部门：</span>
              <department ref='department' @getDeptObj='getDeptObj'></department>
            </li>
            <li>
              <span class="countdate">统计日期：</span>
             <!-- <input type="date" class="form-control" id="firstTime" v-model="datastatistics"> -->
              <datePicker id="firstTime" v-model="datastatistics"></datePicker>
            </li>
            <li>
              <span class="countdate">部门层级：</span>
              <select class="form-control selectpicker" title="全部" v-model="level">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </li>
            <button class="btn btn-default" @click="queryAbnormalPlan()">查询</button>
            <button class="btn btn-default" @click="dowmelxe('人力资源异动分析表')">导出</button>
          </ul>

          <div class="panel-body">
            <div class="table-responsive">
              <div class="col-md-12">
                <table id="table_yd_01" class="table  table-bordered  context-menu-one">
                  <tbody>
                    <tr>
                      <td rowspan="2" class="tab-lh">部门</td>
                      <td rowspan="2" class="tab-lh">平均人数</td>
                      <td rowspan="2" class="tab-lh">月初人数</td>
                      <td rowspan="2" class="tab-lh">入职人数</td>
                      <td colspan="5">本月离职</td>
                      <td colspan="7">本月异动</td>
                      <td rowspan="2" class="tab-lh">月末人数</td>
                    </tr>
                    <tr>
                      <td>小计1</td>
                      <td>辞职</td>
                      <td>辞退</td>
                      <td>其他</td>
                      <td>离职率</td>
                      <td>小计2</td>
                      <td>调入</td>
                      <td>调出</td>
                      <td>晋升</td>
                      <td>降职</td>
                      <td>换岗</td>
                      <td>异动率</td>
                    </tr>
                    <!--  -->
                    <tr v-for="(item,index) in outEmp" :key="index">
                      <td v-html="item.preFixName">{{item.preFixName}}</td>
                      <td>{{item.avgCount}}</td>
                      <td>{{item.begMonCount}}</td>
                      <td>{{item.entryCount}}</td>
                      <td>{{item.count}}</td>
                      <td>{{item.resignation}}</td>
                      <td>{{item.dismiss}}</td>
                      <td>{{item.unKnow}}</td>
                      <td>{{item.quitMix}}%</td>
                      <td>{{item.total}}</td>
                      <td>{{item.diaoRu}}</td>
                      <td>{{item.diaoChu}}</td>
                      <td>{{item.jinSheng}}</td>
                      <td>{{item.jiangZhi}}</td>
                      <td>{{item.change}}</td>
                      <td>{{item.changeMix}}%</td>
                      <td>{{item.endMonCount}}</td>
                    </tr>
                    <!-- <tr>
											<td>合计</td>
											<td>{{abnormalist.avgCount}}</td>
											<td>{{abnormalist.begMonCount}}</td>
											<td>{{abnormalist.entryCount}}</td>
											<td>{{abnormalist.count}}</td>
											<td>{{abnormalist.resignation}}</td>
											<td>{{abnormalist.dismiss}}</td>
											<td>{{abnormalist.unKnow}}</td>
											<td>{{abnormalist.resignationMix}}</td>
											<td>{{abnormalist.total}}</td>
											<td>{{abnormalist.diaoRu}}</td>
											<td>{{abnormalist.diaoChu}}</td>
											<td>{{abnormalist.jinSheng}}</td>
											<td>{{abnormalist.jiangZhi}}</td>
											<td>{{abnormalist.change}}</td>
											<td>{{abnormalist.changeMix}}</td>
											<td>{{abnormalist.endMonCount}}</td>
										</tr> -->
                  </tbody>
                </table>
              </div>
            </div>
            <p class="text-right"><small>评价人数=（月初人数+月末人数）÷2&emsp;&emsp;离职率=离职人数÷评价人数&emsp;&emsp;小计2=晋升+降职+换岗&emsp;&emsp;异动率=异动人数÷平均人数<br />鼠标右键可全选、复制</small></p>
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
  import datePicker from 'vue2-datepicker'
  import department from '../vuecommon/department.vue'
  import {
    exportTableToExcel
  } from 'vendor/Export2Excel.js'
  /**
   * 这个导入路径没有提示。按照自己的路径写，按提示可能不能实现，具体原因不详
   */
  export default {
    name: 'abnormal',
    components: {
      department,
      datePicker
    },

    data() {
      return {
        level: 1,
        datastatistics: this.getCurrentDay,
        outEmp: [],
        recruitDepartmentId: ''
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
      getDeptObj(dept) {
        if (this.isBlank(dept.level)) {
          this.level = 1;
        } else {
          this.level = dept.level;
        }
        this.recruitDepartmentId = dept.id == '0' ? '' : dept.id;
      },
      //查询异动分析
      queryAbnormalPlan() {
        if(this.isBlank(this.datastatistics)){
          alert("查询时间不能为空!");
          return;
        }
        axios({
          method: 'post',
          url: this.url + '/ryxxlController/queryChanges',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.recruitDepartmentId,
            begDate: this.moment(this.datastatistics,'YYYY-MM-DD'),
            level: this.level,
          },
          dataType: 'json',
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.outEmp = response.data.retData.outEmp
          } else {
            alert(response.data.retMsg);
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      dowmelxe: function(name) {
        if (confirm("确定导出?") == false) {
          return;
        }
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = myDate.getDate();
        exportTableToExcel('table_yd_01', name + '_' + year + '_' + month + '_' + date);
      }
    },
    created() {
      this.queryAbnormalPlan()
    }
  }
</script>


<style>
  @import '../../assets/css/poresonnel.css';
</style>
