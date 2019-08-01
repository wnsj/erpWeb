<template>
  <div class="container user-container" id="employee-app">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-title">
        <h2>会议室管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>日期：</p>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <DatePicker v-model="begDate"></DatePicker>
          <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
          <DatePicker v-model="endDate"></DatePicker>
        </div>
      </div>

      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>会议室：</p>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <select class="form-control" v-model="officeId">
            <option value="0">全部</option>
            <option v-for="item in officeData" :key="item.id" :value="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>

    </div>
    <div class="row add-mt">
      <div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
        <p>项目：</p>
      </div>

      <button type="button" class="btn btn-primary pull-right" @click="exportTableToExcel('datatable','会议室管理')">导出</button>
      <button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" @click="mettInit()" v-has='69'>例会申请</button>
      <button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin"
        @click="requestConferenceBtn()">申请</button>
      <button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" @click="queryOfficeUserData()">查询</button>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover user-table" id="datatable">
            <thead>
              <tr>
                <th class="text-center">预约时间</th>
                <th class="text-center">开始时间</th>
                <th class="text-center">结束时间</th>
                <th class="text-center">会议室</th>
                <th class="text-center">会议主题</th>
                <th class="text-center">会议类型</th>
                <th class="text-center">备注</th>
                <th class="text-center">参会人数</th>
                <th class="text-center">主会人</th>
                <th class="text-center">申请人</th>
                <th class="text-center">状态</th>
                <th class="text-center">修改</th>
                <th class="text-center">取消</th>
                <th class="text-center" v-has='69'>完成</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in employeeList" :key="index" :style="item.state == '已完成' ? 'background-color: #158D81;' : item.state == '已取消' ? 'background-color: #DF6859;' : ''">
                <td>{{formatDate(item.yuYueTime)}}</td>
                <td>{{item.startTime}}</td>
                <td>{{item.endTime}}</td>
                <td>{{item.name}}</td>
                <td>{{item.accountZt}}</td>
                <td>{{item.conference}}</td>
                <td>{{item.remark}}</td>
                <td>{{item.num}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.accountName}}</td>
                <td>{{item.state}}</td>
                <td><button class="form-control" :disabled="item.state != '未完成'" @click="updateConfercnceRoomBtn(item)">修改</button></td>
                <td><button class="form-control" :disabled="item.state != '未完成'" @click="wanChengQuXiao(item,3)">取消</button></td>
                <td v-has='69'><button class="form-control" :disabled="item.state != '未完成'" @click="wanChengQuXiao(item,1)">完成</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--会议室预约弹出-->
    <div class="row row_edit">
      <div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog staff_t">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="clearData()">×</button>
              <h1 class="modal-title">会议室预约</h1>
            </div>

            <div class="modal-header modal_header_leave">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>会议室：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <select class="form-control" v-model="officeId2" @change="init()">
                      <option v-for="item in officeData" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>日期：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <DatePicker v-model="dpbeginDate" v-on:change='init()'></DatePicker>
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>主会人：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" value="" class="form-control" v-model="zhuChi" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>参会人数：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 meeting_number">
                    <input class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;" value="2">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_01 offday_add" style="padding: 0;">
                      <button class="btn btn-default" type="button"><i class="fa fa-caret-up"></i></button>
                      <button class="btn btn-default" type="button"><i class="fa fa-caret-down"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>开始时间：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" :value="firDate" class="form-control" readonly="readonly" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>结束时间：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" :value="enDate" class="form-control" readonly="readonly" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>会议主题：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control" v-model="zhuTi"></textarea>
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px; margin-top: 10px">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 20px;">
                    <p>备注:<br />例如电脑<br />投影仪等等</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control" v-model="remark"></textarea>
                  </div>
                </div>
              </div>


              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">开始时间</div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">结束时间</div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="table-responsive">
                    <div class="st-end">
                      <ul id="datatime" class="datatime">
                        <li v-for="(item,index) in dateArr1" :key="index" v-html="item" @click="dateItem(index)">{{item}}</li>
                      </ul>
                      <ul id="datatime2" class="datatime">
                        <li v-for="(item,index) in dateArr2" :key="index" v-html="item" @click="dateItem2(index)">{{item}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <!--按钮-->
              <div class="col-md-12">
                <button type="button" class="btn btn-info" v-on:click="commitConference()">确认</button>
                <button type="button" data-dismiss="modal" class="btn btn-info" @click="clearData()">返回</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改会议室预约 -->
    <div class="row row_update">
      <div class="modal fade" id="updateConfercnceRoom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog staff_t">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="clearData()">×</button>
              <h1 class="modal-title">修改预约信息</h1>
            </div>

            <div class="modal-header modal_header_leave">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>会议室：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <select class="form-control" v-model="officeId2" @change="updateInit()">
                      <option v-for="item in officeData" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>日期：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <DatePicker v-model="dpbeginDate" v-on:change='updateInit()'></DatePicker>
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>主会人：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" value="" class="form-control" v-model="zhuChi" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>参会人数：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 meeting_number">
                    <input class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;" value="2"
                      id='meetPeoInput'>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_01 offday_add" style="padding: 0;">
                      <button class="btn btn-default" type="button"><i class="fa fa-caret-up"></i></button>
                      <button class="btn btn-default" type="button"><i class="fa fa-caret-down"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>开始时间：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" :value="firDate" class="form-control" readonly="readonly" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>结束时间：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" :value="enDate" class="form-control" readonly="readonly" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>会议主题：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control" v-model="zhuTi"></textarea>
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px; margin-top: 10px">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 20px;">
                    <p>备注:<br />例如电脑<br />投影仪等等</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control" v-model="remark"></textarea>
                  </div>
                </div>
              </div>


              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">开始时间</div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">结束时间</div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="table-responsive">
                    <div class="st-end">
                      <ul id="datatime" class="datatime">
                        <li v-for="(item,index) in dateArr3" :key="index" v-html="item" @click="dateItem3(index)">{{item}}</li>
                      </ul>
                      <ul id="datatime2" class="datatime">
                        <li v-for="(item,index) in dateArr4" :key="index" v-html="item" @click="dateItem4(index)">{{item}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <!--按钮-->
              <div class="col-md-12">
                <button type="button" class="btn btn-info" v-on:click="commitUpdateBtn()">确认</button>
                <button type="button" data-dismiss="modal" class="btn btn-info" @click="clearData()">返回</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--例会预约弹出-->
    <div class="row row_edit">
      <div class="modal fade" id="conferenceManage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog staff_t">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="clearData()">×</button>
              <h1 class="modal-title">例会预约</h1>
            </div>

            <div class="modal-header modal_header_leave">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>会议室：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <select class="form-control" v-model="officeId2">
                      <option v-for="item in officeData" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>日期：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="input-append date" id="datetimepicker">
                      <input size="16" type="text" id='textDatePick' readonly>
                      <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>星期：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <select v-model="week" class="form-control" @change="weekChange()">
                      <option value="0">--请选择--</option>
                      <option value="星期一">星期一</option>
                      <option value="星期二">星期二</option>
                      <option value="星期三">星期三</option>
                      <option value="星期四">星期四</option>
                      <option value="星期五">星期五</option>
                      <option value="星期六">星期六</option>
                      <option value="星期日">星期日</option>
                    </select>
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>主会人：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" value="" class="form-control" v-model="zhuChi" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>参会人数：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 meeting_number">
                    <input class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;" value="2"
                      id="meetProCount2">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_01 offday_add" style="padding: 0;">
                      <button class="btn btn-default" type="button"><i class="fa fa-caret-up"></i></button>
                      <button class="btn btn-default" type="button"><i class="fa fa-caret-down"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>开始时间：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" :value="firDate" class="form-control" readonly="readonly" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>结束时间：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input type="text" :value="enDate" class="form-control" readonly="readonly" />
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
                    <p>会议主题：</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control" v-model="zhuTi"></textarea>
                  </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px; margin-top: 10px">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 20px;">
                    <p>备注:<br />例如电脑<br />投影仪等等</p>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control" v-model="remark"></textarea>
                  </div>
                </div>
              </div>


              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">开始时间</div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">结束时间</div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="table-responsive">
                    <div class="st-end">
                      <ul id="datatime" class="datatime">
                        <li v-for="(item,index) in dateArr5" :key="index" v-html="item" @click="dateItem5(index)">{{item}}</li>
                      </ul>
                      <ul id="datatime2" class="datatime">
                        <li v-for="(item,index) in dateArr6" :key="index" v-html="item" @click="dateItem6(index)">{{item}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <!--按钮-->
              <div class="col-md-12">
                <button type="button" class="btn btn-info" v-on:click="meetBtn()">确认</button>
                <button type="button" data-dismiss="modal" class="btn btn-info" @click="clearData()">返回</button>
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
  import DatePicker from 'vue2-datepicker'

  export default {
    components: {
      DatePicker,
    },
    data() {
      return {
        begDate: moment(),
        endDate: moment(),
        dpbeginDate: moment(),
        employeeList: [],
        officeId: '0',
        officeId2: '1',
        officeData: [],
        hasr1: '',
        hasr2: '',
        requestDate: moment(),
        retData: [],
        dateArr1: [],
        dateArr2: [],
        dateArr3: [],
        dateArr4: [],
        dateArr5: [],
        dateArr6: [],
        startIndex: -1,
        endIndex: -1,
        hasDateArr: [],
        firDate: '',
        enDate: '',
        meetCount: 2,
        zhuChi: '',
        zhuTi: '',
        remark: '',
        itemId: '',
        state: '',
        type: '',
        week: '0'
      };
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
          }).catch(
            function(error) {
              reject(error)
            }
          );
        });
      },
      //查询会议室使用信息
      queryOfficeUserData() {
        if (this.isBlank(this.begDate) || this.isBlank(this.endDate)) {
          alert("查询时间不能为空!");
          return;
        }
        var rquestParam = {
          startTime: moment(this.begDate).format("YYYY-MM-DD 00:00:00"),
          endTime: moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          officeId: this.officeId == 0 ? '' : this.officeId
        };
        var url = this.url + "/officeAction/queryOfficeUserData";
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
      //会议室查询
      queryOfficeData() {
        var url = this.url + "/officeAction/queryOfficeData";
        this.requestData(url, {}).then((responseData) => {
          if (responseData.retCode == '0000') {
            this.officeData = responseData.retData;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //转换格式
      formatDate(date) {
        return this.isBlank(date) ? '' : moment(date).format("YYYY/MM/DD HH:mm");
      },
      //初始化时间表格
      init() {
        var now = moment();
        var dateArr1 = [];
        var dateArr2 = [];
        this.dateArr1 = [];
        this.dateArr2 = [];
        this.hasDateArr = [];
        var officeIdArr = this.officeId2 == 1 ? ['1', '3'] : this.officeId2 == 2 ? ['2', '3'] : [];
        var firstDate = moment(this.dpbeginDate).format('YYYY-MM-DD 08:30');
        var rquestParam = {
          startTime: moment(this.dpbeginDate).format("YYYY-MM-DD 00:00:00"),
          endTime: moment(this.dpbeginDate).format("YYYY-MM-DD 23:59:59"),
          officeIdArr: officeIdArr,
          stateArr: ['0', '1', '2']
        };
        var url = this.url + "/officeAction/queryOfficeUserData";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            var retData = responseData.retData;
            this.retData = retData;
            for (var i = 0; i < 18; i++) {
              var fDate = moment(firstDate).add(i * 30, 'minute');
              var f = fDate.format('HH:mm');
              var e = moment(firstDate).add((i + 1) * 30, 'minute').format('HH:mm');
              var dis = fDate < now ? true : false;
              var cls = dis ? 'greyClass' : 'whiteClass';
              if (dis) this.hasDateArr.push(i);
              dateArr1.push("<p class='" + cls + "' id='dateP1_" + (i + 1) + "'>" + f + "</p>");
              dateArr2.push("<p class='" + cls + "' id='dateP2_" + (i + 1) + "'>" + e + "</p>");
            }
            if (retData.length > 0) {
              for (var i = 0; i < retData.length; i++) {
                var s = retData[i].startTime;
                var e = retData[i].endTime;
                var shm = moment(s).format('HH:mm');
                var ehm = moment(e).format('HH:mm');
                var dateObj = {};
                var flag = false;
                for (var x = 0; x < 18; x++) {
                  var valueDate = moment(moment(rquestParam.startTime).format("YYYY-MM-DD 08:30")).add(x * 30,
                    'minute');
                  var value1 = valueDate.format('HH:mm');
                  var value2 = moment(moment(rquestParam.startTime).format("YYYY-MM-DD 09:00")).add(x * 30,
                    'minute').format('HH:mm');
                  if (value1 == shm) {
                    dateObj.startId = x;
                    dateObj.startDate = shm;
                    flag = true;
                  }
                  if (flag) {
                    this.hasDateArr.push(x);
                    dateArr1[x] = "<p class='redClass' id='dateP1_" + (x + 1) + "'>" + value1 + "</p>";
                    dateArr2[x] = "<p class='redClass' id='dateP2_" + (x + 1) + "'>" + value2 + "</p>";
                  }
                  if (value2 == ehm) {
                    dateObj.endId = x;
                    flag = false;
                  }
                }
              }
            }
            this.dateArr1 = dateArr1;
            this.dateArr2 = dateArr2;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //申请会议室按钮
      requestConferenceBtn() {
        this.init();
      },
      //确认提交
      commitConference() {
        if (this.isBlank(this.firDate)) {
          alert("会议开始时间不能为空!");
          return;
        }
        if (this.isBlank(this.enDate)) {
          alert("会议结束时间不能为空!");
          return;
        }
        if (this.isBlank(this.zhuTi)) {
          alert("会议主题不能为空!");
          return;
        }
        if (this.isBlank(this.zhuChi)) {
          alert("会议主持不能为空!");
          return;
        }
        var rquestParam = {
          officeId: this.officeId2,
          startTime: this.firDate,
          endTime: this.enDate,
          accountId: JSON.parse(Cookies.get("accountData")).account.account_ID,
          accountZt: this.zhuTi,
          remark: this.remark,
          state: 0,
          num: $('.meeting_number input').val(),
          userName: this.zhuChi,
          type: '1'
        };
        var url = this.url + "/officeAction/addUpdateOfficeUserData";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            alert("预约成功!");
            this.clearData();
            this.queryOfficeUserData();
            $("#myModalJoin").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //选择开始时间
      dateItem(index) {
        if (!this.hasDate(index)) {
          alert("时间冲突,请重新选择!");
          return;
        }

        $("#dateP1_" + (this.startIndex + 1)).css("background-color", "white");
        if (this.endIndex != -1) {
          for (var i = 0; i <= (this.endIndex - this.startIndex); i++) {
            $("#dateP1_" + (this.startIndex + 1 + i)).css("background-color", "white");
            $("#dateP2_" + (this.startIndex + 1 + i)).css("background-color", "white");
          }
        }
        this.startIndex = index;
        this.endIndex = -1;
        this.enDate = '';
        $("#dateP1_" + (index + 1)).css("background-color", "pink");
        this.firDate = moment(this.dpbeginDate).format("YYYY-MM-DD") + ' ' + $("#dateP1_" + (index + 1)).text() + ':00';
      },
      //选择结束时间
      dateItem2(index) {
        if (this.startIndex == -1) {
          alert("请先选择开始时间!");
          return;
        }

        if (index < this.startIndex) {
          alert("时间冲突,请重新选择!");
          return;
        } else {
          for (var i = 0; i <= (index - this.startIndex); i++) {
            if (!this.hasDate(this.startIndex + i)) {
              alert("时间冲突,请重新选择!");
              return;
            }
          }
        }
        if (index < this.endIndex) {
          for (var i = this.endIndex; i != index; i--) {
            $("#dateP1_" + (i + 1)).css("background-color", "white");
            $("#dateP2_" + (i + 1)).css("background-color", "white");
          }
        }
        for (var i = 0; i <= (index - this.startIndex); i++) {
          if (i != 0) $("#dateP1_" + (this.startIndex + 1 + i)).css("background-color", "pink");
          $("#dateP2_" + (this.startIndex + 1 + i)).css("background-color", "pink");
        }
        this.endIndex = index;
        this.enDate = moment(this.dpbeginDate).format("YYYY-MM-DD") + ' ' + $("#dateP2_" + (index + 1)).text() + ':00';
      },
      //判断该时间是否可选，不可选返回false
      hasDate(index) {
        for (var i = 0; i < this.hasDateArr.length; i++) {
          if (index == this.hasDateArr[i]) {
            return false;
          }
        }
        return true;
      },
      //清除数据
      clearData() {
        this.firDate = '';
        this.enDate = '';
        this.dpbeginDate = moment();
        this.officeId2 = 1;
        this.startIndex = -1;
        this.endIndex = -1;
        this.zhuChi = '';
        this.remark = '';
        this.zhuTi = '';
        this.itemId = '';
        this.state = '';
        this.type = '';
        this.week = '0';
        this.dateArr5 = [];
        this.dateArr6 = [];
        $('.meeting_number input').val(2);
        $('#meetProCount2').val(2);
        $('#textDatePick').val(moment().add(1, 'month').format("YYYY-MM"));
      },
      //修改预约按钮
      updateConfercnceRoomBtn(item) {
        if (JSON.parse(Cookies.get("accountData")).account.account_ID !== item.accountId && !this.has(69)) {
          alert("不可修改他人的申请!")
          return;
        }
        this.dpbeginDate = moment(item.startTime).format("YYYY-MM-DD");
        this.officeId2 = item.officeId;
        this.zhuChi = item.userName;
        this.zhuTi = item.accountZt;
        this.remark = item.remark;
        this.firDate = item.startTime + ":00";
        this.enDate = item.endTime + ":00";
        this.itemId = item.id;
        this.state = item.state;
        this.type = item.type;
        $('#meetPeoInput').val(item.num);
        this.updateInit();
        $("#updateConfercnceRoom").modal("show");
      },
      //修改预约信息初始化
      updateInit() {
        var now = moment();
        var dateArr1 = [];
        var dateArr2 = [];
        this.dateArr3 = [];
        this.dateArr4 = [];
        this.hasDateArr = [];
        var itemId = this.itemId;
        var officeIdArr = this.officeId2 == 1 ? ['1', '3'] : this.officeId2 == 2 ? ['2', '3'] : [];
        var firstDate = moment(this.dpbeginDate).format('YYYY-MM-DD 08:30');
        var rquestParam = {
          startTime: moment(this.dpbeginDate).format("YYYY-MM-DD 00:00:00"),
          endTime: moment(this.dpbeginDate).format("YYYY-MM-DD 23:59:59"),
          officeIdArr: officeIdArr,
          stateArr: ['0', '1', '2']
        };
        var url = this.url + "/officeAction/queryOfficeUserData";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            var retData = responseData.retData;
            this.retData = retData;
            for (var i = 0; i < 18; i++) {
              var fDate = moment(firstDate).add(i * 30, 'minute');
              var f = fDate.format('HH:mm');
              var e = moment(firstDate).add((i + 1) * 30, 'minute').format('HH:mm');
              var dis = fDate < now ? true : false;
              var cls = dis ? 'greyClass' : 'whiteClass';
              if (dis) this.hasDateArr.push(i);
              dateArr1.push("<p class='" + cls + "' id='dateP3_" + (i + 1) + "'>" + f + "</p>");
              dateArr2.push("<p class='" + cls + "' id='dateP4_" + (i + 1) + "'>" + e + "</p>");
            }
            if (retData.length > 0) {
              for (var i = 0; i < retData.length; i++) {
                var id = retData[i].id;
                var s = retData[i].startTime;
                var e = retData[i].endTime;
                var shm = moment(s).format('HH:mm');
                var ehm = moment(e).format('HH:mm');
                var dateObj = {};
                var flag = false;
                var flag2 = false;
                for (var x = 0; x < 18; x++) {
                  var valueDate = moment(moment(rquestParam.startTime).format("YYYY-MM-DD 08:30")).add(x * 30,
                    'minute');
                  var value1 = valueDate.format('HH:mm');
                  var value2 = moment(moment(rquestParam.startTime).format("YYYY-MM-DD 09:00")).add(x * 30,
                    'minute').format('HH:mm');
                  if (value1 == shm) {
                    dateObj.startId = x;
                    dateObj.startDate = shm;
                    flag = true;
                    if (id == itemId) {
                      flag2 = true;
                      this.startIndex = now >= moment(s) ? -1 : x;
                    }
                  }
                  if (flag) {
                    if (flag2) {
                      dateArr1[x] = "<p class='orangeClass' id='dateP3_" + (x + 1) + "'>" + value1 + "</p>";
                      dateArr2[x] = "<p class='orangeClass' id='dateP4_" + (x + 1) + "'>" + value2 + "</p>";
                    } else {
                      this.hasDateArr.push(x);
                      dateArr1[x] = "<p class='redClass' id='dateP3_" + (x + 1) + "'>" + value1 + "</p>";
                      dateArr2[x] = "<p class='redClass' id='dateP4_" + (x + 1) + "'>" + value2 + "</p>";
                    }
                  }
                  if (value2 == ehm) {
                    dateObj.endId = x;
                    flag = false;
                    flag2 = false;
                    if (now >= moment(e))
                      this.endIndex = -1;
                    else if (id == itemId)
                      this.endIndex = x;
                  }
                }
              }
            }
            this.dateArr3 = dateArr1;
            this.dateArr4 = dateArr2;
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //确认修改
      commitUpdateBtn() {
        if (this.isBlank(this.firDate)) {
          alert("会议开始时间不能为空!");
          return;
        }
        if (this.isBlank(this.enDate)) {
          alert("会议结束时间不能为空!");
          return;
        }
        if (this.isBlank(this.zhuTi)) {
          alert("会议主题不能为空!");
          return;
        }
        if (this.isBlank(this.zhuChi)) {
          alert("会议主持不能为空!");
          return;
        }

        var rquestParam = {
          id: this.itemId,
          officeId: this.officeId2,
          startTime: this.firDate,
          endTime: this.enDate,
          accountId: JSON.parse(Cookies.get("accountData")).account.account_ID,
          accountZt: this.zhuTi,
          remark: this.remark,
          state: this.state == '未完成' ? 0 : this.state == '已完成' ? 1 : 3,
          num: $('#meetPeoInput').val(),
          userName: this.zhuChi,
          type: this.type
        };
        var url = this.url + "/officeAction/addUpdateOfficeUserData";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            alert("修改成功!");
            this.clearData();
            $("#updateConfercnceRoom").modal("hide");
            this.queryOfficeUserData();
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //选择开始时间
      dateItem3(index) {
        if (!this.hasDate(index)) {
          alert("时间冲突,请重新选择!");
          return;
        }
        if (this.startIndex != -1) {
          $("#dateP3_" + (this.startIndex + 1)).css("background-color", "white");
          if (this.endIndex != -1) {
            for (var i = 0; i <= (this.endIndex - this.startIndex); i++) {
              $("#dateP3_" + (this.startIndex + 1 + i)).css("background-color", "white");
              $("#dateP4_" + (this.startIndex + 1 + i)).css("background-color", "white");
            }
          }
        }
        this.startIndex = index;
        this.endIndex = -1;
        this.enDate = '';
        $("#dateP3_" + (index + 1)).css("background-color", "pink");
        this.firDate = moment(this.dpbeginDate).format("YYYY-MM-DD") + ' ' + $("#dateP3_" + (index + 1)).text() + ':00';
      },
      //选择结束时间
      dateItem4(index) {
        if (this.startIndex == -1) {
          alert("请先选择开始时间!");
          return;
        }

        if (index < this.startIndex) {
          alert("时间冲突,请重新选择!");
          return;
        } else {
          for (var i = 0; i <= (index - this.startIndex); i++) {
            if (!this.hasDate(this.startIndex + i)) {
              alert("时间冲突,请重新选择!");
              return;
            }
          }
        }
        if (index < this.endIndex) {
          for (var i = this.endIndex; i != index; i--) {
            $("#dateP3_" + (i + 1)).css("background-color", "white");
            $("#dateP4_" + (i + 1)).css("background-color", "white");
          }
        }
        for (var i = 0; i <= (index - this.startIndex); i++) {
          if (i != 0) $("#dateP3_" + (this.startIndex + 1 + i)).css("background-color", "pink");
          $("#dateP4_" + (this.startIndex + 1 + i)).css("background-color", "pink");
        }
        this.endIndex = index;
        this.enDate = moment(this.dpbeginDate).format("YYYY-MM-DD") + ' ' + $("#dateP4_" + (index + 1)).text() + ':00';
      },
      //例会初始化
      mettInit() {
        var dateArr1 = [];
        var dateArr2 = [];
        this.dateArr5 = [];
        this.dateArr6 = [];
        this.hasDateArr = [];
        var firstDate = moment().format('YYYY-MM-DD 08:30');
        for (var i = 0; i < 18; i++) {
          var fDate = moment(firstDate).add(i * 30, 'minute');
          var f = fDate.format('HH:mm');
          var e = moment(firstDate).add((i + 1) * 30, 'minute').format('HH:mm');
          dateArr1.push("<p class='whiteClass' id='dateP5_" + (i + 1) + "'>" + f + "</p>");
          dateArr2.push("<p class='whiteClass' id='dateP6_" + (i + 1) + "'>" + e + "</p>");
        }
        this.dateArr5 = dateArr1;
        this.dateArr6 = dateArr2;
        $("#conferenceManage").modal("show");
      },
      //选择开始时间
      dateItem5(index) {
        if (!this.hasDate(index)) {
          alert("时间冲突,请重新选择!");
          return;
        }

        $("#dateP5_" + (this.startIndex + 1)).css("background-color", "white");
        if (this.endIndex != -1) {
          for (var i = 0; i <= (this.endIndex - this.startIndex); i++) {
            $("#dateP5_" + (this.startIndex + 1 + i)).css("background-color", "white");
            $("#dateP6_" + (this.startIndex + 1 + i)).css("background-color", "white");
          }
        }
        this.startIndex = index;
        this.endIndex = -1;
        this.enDate = '';
        $("#dateP5_" + (index + 1)).css("background-color", "pink");
        this.firDate = $("#dateP5_" + (index + 1)).text();
      },
      //选择结束时间
      dateItem6(index) {
        if (this.startIndex == -1) {
          alert("请先选择开始时间!");
          return;
        }

        if (index < this.startIndex) {
          alert("时间冲突,请重新选择!");
          return;
        } else {
          for (var i = 0; i <= (index - this.startIndex); i++) {
            if (!this.hasDate(this.startIndex + i)) {
              alert("时间冲突,请重新选择!");
              return;
            }
          }
        }
        if (index < this.endIndex) {
          for (var i = this.endIndex; i != index; i--) {
            $("#dateP5_" + (i + 1)).css("background-color", "white");
            $("#dateP6_" + (i + 1)).css("background-color", "white");
          }
        }
        for (var i = 0; i <= (index - this.startIndex); i++) {
          if (i != 0) $("#dateP5_" + (this.startIndex + 1 + i)).css("background-color", "pink");
          $("#dateP6_" + (this.startIndex + 1 + i)).css("background-color", "pink");
        }
        this.endIndex = index;
        this.enDate = $("#dateP6_" + (index + 1)).text();
      },
      //例会提交
      meetBtn() {
        if (this.isBlank(this.firDate)) {
          alert("会议开始时间不能为空!");
          return;
        }
        if (this.isBlank(this.enDate)) {
          alert("会议结束时间不能为空!");
          return;
        }
        if (this.isBlank(this.zhuTi)) {
          alert("会议主题不能为空!");
          return;
        }
        if (this.isBlank(this.zhuChi)) {
          alert("会议主持不能为空!");
          return;
        }
        if (this.week == 0) {
          alert("请选择星期!");
          return;
        }
        var ymd = moment($('#textDatePick').val()).format("YYYY-MM-01");
        var rquestParam = {
          officeId: this.officeId2,
          startTime: ymd + ' ' + this.firDate + ':00',
          endTime: ymd + ' ' + this.enDate + ':00',
          accountId: JSON.parse(Cookies.get("accountData")).account.account_ID,
          accountZt: this.zhuTi,
          remark: this.remark,
          state: 0,
          num: $('#meetProCount2').val(),
          userName: this.zhuChi,
          type: '2',
          week: this.week
        };
        var url = this.url + "/officeAction/addUpdateOfficeUserData";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            alert("预约成功!");
            this.clearData();
            this.queryOfficeUserData();
            $("#conferenceManage").modal("hide");
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      },
      //星期切换
      weekChange() {
        this.zhuTi = this.week + '——';
      },
      //点击完成，取消
      wanChengQuXiao(item, state) {
        if (state == 3) {
          if (JSON.parse(Cookies.get("accountData")).account.account_ID != item.accountId && !this.has(69)) {
            alert("不能取消他人的申请!");
            return;
          }

          if (!confirm("确定取消?取消后不可更改")) {
            return;
          }
        } else if (state == 1) {
          if (moment(item.startTime) > moment()) {
            alert("此会议还没开始，不可完成!");
            return;
          }
        }
        var rquestParam = {
          id: item.id,
          state: state
        }
        var url = this.url + "/officeAction/updateOfficeUserDataState";
        this.requestData(url, rquestParam).then((responseData) => {
          if (responseData.retCode == '0000') {
            alert("操作成功!");
            this.queryOfficeUserData();
          } else {
            alert(responseData.retMsg);
          }
        }, (error) => {
          console.log("请求失败处理");
        });
      }
    },
    mounted() {
      this.queryOfficeData();
      this.init();
      $(function() {
        $('.meeting_number .btn:first-of-type').on('click', function() {
          $('.meeting_number input').val(parseInt($('.meeting_number input').val(), 10) + 1);
        });
        $('.meeting_number .btn:last-of-type').on('click', function() {
          $('.meeting_number input').val(parseInt($('.meeting_number input').val(), 10) - 1 <= 0 ? 0 :
            parseInt(
              $('.meeting_number input').val(), 10) - 1);
        });
        $('#datetimepicker').datetimepicker({
          format: 'yyyy-mm',
          autoclose: true,
          startView: 3,
          minView: 3,
          language: 'cn',
          startDate: new Date(moment().add(1, 'month')), //禁止选择
        });
        $('#textDatePick').val(moment().add(1, 'month').format("YYYY-MM"));
      })
    }
  }
</script>

<style>
  @import url("../../assets/css/paperlessOffice/meeting.css");

  .redClass {
    background: red;
  }

  .greyClass {
    background: grey;
  }

  .whiteClass {
    background: white;
  }

  ul li {
    list-style-type: none;
  }

  .orangeClass {
    background: #FF6347;
  }

</style>
<!-- 清空数组的三种方式：
方式1：
this.dateArr5 = [];
this.dateArr6 = [];
方式2：
// this.dateArr5.length = 0;
// this.dateArr6.length = 0;
方式3
// this.dateArr5.splice(0,this.dateArr5.length);
// this.dateArr6.splice(0,this.dateArr6.length); -->
<!--    var rquestParam = {
        startTime: moment(this.requestDate).format("YYYY-MM-DD 00:00:00"),
        endTime: moment(this.requestDate).format("YYYY-MM-DD 23:59:59"),
        officeId: this.requestOfficeId
      };
      var url = this.url + "/officeAction/queryOfficeUserData";
      this.requestData(url, rquestParam).then((responseData) => {
        if (responseData.retCode == '0000') {
          var retData = responseData.retData;
          this.retData = retData;
          if (retData.length <= 0) return;
          $(".st-end #datatime li").each(function() {
            for (var i = 0; i < retData.length; i++) {
              var s = retData[i].startTime;
              var hm = moment(s).format('HH:mm');
              var text = $(this).text();
              if (hm == text) {
                $(this).wrap("<div class=\"myClass\"></div>");
                // $(this).children().unwrap();
                //$(this).css("background-color", "red");
                $(this).unbind('click').click(function() {
                  alert("此选择无效，时间冲突")
                })
              }
            }
          })
          $(".st-end #datatime2 li").each(function() {
            for (var i = 0; i < retData.length; i++) {
              var s = retData[i].endTime;
              var hm = moment(s).format('HH:mm');
              var text = $(this).text();
              if (hm == text) {
                //$(this).css("background-color", "red");
                $(this).wrap("<div class=\"myClass\"></div>");
                // $(this).children().unwrap();
                $(this).click(function() {
                  alert("此选择无效，时间冲突")
                })
              }
            }
          })
        } else {
          alert(responseData.retMsg);
        }
      }, (error) => {
        console.log("请求失败处理");
      }); -->
