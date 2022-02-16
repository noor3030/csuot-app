import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import ScheduleDetails from '../views/ScheduleDetails.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/stages/:id',
    name:'ScheduleDetails',
    component:ScheduleDetails
  },
 
    
]

const router = new VueRouter({
  routes
})

export default router
