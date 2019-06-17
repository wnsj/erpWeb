<template>
	<!-- 班组人员分配 -->
	<div class="modal fade attendanceModal" id="myGroupsInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	 aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h4 class="modal-title">正常班组</h4>
				</div>
				<div class="modal-body">
					<div class="mb-2">
						<div class="col-lg-12 mtr_a">
							<span>部门：</span>
							<span class="com-sel">
								<department  @departChange='departChange'></department>
							</span>
							<span>职位：</span>
							<span class="com-sel">
								<position :positionName="positionName" :positionId="positionId" @positionChange='positionData'></position>
							</span>
							<span>姓名：</span>
							<span>
								<input type="text" value="" class="form-control">
							</span>
						</div>
						<div class="col-lg-12 mtr_a">
							<span>工号：</span>
							<span>
								<input type="text" value="" class="form-control">
							</span>
							<span class="search pull-right">
								<button class="btn btn-warning">查询</button>
							</span>
						</div>
					</div>
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th class="text-center mychoose">选择</th>
								<th class="text-center">姓名</th>
								<th class="text-center">工号</th>
								<th class="text-center">部门</th>
								<th class="text-center">职位</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text-center mychoose"><input type="checkbox" /></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-danger">删除</button>
					<button class="btn btn-primary" data-toggle='modal' data-target='#myNewGroupsInfo'>新增</button>
				</div>
			</div>
		</div>
		<div>
			<addAttShiftGroupInfo/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import department from '@/components/vuecommon/department.vue'
	import position from '@/components/vuecommon/position.vue'
	import addAttShiftGroupInfo from './subFunction/addAttShiftGroupInfo.vue'

	export default {
		name: "myGroupsInfo",
		components: {
			department,
			position,
			addAttShiftGroupInfo
		},
		data() {
			return {
				departName: '0',
				departId: '',
				positionId: '',
				positionName: ''
			}
		},
		methods: {
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.departId = departId
				this.departName = departName
			},
			//获取职位名和id
			positionData: function(positionId, positionName) {
				this.positionId = positionId;
				this.positionName = positionName;
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
