<template>
	<div class="tab-pane fade" id="gscqtj">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-10 mtr_a"> <span>部门：</span> <span class="com-sel">
						<depart></depart>
					</span> <span>职位：</span> <span class="com-sel">
						<position></position>
					</span> <span>姓名：</span> <span>
						<input type="text" value="" id="" v-model='ryKQName' />
					</span> <span>工号：</span> <span>
						<input type="text" value="" id="" v-model="ryKQJobNum" />
					</span> <span class="search">
						<button class="btn btn-primary">导出</button>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchRYKQInfo('0')">查询所有</button>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchRYKQInfo('1')">查询</button>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>时间：</span> <span>
						<input type="date" value="" v-model="ryBeginDate" />
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<input type="date" value="" v-model="ryEndDate" />
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>注：</span> <span style="color:#FF0000; margin-right:10px;">旷工</span> <span
					 style="color:#CD853F; margin-right:10px;">迟到</span> <span style="color:#000000; margin-right:10px;">正常</span>
					<span style="color:#9370DB; margin-right:10px;">休息</span> <span style="color:#006400; margin-right:10px;">请假</span>
					<span style="color:#00679D; margin-right:10px;">倒休</span> <span style="color:#FF7F50; margin-right:10px;">打卡异常</span>
					<span style="color:#87CEFA; margin-right:10px;">加班</span> <span style="color:#D2B48C; margin-right:10px;">漏打卡</span>
				</div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">姓名</th>
							<th class="text-center">工号</th>
							<th class="text-center">部门</th>
							<th class="text-center">职位</th>
							<th class="text-center">上班正常打卡</th>
							<th class="text-center">下班正常打卡</th>
							<th class="text-center">迟到次数</th>
							<th class="text-center">早退次数</th>
							<th class="text-center">旷工次数</th>
							<th class="text-center">上班打卡异常</th>
							<th class="text-center">下班打卡异常</th>
							<th class="text-center">休息天数</th>
							<th class="text-center">加班天数</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in ryKqList" :key="index" v-if="(ryDepartId == '0' && ryPositionName == '0') || (ryDepartId == '0' && item.ryPositionKQName  == ryPositionName) 
				||(item.ryDepartKQId == ryDepartId && ryPositionName == '0') || (item.ryDepartKQId == ryDepartId && item.ryPositionKQName  == ryPositionName) "
						 @dblclick="showSearchRYKQInfo(item)">
							<td>{{item.ryKQName}}</td>
							<td>{{item.ryJobNum}}</td>
							<td>{{item.ryDepartKQName}}</td>
							<td>{{item.ryPositionKQName}}</td>
							<td>{{item.ryOnNomalPA}}</td>
							<td>{{item.ryDownNomalPA}}</td>
							<td>{{item.ryLaterTimes}}</td>
							<td>{{item.ryLeaveEarlyTimes}}</td>
							<td>{{item.ryMinersTimes}}</td>
							<td>{{item.ryOnPA}}</td>
							<td>{{item.ryDownPA}}</td>
							<td>{{item.ryRestDays}}</td>
							<td>{{item.ryOverTimesDays}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
</template>

<script>
	import depart from '../../vuecommon/department.vue'
	import position from '../../vuecommon/position.vue'
	export default {
		components:{
			depart,
			position
		},
		data() {
			return {
				ryDepartId:'',
				ryPositionName:'',
				positionList:[],
				ryKQName:'',
				ryKQJobNum:'',
				ryBeginDate:'',
				ryEndDate:'',
				ryKqList:[],
			};
		}
	}
</script>

<style>

</style>
