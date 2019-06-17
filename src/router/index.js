import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import employee from '../components/employee/employee.vue'
import attendence from '../components/attendence/attendence.vue'
import recruitment from '../components/recruitment/recruitment.vue'

import recruitChannels from '../components/recruitment/recruitChannels.vue'
import recruitPlan from '../components/recruitment/recruitPlan.vue'
import recruitPublish from '../components/recruitment/recruitPublish.vue' 

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
		        path:'/recruitment/recruitChannels',
		        name:'recruitChannels',
		        component:recruitChannels,
		      },
		      {
		        path:'/recruitment/recruitPlan',
		        name:'recruitPlan',
		        component:recruitPlan
		      },
					{
					  path:'/recruitment/recruitPublish',
					  name:'recruitPublish',
					  component:recruitPublish
					},
		    ],
				redirect:'/recruitment/recruitChannels'
		
		},

  ]
})
