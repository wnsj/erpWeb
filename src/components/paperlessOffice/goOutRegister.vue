<template>
  <div class="container user-container">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-title">
        <h2>外出登记</h2>

      </div>
    </div>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>部门：</p>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <department ref='department' @departChange='departChange'></department>
        </div>
      </div>


      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>是否取消：</p>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">

          <label class="radio-inline">
            <input type="radio" v-model="goOutDelete" @change="listGoOutDeleteRadio('')" name="isCancel" value=""> 全部
          </label>
          <label class="radio-inline">
            <input type="radio" v-model="goOutDelete" @change="listGoOutDeleteRadio('1')" name="isCancel" value="1"> 是
          </label>
          <label class="radio-inline">
            <input type="radio" v-model="goOutDelete" @change="listGoOutDeleteRadio('2')" name="isCancel" value="2"> 否
          </label>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <label class="control-label">外出人：</label>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <div>
            <input type="text" v-model="goOutName" class="form-control">
          </div>
        </div>
      </div>


      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>意见：</p>
        </div>
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">

          <label class="radio-inline">
            <input type="radio" name="opinion" v-model="allAdvice" @change="listAllAdvicesRadio('1')" value="1"> 等待
          </label>
          <label class="radio-inline">
            <input type="radio" name="opinion" v-model="allAdvice" @change="listAllAdvicesRadio('2')" value="2"> 同意
          </label>
          <label class="radio-inline">
            <input type="radio" name="opinion" v-model="allAdvice" @change="listAllAdvicesRadio('3')" value="3"> 不同意
          </label>
          <label class="radio-inline">
            <input type="radio" name="opinion" v-model="allAdvice" @change="listAllAdvicesRadio('')" value=""> 全部
          </label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0px; line-height: 34px;">时间类型：</label>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <select class="form-control" v-model="state" id="selectDateType">
            <option value="">全部</option>
            <option value="goOutApplyTime">填表时间</option>
            <option value="goOutGoTime">外出时间</option>
            <option value="goOutComeTime">归岗时间</option>
          </select>
        </div>
      </div>

      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <datePicker v-model="begDate"></datePicker>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <span class="countdate">&nbsp;&nbsp;&nbsp; ~ </span>
        </div>
        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <datePicker v-model="endDate"></datePicker>
        </div>
      </div>

      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">

        <!--<label class="radio-inline">-->
          <!--<input type="radio" v-model="picked" name="date" value="beforeMonth"> 上月-->
        <!--</label>-->
        <!--<label class="radio-inline">-->
          <!--<input type="radio" v-model="picked" name="date" value="thisMonth"> 本月-->
        <!--</label>-->
        <!--<label class="radio-inline">-->
          <!--<input type="radio" v-model="picked" name="date" value="afterMonth"> 次月-->
        <!--</label>-->
        <!--<label class="radio-inline">-->
          <!--<input type="radio" v-model="picked" name="date" value="custom"> 自定义-->
        <!--</label>-->


        <input type="radio" name="date" value="1" v-model="listDateRadio" @click="lastMonth"/>
        <label class="control-label text-left nopad">上月</label>
        <input type="radio" name="date" value="2" v-model="listDateRadio" @click="currentMonth"/>
        <label class="control-label text-left nopad">本月</label>
        <input type="radio" name="date" value="3" v-model="listDateRadio" @click="nextMonth"/>
        <label class="control-label text-left nopad">次月</label>
        <input type="radio" name="date" value="4" v-model="listDateRadio" @click="currentDate"/>
        <label class="control-label text-left nopad">自定义</label>
      </div>

    </div>

    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <button type="button" class="btn btn-warning" @click="search">查询</button>
      </div>

      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <button type="button" class="btn btn-success" @click="addOrEditGoOutRegister('add','')">添加</button>
      </div>

      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <button type="button" class="btn btn-warning" @click="exportTableToExcel('goOutRegister','外出登记')">导出</button>
      </div>
    </div>


    <!--<div class="row add-mt">-->
      <!--<button type="button" class="btn btn-primary pull-right" @click="dowmelxe('人员需求表')">导出</button>-->
      <!--<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="showERInfo()">申请</button>-->
      <!--<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" v-on:click="checkEMPRequire()">查询</button>-->

    <!--</div>-->
    <!--<erApply @empRequireApply='feedbackApplyInfo'></erApply>-->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover user-table" id="goOutRegister">
            <thead>
            <tr>
              <th class="text-center">编号</th>
              <th class="text-center">填表日期</th>
              <th class="text-center">部门</th>
              <th class="text-center">外出人</th>
              <th class="text-center">申请人</th>
              <th class="text-center">目的地</th>
              <th class="text-center">外出事由</th>
              <th class="text-center">外出类型</th>
              <th class="text-center">外出时间</th>
              <th class="text-center">是否归岗</th>
              <th class="text-center">归岗时间</th>
              <th class="text-center">通知人</th>
              <th class="text-center">通知人意见</th>
              <th class="text-center">报备人</th>
              <th class="text-center">报备人意见</th>
              <th class="text-center">是否取消</th>
              <th class="text-center">查看</th>
              <th class="text-center">修改</th>
              <th class="text-center">处理</th>
            </tr>
            </thead>
            <tbody>
            <!--<tr v-for="(item,index) in goOutRegisterList" :key="index" :style="item.goOutDelete==='已取消'?'(background:'+'#df6859'+')':''">-->
            <tr v-for="(item,index) in goOutRegisterList" :key="index" :style="{'background-color':(item.goOutDelete==='已取消')?'#df6859':''}">
            <!--<tr v-for="(item,index) in goOutRegisterList" :key="index">-->
              <td class="text-center">{{item.id}}</td>
              <td class="text-center">{{item.goOutApplyTime}}</td>
              <td class="text-center">{{item.goOutDepartmentName}}</td>
              <td class="text-center">{{item.goOutName}}</td>
              <td class="text-center">{{item.goOutApplyName}}</td>
              <td class="text-center">{{item.goOutAddress}}</td>
              <td class="text-center">{{item.goOutRegion}}</td>

              <td class="text-center">{{item.goOutOthertype}}</td>
              <td class="text-center">{{item.goOutGoTime}}</td>
              <td class="text-center">{{item.goOutType}}</td>
              <td class="text-center">{{item.goOutComeTime}}</td>
              <td class="text-center">{{item.goOutTongzhiName}}</td>
              <td class="text-center">{{item.goOutTongzhiAdvice=='1'?'等待':(item.goOutTongzhiAdvice=='2'?'同意':'不同意')}}</td>

              <td class="text-center">{{item.goReportName}}</td>
              <td class="text-center">{{item.goReportAdvice=='1'?'等待':(item.goReportAdvice=='2'?'同意':'不同意')}}</td>

              <td class="text-center"><a href="javascript:void(0)" v-on:click="clickCancel(item)">{{item.goOutDelete}}</a></td>

              <td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
               @click="watchItem(item)">查看</button></td>
              <td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
                                              v-on:click="addOrEditGoOutRegister('edit',item)">修改</button></td>
              <td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
                                              v-on:click="handleThis(item)">处理</button></td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row row_edit">
        <div class="modal fade bs-example-modal-lg" id="myGoOutRegister">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">外出登记</h4>
              </div>
              <div class="modal-body">

                <form name="my_form">

                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                      <p>部门：</p>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <!--<department ref='department' @departChange='departChange'></department>-->
                      <select class="form-control" disabled="true" v-model="goOutRegisterBean.goOutDepartmentId" style="padding: 0; line-height: 34px;">
                        <option :value="goOutRegisterBean.goOutDepartmentId">{{goOutRegisterBean.goOutDepartmentName}}</option>

                      </select>
                      <!--<department ref='department' @departChange='departChange'></department>-->
                    </div>
                  </div>

                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 34px;">
                      <p>申请人姓名：</p>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      {{goOutRegisterBean.goOutApplyName}}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0px; line-height: 34px;">
                          <p>目的地：</p>
                        </div>
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                          <input type="text" v-model="goOutRegisterBean.goOutAddress" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="padding: 0px; line-height: 34px;">
                        <p>是否直接去：</p>
                      </div>
                      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <input type="radio" :disabled="isTodayGoingState" name="inlineRadioOptions" @change="isTodayGoing" value="2" v-model="goOutRegisterBean.goOutOthertype"> 是
                        <input type="radio" :disabled="isTodayGoingState" name="inlineRadioOptions" @change="isTodayGoing" value="1" v-model="goOutRegisterBean.goOutOthertype"> 否
                      </div>
                      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="padding: 0px; line-height: 34px;">
                        <p>当天是否归岗：</p>
                      </div>
                      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <input type="radio" :disabled="isTodayComeState" name="in" value="1" @change="isTodayCome"  v-model="goOutRegisterBean.goOutType"> 是
                        <input type="radio" :disabled="isTodayComeState" name="in" value="2" @change="isTodayCome" v-model="goOutRegisterBean.goOutType"> 否
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0px; line-height: 34px;">
                      <p>外出人姓名：</p>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <!--<textarea class="form-control" rows="4">{{rdInfo.account_Name}}</textarea>-->
                      <!--<select></select>-->
                      <select id="groupMember" class="sel-box" multiple style="width: 100%">
                        <option v-for="(item,index) in goOutRegisterBean.goOutNameArr" @click="goOutNameArrSelectedIndex(index)">{{item}}</option>
                      </select>
                      <br>
                      <select v-if="addGoOutNameState" v-model="getNameValues" @change='getNameValue'>
                        <option v-for="(item,index) in getOutDataList" :value="item.ACCOUNT_NAME">{{item.ACCOUNT_NAME}}</option>
                      </select>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0px; line-height: 34px;">
                      <button type="button" :disabled="gouOutNameButtonState" class="btn btn-warning pull-left m_r_12" @click="addGoOutNames('true')">+</button><br/>
                      <button type="button" :disabled="gouOutNameButtonState" class="btn btn-warning pull-left m_r_12" @click="deleteGoOutNameArrSelectedIndex">-</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <p>外出日期:</p>
                    </div>



                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 change_01">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 change_date">
                        <!--<textarea class="form-control" rows="4">{{addDate}}</textarea>-->
                        <select multiple style="width: 100%">
                          <option v-for="(item,index) in goOutRegisterBean.gotOutDateArr" :key='index' v-on:click="selectedDate(index)">{{item}}</option>
                        </select>

                      </div>
                    </div>




                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 change_02" >
                      <!--<datePicker v-model="endDate"></datePicker>-->

                      <dPicker :disabled="addGoOutTimeBtnState" style='width: 30px;' v-model='addDate' v-on:change="dateAdd()"><button class="btn btn-warning pull-left m_r_12" >+</button></dPicker><br>
                      <button :disabled="addGoOutTimeBtnState" type="button" class="btn btn-warning pull-left m_r_12" v-on:click="deleteDateTime()">-</button>
                    </div>
                  </div>

                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="row">
                      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <p>外出时间:</p>
                      </div>
                      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input type="time" :disabled="goOutGoTimeState" v-model="goOutGoTime"/>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <p>归岗时间:</p>
                      </div>
                      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input type="time" :disabled="goOutTypeState" v-model="goOutComeTime"/>
                      </div>
                    </div>

                  </div>

                </div>

                <div class="row">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <p>外出缘由：</p>
                  </div>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <textarea class="form-control" rows="3" v-model="goOutRegisterBean.goOutRegion"></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9"></div>

                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <button type="button" :disabled="submitBtnState" class="btn btn-primary" v-on:click="submitBtn()">
                      <p>提交</p>
                    </button>
                  </div>

                </div>
                </form>
              </div>

              <div class="modal-footer">
                <div class="row">
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
                    <h3>通知</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                      <p>负责人：</p>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <select class="form-control" :disabled="tongZhiFuzeRenListState" v-model="goOutRegisterBean.goOutTongzhiId">
                        <option v-for="(item,index) in goOutTongzhiList" v-bind:value="item.ACCOUNT_ID" :key='index'>{{item.EMP_NAME}}</option>

                      </select>
                    </div>
                    <div class="col-md-1">

                      <button type="button" :disabled="addTongZhiRenState" class="btn btn-warning pull-left m_r_10" @click="addTongZhiRenList">+</button>

                    </div>
                  </div>

                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <p>结果:</p>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <button type="button" class="btn btn-success" :disabled="tongZhiFuZeRenBtnState" @click="tongZhiRenAdvice('2')">同意</button>
                      <button type="button" class="btn btn-primary" :disabled="tongZhiFuZeRenBtnState" @click="tongZhiRenAdvice('3')">不同意</button>
                    </div>

                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="row">
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
                    <h3>报备</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                      <p>负责人：</p>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <select :disabled="baoBeiFuZeRenListState" class="form-control">
                          <option value="1127">李珊珊</option>
                      </select>
                    </div>
                    <div class="col-md-1">

                      <!--<button type="button" class="btn btn-warning pull-left m_r_10">+</button>-->

                    </div>
                  </div>

                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <p>结果:</p>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <button type="button" class="btn btn-success" :disabled="baoBeiFuZeRenBtnState" @click="baoBeiRenAdvice('2')">同意</button>
                      <button type="button" class="btn btn-primary" :disabled="baoBeiFuZeRenBtnState" @click="baoBeiRenAdvice('3')">不同意</button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="delcfmOverhaul">
      <div class="modal-dialog">
        <div class="modal-content message_align">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title">提示</h4>
          </div>
          <div class="modal-body">
            <p>您确认要取消吗？</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default"
                    data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
                    id="deleteHaulBtn" @click="submitCancel">确认</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
    </div>
