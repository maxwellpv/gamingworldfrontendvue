import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/NewsPage.vue'
import ProfileSelection from '../components/UserTypeSelection'
import GamerProfile from '../components/UserProfileGamer'
import StreamerProfile from '../components/UserProfileStreamer'
import GPCorrect from "../components/GamerProfileCorrect";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProfileSelection
  },
  {
    path: '/gamer',
    name: 'Gamer',
    component: GamerProfile
  },
  {
    path: '/streamer',
    name: 'Streamer',
    component: StreamerProfile
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/correct',
    name: 'Correct',
    component: GPCorrect
  },

]

const router = new VueRouter({
  routes
})

export default router
