<template>
	
	  <div class="form-group">
	    <label for="firstTime" class="control-label">时间：</label>
	    <div class="input-group">
	      <input type="date" class="form-control" id="firstTime" v-model="dateTime">
	      <div class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span> </div>
	    </div>
	  </div>
	
	
</template>

<script>
	export default {
		data() {
			return {
				dateTime:''
			};
		}
	}
</script>

<style>

</style>
