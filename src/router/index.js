import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/NewsPage.vue'
import GamerProfile from '../components/UserProfileGamer'
import StreamerProfile from '../components/UserProfileStreamer'
import Publications from "@/views/PublicationsPage";
import EditProfile from "../views/EditProfileGamer";
import MyProfile from "../views/MyProfile";


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
    path: '/edit',
    name: 'edit',
    component: EditProfile
  },
  {
    path: '/myprofile',
    name: 'myprofile',
    component: MyProfile
  },
]

const router = new VueRouter({

  mode: 'history',
  routes
})

export default router
