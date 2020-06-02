import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'

//人员管理
import employee from '../components/employee/employee.vue'
import empEntry from '../components/employee/subEmp/empEntry.vue'
import attendence from '../components/attendence/attendence.vue'
import recruitment from '../components/recruitment/recruitment.vue'

//招聘管理
import recruitChannels from '../components/recruitment/recruitChannels.vue'
import interview from '../components/recruitment/interview.vue'
import recruitPlan from '../components/recruitment/recruitPlan.vue'
import recruitPublish from '../components/recruitment/recruitPublish.vue'

//人员信息类
import poresonnel from '../components/perAnalysis/poresonnel.vue'
import abnormal from '../components/perAnalysis/abnormal.vue'
import separation from '../components/perAnalysis/separation.vue'
import effectiveness from '../components/perAnalysis/effectiveness.vue'
import uilization from '../components/perAnalysis/uilization.vue'

//登录页，主页
import login from '@/components/userComponent/login.vue'
import mainPage from '@/components/userComponent/mainPage.vue'

//无纸化
import askForLeave from '../components/paperlessOffice/askForLeave.vue'
import restdown from '../components/paperlessOffice/restdown.vue'
import leaveFiling from '../components/paperlessOffice/leaveFiling.vue'
import conferenceRoomManage from '../components/paperlessOffice/conferenceRoomManage.vue'
import officeSuppliesManage from '../components/paperlessOffice/officeSuppliesManage.vue'
import computerSupplies from '../components/paperlessOffice/computerSupplies.vue'
import empRequire from '../components/paperlessOffice/empRequire.vue'
import report from '../components/paperlessOffice/report.vue'
import clock from '../components/paperlessOffice/clock.vue'
import preApplication from '../components/paperlessOffice/computerPreApplication.vue'
import leaveOffice from '../components/paperlessOffice/leaveOffice.vue'
<<<<<<< HEAD
import outRegistration from '../components/paperlessOffice/outRegistration.vue'
=======
import computerManage from '@/components/paperlessOffice/computerManage.vue'
import goOutRegister from '../components/paperlessOffice/goOutRegister.vue'

>>>>>>> 33153066837bf63a2f25f91e2f0ab9312b80b280

Vue.use(Router)

export default new Router({
	// mode: 'history', //在生产环境下生成虚拟路径，再次刷新，路径将会改变，导致404错误
	mode: 'hash',
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
					component: employee,
					children: [{
						path: '/employee/empEntry',
						name: 'empEntry',
						component: empEntry
					}, ]
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
							component: recruitChannels
						},
						{
							path: '/recruitment/interview',
							name: 'interview',
							component: interview
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
					path: '/paperlessOffice/report',
					component: report
				},
				{
					path: '/paperlessOffice/clock',
					component: clock
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
					path: '/paperlessOffice/officeSuppliesManage',
					component: officeSuppliesManage
				},




				{
					path: '/paperlessOffice/conferenceRoomManage',
					component: conferenceRoomManage
				},
				{
					path: '/paperlessOffice/computerPreApplication',
					name: 'preApplication',
					component: preApplication
				},
				{
					path: '/paperlessOffice/empRequire',
					component: empRequire
				},
				{
					path: '/paperlessOffice/leaveOffice',
					component: leaveOffice
				},
<<<<<<< HEAD
				{
					path: '/paperlessOffice/outRegistration',
					component: outRegistration
				},

=======
        {
          path:'/paperlessOffice/computerManage',
          component:computerManage
        },
        {
          path:'/paperlessOffice/goOutRegister',
          component:goOutRegister
        },
>>>>>>> 33153066837bf63a2f25f91e2f0ab9312b80b280

			],
			redirect: '/employee'
		}
	]
});