</div>

        <!-- 模态框   信息取消确认 -->

</template>

<script>

  import axios from 'axios'
  import department from '../vuecommon/department.vue'
  import datePicker from 'vue2-datepicker'
  import dPicker from 'vue2-datepicker'

    export default {
        name: "goOutRegister",
        components: {
          department,
          datePicker,
          dPicker,
      },
      data() {
        // this.getEmployee()
        return {
          projectName: '0',
          state:"goOutApplyTime",
          goOutDelete:"",
          goOutRegisterList:[],
          goOutApplyId: "",
          goOutApplyName: "",
          goOutName: "",
          goOutApplyTime: "",

          goOutType: "",
          goOutDepartmentId: "",
          goOutDepartmentName: "",
          goOutInformId: "",
          begDate: this.getCurrentDay,
          endDate: this.getCurrentDay,


          allAdvice:"",
          listDateRadio:"2",
          //通知人列表
          goOutTongzhiList:[],
          modelType:"",
          addDate: '',
          selectedIndex:"",
          rdInfo:this.accountInfo(),//用户的基本信息
          //goDirectly:false,
          goOutComeTime: "17:31",//界面显示的归岗时间
          goOutGoTime: "08:29",//界面显示的外出时间
          goOutRegisterBean:{
            goOutApplyId:this.accountInfo().account_ID,//申请人id
            goOutName:this.accountInfo().account_Name,
            goOutApplyName:this.accountInfo().account_Name,
            goOutType:1,
            goOutRegion:"",
            goOutDepartmentId:this.accountInfo().departId,
            departName:this.accountInfo().departName,
            goOutDepartmentName:this.accountInfo().departName,
            goOutOthertype:"1",//外出类型【1：班中外出，2:班前外出】
            goOutInformId:"1",//外出通知人
            goOutType:"1",//当天是否归岗【1：是，2：否】
            goOutComeTime: "",
            goOutGoTime: "",
            goOutAddress:"",
            goOutTongzhiId:"",//通知人id
            goReportId:"1127",//报备人id
            goOutTongzhiAdvice:"1",//通知人意见【1：等待，2：同意，3：不同意】
            goOutOthertype:"1",//外出类型【1：班中外出，2:班前外出】
            goReportAdvice:"1",//报备人意见【1：等待，2：同意，3：不同意】
            gotOutDateArr:[],
            goOutNameArr:[],//this.accountInfo().account_Name
          },

          //扩大通知人列表按钮状态
          addTongZhiRenState:false,

          deptids:[this.accountInfo().departId],
          parentId:"",

          //通知负责人按钮组状态
          tongZhiFuZeRenBtnState:true,
          //报备负责人按钮组状态
          baoBeiFuZeRenBtnState:true,
          //添加外出人姓名，显示外出人列表下拉的状态
          addGoOutNameState:false,
          //该部门下所有的人
          getOutDataList:[],
          //选中的部门人员菜单项
          getNameValues:"",
          //记录当前选中的外出人序号
          goOutNameArrSelectedIndexs:"",
          //外出时间状态
          goOutGoTimeState:false,
          //归岗时间状态
          goOutTypeState:false,
          //是否直接去单选按钮组状态
          isTodayGoingState:false,
          //是否当天归岗单选按钮组状态
          isTodayComeState:false,
          //外出人添加按钮组状态
          gouOutNameButtonState:false,
          //添加外出日期按钮组状态
          addGoOutTimeBtnState:false,
          //提交按钮状态
          submitBtnState:false,
          //通知负责人下拉列表状态
          tongZhiFuzeRenListState:false,
          //报备负责人下拉列表状态
          baoBeiFuZeRenListState:false,

          //信息取消的id
          deleteHaulId:"",
          //修改和处理需要的记录id
          id:"",
          //扩大负责人范围按钮点击次数
          counts:1,
        }
      },

      methods: {
        getEmployee: function (param) {
          axios({
            method: 'post',
            url: this.url + '/goOutRegisterController/queryGoOutRegister',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: param,
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            this.goOutRegisterList=response.data.retData;
          }).catch(err => {
            console.log(err)
          });
        },
        listGoOutDeleteRadio(number){
          this.goOutDelete=number;
        },
        listAllAdvicesRadio(number){
          this.allAdvice=number;
        },
        //取消按钮点击事件
        clickCancel(item){
          console.log(item);
          if(item.goOutDelete=="已取消"){
            alert("已取消");
            return;
          }
          this.deleteHaulId=item.id;
          $("#delcfmOverhaul").modal("show");
        },
        //确认取消
        submitCancel(){
          axios({
            method: 'post',
            url: this.url + '/goOutRegisterController/updateGoOutDeleteById',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id:this.deleteHaulId
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            if(response.data.retCode=="0000"){
              $("#delcfmOverhaul").modal("hide");
              this.search();
            }else {
              alert("取消失败")
            }
          }).catch(err => {
            console.log(err)
          });
        },
        //通知人意见按钮
        tongZhiRenAdvice(id){
          if(window.confirm("是否确认")){
            axios({
              method: 'post',
              url: this.url + '/goOutRegisterController/updateAdvice',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id:this.id,
                goOutTongzhiId:this.goOutRegisterBean.goOutTongzhiId,
                goOutTongzhiAdvice:id,
                goReportId:null,
                goReportAdvice:null
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              if(response.data.retCode=="0000"){
                alert("操作完成");
                $("#myGoOutRegister").modal("hide");
                this.search();
              }else {
                alert("操作失败");
              }
            }).catch(err => {
              console.log(err)
            });
          }

        },
        //报备人意见按钮
        baoBeiRenAdvice(id){
          if(window.confirm("是否确认")){
            axios({
              method: 'post',
              url: this.url + '/goOutRegisterController/updateAdvice',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id:this.id,
                goOutTongzhiId:null,
                goOutTongzhiAdvice:null,
                goReportId:this.goOutRegisterBean.goReportId,
                goReportAdvice:id
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              if(response.data.retCode=="0000"){
                alert("操作完成");
                $("#myGoOutRegister").modal("hide");
                this.search();
              }else {
                alert("操作失败");
              }
            }).catch(err => {
              console.log(err)
            });
          }
        },
        //处理按钮点击事件
        handleThis(item){
          if(item.goOutDelete=="已取消"){
            alert("已取消，不用处理");
            return;
          }
          this.initGoOutRegisterBean();
          if(this.accountInfo().account_Name==item.goOutTongzhiName||this.accountInfo().account_Name==item.goReportName){
            console.log(item);
            if(this.accountInfo().account_Name==item.goOutTongzhiName){
              this.tongZhiFuZeRenBtnState=false;
            }
            if(this.accountInfo().account_Name==item.goReportName){
              this.baoBeiFuZeRenBtnState=false;
            }
            this.goOutTongzhiList=[
              {
                EMP_NAME:item.goOutTongzhiName,
                ACCOUNT_ID:item.goOutTongzhiId
              }
            ];
            this.goOutRegisterBean.goOutTongzhiId=item.goOutTongzhiId;
            this.goOutRegisterBean.goOutDepartmentName=item.goOutDepartmentName;
            //this.goOutRegisterBean.goOutName=item.
            this.goOutRegisterBean.goOutApplyName=item.goOutApplyName;
            this.goOutRegisterBean.goOutAddress=item.goOutAddress;
            this.goOutRegisterBean.goOutOthertype=item.goOutOthertype=="班中外出"?"1":"2";
            this.goOutRegisterBean.goOutType=item.goOutType=="否"?"2":"1";
            this.goOutRegisterBean.goOutNameArr=[
              item.goOutName
            ];
            this.goOutRegisterBean.gotOutDateArr=[item.goOutGoTime.split(" ")[0]];
            this.goOutGoTime=item.goOutGoTime.split(" ")[1];
            this.goOutComeTime=item.goOutComeTime.split(" ")[1];
            this.goOutRegisterBean.goOutRegion=item.goOutRegion;
            this.id=item.id;


            $('input,select,textarea,button',$('form[name="my_form"]')).prop('readonly',true);
            //是否直接去单选按钮组状态
            this.isTodayGoingState=true;
            //是否当天归岗单选按钮组状态
            this.isTodayComeState=true;
            //外出人添加按钮组状态
            this.gouOutNameButtonState=true;
            //添加外出日期按钮组状态
            this.addGoOutTimeBtnState=true;
            //外出时间状态
            this.goOutGoTimeState=true;
            //归岗时间状态
            this.goOutTypeState=true;
            //提交按钮状态
            this.submitBtnState=true;
            //扩大通知负责人按钮状态
            this.addTongZhiRenState=true;
            //通知负责人下拉列表状态
            this.tongZhiFuzeRenListState=true;
            //报备负责人下拉列表状态
            this.baoBeiFuZeRenListState=true;

            $("#myGoOutRegister").modal('show');
          }else {
            alert("操作无效")
            return;
          }
        },
        //添加外出日期
        dateAdd: function() {

          this.addDate = this.moment(this.addDate, 'YYYY-MM-DD')

          if (this.goOutRegisterBean.gotOutDateArr.length > 0) {
            for (var i = 0; i < this.goOutRegisterBean.gotOutDateArr.length; i++) {
              var dateStr = this.goOutRegisterBean.gotOutDateArr[i]
              if (this.addDate == dateStr) {
                return
              }
            }
          }
          this.goOutRegisterBean.gotOutDateArr.push(this.addDate)

          $("#date").trigger("click")
        },
        //删除被选中的时间
        selectedDate: function(index) {
          this.selectedIndex = index
        },
        deleteDateTime: function() {
          if (this.selectedIndex != -1) {
            this.goOutRegisterBean.gotOutDateArr.splice(this.selectedIndex, 1)
          }
          this.selectedIndex = -1
        },
        //删除被选中的外出人
        goOutNameArrSelectedIndex(index){
          this.goOutNameArrSelectedIndexs=index;
        },
        deleteGoOutNameArrSelectedIndex(){
          if (this.goOutNameArrSelectedIndexs != -1) {
            this.goOutRegisterBean.goOutNameArr.splice(this.goOutNameArrSelectedIndexs, 1)
          }
          this.goOutNameArrSelectedIndexs = -1
        },
        //是否直接去
        isTodayGoing(){
          if(this.goOutRegisterBean.goOutOthertype==2){
            //外出时间不可选
            this.goOutGoTimeState=true;
            //将时间改为默认值
            this.goOutGoTime="08:29";
            return;
          }
          this.goOutGoTimeState=false;
        },
        //是否当天归岗
        isTodayCome(){
          if(this.goOutRegisterBean.goOutType==2){
            //归岗时间不可选
            this.goOutTypeState=true;
            //将时间改为默认值
            this.goOutComeTime="17:31";
            return;
          }
          this.goOutTypeState=false;
        },
        //提交表单
        submitBtn(){
          //非空判断
          if(this.isBlank(this.goOutRegisterBean.goOutAddress)){
            alert("目的地不可为空");
            return;
          }
          if(this.goOutRegisterBean.goOutNameArr.length==0){
            alert("外出人姓名不可为空");
            return;
          }
          if(this.goOutRegisterBean.gotOutDateArr.length==0){
            alert("外出日期不可为空");
            return;
          }
          if(this.isBlank(this.goOutRegisterBean.goOutRegion)){
            alert("外出缘由不可为空");
            return;
          }
          if(this.isBlank(this.goOutRegisterBean.goOutTongzhiId)){
            alert("通知人不可为空");
            return;
          }
          if(this.isBlank(this.goOutRegisterBean.goReportId)){
            alert("报备人不可为空");
            return;
          }

          //添加逻辑
          if(!this.isBlank(this.modelType)&&this.modelType=="add"){
            var myArray=new Array();
            var arr=this.goOutRegisterBean.gotOutDateArr;
            for(var j = 0; j < arr.length; j++) {
              var obj={
                begDate:arr[j]+" "+this.goOutGoTime,
                endDate:arr[j]+" "+this.goOutComeTime
              }
              myArray[j]=obj;
            }
            var data={
              goOutApplyId:this.goOutRegisterBean.goOutApplyId,//申请人id
              goOutApplyTime:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
              goOutName:this.goOutRegisterBean.goOutName,
              goOutType:this.goOutRegisterBean.goOutType,
              goOutRegion:this.goOutRegisterBean.goOutRegion,
              goOutDepartmentId:this.goOutRegisterBean.goOutDepartmentId,
              goOutOthertype:this.goOutRegisterBean.goOutOthertype,//外出类型【1：班中外出，2:班前外出】
              goOutInformId:this.goOutRegisterBean.goOutInformId,//外出通知人
              goOutType:this.goOutRegisterBean.goOutType,//当天是否归岗【1：是，2：否】
              goOutComeTime: this.goOutRegisterBean.goOutComeTime,
              goOutGoTime: this.goOutRegisterBean.goOutGoTime,
              goOutAddress:this.goOutRegisterBean.goOutAddress,
              goOutTongzhiId:this.goOutRegisterBean.goOutTongzhiId,//通知人id
              goReportId:"1127",//报备人id
              goOutTongzhiAdvice:this.goOutRegisterBean.goOutTongzhiAdvice,//通知人意见【1：等待，2：同意，3：不同意】
              goOutOthertype:this.goOutRegisterBean.goOutOthertype,//外出类型【1：班中外出，2:班前外出】
              goReportAdvice:this.goOutRegisterBean.goReportAdvice,//报备人意见【1：等待，2：同意，3：不同意】
              gotOutDateArr:myArray,
              goOutNameArr:this.goOutRegisterBean.goOutNameArr,//this.accountInfo().account_Name
            }

            console.log(this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'));
            //发送请求
            axios({
              method: 'post',
              url: this.url + '/goOutRegisterController/addGoOutRegister',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: data,
              dataType: 'json',
            }).then(response => {
              console.log(response.data);
              var res=response.data;
              if (res.retCode == '0000') {
                alert("外出数据保存成功");
                $("#myGoOutRegister").modal('hide');
                this.search();
              }else {
                alert(res.retMsg)
              }
            }).catch(err => {
              console.log(err)
            });
          }

          //修改逻辑
          if(!this.isBlank(this.modelType)&&this.modelType=="edit"){
            if (this.goOutRegisterBean.goOutNameArr.length>1) {
              alert("外出人只能修改，不能添加或删除");
              return;
            }
            if (this.goOutRegisterBean.gotOutDateArr.length>1) {
              alert("外出日期只能修改，不能添加或删除");
              return;
            }
            var data={
              //goOutApplyId:this.goOutRegisterBean.goOutApplyId,//申请人id
              goOutApplyTime:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
              goOutName:this.goOutRegisterBean.goOutNameArr[0],
              goOutRegion:this.goOutRegisterBean.goOutRegion,
              goOutDepartmentId:this.goOutRegisterBean.goOutDepartmentId,
              goOutOthertype:this.goOutRegisterBean.goOutOthertype,//外出类型【1：班中外出，2:班前外出】
              //goOutInformId:this.goOutRegisterBean.goOutInformId,//外出通知人
              goOutType:this.goOutRegisterBean.goOutType,//当天是否归岗【1：是，2：否】
              goOutComeTime: this.goOutRegisterBean.gotOutDateArr[0]+" "+this.goOutComeTime,
              goOutGoTime: this.goOutRegisterBean.gotOutDateArr[0]+" "+this.goOutGoTime,
              goOutAddress:this.goOutRegisterBean.goOutAddress,
              goOutTongzhiId:this.goOutRegisterBean.goOutTongzhiId,//通知人id
              goReportId:"1127",//报备人id
              //goOutTongzhiAdvice:this.goOutRegisterBean.goOutTongzhiAdvice,//通知人意见【1：等待，2：同意，3：不同意】
              //goOutOthertype:this.goOutRegisterBean.goOutOthertype,//外出类型【1：班中外出，2:班前外出】
              //goReportAdvice:this.goOutRegisterBean.goReportAdvice,//报备人意见【1：等待，2：同意，3：不同意】
              //gotOutDateArr:myArray,
              //goOutNameArr:this.goOutRegisterBean.goOutNameArr,//this.accountInfo().account_Name
              id:this.id
            }
            //发送请求
            axios({
              method: 'post',
              url: this.url + '/goOutRegisterController/updateGoOutRegister',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: data,
              dataType: 'json',
            }).then(response => {
              console.log(response.data);
              var res=response.data;
              if (res.retCode == '0000') {
                alert("外出数据保存成功");
                $("#myGoOutRegister").modal('hide');
                this.search();
              }else {
                alert(res.retMsg)
              }
            }).catch(err => {
              console.log(err)
            });





          }

        },
        getNameValue(){
          if(this.goOutRegisterBean.goOutNameArr.indexOf(this.getNameValues)>-1){
            alert("不可重复添加");
            this.getNameValues="";
            this.addGoOutNameState=false;
            return;
          }
          this.goOutRegisterBean.goOutNameArr.push(this.getNameValues);
          this.getNameValues="";
          this.addGoOutNameState=false;
        },
        //修改状态，遍历部门下面所有人
        addGoOutNames(state){
          this.addGoOutNameState=state;
          this.getOutData();
        },
        //获取部门下面所有的人
        getOutData(){
          axios({
            method: 'post',
            url: this.url + '/goOutRegisterController/getOutData',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data:
              {
                "deptId": this.accountInfo().departId,
                "state":"1"
              },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            this.getOutDataList=response.data.retData;
          }).catch(err => {
            console.log(err)
          });
        },
        addTongZhiRenList(){
          if(this.addTongZhiRenState){
            return;
          }
          axios({
            method: 'post',
            url: this.url + '/goOutRegisterController/expandDeptLeaderById',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              deptid:this.parentId==""?this.rdInfo.departId:this.parentId,
              counts:this.counts++
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.resData);
            //this.goOutTongzhiList=response.data.retData;
            this.deptids.push(...response.data.retData.deptids);
            this.deptids=Array.from(new Set(this.deptids));
            this.parentId=response.data.retData.parentId.toString();
            if(response.data.retData.parentId==0){
              this.addTongZhiRenState=true;
              this.parentId=null;
            }
            this.selectDeptLeaderById({goOutTongzhiId:''});


            //

          }).catch(err => {
            console.log(err)
          });
        },
        //初始化goOutRegisterBean数据
        initGoOutRegisterBean(){
            this.goOutRegisterBean.goOutApplyId=this.accountInfo().account_ID;//申请人id
            this.goOutRegisterBean.goOutName=this.accountInfo().account_Name;
            this.goOutRegisterBean.goOutApplyName=this.accountInfo().account_Name;
            this.goOutRegisterBean.goOutType=1;
            this.goOutRegisterBean.goOutRegion="";
            this.goOutRegisterBean.goOutDepartmentId=this.accountInfo().departId;
            this.goOutRegisterBean.departName=this.accountInfo().departName;
            this.goOutRegisterBean.goOutDepartmentName=this.accountInfo().departName;
            this.goOutRegisterBean.goOutOthertype=1;//外出类型【1：班中外出，2:班前外出】
            this.goOutRegisterBean.goOutInformId="1";//外出通知人
            this.goOutRegisterBean.goOutType="1";//当天是否归岗【1：是，2：否】
            this.goOutRegisterBean.goOutComeTime="";
            this.goOutRegisterBean.goOutGoTime="";
            this.goOutRegisterBean.goOutAddress="";
            this.goOutRegisterBean.goOutTongzhiId="";//通知人id
            this.goOutRegisterBean.goReportId="1127";//报备人id
            this.goOutRegisterBean.goOutTongzhiAdvice="1";//通知人意见【1：等待，2：同意，3：不同意】
            this.goOutRegisterBean.goOutOthertype=1;//外出类型【1：班中外出，2:班前外出】
            this.goOutRegisterBean.goReportAdvice="1";//报备人意见【1：等待，2：同意，3：不同意】
            this.goOutRegisterBean.gotOutDateArr=[];
            this.goOutRegisterBean.goOutNameArr=[];//this.accountInfo().account_Name

            this.goOutComeTime="17:31";//界面显示的归岗时间
            this.goOutGoTime="08:29";//界面显示的外出时间
            this.goOutTongzhiList=[];
            //扩大通知人列表按钮状态
            this.addTongZhiRenState=false;

            this.deptids=[this.accountInfo().departId];
            this.parentId="";
            this.counts=1;

            //通知负责人按钮组状态
            this.tongZhiFuZeRenBtnState=true;
            //报备负责人按钮组状态
            this.baoBeiFuZeRenBtnState=true;
            //添加外出人姓名，显示外出人列表下拉的状态
            this.addGoOutNameState=false;
            //该部门下所有的人
            this.getOutDataList=[];
            //选中的部门人员菜单项
            this.getNameValues="";
            //记录当前选中的外出人序号
            this.goOutNameArrSelectedIndexs="";
            //外出时间状态
            this.goOutGoTimeState=false;
            //归岗时间状态
            this.goOutTypeState=false;
            //是否直接去单选按钮组状态
            this.isTodayGoingState=false;
            //是否当天归岗单选按钮组状态
            this.isTodayComeState=false;
            //外出人添加按钮组状态
            this.gouOutNameButtonState=false;
            //添加外出日期按钮组状态
            this.addGoOutTimeBtnState=false;
            //提交按钮状态
            this.submitBtnState=false;
            //通知负责人下拉列表状态
            this.tongZhiFuzeRenListState=false;
            //报备负责人下拉列表状态
            this.baoBeiFuZeRenListState=false;
        },
        //查看按钮点击事件
        watchItem(item){
          this.initGoOutRegisterBean();
            this.tongZhiFuZeRenBtnState=true;
            this.baoBeiFuZeRenBtnState=true;
          this.goOutTongzhiList=[
            {
              EMP_NAME:item.goOutTongzhiName,
              ACCOUNT_ID:item.goOutTongzhiId
            }
          ];
          this.goOutRegisterBean.goOutTongzhiId=item.goOutTongzhiId;
          this.goOutRegisterBean.goOutDepartmentName=item.goOutDepartmentName;
          //this.goOutRegisterBean.goOutName=item.
          this.goOutRegisterBean.goOutApplyName=item.goOutApplyName;
          this.goOutRegisterBean.goOutAddress=item.goOutAddress;
          this.goOutRegisterBean.goOutOthertype=item.goOutOthertype=="班中外出"?"1":"2";
          this.goOutRegisterBean.goOutType=item.goOutType=="否"?"2":"1";
          this.goOutRegisterBean.goOutNameArr=[
            item.goOutName
          ];
          this.goOutRegisterBean.gotOutDateArr=[item.goOutGoTime.split(" ")[0]];
          this.goOutGoTime=item.goOutGoTime.split(" ")[1];
          this.goOutComeTime=item.goOutComeTime.split(" ")[1];
          this.goOutRegisterBean.goOutRegion=item.goOutRegion;
          this.id=item.id;


          $('input,select,textarea,button',$('form[name="my_form"]')).prop('readonly',true);
          //是否直接去单选按钮组状态
          this.isTodayGoingState=true;
          //是否当天归岗单选按钮组状态
          this.isTodayComeState=true;
          //外出人添加按钮组状态
          this.gouOutNameButtonState=true;
          //添加外出日期按钮组状态
          this.addGoOutTimeBtnState=true;
          //外出时间状态
          this.goOutGoTimeState=true;
          //归岗时间状态
          this.goOutTypeState=true;
          //提交按钮状态
          this.submitBtnState=true;
          //扩大通知负责人按钮状态
          this.addTongZhiRenState=true;
          //通知负责人下拉列表状态
          this.tongZhiFuzeRenListState=true;
          //报备负责人下拉列表状态
          this.baoBeiFuZeRenListState=true;

          $("#myGoOutRegister").modal('show');


        },
        //添加或者修改弹框
        addOrEditGoOutRegister(type,item){

          if(type=="add"){
            this.modelType="add";
            $('input,select,textarea,button',$('form[name="my_form"]')).prop('readonly',false);
            this.initGoOutRegisterBean();
            this.selectDeptLeaderById({goOutTongzhiId:''});
          }else if(type=="edit"){
            this.modelType="edit";
            if(item.goOutApplyName!=this.accountInfo().account_Name){
                alert("不可修改他人数据");
                return;
            }
            if(item.goOutDelete=="已取消"){
              alert("已取消，不用修改");
              return;
            }
            this.initGoOutRegisterBean();
            this.tongZhiFuZeRenBtnState=true;
            this.baoBeiFuZeRenBtnState=true;
            this.selectDeptLeaderById(item);
            //var arr=this.goOutTongzhiList;



            this.goOutRegisterBean.goOutDepartmentName=item.goOutDepartmentName;
            //this.goOutRegisterBean.goOutName=item.
            this.goOutRegisterBean.goOutApplyName=item.goOutApplyName;
            this.goOutRegisterBean.goOutAddress=item.goOutAddress;
            this.goOutRegisterBean.goOutOthertype=item.goOutOthertype=="班中外出"?"1":"2";
            this.goOutType=item.goOutType=="否"?true:false;
            this.goOutRegisterBean.goOutType=item.goOutType=="否"?"2":"1";
            this.goOutRegisterBean.goOutNameArr=[
              item.goOutName
            ];
            this.goOutRegisterBean.gotOutDateArr=[item.goOutGoTime.split(" ")[0]];
            this.goOutGoTime=item.goOutGoTime.split(" ")[1];
            this.goOutComeTime=item.goOutComeTime.split(" ")[1];
            this.goOutRegisterBean.goOutRegion=item.goOutRegion;
            this.id=item.id;
            this.isTodayCome();
            this.isTodayGoing();
          }
          console.log(this.accountInfo());
          this.rdInfo=this.accountInfo();

          $("#myGoOutRegister").modal('show');
        },
        addgoOutTongzhiList(arr,item){
          var flag=false;
          for(var j = 0; j < arr.length; j++) {
            if (arr[j].ACCOUNT_ID == item.goOutTongzhiId) {
              flag=true;
            }
          }
          if(!flag){
            arr.push({
              EMP_NAME:item.goOutTongzhiName,
              ACCOUNT_ID:item.goOutTongzhiId
            })
          }
          this.goOutTongzhiList=arr;
        },
        //获取负责人列表
        selectDeptLeaderById(item){
          axios({
            method: 'post',
            url: this.url + '/goOutRegisterController/selectDeptLeaderById',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              parentid:this.parentId,
              deptids:this.deptids
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.resData);
            this.goOutTongzhiList=response.data.retData;
            if (this.isBlank(item.goOutTongzhiId.toString())){
              this.goOutRegisterBean.goOutTongzhiId=this.goOutTongzhiList[0].ACCOUNT_ID;
            } else {
              //网goOutTongzhiList添加数据
              this.addgoOutTongzhiList(this.goOutTongzhiList,item);
              this.goOutRegisterBean.goOutTongzhiId=item.goOutTongzhiId.toString();
            }

          }).catch(err => {
            console.log(err)
          });
        },
        //获取部门名字和id
        departChange(departId, departName) {
          departId==0?departId="":departId;
          this.goOutDepartmentId = departId;
          this.goOutDepartmentName = departName;
        },
        lastMonth() {
          this.begDate = this.$queryStartLastMonth()
          this.endDate = this.$queryEndLastMonth()
          this.listDateRadio="1";
          // 调用查询方法
        },
        currentMonth() {
          this.begDate = this.$queryStartMonth()
          this.endDate = this.$queryEndMonth()
          // 调用查询方法
          this.listDateRadio="2";
        },
        nextMonth() {
          this.begDate = this.$queryStartNextMonth()
          this.endDate = this.$queryEndNextMonth()
          // 调用查询方法
          this.listDateRadio="3";
        },
        currentDate() {
          this.begDate = this.$currentDate()
          this.endDate = this.$currentDate()
          // 调用查询方法
          this.listDateRadio="4";
        },

      //条件查询
      search(){
        const data={
          goOutDepartmentId:this.goOutDepartmentId,
          goOutDelete:this.goOutDelete,
          goOutName:this.goOutName,
          begDate:this.begDate,
          endDate:this.endDate,
          allAdvice:this.allAdvice

        };
        if(this.isBlank(this.state)){
          data.goOutApplyTime="goOutApplyTime";
          data.goOutGoTime="goOutGoTime";
          data.goOutComeTime="goOutComeTime";
        }else {
          if(this.state=="goOutApplyTime"){
            data.goOutApplyTime="goOutApplyTime";
          }else if(this.state=="goOutGoTime"){
            data.goOutGoTime="goOutGoTime";
          }else {
            data.goOutComeTime="goOutComeTime";
          }
        }
        console.log("这个data是"+JSON.stringify(data));
        this.getEmployee(data);
      }
      },
      created() {
          this.begDate=this.$queryStartMonth();
          this.endDate=this.$queryEndMonth();
          const data={
            goOutDepartmentName:"0",
            goOutDelete:"",
            goOutApplyTime:this.state,
            begDate:this.begDate,
            endDate:this.endDate,
            allAdvice:this.allAdvice
          };
        this.getEmployee(data);
        console.log("开始的data是："+JSON.stringify(data))
      }
    }
</script>

<style scoped>

</style>
