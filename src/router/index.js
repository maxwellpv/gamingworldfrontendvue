import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/NewsPage.vue'
import GamerProfile from '../components/UserProfileGamer'
import StreamerProfile from '../components/UserProfileStreamer'
import Publications from "@/views/PublicationsPage";
import MyProfile from "../views/MyProfile";
import ManageProfile from "@/views/ManageProfile";
import GamerProfileCorrect from "@/components/GamerProfileCorrect";
import TournamentPage from "../views/TournamentPage";


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
    path: '/tournament/:id',
    name: 'tournament',
    component: TournamentPage
  },
  {
    path: '/myprofile/:id/:type',
    name: 'myprofile',
    component: MyProfile
  },
  { path: '/success', component: GamerProfileCorrect, name: 'success'},
  {
    path: '/profile/:id',
    children: [
      { path: '/:type', component: ManageProfile, name: 'view'},

      { path: 'edit/:type', component: ManageProfile, name: 'edit'},

      { path: 'create/:type', component: ManageProfile, name: 'create'},
    ],
    component: ManageProfile
  }
]

const router = new VueRouter({

  mode: 'history',
  routes
})

export default router
