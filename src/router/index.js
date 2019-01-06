import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/test'
import NotFound from '@/components/404'
import Main from '@/page/main/main'
import Login from '@/page/login/login'
import Join from '@/page/join/join'
import Performs from '@/page/performs/performs'
import PerformStatistic from '@/page/performs/performStatistic'
import Profile from '@/page/profile/profile'
import Fashion from '@/page/fashion/fashion'
import FashionImgSet from '@/page/fashion/fashionImgSet'
import FashionStatistic from '@/page/fashion/fashionStatistic'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/performs',
      component: Performs
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/join',
      component: Join
    },
    {
      path: '/fashionStatistic',
      component: FashionStatistic
    },
    {
      path: '/performStatistic',
      component: PerformStatistic
    },
    {
      path: '/fashion',
      component: Fashion
    },
    {
      path: '/fashionImgSet',
      component: FashionImgSet
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
