<template>
	<select class="form-control" v-model="leaveName" v-on:change="leaveChange()">
		<option value="病假">病假</option>
		<option value="事假">事假</option>
		<option value="年假">年假</option>
		<option value="婚假">婚假</option>
		<option value="产检">产检</option>
		<option value="产假">产假</option>
		<option value="哺乳假">哺乳假</option>
		<option value="丧假">丧假</option>
		<option value="停薪留职">停薪留职</option>
		<option value="其他">其他</option>
	</select>
</template>

<script>
	export default {
		data() {
			return {
				leaveName: '病假',

				leaveList: [],
			};
		},
		methods: {
			leaveChange: function() {
				this.$emit('leaveChange', this.leaveName)
			},
			setLeave: function(param) {
				this.leaveId = param
			},
		},
	}
</script>

<style>

</style>
