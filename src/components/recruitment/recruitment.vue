<template>		
<div class="container user-container" id="">
	<div class="row container_recruit">
		<h2 class="col-md-2">招聘管理</h2>
		<ul id="myTab" class="nav col-md-8 col-md-offset-2">
			<li class="active btn btn-default col-md-2 col-md-offset-4"><router-link to="/recruitment/recruitChannels"><a data-toggle="tab">招聘渠道管理</a></router-link></li>
			<li class="btn btn-default col-md-2"><router-link to="/recruitment/recruitPlan"><a data-toggle="tab">招聘计划管理</a></router-link></li>
			<li class="btn btn-default col-md-2"><router-link to="/recruitment/recruitPublish"><a data-toggle="tab">招聘发布管理</a></router-link></li>
			<li class="btn btn-default col-md-2"><a href="#jmeter" data-toggle="tab">面试管理</a></li>
		</ul>
	</div>

	<div class="row">
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="recruit_channels">
				<router-view/>
			</div>
		</div>	
	</div>
</div>

</template>

<script>
export default{
	data() {
		return {
			// recruitmentChannelsList:[],
		}
	},
	
}
	
	
	
</script>

<style scoped>
.clear-mp{margin: 0;padding: 0;}
@-moz-document url-prefix(){fieldset{display: table-cell;}}.user-container{background-color: #fff;width: 100%;padding: 0 20px;}
.container_recruit{padding-bottom: 10px;border-bottom: 1px solid #ccc;}
#myTab{float: left;margin-top: 20px;}
#myTab li{float: left;margin-left: 15px;}
#myTab li:nth-child(1){margin-left: 185px;}
#myTab li a{padding: 0;color: #333;}
#myTab li a:hover{background:none;}
#myTab li.btn-default.active{background: #333333;color: #ffffff;}
#myTab li.btn-default.active a{background: #333333;color: #ffffff;}
</style>
