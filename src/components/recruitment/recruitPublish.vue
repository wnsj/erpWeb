<template>
	<div class="container user-container" id="recruitpublish-app">
        <div class="row">
            <div class="col-md-12 col-lg-12 main-title">
                <h2>招聘发布管理</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                    <p>发布时间：</p>
                </div>
                <div class="col-md-10 col-lg-10">
					<span><input type="date" value="" id="firstTime" v-model="beginDate" /></span>
					<span>&nbsp;~&nbsp;</span>
					<span><input type="date" value="" id="secondTime" v-model="endDate" /></span>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                    <p>渠道：</p>
                </div>
                <div class="col-md-10 col-lg-10">
                    <select class="form-control" v-model="channelId">
                        <option value="0">全部</option>
                        <option value="1">智联招聘</option>
                        <option value="2">BOSS直聘</option>
                        <option value="3">香草招聘</option>
                        <option value="4">58同城</option>
                        <option value="5">前程无忧</option>
                        <option value="6">实习僧</option>
                        <option value="7">店长招聘</option>
                        <option value="8">当日急聘</option>
                        <option value="9">招聘会</option>
                        <option value="10">中华英才网</option>
                        <option value="11">上啥班</option>
                        <option value="12">QQ群</option>
                        <option value="13">介绍</option>
                    </select>
                </div>
            </div>
            
        </div>
		<div class="row">
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
                    <p>职位：</p>
                </div>
                <div class="col-md-10 col-lg-10">
                    <position></position>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-5">
            	<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalAdd">添加</button>
                <button type="button" class="btn btn-warning pull-right m_r_10" @click="dowmelxe">导出</button>
				<button type="button" class="btn btn-warning pull-right m_r_10" @click="query">查询</button>
            </div>
		</div>
		
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="recruittable">
                        <thead>
                            <tr>
                                <th class="text-center">渠道</th>
                                <th class="text-center">职位</th>
                                <th class="text-center">发布日期</th>
                                <th class="text-center">发布人数</th>
                                <th class="text-center">邀约人数</th>
                                <th class="text-center">编辑</th>
                                <th class="text-center">删除</th>
                            </tr>
                        </thead>
                        <tbody>
							<tr v-for="(item,index) in employeeList" :key="index">           
                                <td>{{item.name}}</td>
								<td>{{item.departName}}</td>
								<td class="text-center">{{timeInit(item.birth)}}</td>
								<td class="text-center">{{timeInit(item.entryDate)}}</td>
								<td class="text-center">{{item.positionName}}</td>
                                <td class="text-center warning"><span data-toggle="modal" data-target="#myModaledit">编辑</span></td>
                                <td class="text-center info"><span data-toggle="modal" data-target="#myModaldelete">删除</span></td>
							</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row row_edit">
            <!-- 编辑 -->
            <div class="modal fade" id="myModaledit" tabindex="-1" role="dialog" aria-labelledby="myModalLabelbj" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
                            <h4 id="myModalLabelbj" class="modal-title">编辑发布信息</h4>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in active martop" id="basic">
                                    <form action="">
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">渠道：</label>
                                            <div class="col-md-5">
                                                <select class="form-control" v-model="updateName">
                                                    <option value="">智联招聘</option>
                                                    <option value="">BOSS直聘</option>
                                                    <option value="">香草招聘</option>
                                                    <option value="">58同城</option>
                                                    <option value="">前程无忧</option>
                                                    <option value="">实习僧</option>
                                                    <option value="">店长直聘</option>
                                                    <option value="">当日急聘</option>
                                                    <option value="">招聘会</option>
                                                    <option value="">上啥班</option>
                                                    <option value="">QQ群</option>
                                                    <option value="">介绍</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">职位：</label>
                                            <div class="col-md-5">
                                                <select class="form-control" v-model="updateJobNum">
                                                    <option value="">超级管理员</option>
                                                    <option value="">技术</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group clearfix">
                                            <label for="firstTime" class="col-md-2 control-label text-right nopad">发布日期：</label>
                                            <div  class=" col-md-5 ">
                                            	<div class="input-group">
                                                    <input type="date" class="form-control" v-model="updateEntryDate">
                                                    <div class="input-group-addon">
                                                        <span class="glyphicon glyphicon-calendar"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">发布人数：</label>
                                            <div class="col-md-5">
                                                <input type="number" class="form-control" value="0" min="0" max="999" v-model="updateState">
                                            </div>
                                        </div>
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">邀约人数：</label>
                                            <div class="col-md-5">
                                            	<input type="number" class="form-control" value="0" min="0" max="999" v-model="updateRemark">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <!--按钮-->
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info" v-on:click="updateEmployeeInfo()">确认</button>
                                <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 删除 -->
            <div class="modal fade" id="myModaldelete">
                <div class="modal-dialog modal-family">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">提示</h4>
                        </div>
                        <div class="modal-body">
                            <div>确定删除么？</div>
                        </div>
                        <div class="modal-footer">
                        	<!--按钮-->
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info" @click="ck">是</button>
                                <button type="button" data-dismiss="modal" class="btn btn-info">否</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!--添加-->
            <div class="modal fade" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
                            <h4 id="myModalLabeltj" class="modal-title">添加发布信息</h4>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in active martop" id="basic">
                                    <form action="">
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">渠道：</label>
                                            <div class="col-md-5">
                                                <select class="form-control">
                                                	<option selected="selected" disabled="disabled"  style='display: none' value=''></option>
                                                    <option value="">智联招聘</option>
                                                    <option value="">BOSS直聘</option>
                                                    <option value="">香草招聘</option>
                                                    <option value="">58同城</option>
                                                    <option value="">前程无忧</option>
                                                    <option value="">实习僧</option>
                                                    <option value="">店长直聘</option>
                                                    <option value="">当日急聘</option>
                                                    <option value="">招聘会</option>
                                                    <option value="">上啥班</option>
                                                    <option value="">QQ群</option>
                                                    <option value="">介绍</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">职位：</label>
                                            <div class="col-md-5">
                                                <select class="form-control">
                                                	<option selected="selected" disabled="disabled"  style='display: none' value=''></option>
                                                    <option value="">超级管理员</option>
                                                    <option value="">技术</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group clearfix">
                                            <label for="firstTime" class="col-md-2 control-label text-right nopad">发布日期：</label>
                                            <div  class=" col-md-5 ">
                                            	<div class="input-group">
                                                    <input type="date" class="form-control" id="firstTime" v-model="begin">
                                                    <div class="input-group-addon">
                                                        <span class="glyphicon glyphicon-calendar"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">发布人数：</label>
                                            <div class="col-md-5">
                                                <input type="number" class="form-control" value="0" min="0" max="999">
                                            </div>
                                        </div>
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label text-right nopad">邀约人数：</label>
                                            <div class="col-md-5">
                                            	<input type="number" class="form-control" value="0" min="0" max="999">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!--</div>-->
                        </div>
                        <div class="modal-footer">
                            <!--按钮-->
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info">确认</button>
                                <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
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
	import department from '../vuecommon/department.vue'
	import position from '../vuecommon/position.vue'
	
	export default {
		components: {
			department,
			position
		},
		data() {
			return {
				departId:'',
				positionId:'',
				channelId:'0',
				channelName:'全部',
				
				beginDate:this.getCurrentDay,
				endDate: this.getCurrentDay,

			}
		},
		
		methods: {

		},
		
	}	
	
	
	
	
