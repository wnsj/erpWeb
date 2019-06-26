import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import employee from '../components/employee/employee.vue'
import attendence from '../components/attendence/attendence.vue'
import recruitment from '../components/recruitment/recruitment.vue'

import recruitChannels from '../components/recruitment/recruitChannels.vue'
import recruitPlan from '../components/recruitment/recruitPlan.vue'
import recruitPublish from '../components/recruitment/recruitPublish.vue'
import interview from '../components/recruitment/interview.vue'

import poresonnel from '../components/perAnalysis/poresonnel.vue'
import abnormal from '../components/perAnalysis/abnormal.vue'
import separation from '../components/perAnalysis/separation.vue'
import effectiveness from '../components/perAnalysis/effectiveness.vue'
import uilization from '../components/perAnalysis/uilization.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      children:[
        {
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
          component : interview

        }
      ],
      redirect:'/recruitment/recruitChannels'
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
  ]
})
