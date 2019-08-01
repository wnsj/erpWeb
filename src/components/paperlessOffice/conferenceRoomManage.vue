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
					<span class="leavespan">
						<input type="date" value="" class="form-control"  />
					</span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<span class="leavespan">
						<input type="date" value="" class="form-control" />
					</span>
				</div>
			</div>


			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>会议室：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control">
						<option value="0">全部</option>
						<option value="1">会议室1</option>
						<option value="2">会议室2</option>
						<option value="3">会议室3</option>
					</select>
				</div>
			</div>

		</div>
		<div class="row add-mt">
			<div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
				<p>项目：</p>
			</div>

			<button type="button" class="btn btn-primary pull-right" >导出</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="applyAction()">申请</button>

			<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal">查询</button>

		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">类型</th>
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
								<th class="text-center">修改</th>
								<th class="text-center">取消</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{{'sadf'}}</td>
								
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row row_edit">


			<!--请假申请表弹出-->

			<div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog staff_t">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
							<h1 class="modal-title">会议室预约</h1>
						</div>

						<div class="modal-header modal_header_leave">
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
										<p>会议室：</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
										<select class="form-control">
											<option value="0">全部</option>
											<option value="1">会议室1</option>
											<option value="2">会议室2</option>
											<option value="3">会议室3</option>
										</select>
									</div>
								</div>

								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
										<p>日期：</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-xs-8 col-sm-8 col-md-8 col-lg-8">
										<input type="date" value="" class="form-control"  />
									</div>
								</div>


								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
										<p>主会人：</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
										<input type="text" value="" class="form-control" />
									</div>
								</div>


								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
										<p>参会人数：</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 meeting_number">
										<input class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;" value="1">
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
										<input type="text" value="" class="form-control" />
									</div>
								</div>


								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
										<p>结束时间：</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
										<input type="text" value="" class="form-control" />
									</div>
								</div>


								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
										<p>会议主题：</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
										<textarea class="form-control"></textarea>
									</div>
								</div>


								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px; margin-top: 10px">
									<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 20px;">
										<p>备注:<br />例如电脑<br />投影仪等等</p>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
										<textarea class="form-control"></textarea>
									</div>
								</div>

							</div>


							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">开始时间{{time}}</div>
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">结束时间</div>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<div class="table-responsive">
										<div class="st-end">
											<ul id="datatime" class="datatime">
											</ul>
											<ul id="datatime2" class="datatime">
											</ul>
										</div>
									</div>
								</div>
							</div>

						</div>
						<div class="modal-footer">
							<!--按钮-->
							<div class="col-md-12">

								<button type="button" class="btn btn-info">确认</button>
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
		</div>
	</div>
	</div>
</template>