</script>

<style>
.clear-mp{margin: 0; padding: 0;}
@-moz-document url-prefix(){fieldset{display: table-cell;}}
.user-container{background-color: #fff; width: 100%; padding: 0 20px;}
.user-btn-group{text-align: right; padding: 15px 15px;}
.user-btn-group>button{margin: 0 2px;}
.main-title h2{line-height: 50px;}
.bootstrap-select{width: 200px !important;}
.martop{margin-top:10px;}
.martop1{margin-top:50px;}
.nopad{padding-left:0; padding-right:0; line-height:34px;}
.linhet{line-height:34px;}
.dateicon{position:absolute; right:20px; top:0; width:30px; height:30px;}
.col12{width:100%;}
.addbord{border:1px solid #ddd; padding-bottom:20px;}
.ygtc{position:fixed; top:0px; left:300px; background-color:#fff; width:760px; height:871px; overflow:scroll;}
.staff_close,.fam_close{/*position:absolute; right:20px; top:10px; z-index:99;*/ float:right;}
.fam_con{width:1140px; height:628px; position:fixed; top:100px; background-color:#fff; display:none;}
.form_date.input-group[class*=col-]{float:left; padding-left:15px; padding-right:15px;}
.m_r_10{margin-right:10px;}
input[type="date"]{line-height: 26px!important;}
</style>
