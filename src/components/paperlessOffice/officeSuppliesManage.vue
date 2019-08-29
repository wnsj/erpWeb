<template>
  <div class="container user-container" id="officeSuppliesManage">
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>办公用品管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>部门：</p>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <department @departChange='getDept'></department>
        </div>
      </div>

      <div class="co-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>申请月份：</p>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <div class="input-append date" id="datetimepicker">
            <input size="16" type="text" id='textDatePick' readonly>
            <span class="add-on"><i class="icon-th"></i></span>
          </div>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding:0">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
          <p>名称：</p>
        </div>
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <span>
            <input type="text" value="" class="form-control" v-model="kquName" />
          </span>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-warning pull-left m_r_10" data-toggle="modal" v-has='74' @click="huiZongBtn()">汇总</button>
        <button type="button" class="btn btn-primary pull-right" @click="exportTableToExcel('datatable','办公用品申请表')">导出</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" @click="requestOffice()">申请</button>
        <button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" @click="queryOfficeSupplies">查询</button>
      </div>
    </div>

    <div class="row add-mt">
      <div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
        <p>项目：</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover user-table offover" id="datatable">
            <thead>
              <tr>
                <th class="text-center">部门</th>
                <th class="text-center">月份</th>
                <th class="text-center">名称 </th>
                <th class="text-center">数量</th>
                <th class="text-center">规格及要求</th>
                <th class="text-center">备注</th>
                <th class="text-center">统计人</th>
                <th class="text-center">审核人</th>
                <th class="text-center">审核意见</th>
                <!-- <th class="text-center">状态</th> -->
                <th class="text-center">查看详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in employeeList" :key="index">
                <td>{{item.departmentName}}</td>
                <td>{{item.month}}</td>
                <td>{{item.name}}</td>
                <td>{{item.num}}</td>
                <td>{{item.specification}}</td>
                <td>{{item.remark}}</td>
                <td>{{item.account1Name}}</td>
                <td>{{item.account2Name}}</td>
                <td>{{item.advice2}}</td>
                <!-- <td>{{item.state}}</td> -->
                <td>
                  <template>
                    <button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoinInfo"
                      @click="officeInfo(item)">点击查看详情</button>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    <!-- 办公用品申请表弹出     -->
    <div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog staff_t">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
            <h1 class="modal-title">办公用品申请</h1>
          </div>
          <div class="modal-header modal_header_leave">
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                <p>部门：</p>
              </div>
              <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <department @departChange='getDept2' ref='dept2'></department>
              </div>
            </div>

            <div class="co-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                <p>申请月份：</p>
              </div>
              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <input type="text" value="" class="form-control" v-model="dpbeginDate" readonly="readonly" />
              </div>
            </div>

            <div class="co-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                <p>办公用品申领计划单</p>
              </div>
            </div>
          </div>

          <div class="office_table">
            <table class="table table-bordered table-hover user-table">
              <thead>
                <tr>
                  <th class="text-center"><span style="color: red;">*</span>名称</th>
                  <th class="text-center"><span style="color: red;">*</span>数量</th>
                  <th class="text-center"><span style="color: red;">*</span>规格与要求 </th>
                  <th class="text-center">备注</th>
                  <th class="text-center">删除</th>
                  <th class="text-center"></th>
                </tr>

                <tr v-for="(itemObj,index) in addOffice" :key='index'>
                  <th class="text-center">
                    <select class="form-control" v-model="itemObj.officeId" @change="officeChange(itemObj),selectChange('selectId_'+index,'textId_'+index,'specTextId_'+index)"
                      name="select" :id="'selectId_'+index" style="position: relative;">
                      <option value="0">--请选择--</option>
                      <option v-for="item in officeNames" :key="item.id" :value="item.id">
                        {{item.name}}
                      </option>
                    </select>
                    <input type="text" :id="'textId_'+index" placeholder="请输入名称..." v-model="itemObj.name" style="position: absolute;
                      border: 1;outline: none;display: none;" />
                  </th>
                  <th class="text-center"><input type="text" placeholder="请输入数字" class="form-control" v-model="itemObj.num"
                      @input="inputOfficeNum(itemObj)"></th>
                  <th class="text-center">
                    <select class="form-control" v-model="itemObj.specId" @change="speChange(itemObj)">
                      <option value="0">--请选择--</option>
                      <option v-for="item in itemObj.specificationList" :key="item.id" :value="item.id">
                        {{item.specification}}
                      </option>
                    </select>
                    <input type="text" :id="'specTextId_'+index" placeholder="请输入规格..." v-model="itemObj.specification"
                      style="position: absolute;border: 1;outline: none;display: none;" />
                  </th>
                  <th class="text-center"><input type="text" placeholder="备注" class="form-control" v-model="itemObj.remark"></th>
                  <th class="text-center"><button @click="delRow(index)">删除</button></th>
                  <th class="col-md-1">
                    <button type="button" class="btn btn-warning pull-left m_r_10" @click="addRow(itemObj,addOffice)">+</button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div style="float: right; margin-right: 30px;">红色<span style="color: red;">*</span>为必填项</div>
          <div class="modal-header modal_header_leave" style="margin-top:15px">
            <h6>申请人</h6>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                <p>申请人：</p>
              </div>
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 ">
                <input type="text" :value="account.account_Name" class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;"
                  readonly>
              </div>
            </div>

            <!-- <div class="col-md-3">
							<button type="button" class="btn btn-info" @click="addUpdateOffice(addOffice)">确定</button>
							<button type="button" class="btn btn-info">取消</button>
						</div> -->
          </div>

          <div class="modal-header modal_header_leave">
            <h6>审核人</h6>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                <p>主管/组长：</p>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <select class="form-control" v-model="conscientId">
                  <option value='0' v-for="item in deptConscientious" :key="item.ACCOUNT_ID" :value="item.ACCOUNT_ID">{{item.EMP_NAME}}</option>
                </select>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-warning pull-left m_r_10" @click="queryDeptConscientious('',deptId)">+</button>
              </div>
            </div>
            <!-- <div class="col-md-3">
							<button type="button" class="btn btn-info">同意</button>
							<button type="button" class="btn btn-info">不同意</button>
						</div> -->
          </div>
          <div class="modal-footer">
            <!--按钮-->
            <div class="col-md-12">
              <button type="button" class="btn btn-info" v-on:click="addUpdateOffice(addOffice)">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>

            <div class="beihzu">
              <i>按钮用来扩大选择其他人员</i>
              <div class="col-md-1">
                <button type="button" class="btn btn-warning pull-left m_r_10">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 办公用品详情 -->
    <div class="modal fade" id="myModalJoinInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog staff_t">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
            <h1 class="modal-title">办公用品详情</h1>
          </div>

          <div class="modal-header modal_header_leave">
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                <p>部门：</p>
              </div>
              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <input type="text" v-model="deptmentName" readonly="readonly" />
              </div>
            </div>

            <div class="co-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                <p>申请月份：</p>
              </div>
              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <input type="text" value="" class="form-control" :value="officeInfoDate" readonly="readonly" />
              </div>
            </div>

            <div class="co-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                <p>办公用品申领计划单</p>
              </div>
            </div>
          </div>

          <div class="office_table">
            <table class="table table-bordered table-hover user-table">
              <thead>
                <tr>
                  <th class="text-center"><span style="color: red;">*</span>名称</th>
                  <th class="text-center"><span style="color: red;">*</span>数量</th>
                  <th class="text-center"><span style="color: red;">*</span>规格与要求 </th>
                  <th class="text-center">备注</th>
                  <th class="text-center">删除</th>
                  <th class="text-center"></th>
                </tr>

                <tr v-for="(itemObj,index) in officeInfoList" :key='index'>
                  <th class="text-center" @click="isShow('spanId_' + index + 1,'selectId_' + index + 1,'specId_' + index + 1,'spanSpecId_'+ index + 1)">
                    <span style="display: block;" :id="'spanId_' + index + 1" class='spanClass'>{{itemObj.name}}</span>
                    <select class="form-control clearClass" v-model="itemObj.officeId" @change="officeChange(itemObj),selectChange('selectId_'+ index + 1,'textId_' + index + 1,'specTextId_' + index + 1)"
                      :disabled="itemObj.advice2 == '同意'" style="position: relative;display: none;" :id="'selectId_' + index + 1">
                      <option value="0">--请选择--</option>
                      <option v-for="(item,index) in officeNames" :key="index" :value="item.id">
                        {{item.name}}
                      </option>
                    </select>
                    <input class="form-control clearClass" type="text" :id="'textId_' + index + 1" placeholder="请输入名称..."
                      v-model="itemObj.name" style="display: none; position: absolute;border: 1;outline: none;" />
                  </th>
                  <th class="text-center"><input type="text" placeholder="请输入数字" class="form-control" v-model="itemObj.num"
                      @input="inputOfficeNum(itemObj)" :disabled="itemObj.advice2 == '同意' "></th>
                  <th class="text-center">
                    <span style="display: block;" class='spanClass' :id="'spanSpecId_' + index + 1">{{itemObj.specification}}</span>
                    <select class="form-control clearClass" v-model="itemObj.specId" @change="speChange(itemObj)"
                      :disabled="itemObj.advice2 == '同意' " style="position: relative;display: none;"
                      :id="'specId_' + index + 1">
                      <option value="0">--请选择--</option>
                      <option v-for="item in itemObj.specificationList" :key="item.id" :value="item.id">
                        {{item.specification}}
                      </option>
                    </select>
                    <input class="form-control clearClass" type="text" :id="'specTextId_' + index + 1" placeholder="请输入规格..."
                      v-model="itemObj.specification" style="position: absolute;width: 100px;height: 28px; border: 1;outline: none;display: none;" />
                  </th>
                  <th class="text-center"><input type="text" placeholder="备注" class="form-control" v-model="itemObj.remark"
                      :disabled="itemObj.advice2 == '同意' "></th>
                  <th class="text-center"><button class="form-control" @click="delData(index)" :disabled="itemObj.advice2 == '同意' ">删除</button></th>
                  <th class="col-md-1">
                    <button type="button" class="btn btn-warning pull-left m_r_10" @click="addRow(itemObj,officeInfoList)"
                      :disabled="itemObj.advice2 == '同意' ">+</button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div style="float: right; margin-right: 30px;">红色<span style="color: red;">*</span>为必填项</div>
          <div class="modal-header modal_header_leave" style="margin-top:15px">
            <h6>申请人</h6>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                <p>申请人：</p>
              </div>
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 ">
                <input type="text" :value="itemAccountName" class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;"
                  readonly="readonly">
              </div>
            </div>

            <div class="col-md-3">
              <button type="button" class="btn btn-info" @click="addUpDelOffice()" :disabled="isAdvance">确定</button>
              <button type="button" class="btn btn-info" onClick="$('#myModalJoinInfo').modal('hide')">取消</button>
            </div>
          </div>

          <div class="modal-header modal_header_leave">
            <h6>审核人</h6>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                <p>主管/组长：</p>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <select class="form-control" v-model="conscientPeoId" :disabled="isAdvance">
                  <option v-for="item in deptConscientious" :key="item.ACCOUNT_ID" :value="item.ACCOUNT_ID">{{item.EMP_NAME}}</option>
                </select>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-warning pull-left m_r_10" :disabled="isAdvance2">+</button>
              </div>
            </div>
            <div class="col-md-3">
              <span>结果:{{advance}}</span>
              <button type="button" class="btn btn-info" :disabled="isAdvance2" @click="shenHe(officeInfoDate,1)">同意</button>
              <button type="button" class="btn btn-info" :disabled="isAdvance2" @click="shenHe(officeInfoDate,2)">不同意</button>
            </div>
          </div>
          <div class="modal-footer">
            <!--按钮
						<div class="col-md-12">
							<button type="button" class="btn btn-info" v-on:click="submitEmployeeInfo()">确认</button>
							<button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
						</div>-->

            <div class="beihzu">
              <i>按钮用来扩大选择其他人员</i>
              <div class="col-md-1">
                <button type="button" class="btn btn-warning pull-left m_r_10" @click="queryDeptConscientious('',dementId)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 办公用品汇总表弹出 -->
    <div class="modal fade" id="huiZongModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog staff_t">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
            <h1 class="modal-title">办公用品汇总</h1>
          </div>
          <div class="modal-header modal_header_leave">
            <div class="co-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                <p>申请月份：</p>
              </div>
              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div class="input-append date" id="datetimepicker2">
                  <input size="16" type="text" id='textDatePick2' readonly>
                  <span class="add-on"><i class="icon-th"></i></span>
                </div>
              </div>
            </div>
            <div class="co-xs-7 col-sm-7 col-md-7 col-lg-7">
              <button type="button" class="btn btn-primary pull-right" @click="exportTableToExcel('gatherOfficeTB','办公用品汇总表')">导出</button>
              <button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" @click="gatherOffice()">查询</button>
            </div>
          </div>

          <div class="office_table">
            <table class="table table-bordered table-hover user-table" id="gatherOfficeTB">
              <thead>
                <tr>
                  <th class="text-center">名称</th>
                  <th class="text-center">数量</th>
                  <th class="text-center">规格</th>
                  <th class="text-center">完成状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in  hZList " :key='index'>
                  <th class="text-center">{{item.name}}</th>
                  <th class="text-center">{{item.num}} </th>
                  <th class="text-center">{{item.specification}}</th>
                  <th class="text-center"><button class="form-control" :disabled="item.isWanCheng == '已完成'" @click="isFinish(item)">{{item.isWanCheng}}</button></th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-header modal_header_leave">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 pull-right">
              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>提交人：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <input type="text" :value="hasHz.isHuiZong == '9999' ? hasHz.huiZongRenName : account.account_Name" readonly="readonly" class="form-control" />
                </div>
              </div>

              <div class="col-xs-4 col-sm-4 col-md-4col-md-4">
                <button type="button" class="btn btn-warning col-xs-12 col-sm-12 col-md-12col-md-12" :disabled="hasHz.isHuiZong == '9999'"
                  @click="commitOffice">提交汇总</button>
              </div>
            </div>
          </div>

          <div class="modal-header modal_header_leave">
            <h6>意见</h6>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>人事意见：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <select class="form-control" v-model="actId1">
                    <option v-for="item in advancePeo.officeManage" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                  <span>{{advanceObj.RENSHI_ADVICE == '1' ? '同意' : advanceObj.RENSHI_ADVICE == '2' ? '不同意' : '等待'}}</span>
                </div>
              </div>

              <div class="col-xs-3 col-sm-3 col-md-3col-md-3">
                <button type="button" class="btn btn-info" @click=" hZShenHe('renShiAdv', 1)">同意</button>
                <button type="button" class="btn btn-warning" @click=" hZShenHe('renShiAdv', 2)">不同意</button>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>副总意见：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <select class="form-control" v-model="actId2">
                    <option v-for="item in advancePeo.fuZongManage" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                  <span>{{advanceObj.FUZONG_ADVICE == '1' ? '同意' : advanceObj.FUZONG_ADVICE == '2' ? '不同意' : '等待'}}</span>
                </div>
              </div>

              <div class="col-xs-3 col-sm-3 col-md-3col-md-3">
                <button type="button" class="btn btn-info" @click="hZShenHe('fuZongAdv', 1)">同意</button>
                <button type="button" class="btn btn-warning" @click="hZShenHe('fuZongAdv', 2)">不同意</button>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
                  <p>财务意见：</p>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <select class="form-control" v-model="actId3">
                    <option v-for="item in advancePeo.moneyManage" :key='item.ACCOUNT_ID' :value="item.ACCOUNT_ID">{{item.ACCOUNT_NAME}}</option>
                  </select>
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                  <span>{{advanceObj.CAIWU_ADVICE == '1' ? '同意' : advanceObj.CAIWU_ADVICE == '2' ? '不同意' : '等待'}}</span>
                </div>
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3col-md-3">
                <button type="button" class="btn btn-info" @click="hZShenHe('caiWuAdv', 1)">同意</button>
                <button type="button" class="btn btn-warning" @click="hZShenHe('caiWuAdv', 2)">不同意</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import Cookies from 'js-cookie'
  //require('@/../static/js/bootstrap-datetimepicker.js')
  import department from '@/components/vuecommon/department.vue'

  export default {
    components: {
      department,
    },
    data() {
      return {
        dpbeginDate: moment(moment().add(1, 'month')).format("YYYY-MM"),
        kquName: '',
        employeeList: [],
        departId: '',
        deptId: '',
        officeNames: [],
        specificationList: [],
        addOffice: [{
          officeId: 0,
          specId: 0,
          remark: '',
          name: '',
          num: '',
          specification: ''
        }],
        officeInfoList: [],
        deptmentName: '',
        officeInfoDate: '',
        account: {
          account_Name: ''
        },
        shenHeList: [],
        itemAccountName: '',
        delList: [],
        isAdvance: false,
        isAdvance2: false,
        advance: '',
        isHZ: {
          isHuiZong: ""
        },
        dementId: '',
        hZList: [],
        hasHz: {},
        advanceObj: {},
        advancePeo: {},
        actId1: 1127,
        actId2: 67,
        actId3: 1974,
        deptConscientious: [],
        conscientId: '',
        conscientPeoId: ''
      };
    },
    methods: {
      //Promise使用：https://www.cnblogs.com/momozjm/p/7273272.html
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
          }).catch(
            function(error) {
              reject(error)
            }
          );
        });
      },
      //办公用品管理查询
      queryOfficeSupplies() {
        var accountId = this.has("70") ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID;
        var url = this.url + "/officeAction/queryOfficeSuppliesData";
        var date = $('#textDatePick').val();
        var rquestParam = {
          month: date,
          accountId1: accountId,
          departmentId: this.departId,
          name: this.kquName
        };
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.employeeList = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //部门切换1
      getDept(deptId, deptName) {
        this.departId = deptId == 0 ? '' : deptId;
      },
      //部门切换2
      getDept2(deptId, deptName) {
        this.deptId = deptId == 0 ? '' : deptId;
        //获取部门相关负责人
        this.queryDeptConscientious(2, this.deptId, true);
      },
      //查询所有办公用品
      queryOfficeNames() {
        var url = this.url + "/officeAction/queryOfficeNames";
        this.requestData(url, {}).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.officeNames = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //办公用品名切换
      officeChange(office) {
        office.name = '';
        office.specId = 0;
        office.specification = '';
        for (var i = 0; i < this.officeNames.length; i++) {
          if (this.officeNames[i].id == office.officeId) {
            office.specificationList = this.officeNames[i].specification;
            office.name = this.officeNames[i].name;
            return;
          }
        }
      },
      //规格切换
      speChange(office) {
        for (var i = 0; i < office.specificationList.length; i++) {
          if (office.specId == office.specificationList[i].id) {
            office.specification = office.specificationList[i].specification;
            return;
          }
        }
      },
      //只能输入数字
      inputOfficeNum(itemObj) {
        itemObj.num = itemObj.num.replace(/[^\.\d]/g, '');
        itemObj.num = itemObj.num.replace('.', '');
      },
      //校验数组中的数据是否合法
      verificationArr(addOffice) {
        for (var i = 0; i < addOffice.length; i++) {
          if (this.isBlank(addOffice[i].name)) {
            alert('名称不能为空!(请完善必填项后再继续操作!)');
            return false;
          }

          if (addOffice[i].num <= 0) {
            alert('数量不能为0!(请完善必填项后再继续操作!)');
            return false;
          }

          if (this.isBlank(addOffice[i].specification)) {
            alert('规格不能为空!(请完善必填项后再继续操作!)');
            return false;
          }
        }
        return true;
      },
      //校验数据是否合法
      verificationData(itemObj, addOffice) {
        if (this.isBlank(itemObj.name)) {
          alert('名称不能为空!(请完善必填项后再继续操作!)');
          return false;
        }

        if (itemObj.num <= 0) {
          alert('数量不能为0!(请完善必填项后再继续操作!)');
          return false;
        }

        if (this.isBlank(itemObj.specification)) {
          alert('规格不能为空!(请完善必填项后再继续操作!)');
          return false;
        }
        if (!this.verificationArr(addOffice)) return false;
        return true;
      },
      //添加行
      addRow(itemObj, addOffice) {
        if (!this.verificationData(itemObj, addOffice)) return;
        addOffice.push({
          officeId: 0,
          specId: 0,
          remark: '',
          name: '',
          num: '',
          specification: ''
        });
      },
      //删除行
      delRow(index) {
        if (this.addOffice.length - 1 <= 0) {
          alert("当前数据只有一行不允许删除!");
          return;
        }
        this.addOffice.splice(index, 1);
      },
      //删除数据
      delData(index) {
        var obj = Object.assign({}, this.officeInfoList[index]);
        if (!this.isBlank(obj.id)) this.delList.push(obj);
        this.officeInfoList.splice(index, 1);
      },
      //查看详情
      officeInfo(office) {
        this.delList = [];
        var accountId = this.has("70") ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID;
        //获取部门相关负责人
        this.queryDeptConscientious('', office.departmentId, false);
        this.itemAccountName = office.account1Name;
        this.advance = office.advice2;
        var rquestParam = {
          month: office.month,
          accountId1: accountId,
          departmentId: office.departmentId,
          //意见（1：同意,2:不同意,3:未审核）
          advice2: office.advice2 == '同意' ? 1 : office.advice2 == '不同意' ? 2 : 3
          //状态0：等待，1：通过，2：没通过
          //state: office.state == '通过' ? 1 : office.state == '没通过' ? 2 : 0
        };
        var url = this.url + "/officeAction/queryOfficeSuppliesData";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.officeInfoList = responseData.retData;
            this.officeInfoList.forEach(item => {
              if (item.departmentId == office.departmentId) {
                for (var i = 0; i < this.officeNames.length; i++) {
                  if (this.officeNames[i].id == item.officeId) {
                    item.specificationList = this.officeNames[i].specification;
                  }
                }
                // let ite = Object.assign({},item);
                // this.officeInfoList.push(ite);
                this.deptmentName = item.departmentName;
                this.officeInfoDate = item.month;
                this.isAdvance = item.advice2 == '同意' ? true : false;
                this.isAdvance2 = item.advice2 == '同意' || item.advice2 == '不同意' ? true : false;
                this.dementId = office.departmentId;
                this.conscientPeoId = item.accountId2;
              }
            });
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
        var arr = $(".clearClass");
        for (var i = 0; i < arr.length; i++) {
          arr[i].style.display = 'none'
        }
        var arrs = $(".spanClass");
        for (var i = 0; i < arrs.length; i++) {
          arrs[i].style.display = 'block'
        }
      },
      //申请按钮
      requestOffice() {
        //查询当月是否已经汇总
        var rquestParam = {
          month: this.dpbeginDate
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.isHZ = responseData.retData;
            if (this.isHZ.isHuiZong == '9999') {
              alert("本月办公用品申请已结束,请下月再申请!");
            } else {
              this.deptId = this.account.departId;
              this.$refs.dept2.setDpart(this.account.departId);
              this.addOffice = [];
              this.addOffice.push({
                officeId: 0,
                specId: 0,
                remark: '',
                name: '',
                num: '',
                specification: ''
              });
              $("#myModalJoin").modal("show");
              document.getElementById('textId_0').style.display = "none";
              document.getElementById('specTextId_0').style.display = "none";
              //获取部门相关负责人
              this.queryDeptConscientious(2, this.account.departId, true);
            }
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //审核
      shenHe(month, advance) {
        //查询当月是否已经汇总
        var rquestParam = {
          month: month
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.isHZ = responseData.retData;
            if (this.isHZ.isHuiZong == '9999') {
              alert("本月已经汇总,不可进行审核!");
              return;
            } else {
              //判断是否是本人操作
              if (this.conscientPeoId != this.account.account_ID) {
                alert("不可代替他人审核!");
                return;
              }
              //判断是否有审核权限
              if (!this.verificationAccount(this.deptConscientious, this.account.account_ID)) {
                alert("暂无权限!");
                return;
              }
              var paramArr = [];
              for (var i = 0; i < this.officeInfoList.length; i++) {
                var paramObj = {};
                if (this.isBlank(this.officeInfoList[i].id)) {
                  alert("数据异常,请刷新后再试!");
                  return;
                }
                paramObj.id = this.officeInfoList[i].id;
                paramObj.accountId2 = this.account.account_ID;
                paramObj.advice2 = advance;
                paramObj.state = advance;
                paramArr.push(paramObj);
              }
              if (paramArr.length < 0) return;
              var rquestParam = {
                officeInfo: paramArr,
                month: month
              };
              var url = this.url + "/officeAction/shenHeOffice";
              this.requestData(url, rquestParam).then((responseData) => {
                if (responseData.retCode == '0000') {
                  alert('审核成功!');
                  this.queryOfficeSupplies();
                  $("#myModalJoinInfo").modal("hide");
                } else {
                  alert(responseData.retMsg);
                }
              }, (error) => {
                console.log("请求失败处理");
              });
            }
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //添加办公用品
      addUpdateOffice(officeData) {
        //判断数组中是否有空数据
        if (!this.verificationArr(officeData)) {
          console.log('请完善数据或删除空白选项后再进行操作!');
          return;
        }
        if (this.isBlank(this.deptId) || this.deptId == 0) {
          alert("请选择部门后再进行操作!");
          return;
        }
        if (this.isBlank(this.conscientId)) {
          alert("审核人不能为空！");
          return;
        }
        officeData.forEach(item => {
          item.departmentId = this.deptId;
          item.month = moment(this.dpbeginDate).format("YYYY-MM-DD");
          item.accountId1 = this.account.account_ID;
          item.accountId2 = this.conscientId;
          item.advice2 = 3;
          item.state = 0;
          item.zhuSee = 0;
          item.renSee = 0;
          item.shenSee = 0;
        });
        var rquestParam = {
          officeInfo: officeData
        };
        var url = this.url + "/officeAction/addUpdateOfficeSupplies";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            alert('添加成功!');
            this.queryOfficeSupplies();
            $("#myModalJoin").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //添加,删除，修改办公用品
      addUpDelOffice() {
        //判断当月是否已经汇总
        var rquestParam = {
          month: this.officeInfoDate
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.isHZ = responseData.retData;
            if (this.isHZ.isHuiZong == '9999') {
              alert("本月已经汇总,不可进行修改!");
              return;
            } else {
              if (this.officeInfoList.length > 0) {
                if (!this.verificationArr(this.officeInfoList)) {
                  console.log('请完善数据或删除空白选项后再进行操作!');
                  return;
                } else {
                  if (this.isBlank(this.conscientPeoId)) {
                    alert("审核人不能为空!")
                    return;
                  }
                  if (!confirm("确定提交吗?")) {
                    $("#myModalJoinInfo").modal("hide");
                    return;
                  }
                  this.officeInfoList.forEach(item => {
                    item.month = moment(this.officeInfoDate).format("YYYY-MM-DD");
                    item.accountId1 = this.account.account_ID;
                    item.departmentId = this.dementId;
                    //审核人
                    item.accountId2 = this.conscientPeoId;
                    //意见（1：同意,2:不同意,3:未审核）
                    //item.advice2 = item.advice2 == '同意' ? 1 : item.advice2 == '不同意' ? 2 : 3;
                    item.advice2 = 3;
                    //状态（0：等待，1：通过，2：没通过）
                    //item.state = item.state == '等待' ? 0 : item.state == '通过' ? 1 : 2;
                    item.state = 0;
                  });
                }
              }
              var rquestParam = {
                officeInfo: this.officeInfoList,
                delOffice: this.delList
              };
              var url = this.url + "/officeAction/addUpdateOfficeSupplies";
              this.requestData(url, rquestParam).then((responseData) => {
                if (responseData.retCode == '0000') {
                  alert('修改成功!');
                  this.queryOfficeSupplies();
                  $("#myModalJoinInfo").modal("hide");
                } else {
                  alert(responseData.retMsg);
                }
              }, (error) => {
                console.log("请求失败处理");
              });
            }
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //查询当月是否已经汇总
      isHuiZong(month) {
        var rquestParam = {
          month: month
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.isHZ = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //汇总按钮
      huiZongBtn() {
        $("#huiZongModal").modal("show");
        $('#datetimepicker2').datetimepicker({
          format: 'yyyy-mm',
          autoclose: true,
          startView: 3,
          minView: 3,
          language: 'cn',
        });
        $('#textDatePick2').val(moment(moment().add(1, 'month')).format("YYYY-MM"));
        //是否已经汇总
        var rquestParam = {
          month: $('#textDatePick2').val()
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.hasHz = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });

        //查询汇总数据
        this.gatherOffice();
        //查询意见给出人（审核人）
        this.queryAdvancePeo();
      },
      //办公用品汇总查询
      gatherOffice() {
        var rquestParam = {
          month: $('#textDatePick2').val(),
        };
        var url = this.url + "/officeAction/gatherOfficeSupplies";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.hZList = responseData.retData.gatherOffice;
            this.advanceObj = responseData.retData.advance;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
        //是否已经汇总
        var rquestParam = {
          month: $('#textDatePick2').val()
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.hasHz = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //查询审核人
      queryAdvancePeo() {
        var rquestParam = {
          params: [{
              deptName: "人力综合办",
              postName: "办公室主任",
              key: "officeManage"
            },
            {
              deptName: "总经办",
              postName: "副总经理",
              key: "fuZongManage"
            },
            {
              deptName: "财务部",
              postName: "出纳",
              key: "moneyManage"
            }
          ]
        };
        var url = this.url + "/officeAction/queryAdvancePeo";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.advancePeo = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //汇总审核
      hZShenHe(dept, advance) {
        //是否已经汇总
        var rquestParam = {
          month: $('#textDatePick2').val()
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.hasHz = responseData.retData;
            if (this.hasHz.isHuiZong == '0000') {
              alert("待汇总提交后方可审核!");
              return;
            } else {
              // 获取审核意见
              var url = this.url + "/officeAction/queryAdvance";
              this.requestData(url, rquestParam).then((responseData) => {
                if (responseData.retCode == '0000') {
                  var adv = responseData.retData.advance
                  if (dept == 'renShiAdv') {
                    //人事审核
                    if (!this.isBlank(adv.RENSHI_ADVICE)) {
                      //已审核过
                      alert("本月已进行过审核不可重复审核！");
                      return;
                    } else {
                      //未进行过审核
                      //判断是否是本人进行操作
                      if (!this.verificationAccount(this.advancePeo.officeManage, this.account.account_ID)) {
                        alert("暂无权限!");
                        return;
                      }
                      var rquestParam = {
                        officeInfo: [{
                          month: $('#textDatePick2').val(),
                          renShiId: this.account.account_ID,
                          renShidAvice: advance,
                          state: 1
                        }]
                      };
                      var url = this.url + "/officeAction/commitAndSheHe";
                      this.requestData(url, rquestParam).then((responseData) => {
                        if (responseData.retCode == '0000') {
                          alert('审核成功!');
                          this.gatherOffice();
                        } else {
                          alert(responseData.retMsg);
                        }
                      }, (error) => {
                        console.log("请求失败处理");
                      });
                    }
                  } else if (dept == 'fuZongAdv') {
                    //副总审核
                    if (!this.isBlank(adv.FUZONG_ADVICE)) {
                      //已审核过
                      alert("本月已进行过审核不可重复审核！");
                      return;
                    } else {
                      //未进行过审核
                      //判断人事是否同意
                      if (adv.RENSHI_ADVICE != '1') {
                        alert("人事未同意前不可审核！");
                        return;
                      }
                      if (!this.verificationAccount(this.advancePeo.fuZongManage, this.account.account_ID)) {
                        alert("暂无权限!");
                        return;
                      }
                      //完成审核
                      var rquestParam = {
                        officeInfo: [{
                          month: $('#textDatePick2').val(),
                          fuZongId: this.account.account_ID,
                          fuZongAdvice: advance,
                          state: 1
                        }]
                      };
                      var url = this.url + "/officeAction/commitAndSheHe";
                      this.requestData(url, rquestParam).then((responseData) => {
                        if (responseData.retCode == '0000') {
                          alert('审核成功!');
                          this.gatherOffice();
                        } else {
                          alert(responseData.retMsg);
                        }
                      }, (error) => {
                        console.log("请求失败处理");
                      });
                    }
                  } else if (dept == 'caiWuAdv') {
                    //财务审核
                    if (!this.isBlank(adv.CAIWU_ADVICE)) {
                      //已审核过
                      alert("本月已进行过审核不可重复审核！");
                      return;
                    } else {
                      //未进行过审核
                      //判断副总是否同意
                      if (adv.FUZONG_ADVICE != '1') {
                        alert("副总未同意前不可审核！");
                        return;
                      }
                      if (!this.verificationAccount(this.advancePeo.moneyManage, this.account.account_ID)) {
                        alert("暂无权限!");
                        return;
                      }
                      //完成审核
                      var rquestParam = {
                        officeInfo: [{
                          month: $('#textDatePick2').val(),
                          caiWuId: this.account.account_ID,
                          caiWuAdvice: advance,
                          state: 1
                        }]
                      };
                      var url = this.url + "/officeAction/commitAndSheHe";
                      this.requestData(url, rquestParam).then((responseData) => {
                        if (responseData.retCode == '0000') {
                          alert('审核成功!');
                          this.gatherOffice();
                        } else {
                          alert(responseData.retMsg);
                        }
                      }, (error) => {
                        console.log("请求失败处理");
                      });
                    }
                  }
                } else {
                  alert(responseData.retMsg);
                }
              }, (error) => {
                console.log("请求失败处理");
              });
            }
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //提交汇总
      commitOffice() {
        //是否已经汇总
        var rquestParam = {
          month: $('#textDatePick2').val()
        };
        var url = this.url + "/officeAction/isHuiZong";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.hasHz = responseData.retData;
            if (this.hasHz.isHuiZong == '9999') {
              alert("本月数据已经汇总，不可重复提交!");
              return;
            } else {
              if (this.hZList.length <= 0) {
                alert("请点击查询确保有数据后再进行提交!");
                return;
              }
              if (confirm("确定提交?")) {
                var rquestParam = {
                  officeInfo: [{
                    month: $('#textDatePick2').val(),
                    accountId3: this.account.account_ID,
                    isTiJiao: 1,
                    state: 1,
                    renShiId:this.actId1,
                    fuZongId:this.actId2,
                    caiWuId:this.actId3
                  }]
                };
                var url = this.url + "/officeAction/commitAndSheHe";
                this.requestData(url, rquestParam).then((responseData) => {
                  if (responseData.retCode == '0000') {
                    alert('提交成功!');
                    this.gatherOffice();
                  } else {
                    alert(responseData.retMsg);
                  }
                }, (error) => {
                  console.log("请求失败处理");
                });
              }
            }
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //判断是否是审核人
      verificationAccount(manage, accountId) {
        for (let i = 0; i < manage.length; i++) {
          if (manage[i].ACCOUNT_ID == accountId) return true;
        }
        return false;
      },
      //获取部门相关负责人
      queryDeptConscientious(level, deptId, isSetActId) {
        var rquestParam = {
          deptId: deptId,
          level: this.isBlank(level) ? '' : level
        };
        var url = this.url + "/officeAction/queryDeptConscientious";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.deptConscientious = responseData.retData;
            if (isSetActId && this.deptConscientious.length > 0) this.conscientId = this.deptConscientious[0].ACCOUNT_ID;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //点击完成
      isFinish(item) {
        // 获取审核意见
        var rquestParam = {
          month: $('#textDatePick2').val()
        };
        var url = this.url + "/officeAction/queryAdvance";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            var adv = responseData.retData.advance;
            if (adv.CAIWU_ADVICE != 1) {
              alert("财务未同意前，不可操作!");
              return;
            }
            var paramObj = {
              officeInfo: [{
                name: item.name,
                specification: item.specification,
                month: $('#textDatePick2').val(),
                state: 1,
                isWanCheng: 1
              }]
            };
            //完成
            var url = this.url + "/officeAction/commitAndSheHe";
            this.requestData(url, paramObj).then((responseData) => {
              if (responseData.retCode == '0000') {
                alert("成功！");
                this.gatherOffice();
              } else {
                alert(responseData.retMsg);
              }
            }), (error) => {
              console.log("请求失败处理");
            };
          } else {
            alert(responseData.retMsg);
          }
        }), (error) => {
          console.log("请求失败处理");
        };
      },
      //是否显示内容'spanSpecId_' + index + 1
      isShow(spanId, selectId, specId, spanSpecId) {
        console.log(spanId, selectId, specId)
        var oSelect = document.getElementById(selectId);
        var oSpec = document.getElementById(specId);
        var oText = document.getElementById(spanId);
        var oSpanSpec = document.getElementById(spanSpecId);
        oSelect.style.display = "block";
        oSpec.style.display = "block";
        oText.style.display = "none";
        oSpanSpec.style.display = "none";
      },
      //判断是否选择了输入框
      selectChange(selectId, textId, specTextId) {
        var oSelect = document.getElementById(selectId);
        var oText = document.getElementById(textId);
        var oSpecText = document.getElementById(specTextId);
        if (oSelect.value == "26") {
          oText.value = '';
          oSelect.name = '';
          oText.name = 'select';
          oText.style.display = "block";

          oSpecText.value = '';
          oSpecText.name = '';
          oSpecText.name = 'select';
          oSpecText.style.display = "block";
        } else {
          oSelect.name = 'select';
          oText.name = '';
          oText.style.display = "none";
          oSpecText.style.display = "none";
        }
      }
    },
    mounted() {
      //只能选择年月
      $(function() {
        $('#datetimepicker').datetimepicker({
          format: 'yyyy-mm',
          autoclose: true,
          startView: 3,
          minView: 3,
          language: 'cn',
        });
        $('#textDatePick').val(moment(moment().add(1, 'month')).format("YYYY-MM"));
      });
      this.queryOfficeNames();
      this.account = JSON.parse(Cookies.get("accountData")).account;
    }
  }
</script>

<style>
  @import url("../../assets/css/paperlessOffice/office.css");
</style>
