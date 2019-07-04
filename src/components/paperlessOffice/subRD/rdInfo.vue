<template>
	<!--倒休申请表弹出-->
	<div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h1 class="modal-title">倒休</h1>
				</div>
				<div class="modal-header">

					<h4 id="myModalLabel" class="modal-title"><span>申请人姓名：<i>测试1</i></span><span>部门：<i>成都运营</i></span><span>职位：<i>无职位</i></span></h4>
				</div>

				<div class="modal-header modal_header_leave modal-headeroffday">
					<h6>倒休</h6>
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
							<p>原因：</p>
						</div>
						<div class="col-xs-8  col-sm-8 col-md-8 col-lg-8">
							<select class="form-control" v-model="state">
								<option value="0">个人</option>
								<option value="1">工作</option>

							</select>
						</div>
					</div>
				</div>
				<div class="modal-header modal_header_leave">
					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>加班时间：</p>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 change_01">
							<p class="col-xs-12 col-sm-12 col-md-12 col-lg-12 change_date"></p>
						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_02">
							<button type="button" class="btn btn-warning pull-left m_r_12">+</button>
							<button type="button" class="btn btn-warning pull-left m_r_12">-</button>
						</div>
					</div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>加班累积：</p>
						</div>
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 change_right">
							<input class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding: 0; line-height: 34px;" value="1">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 change_01 offday_add">
								<button class="btn btn-default" type="button"><i class="fa fa-caret-up"></i></button>
								<button class="btn btn-default" type="button"><i class="fa fa-caret-down"></i></button>
							</div>

						</div>

						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<select class="form-control col-xs-12 col-sm-12 col-md-12 col-lg-12" v-model="state" style="padding: 0; line-height: 34px;">
								<option value="0">天</option>
								<option value="1">小时</option>
							</select>
						</div>

					</div>


					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>休息时间：</p>
						</div>
						<span class="col-xs-1 col-sm-1 col-md-1 col-lg-1 zhi change_01">~</span>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 change_01">
							<span class="leavespan_off col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<input type="date" value="" class="form-control col-xs-10 col-sm-10 col-md-10 col-lg-10" v-model="dpbeginDate"
								 style="padding: 0; line-height: 34px;" />
							</span>
							<span class="leavespan_off col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">

								<input type="date" value="" style="padding: 0; line-height: 34px;" class="form-control col-xs-10 col-sm-10 col-md-10 col-lg-10 change_time2"
								 v-model="dpEndDate" />
							</span>
						</div>

					</div>



				</div>





				<!--说明-->
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
						<p>说明：</p>
					</div>
					<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
						<textarea class="explain_leave"></textarea>
					</div>

					<div class="col-md-5">
						<br />
						<button type="button" class="btn btn-warning pull-right m_r_10">取消</button>
						<button type="button" class="btn btn-warning pull-right m_r_10">确定</button>
					</div>
				</div>

				<div class="modal-header modal_header_leave modal-headeroffday">


					<!--审查-->
					<div class="modal-header modal_header_leave">
						<h6>审查</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
								<p>审查人：</p>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
								<select class="form-control" v-model="state">
									<option value="0">王斌</option>
								</select>
							</div>
							<div class="col-xs-1 col-sm-1 col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10">+</button>

							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>备注：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="col-md-3">

							<button type="button" class="btn btn-info">同意</button>
							<button type="button" class="btn btn-info">不同意</button>
						</div>
					</div>


					<!--审核-->
					<div class="modal-header modal_header_leave">
						<h6>审核</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
								<p>审核人：</p>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<select class="form-control" v-model="state">
									<option value="0">王艳杰</option>
									<option value="1">宋子龙</option>
								</select>
							</div>
							<div class="col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10">+</button>

							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>备注：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="col-md-3">

							<button type="button" class="btn btn-info">同意</button>
							<button type="button" class="btn btn-info">不同意</button>
						</div>
					</div>


					<!--批准人-->
					<div class="modal-header modal_header_leave">
						<h6>批准</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
								<p>批准人：</p>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<select class="form-control" v-model="state">
									<option value="0">王艳杰</option>
									<option value="1">宋子龙</option>
								</select>
							</div>
							<div class="col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10">+</button>

							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>备注：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="col-md-3">

							<button type="button" class="btn btn-info">同意</button>
							<button type="button" class="btn btn-info">不同意</button>
						</div>
					</div>

					<!--报备人-->
					<div class="modal-header modal_header_leave">
						<h6>报备</h6>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>报备人：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<select class="form-control" v-model="state">
									<option value="0">李珊珊</option>
								</select>
							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>备注：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="col-md-4">

							<button type="button" class="btn btn-info">同意</button>
							<button type="button" class="btn btn-info">不同意</button>
						</div>
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

</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
