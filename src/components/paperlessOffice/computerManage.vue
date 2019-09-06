<template>
  <div class="container user-container" id="employee-app">
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>电脑用品管理：</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>部门：</p>
        </div>
        <div class="col-md-10 col-lg-10">
          <department v-model="DepartmentID"></department>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>用品类型：</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <select class="form-control" v-model="typeId">
            <option value="0">全部</option>
            <option value="1">领用电脑</option>
            <option value="2">更换配件</option>
            <option value="3">添加配件</option>
          </select>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <input type="radio" v-model="radioContent" value="0" @click="changeTime(0)" />上月
        <input type="radio" v-model="radioContent" value="1" @click="changeTime(1)" />本月
        <input type="radio" v-model="radioContent" value="2" @click="changeTime(2)" />次月
        <input type="radio" v-model="radioContent" value="3" @click="changeTime(3)" />自定义
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>使用人：</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <span>
            <input type="text" value="" class="form-control" v-model="userName" />
          </span>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>类型：</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <select class="form-control" v-model="isReserve">
            <option value="0">全部</option>
            <option value="1">普通</option>
            <option value="2">预申请</option>
          </select>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>状态</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <select class="form-control" v-model="isIng">
            <option value="0">全部</option>
            <option value="1">进行中</option>
            <!-- <option value="2">未完成</option> -->
            <option value="2">完成</option>
          </select>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>交接人：</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <span>
            <input type="text" value="" class="form-control" v-model="prepareName" />
          </span>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>时间类型：</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <select class="form-control" v-model="dateType">
            <option value="0">提报时间</option>
            <option value="1">完成时间</option>
          </select>
        </div>
      </div>

      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <span class="leavespan">
            <DatePicker v-model="begDate" :disabled='!timeFlag'></DatePicker>
          </span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;~~</span>
          <span class="leavespan">
            <DatePicker v-model="endDate" :disabled='!timeFlag'></DatePicker>
          </span>
        </div>
      </div>

      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>审核人意见：</p>
        </div>
        <div class="col-md-8 col-lg-8">
          <select class="form-control" v-model="adviceType">
            <option value="0">全部</option>
            <option value="1">同意</option>
            <option value="3">不同意</option>
            <option value="2">未审核</option>
          </select>
        </div>
      </div>

    </div>
    <div class="row add-mt">
      <div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
        <p>项目：</p>
      </div>

      <button type="button" class="btn btn-primary pull-right" @click="exportBtn()" data-toggle="tooltip" title="点击导出后,2秒后执行导出程序.">导出</button>
      <button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin"
        @click="getFu()">申请</button>
      <button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" @click="queryComputer()">查询</button>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover user-table" id="datatable">
            <thead>
              <tr>
                <th class="text-center">单号</th>
                <th class="text-center">部门</th>
                <th class="text-center">提报时间</th>
                <th class="text-center">完成时间</th>
                <th class="text-center">岗位</th>
                <th class="text-center">名称</th>
                <th class="text-center">申请人</th>
                <th class="text-center">使用人</th>
                <th class="text-center">主管</th>
                <th class="text-center">主管意见</th>
                <th class="text-center">负责人</th>
                <th class="text-center">负责人意见</th>
                <th class="text-center">交接人</th>
                <th class="text-center">申请类型</th>
                <th class="text-center" v-if="has(71)">是否进行</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in computerList" :key='item.id' @dblclick="dbOpenView(item)" :style="item.isReserve == '普通' ? (item.isIng == '点击进行' ?  '' : item.isIng == '已完成' ?  yelloFontStyle : greenBackground) : (item.isIng == '点击进行' ? redBackground : redFontStyle)">
                <th class="text-center">{{item.id}}</th>
                <th class="text-center">{{item.departmentName}}</th>
                <th class="text-center">{{item.startTime | dateFormatFilter('YYYY-MM-DD HH:mm')}}</th>
                <th class="text-center">{{item.endTime | dateFormatFilter('YYYY-MM-DD HH:mm')}}</th>
                <th class="text-center">{{item.positionName}}</th>
                <th class="text-center">{{item.articlesName}}</th>
                <th class="text-center">{{item.userName}}</th>
                <th class="text-center">{{item.applyName}}</th>
                <th class="text-center">{{item.zhuName}}</th>
                <th class="text-center">{{item.zhuAdvice}}</th>
                <th class="text-center">{{item.fuName}}</th>
                <th class="text-center">{{item.fuAdvice}}</th>
                <th class="text-center">
                  <div v-if="thFlag" @click="thFlag = false">{{item.prepareName}}</div>
                  <select class="form-control" v-model="item.peiJiedanId" @change="updateJieDanRen(item)" v-if="!thFlag">
                    <option value="null">未接单</option>
                    <option v-for="item in jieDanRenList" :key="item.ACCOUNT_ID" :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </th>
                <!-- <th class="text-center" v-if="isFu()">{{item.applyName}}</th>
                <th class="text-center" v-if="!isFu()">
                  <select class="form-control" v-model="item.peiJiedanId" @change="updateJieDanRen(item)">
                    <option value="null">未接单</option>
                    <option v-for="item in jieDanRenList" :key="item.ACCOUNT_ID" :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </th> -->
                <th class="text-center">{{item.isReserve}}</th>
                <th class="text-center" v-if="has(71)"><button type="button" class="btn btn-warnin g m_r_12" :disabled="item.isIng == '已完成' || item.isIng == '进行中'"
                    @click="commonBtn(item)">{{item.isIng}}</button></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="bottom_leave">
      <p class="bottom_leave02"><span class="botleava01">进行中</span><span class="botleava02">未完成</span><span class="botleava03">完成</span><span
          class="botleava04">预申请未完成</span><span class="botleava05">预申请完成</span></p>
    </div>
    <div class="row row_edit">
      <!--电脑用品申请弹出-->
      <div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog staff_t">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="clearData()">×</button>
              <h1 class="modal-title">电脑用品需求及确认单</h1>
            </div>

            <div class="modal-header modal_header_leave computer01">
              <h6>电脑用品需求单</h6>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>部门：</p>
                </div>
                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <select class="form-control" v-model.lazy="departId" v-on:change="deptChange()">
                    <option value="0">九博健康管理有限公司</option>
                    <option v-for="(item,index) in departmentList" :key="index" v-bind:value="item.id" v-html="item.preFixName">{{item.preFixName}}</option>
                  </select>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding:0">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>岗位：</p>
                  </div>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <select class="form-control" v-model="position" @change="postChange()">
                      <option value="0">--请选择--</option>
                      <option v-for="item in postList" :key="item.position_ID" :value="item.position_ID">{{item.position_Name}}</option>
                    </select>
                  </div>
                </div>

              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>用品类型：</p>
                </div>
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                  <select class="form-control" v-model="typeId2" @change="typeChange()">
                    <option value="-1">--请选择--</option>
                    <option value="0">领用电脑</option>
                    <option value="1">更换配件</option>
                    <option value="2">添加配件</option>
                  </select>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding:0">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                    <p>用品列举：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <!-- <textarea class="explain_leave"></textarea> -->
                    <ul>
                      <li v-for="(item,index) in typeList" :key='index'><input type="checkbox" v-model="selectArr"
                          :value="item.goodsId" @change="selectedWuPin(item.goodsId)">{{item.goodsName}}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0;">
                  <p>使用人：</p>
                </div>
                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <select class="form-control" v-model="empId">
                    <option value="0">--请选择--</option>
                    <option v-for="item in empList" :key='item.account' :value="item.account"> {{item.name}}</option>
                  </select>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>已选用品：</p>
                </div>
                <div class="col-md-8 col-lg-8">
                  <span>
                    <input type="text" class="form-control" v-model="wuPin" :disabled="flag" @keyup.space="spaceKeyUp()"
                      :placeholder="flag ? '' : '用品+空格完成输入'" @blur.prevent="spaceKeyUp()" />
                  </span>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>主管：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <select class="form-control" v-model="zhu">
                    <option value="0">--请选择--</option>
                    <option v-for="item in zhuList" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-1 col-sm-1 col-md-1">
                  <button type="button" class="btn btn-warning pull-left m_r_10" @click="getZhu()">+</button>
                </div>
              </div>

              <!-- <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>意见:</p>
                </div>
                <button type="button" class="btn btn-info">同意</button>
                <button type="button" class="btn btn-info">不同意</button>
              </div> -->

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>负责人：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <select class="form-control" v-model="fu">
                    <option v-for="item in fuList" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-1 col-sm-1 col-md-1">
                  <button type="button" class="btn btn-warning pull-left m_r_10" @click="getFu()">+</button>
                </div>
              </div>

              <!-- <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>意见:</p>
                </div>
                <button type="button" class="btn btn-info">同意</button>
                <button type="button" class="btn btn-info">不同意</button>
              </div> -->

              <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                  <p>备注：</p>
                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <textarea style="padding: 0; resize: none" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></textarea>
                </div>
              </div> -->
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                  <button type="button" class="btn btn-warning pull-right col-xs-12 col-sm-12 col-md-12 col-lg-12"
                    @click="commitComputer()">确认提交</button>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 noleader">
                <span>*没有主管的部门可点击 </span>
                <div class="col-xs-1 col-sm-1 col-md-1">
                  <button type="button" class="btn btn-warning m_r_10">+</button>
                </div>
                <span>扩大选择</span>
              </div>

              <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fenge"></div> -->
            </div>
            <!-- <div class="modal-header modal_header_leave">
              <h6>电脑用品需求单</h6>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>使用人：</p>
                </div>
                <div class="col-md-8 col-lg-8">
                  <span>
                    <input type="text" value="" class="form-control" v-model="shiYongRen" />
                  </span>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>交接人：</p>
                </div>
                <div class="col-md-8 col-lg-8">
                  <span>
                    <input type="text" value="" class="form-control" v-model="jiaoJieRen" />
                  </span>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button type="button" class="btn btn-warning pull-right col-xs-3 col-sm-3 col-md-3 col-lg-3">确认提交</button>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 noleader01">
                <span>*对接人完成后方可由使用人确定完成“确认单” </span>
              </div> -->
          </div>
        </div>
      </div>
      <!-- 电脑用品修改弹出 -->
      <div class="modal fade" id="computer_check" tabindex="-3" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog staff_t">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="clearData()">×</button>
              <h1 class="modal-title">电脑用品需求及确认单<span style="color: red; font-size: 16px;">单号{{id}}</span></h1>
            </div>

            <div class="modal-header modal_header_leave computer01">
              <h6>电脑用品需求单</h6>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>部门：</p>
                </div>
                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <select class="form-control" v-model.lazy="departId" v-on:change="deptChange()">
                    <option value="0">九博健康管理有限公司</option>
                    <option v-for="(item,index) in departmentList" :key="index" v-bind:value="item.id" v-html="item.preFixName">{{item.preFixName}}</option>
                  </select>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding:0">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>岗位：</p>
                  </div>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <select class="form-control" v-model="position" @change="postChange()">
                      <option value="0">--请选择--</option>
                      <option v-for="item in postList" :key="item.position_ID" :value="item.position_ID">{{item.position_Name}}</option>
                    </select>
                  </div>
                </div>

              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>用品类型：</p>
                </div>
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                  <select class="form-control" v-model="typeId2" @change="typeChange()">
                    <option value="-1">--请选择--</option>
                    <option value="0">领用电脑</option>
                    <option value="1">更换配件</option>
                    <option value="2">添加配件</option>
                  </select>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding:0">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                    <p>用品列举：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <ul>
                      <li v-for="(item,index) in typeList" :key='index'><input type="checkbox" v-model="selectArr"
                          :value="item.goodsId" @change="selectedWuPin(item.goodsId)">{{item.goodsName}}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0;">
                  <p>使用人：</p>
                </div>
                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <select class="form-control" v-model="empId">
                    <option value="0">--请选择--</option>
                    <option v-for="item in empList" :key='item.account' :value="item.account"> {{item.name}}</option>
                  </select>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>已选用品：</p>
                </div>
                <div class="col-md-8 col-lg-8">
                  <span>
                    <input type="text" class="form-control" v-model="wuPin" :disabled="flag" @keyup.space="spaceKeyUp()"
                      :placeholder="flag ? '' : '用品+空格完成输入'" @blur.prevent="spaceKeyUp()" />
                  </span>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>主管：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <select class="form-control" v-model="zhu">
                    <option value="0">--请选择--</option>
                    <option v-for="item in zhuList" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-1 col-sm-1 col-md-1">
                  <button type="button" class="btn btn-warning pull-left m_r_10">+</button>
                </div>
              </div>

              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>意见: {{zhuAdvice}}</p>
                </div>
                <button type="button" class="btn btn-info" :disabled="zhuAdvice != '未审核'" @click="shenHe(0,1)">同意</button>
                <button type="button" class="btn btn-info" :disabled="zhuAdvice != '未审核'" @click="shenHe(0,2)">不同意</button>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>负责人：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <select class="form-control" v-model="fu">
                    <option v-for="item in fuList" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-1 col-sm-1 col-md-1">
                  <button type="button" class="btn btn-warning pull-left m_r_10">+</button>
                </div>
              </div>

              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                  <p>意见:{{fuAdvice}}</p>
                </div>
                <button type="button" class="btn btn-info" :disabled="fuAdvice != '未审核'" @click="shenHe(1,1)">同意</button>
                <button type="button" class="btn btn-info" :disabled="fuAdvice != '未审核'" @click="shenHe(1,2)">不同意</button>
              </div>

              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                  <p>备注：</p>
                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <textarea style="padding: 0; resize: none" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" :disabled="isFu()"
                    v-model="shuoming"></textarea>
                </div>
              </div>
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                  <button type="button" class="btn btn-warning pull-right col-xs-12 col-sm-12 col-md-12 col-lg-12"
                    @click="commitUpdate()" :disabled="isSuccess == '已完成'">确认提交</button>
                </div>
                <select class="form-control" v-model="peiJieDanId" v-if="!isFu()">
                  <option v-for="item in jieDanRenList" :key="item.ACCOUNT_ID" :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                </select>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 noleader">
                <span>*没有主管的部门可点击 </span>
                <div class="col-xs-1 col-sm-1 col-md-1">
                  <button type="button" class="btn btn-warning m_r_10">+</button>
                </div>
                <span>扩大选择</span>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fenge"></div>

            </div>
            <div class="modal-header modal_header_leave">
              <h6>电脑用品需求单</h6>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>使用人：</p>
                </div>
                <div class="col-md-8 col-lg-8">
                  <span>
                    <input type="text" value="" class="form-control" v-model="applyName" :disabled="true" />
                  </span>
                </div>
              </div>

              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>交接人：</p>
                </div>
                <div class="col-md-8 col-lg-8">
                  <span>
                    <input type="text" value="" class="form-control" v-model="peiJieDanName" :disabled="true" />
                  </span>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button type="button" class="btn btn-warning pull-right col-xs-3 col-sm-3 col-md-3 col-lg-3" :disabled="isSuccess == '已完成'"
                  @click="finishBtn()">使用人确认完成</button>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 noleader01">
                <span>*对接人完成后方可由使用人确定完成“确认单” </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  </div>
  </div>
