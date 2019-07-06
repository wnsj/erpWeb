import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'

//人员管理
import employee from '../components/employee/employee.vue'
import attendence from '../components/attendence/attendence.vue'
import recruitment from '../components/recruitment/recruitment.vue'

//招聘管理
import recruitChannels from '../components/recruitment/recruitChannels.vue'
import recruitPlan from '../components/recruitment/recruitPlan.vue'
import recruitPublish from '../components/recruitment/recruitPublish.vue'
import interview from '../components/recruitment/interview.vue'

//人员信息类
import poresonnel from '../components/perAnalysis/poresonnel.vue'
import abnormal from '../components/perAnalysis/abnormal.vue'
import separation from '../components/perAnalysis/separation.vue'
import effectiveness from '../components/perAnalysis/effectiveness.vue'
import uilization from '../components/perAnalysis/uilization.vue'
import login from '@/components/userComponent/login.vue'
import mainPage from '@/components/userComponent/mainPage.vue'


//无纸化
import askForLeave from '../components/paperlessOffice/askForLeave.vue'
import restdown from '../components/paperlessOffice/restdown.vue'
import leaveFiling from '../components/paperlessOffice/leaveFiling.vue'
import forgetPunchProof from '../components/paperlessOffice/forgetPunchProof.vue'
import conferenceRoomManage from '../components/paperlessOffice/conferenceRoomManage.vue'
import officeSuppliesManage from '../components/paperlessOffice/officeSuppliesManage.vue'
import computerSupplies from '../components/paperlessOffice/computerSupplies.vue'
import computerAdvanceApplication from '../components/paperlessOffice/computerAdvanceApplication.vue'
import empRequire from '../components/paperlessOffice/empRequire.vue'
import report from '../components/report/report.vue'

export default new Router({
	mode: 'history',
	linkActiveClass: 'open active',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [{
			path: '/login',
			component: login,
			hidden: true
		},
		{
			path: '/mainPage',
			name: '首页',
			component: mainPage,
			hidden: false,
			children: [{
					path: '/employee',
					component: employee
				},
				{
					path: '/attendence',
					component: attendence
				},
				//招聘
				{
					path: '/recruitment',
					component: recruitment,
					children: [{
							path: '/recruitment/recruitChannels',
							name: 'recruitChannels',
							component: recruitChannels,
						},
						{
							path: '/recruitment/recruitPlan',
							name: 'recruitPlan',
							component: recruitPlan
						},
						{
							path: '/recruitment/recruitPublish',
							name: 'recruitPublish',
							component: recruitPublish
						},
						{
							path: '/recruitment/interview',
							name: 'interview',
							component: interview
						}
					],
					redirect: '/recruitment/recruitChannels'
				},
				//人员分析
				{
					path: '/perAnalysis/poresonnel',
					component: poresonnel
				},
				{
					path: '/perAnalysis/abnormal',
					component: abnormal
				},
				{
					path: '/perAnalysis/separation',
					component: separation
				},
				{
					path: '/perAnalysis/effectiveness',
					component: effectiveness
				},
				{
					path: '/perAnalysis/uilization',
					component: uilization
				},

				// 无纸化办公

				{
					path: '/report',
					component: report
				},
				{
					path: '/paperlessOffice/askForLeave',
					component: askForLeave
				},
				{
					path: '/paperlessOffice/restdown',
					component: restdown
				},
				{
					path: '/paperlessOffice/leaveFiling',
					component: leaveFiling
				},
				{
					path: '/paperlessOffice/forgetPunchProof',
					component: forgetPunchProof
				},
				{
					path: '/paperlessOffice/conferenceRoomManage',
					component: conferenceRoomManage
				},
				
				{
					path: '/paperlessOffice/officeSuppliesManage',
					component: officeSuppliesManage
				},
				{
					path: '/paperlessOffice/computerSupplies',
					component: computerSupplies
				},
				{
					path: '/paperlessOffice/computerAdvanceApplication',
					component: computerAdvanceApplication
				},
				{
					path: '/paperlessOffice/empRequire',
					component: empRequire
				},
			]
		}
	]
});

