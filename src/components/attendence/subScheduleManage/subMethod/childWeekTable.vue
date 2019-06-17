<template id="child">
	<div id="main" style="width: 1000px;height:1000px; margin-bottom:30px; top:50px; position:static;"></div>
</template>

<script>
	import axios from 'axios'
	//import echarts from '@/../static/js/echarts.js'
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	// require('echarts/lib/component/title')

	export default {
		//props: ['ryScheduleListObj'],
		data() {
			return {
				ryScheduleListObj: {},
				option: {},
				myChart: {}
			}
		},
		methods: {
			drawLine() {
				this.myChart = echarts.init(document.getElementById("main"));
				//alert("myChart：" + this.myChart);
				//console.log("myChart：" + this.myChart);
				this.myChart.setOption(this.option);
			},
			setPara(item) {
				this.ryScheduleListObj = item;
				this.option = {
					title: {},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: "" // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							var tar;
							if (params[1].value != "-") {
								tar = params[1];
							} else {
								tar = params[0];
							}
							return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
						}
					},
					legend: {
						data: []
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: {
						type: "category",
						splitLine: {
							show: false
						},
						data: ["", "", "", "", "", "", ""]
					},
					yAxis: {
						type: "value"
					},
					series: [{
							name: "班次",
							type: "bar",
							stack: "总量",
							itemStyle: {
								normal: {
									barBorderColor: "rgba(0,0,0,0)",
									color: "rgba(0,0,0,0)"
								},
								emphasis: {
									barBorderColor: "rgba(0,0,0,0)",
									color: "rgba(0,0,0,0)"
								}
							},
							// data: [8.5, 1.5, 5.5, 4.8, 8.4, 3.5, 8.5]
							data: this.ryScheduleListObj.startTime,
						},

						{
							name: "班次",
							type: "bar",
							stack: "总量",
							label: {
								normal: {
									show: false,
									position: "top"
								}
							},
							// data: [0 - 6, 0 - 0, 0 - 2, 0 - 0, 0 - 0, 0 - 5.5, 0 - 0],
							data: this.ryScheduleListObj.endTime
						},
						{
							name: "班次",
							type: "bar",
							stack: "总量",
							label: {
								normal: {
									show: false,
									position: "top"
								}
							},
							// data: [8, 6.3, 5, 10, 5.5, 3, 8],
							data: this.ryScheduleListObj.timeList
						}
					]
				};
				this.myChart.setOption(this.option);
			}
		},
		mounted() {
			this.option = {
				title: {},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "" // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function(params) {
						var tar;
						if (params[1].value != "-") {
							tar = params[1];
						} else {
							tar = params[0];
						}
						return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
					}
				},
				legend: {
					data: []
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis: {
					type: "category",
					splitLine: {
						show: false
					},
					data: ["", "", "", "", "", "", ""]
				},
				yAxis: {
					type: "value"
				},
				series: [{
						name: "班次",
						type: "bar",
						stack: "总量",
						itemStyle: {
							normal: {
								barBorderColor: "rgba(0,0,0,0)",
								color: "rgba(0,0,0,0)"
							},
							emphasis: {
								barBorderColor: "rgba(0,0,0,0)",
								color: "rgba(0,0,0,0)"
							}
						},
						// data: [8.5, 1.5, 5.5, 4.8, 8.4, 3.5, 8.5]
						data: this.ryScheduleListObj.startTime,
						// data: '',
					},

					{
						name: "班次",
						type: "bar",
						stack: "总量",
						label: {
							normal: {
								show: false,
								position: "top"
							}
						},

						// data: [0 - 6, 0 - 0, 0 - 2, 0 - 0, 0 - 0, 0 - 5.5, 0 - 0],
						//data: [ -6,  0, -2, 0 ,0, 0, -5.5, 0]
						data: this.ryScheduleListObj.endTime
					},
					{
						name: "班次",
						type: "bar",
						stack: "总量",
						label: {
							normal: {
								show: false,
								position: "top"
							}
						},

						// data: [8, 6.3, 5, 10, 5.5, 3, 8],
						data: this.ryScheduleListObj.timeList
					}
				]
			};
			this.drawLine();
		}
	}
</script>

<style>
</style>