<script>
	// import meet from '../../assets/js/meetingCopy.js';
	export default {
		data() {
			return {
				wodebianliang: '0'
			};
		},
		methods: {
			applyAction:function(){
				$("#myModalJoin").modal('show')
// 				var length
// 				var index
// 				var index2
// 				var hasr1
// 				var hasr2
// 				var sysData
				var myDate = new Date();
// 				var year=myDate.getFullYear();        //获取当前年
// 				var month=myDate.getMonth()+1;   //获取当前月
// 				var date=myDate.getDate();            //获取当前日
// 				var h=myDate.getHours();              //获取当前小时数(0-23)
// 				var m=myDate.getMinutes();
				var h=7;
				var m=0;
				//
				$(".st-end #datatime li").each(function(){
					if( h >= $(this).text().substring(0, 2)){
						if( h-1 >= $(this).text().substring(0, 2)){
							$(this).wrap("<div class=\"grey\"></div>");
							$(this).children().unwrap();
							
							$(this).unbind('click').click(function(){
								alert("此选择无效，时间冲突")
							})
						}else if( m > $(this).text().substring(5, 3) ){
							$(this).wrap("<div class=\"grey\"></div>");
							$(this).children().unwrap();
							$(this).unbind('click').click(function(){
								alert("此选择无效，时间冲突")
							})
						}else{
							$(this).unbind('click').click(function(){
								//start
								$(".st-end #datatime li").css("background-color","white");
								$(this).css("background-color","pink");
								length = $(".st-end #datatime li").length;
								index = $(".st-end #datatime li").index(this);
								
								index2 = "-1"
								hasr1 = $(".st-end #datatime").children().index(this)
								
								
								if(index >= 1){
									$(".st-end #datatime2 li").css("background-color","white")
									$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
								}else{
									$(".st-end #datatime2 li").css("background-color","white")
								}
								$(".st-end #datatime2 li").unbind('click').click(function(){
									index2 = $(".st-end #datatime2 li").index(this);
									console.log('time2:'+index2.value)
									var hasr2 = $(".st-end #datatime2").children().index(this)
									if($(".st-end #datatime2").children().slice(hasr1, hasr2+1).hasClass("bgred") ==false){
										if(index2 >= index){
											$(".st-end #datatime2 li").css("background-color","white");
											$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
											$(".st-end #datatime2 li").slice(index, index2+1).css("background-color","pink");
											$(".st-end #datatime li").css("background-color","white");
											$(".st-end #datatime li").slice(index, index2+1).css("background-color","pink");
										}else{
											alert("此选择无效，时间冲突")
										}
									}else{
										alert("此选择无效，时间冲突")
									}
								})
								//end	
							})
						}
					}else{
						$(this).unbind('click').click(function(){
							//start
							
							length = $(".st-end #datatime li").length;
							index = $(".st-end #datatime li").index(this);
							index2 = "-1"
							hasr1 = $(".st-end #datatime").children().index(this)
							console.log('time1:'+$(".st-end #datatime").children().innerHTML)
							$(".st-end #datatime li").css("background-color","white");
							$(this).css("background-color","pink");
							if(index >= 1){
								$(".st-end #datatime2 li").css("background-color","white")
								$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
							}else{
								$(".st-end #datatime2 li").css("background-color","white")
							}
							$(".st-end #datatime2 li").unbind('click').click(function(){
								index2 = $(".st-end #datatime2 li").index(this);
								console.log('time2:'+index2.value)
								var hasr2 = $(".st-end #datatime2").children().index(this)		
								console.log('index1:'+hasr1+'index2:'+hasr2)
								this.wodebianliang=$(this).text()
								console.log('hasr1:-'+'this:'+this+hasr1+hasr2+'wodebianliang:'+this.wodebianliang)
								if($(".st-end #datatime2").children().slice(hasr1, hasr2+1).hasClass("bgred") ==false){
									if(index2 >= index){
										$(".st-end #datatime2 li").css("background-color","white");
										$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
										$(".st-end #datatime2 li").slice(index, index2+1).css("background-color","pink");
										$(".st-end #datatime li").css("background-color","white");
										$(".st-end #datatime li").slice(index, index2+1).css("background-color","pink");
									}else{
										alert("此选择无效，时间冲突")
									}
								}else{
									alert("此选择无效，时间冲突")
								}
								return hasr2
							})
							//end	
						})
					}
					$(".st-end #datatime2 li").each(function(){
						if( h+1 >= $(this).text().substring(0, 2)){
						
							if( h+1 == $(this).text().substring(0, 2) && m-30 <= $(this).text().substring(5, 3) ){
								$(this).wrap("<li class=\"white\"></li>");
								$(this).children().unwrap();
							}else{
								$(this).unbind('click').click(function(){
									alert("此选择无效，时间冲突")
								})
							}
								$(this).wrap("<div class=\"grey\"></div>");
							$(this).children().unwrap();
							
						}
					})
				})
			console.log('hasr1'+hasr1)
			}
		},
	}
</script>

<style>
	@import '../../assets/css/paperlessOffice/meeting.css';
</style>