</template>

<script>
  var vm = null;
  import moment from 'moment'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import DatePicker from 'vue2-datepicker'
  import department from '@/components/vuecommon/department.vue'

  export default {
    components: {
      department,
      DatePicker,
    },
    data() {
      return {
        DepartmentID: '',
        isIng: 0,
        dateType: 0,
        begDate: this.moment('', 'YYYY-MM-DD'),
        endDate: this.moment('', 'YYYY-MM-DD'),
        isReserve: 0,
        typeId: 0,
        adviceType: 0,
        userName: '',
        prepareName: '',
        computerList: [],
        accountData: {},
        accountId: '',
        accountName: '',
        departmentList: [],
        postList: [],
        empList: [],
        departId: 0,
        position: 0,
        empId: 0,
        zhu: 0,
        fu: 666,
        typeId2: -1,
        wuPin: '',
        jiaoJieRen: '',
        shiYongRen: '',
        typeList: [],
        goodsList: [{
            goodsId: 1,
            goodsName: "主机"
          },
          {
            goodsId: 2,
            goodsName: "显示器"
          },
          {
            goodsId: 3,
            goodsName: "键盘"
          },
          {
            goodsId: 4,
            goodsName: "鼠标"
          },
          {
            goodsId: 5,
            goodsName: "内存"
          },
          {
            goodsId: 6,
            goodsName: "硬盘"
          },
          {
            goodsId: 7,
            goodsName: "电源"
          }
        ],
        selectArr: [],
        flag: true,
        otherGoods: '',
        zhuList: [],
        fuList: [],
        typeArr: ['领用电脑', '更换配件', '添加配件'],
        greenBackground: {
          'background-color': '#158D81'
        },
        whiteFontStyle: {
          color: 'white'
        },
        redBackground: {
          'background-color': '#DF6859'
        },
        redFontStyle: {
          color: '#DF6859'
        },
        yelloFontStyle: {
          color: '#FFC107'
        },
        updateObj: {},
        zhuAdvice: '',
        fuAdvice: '',
        applyName: '',
        jieDanRenList: [],
        peiJieDanId: '',
        peiJieDanName: '',
        shuoming: '',
        userId: '',
        srcArticlesName: '',
        id: '',
        isSuccess: '',
        finishId: '',
        timeFlag: true,
        radioContent: "3",
        thFlag: true,
        setTimeObj: null
      }
    },
    methods: {
      //公共请求方法,返回响应数据
      requestData(url, rquestParam) {
        return new Promise((resolve, reject) => {
          axios({
            method: "post",
            url: url,
            headers: {
              "Content-Type": this.contentType,
              "Access-Token": this.$root.accountAccessToken
            },
            data: rquestParam,
            dataType: "json"
          }).then((response) => {
            resolve(response.data);
          }).catch((error) => {
            reject(error);
          });
        });
      },
      //查询电脑用品信息
      queryComputer() {
        this.thFlag = true;
        if (this.isBlank(this.begDate) || this.isBlank(this.endDate)) {
          alert("查询时间不能为空!");
          return;
        }

        if (!this.isFu()) {
          //查询接单人
          this.queryJieDanRen();
        }

        var rquestParam = {
          DepartmentID: this.DepartmentID == 0 ? '' : this.DepartmentID,
          isIng: this.isIng,
          dateType: this.dateType,
          begDate: this.moment(this.begDate, 'YYYY-MM-DD'),
          endDate: this.moment(this.endDate, 'YYYY-MM-DD'),
          isReserve: this.isReserve == 0 ? '' : this.isReserve == 1 ? 0 : 2,
          typeId: this.typeId == 0 ? '' : this.typeId,
          adviceType: this.adviceType,
          userName: this.userName,
          prepareName: this.prepareName
        };
        //当前普通用户（交接人和负责人可查看所有）可见数据
        if (!this.has(71)) {
          rquestParam.accountId = this.accountId;
          rquestParam.accountName = this.accountName;
        }
        var url = this.url.concat("/computerManageController/queryComputer");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.computerList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //查询部门，职位及员工
      queryDeptPostEmp() {
        this.clearData();
        var url = this.url.concat("/kqParamSetContr/queryDeptPostEmp");
        this.requestData(url, {}).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.departmentList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //切换部门
      deptChange() {
        this.postList = [];
        this.empList = [];
        this.position = 0;
        if (this.departId == 0) return;
        this.departmentList.forEach((item) => {
          if (item.id == this.departId) {
            this.postList = item.positionDataList;
            return;
          }
        });
        this.queryZhu();
      },
      //切换职位
      postChange() {
        this.empList = [];
        this.empId = 0;
        if (this.postList == null || this.postList.length == 0) return;
        this.postList.forEach((item) => {
          if (item.position_ID == this.position) {
            this.empList = item.employeeList;
            return;
          }
        });
      },
      //清除数据
      clearData() {
        this.departId = 0;
        this.position = 0;
        this.empId = 0;
        this.zhu = 0;
        this.fu = 666;
        this.typeId2 = -1;
        this.wuPin = '';
        this.jiaoJieRen = '';
        this.shiYongRen = '';
        this.wuPin = '';
        this.flag = true;
        this.selectArr = [];
        this.zhuList = [];
        this.typeList = [];
        this.zhuAdvice = '';
        this.fuAdvice = '';
        this.applyName = '';
        //this.jieDanRenList = [];
        this.peiJieDanId = '';
        this.peiJieDanName = '';
        this.shuoming = '';
        this.userId = '';
        this.srcArticlesName = '';
        this.id = '';
        this.isSuccess = '';
        this.postList = [];
        this.empList = [];
        this.finishId = '';
      },
      //用品类型切换
      typeChange() {
        this.selectArr = [];
        this.wuPin = '';
        this.flag = true;
        this.typeList = [];
        if (this.typeId2 == -1) return;
        if (this.typeId2 == 0) {
          this.wuPin = "电脑";
        } else if (this.typeId2 == 1) {
          this.typeList = this.goodsList;
        } else {
          var list = [];
          Object.assign(list, this.goodsList);
          list.push({
            goodsId: 8,
            goodsName: "其他"
          });
          this.typeList = list;
        }
      },
      //已选物品
      selectedWuPin(goodsId) {
        this.wuPin = '';
        if (goodsId == 8) {
          this.otherGoods = '';
          if (this.selectArr.indexOf(8) != -1) {
            this.flag = false;
            return;
          }
        }
        if (this.selectArr == null || this.selectArr.length <= 0) return;
        var arr = this.selectArr.sort();
        var content = '';
        for (var i = 0; i < arr.length; i++) {
          if (i > 0) content += " ";
          var index = arr[i] - 1;
          if (index < 7) {
            content += this.typeList[index].goodsName;
          } else {
            content += this.otherGoods;
          }
        }

        this.wuPin = content;
      },
      //按了空格键
      spaceKeyUp() {
        if (!this.flag) {
          this.otherGoods = this.wuPin;
          this.flag = true;
          this.selectedWuPin(0);
        }
      },
      //查询本部门主管
      queryZhu() {
        if (this.departId == 0) {
          return;
        }
        var rquestParam = {
          deptId: this.departId
        };
        var url = this.url.concat("/officeAction/queryDeptResponsible");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.zhuList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //获取主管（扩选）
      getZhu() {
        if (this.departId == 0) {
          alert("请选择部门后再操作!");
          return;
        }
        var rquestParam = {
          deptId: this.departId
        };
        var url = this.url.concat("/officeAction/queryDeptExpandResponsible");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.zhuList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //获取负责人
      getFu() {
        var url = this.url.concat("/officeAction/queryComputerHandover");
        this.requestData(url, {}).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.fuList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //提交申请
      commitComputer() {
        if (this.departId == 0 || this.position == 0 ||
          this.empId == 0 || this.zhu == 0 || this.isBlank(this.fu) || this.isBlank(this.wuPin) || this.typeId2 == -1) {
          alert("部门、职位、使用人、主管、申请用品或用品类型为空!");
          return;
        }

        var rquestParam = {
          DepartmentID: this.departId,
          userId: this.accountId,
          articlesName: this.typeArr[this.typeId2] + ' ' + this.wuPin,
          zhuId: this.zhu,
          jobId: this.position,
          applyId: this.empId,
          fuId: this.fu,
          typeId: this.typeId2,
          zhuAdvice: 0,
          fuAdvice: 0,
          zhuSee: 0,
          fuSee: 0,
          duiSee: 0,
          userSee: 0,
          isReserve: 0
        };
        var url = this.url.concat("/computerManageController/addComputer");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.clearData();
            this.queryComputer();
            alert("你已成功提交，请耐心等待!");
            $("#myModalJoin").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //双击打开修改界面
      dbOpenView(itemObj) {
        var obj = {};
        Object.assign(obj, itemObj);
        this.departId = obj.departmentID;
        this.position = obj.jobId;
        this.empId = obj.applyId;
        this.finishId = obj.applyId;
        this.typeId2 = obj.typeId;
        this.wuPin = obj.articlesName;
        this.srcArticlesName = obj.articlesName;
        this.fu = obj.fuId;
        this.zhu = obj.zhuId;
        this.zhuAdvice = obj.zhuAdvice;
        this.fuAdvice = obj.fuAdvice;
        this.applyName = obj.applyName;
        //this.prepareName = obj.prepareName;
        this.peiJieDanId = obj.peiJiedanId;
        this.peiJieDanName = obj.prepareName;
        this.shuoming = obj.shuoming;
        this.userId = obj.userId;
        this.id = obj.id;
        this.isSuccess = obj.isIng;
        this.getFu();
        this.getZhu();
        this.queryJieDanRen();
        this.departmentList.forEach((item) => {
          if (item.id == this.departId) {
            this.postList = item.positionDataList;
          }
        });

        this.postList.forEach((item) => {
          if (item.position_ID == this.position) {
            this.empList = item.employeeList;
          }
        });

        $("#computer_check").modal("show");
      },
      //查询接单人
      queryJieDanRen() {
        var url = this.url.concat("/officeAction/queryJieDanRen");
        this.requestData(url, {}).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.jieDanRenList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //提交修改数据
      commitUpdate() {
        if (this.departId == 0 || this.position == 0 ||
          this.empId == 0 || this.zhu == 0 || this.isBlank(this.fu) || this.isBlank(this.wuPin)) {
          alert("部门、职位、使用人、主管、申请用品或用品类型为空!");
          return;
        }

        if (!confirm("确定修改?")) return;

        var rquestParam = {
          id: this.id,
          DepartmentID: this.departId,
          userId: this.userId,
          zhuId: this.zhu,
          jobId: this.position,
          applyId: this.empId,
          fuId: this.fu,
          typeId: this.typeId2,
          zhuAdvice: 0,
          fuAdvice: 0,
          zhuSee: 0,
          fuSee: 0,
          duiSee: 0,
          userSee: 0,
          isReserve: 0,
        };
        //判断申请物品是否修改
        if (this.srcArticlesName == this.wuPin) {
          rquestParam.articlesName = this.wuPin;
        } else {
          if (this.typeId2 == -1) {
            alert("请选择用品类型后再操作!");
            return;
          }
          rquestParam.articlesName = this.typeArr[this.typeId2] + ' ' + this.wuPin;
        }
        var url = this.url.concat("/computerManageController/updateComputer");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.clearData();
            this.queryComputer();
            alert("修改成功!");
            $("#computer_check").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //判断当前用户是否是负责人(是：返回false，反之true)
      isFu() {
        for (var i = 0; i < this.fuList.length; i++) {
          if (this.fuList[i].ACCOUNT_ID == this.accountId) return false;
        }
        return true;
      },
      //主管,负责人审核
      shenHe(flag, advice) {
        var rquestParam = {
          id: this.id
        };
        if (flag == 0) {
          if (this.accountId != this.zhu) {
            alert("你没有权限操作!");
            return;
          }
          //主管审核
          if (this.zhuAdvice != '未审核') {
            alert("不可重复审核!")
            return;
          }

          rquestParam.zhuAdvice = advice;
          rquestParam.zhuId = this.zhu;
        } else {
          if (this.accountId != this.fu) {
            alert("你没有权限操作!");
            return;
          }
          //负责人审核
          if (this.zhuAdvice != '同意') {
            alert("主管未同意前不可操作!");
            return;
          } else if (this.fuAdvice != '未审核') {
            alert("不可重复审核!")
            return;
          }

          rquestParam.fuAdvice = advice;
          rquestParam.fuId = this.fu;
          rquestParam.Shuoming = this.shuoming;
          if (!this.isBlank(this.peiJieDanId)) {
            rquestParam.peiJiedanId = this.peiJieDanId;
            this.jieDanRenList.forEach((item) => {
              if (item.ACCOUNT_ID == this.peiJieDanId) {
                rquestParam.prepareName = item.ACCOUNT_NAME;
              }
            })
          }
        }

        var url = this.url.concat("/computerManageController/shenHe");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.clearData();
            this.queryComputer();
            alert("审核成功!");
            $("#computer_check").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //点击进行
      commonBtn(item) {
        if (this.accountId != item.peiJiedanId) {
          alert("非对应交接人不可操作!");
          return;
        }
        if (item.isIng == '进行中') {
          alert("不可重复操作!");
          return;
        }
        var rquestParam = {
          id: item.id,
          isIng: 1
        };

        var url = this.url.concat("/computerManageController/shenHe");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.clearData();
            this.queryComputer();
            alert("操作成功!");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //使用人确认完成
      finishBtn() {
        if (this.isSuccess == '点击进行') {
          alert("交接人确认后方可操作!");
          return;
        } else if (this.isSuccess == '已完成') {
          alert("已完成，不可操作!");
          return;
        }
        if (this.accountId != this.finishId) {
          alert("非使用人不可操作!");
          return;
        }
        var rquestParam = {
          id: this.id,
          isIng: 2
        };

        var url = this.url.concat("/computerManageController/shenHe");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.clearData();
            this.queryComputer();
            alert("操作成功!");
            $("#computer_check").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //修改接单人员
      updateJieDanRen(item) {
        if (item.peiJiedanId == 'null') {
          this.queryComputer();
          return;
        }
        if (item.fuAdvice != '同意') {
          alert("该信息还未通过审核，请审核同意后再操作!");
          this.queryComputer();
          return;
        }
        for (var i = 0; i < this.jieDanRenList.length; i++) {
          if (this.jieDanRenList[i].ACCOUNT_ID == item.peiJiedanId) {
            item.prepareName = this.jieDanRenList[i].ACCOUNT_NAME;
            break;
          }
        }

        var rquestParam = {
          id: item.id,
          peiJiedanId: item.peiJiedanId,
          prepareName: item.prepareName
        };

        var url = this.url.concat("/computerManageController/shenHe");
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.clearData();
            this.queryComputer();
            alert("操作成功!");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //时间切换
      changeTime(flag) {
        if (flag == 0) {
          //上月(月初和月末)
          this.timeFlag = false;
          var lastMon = moment().subtract('month', 1);
          var lastMonStart = moment(lastMon).startOf('month').format("YYYY-MM-DD");
          var lastMonEnd = moment(lastMon).endOf('month').format("YYYY-MM-DD");
          this.begDate = lastMonStart;
          this.endDate = lastMonEnd;
        } else if (flag == 1) {
          //本月(月初和月末)
          this.timeFlag = false;
          var currMonStart = moment().startOf('month').format("YYYY-MM-DD");
          var currMonEnd = moment().endOf('month').format("YYYY-MM-DD");
          this.begDate = currMonStart;
          this.endDate = currMonEnd;
        } else if (flag == 2) {
          //次月(月初和月末)
          this.timeFlag = false;
          var nextMon = moment().add('month', 1);
          var nextMonStart = moment(nextMon).startOf('month').format("YYYY-MM-DD");
          var nextMonEnd = moment(nextMon).endOf('month').format("YYYY-MM-DD");
          this.begDate = nextMonStart;
          this.endDate = nextMonEnd;
        } else {
          //当前时间
          this.timeFlag = true;
          this.begDate = moment().format("YYYY-MM-DD");
          this.endDate = moment().format("YYYY-MM-DD");
        }
        this.queryComputer();
      },
      //点击导出
      exportBtn() {
        this.thFlag = true;
        if (this.setTimeObj != null) {
          window.clearTimeout(this.setTimeObj);
          this.setTimeObj = null;
        }
        this.queryComputer();
        this.setTimeObj = setTimeout(function() {
          vm.exportTableToExcel('datatable', '电脑用品管理')
        }, 2000);
      }
    },
    created() {
      this.accountData = JSON.parse(Cookies.get("accountData"));
      this.accountId = this.accountData.account.account_ID;
      this.accountName = this.accountData.account.account_Name;
      this.queryDeptPostEmp();
      this.getFu();
      vm = this;
      $(function() {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  }
</script>

<style>
  @import url("../../assets/css/paperlessOffice/computer.css");

  ul li {
    list-style-type: none;
  }
</style>
