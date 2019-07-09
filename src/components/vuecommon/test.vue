<template>

	<div class='col-sm-8'>
		<div id="time">
			<span class="select-box-title">选择发送时间：</span>
			<input class="form-control select-box-input" v-model="time" type="text" id="messageSendTime">
		</div>
		<div class="form-group">
			<%--<label>选择日期+时间：</label>--%>
			<!--指定 date标记-->
			<div class='input-group date datetimePicker' id='datetimepicker2'>
				<span class="input-group-addon">截止时间</span>
				<input name="endTimeStr" type='text' class="form-control" />
				<span class="input-group-addon">
					<span class="glyphicon glyphicon-calendar"></span>
				</span>
			</div>
		</div>
	</div>
	</div>

</template>

<script>
	import $ from 'jquery'
	require('@/../static/js/bootstrap-datetimepicker.js')
	require('@/../static/js/bootstrap-datetimepicker.zh-CN.js')
	export default {
		name: 'time',
		data() {
			return {
				time: ''
			}
		},
		methods: {
			dateDefind() {
				var d, s;
				var self = this;
				d = new Date();
				s = d.getFullYear() + "-"; //取年份
				s = s + (d.getMonth() + 1) + "-"; //取月份
				s += d.getDate() + " "; //取日期
				s += d.getHours() + ":"; //取小时
				s += d.getMinutes() + ":"; //取分
				s += d.getSeconds(); //取秒
				self.time = s;
				//初始化
				$('#messageSendTime').datetimepicker({
					startDate: s,
					minView: "hour", //选择日期后，不会再跳转去选择时分秒
					language: 'dasfasf',
					format: 'yyyy-mm-dd hh:ii:ss',
					todayBtn: 1,
					autoclose: 1
				});
				//当选择器隐藏时，讲选择框只赋值给data里面的time
				$('#messageSendTime').datetimepicker()
					.on('hide', function(ev) {
						var value = $("#messageSendTime").val();
						self.time = value;
					});
			}
		},

		mounted: function() {
			this.dateDefind();
			$(function() {
				$('.datetimePicker').datetimepicker({
					format: 'yyyy-mm-dd hh:ii:00',
					language: 'cn',
				});
			})
		}
	}
</script>

<style>

</style>
