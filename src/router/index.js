import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/NewsPage.vue'
import GamerProfile from '../components/UserProfileGamer'
import StreamerProfile from '../components/UserProfileStreamer'
import Publications from "@/views/PublicationsPage";
import GPCorrect from "../components/GamerProfileCorrect";

Vue.use(VueRouter)

const routes = [
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/',
    redirect: "/news"
  },
  {
    path: '/gamer',
    name: 'gamer',
    component: GamerProfile
  },
  {
    path: '/streamer',
    name: 'streamer',
    component: StreamerProfile
  },
  {
    path: '/publications',
    name: 'publications',
    component: Publications
  },
  {
    path: '/correct',
    name: 'Correct',
    component: GPCorrect
  },

]

const router = new VueRouter({

  mode: 'history',
  routes
})

export default router
