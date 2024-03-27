import { createRouter, createWebHashHistory } from 'vue-router'
import ContentAbout from './components/ContentAbout.vue'
import ContentContacts from './components/ContentContacts.vue'
import ContentAuth from './components/ContentAuth.vue'
import ContentReg from './components/ContentReg.vue'
import WorkSpace from './components/workspace/WorkSpace.vue'
import Cabinet from './components/cabinet/Cabinet.vue'
import { useRegistrationStore } from '@/engine/authentication'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/about',
      component: ContentAbout,
      alias: ['/']
    },
    {
      path: '/contacts',
      component: ContentContacts
    },
    {
      path: '/authentication',
      component: ContentAuth,
      meta: {
        auth: false
      }
    },
    {
      path: '/registration',
      component: ContentReg,
      meta: {
        auth: false
      }
    },
    {
      path: '/workspace',
      component: WorkSpace,
      meta: {
        auth: true
      }
    },
    {
      path: '/cabinet',
      component: Cabinet,
      meta: {
        auth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useRegistrationStore()
  if (to.meta.auth && !authStore.userInfo.token) {
    next('/authentication')
  } else if (!to.meta.auth && authStore.userInfo.token) {
    next()
  } else {
    next()
  }
})

export default router
