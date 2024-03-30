import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'Users',
      children: [
        {
          path: '',
          name: 'Users',
          component: () => import('../views/UsersView.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: ':id',
          name: 'User',
          component: () => import('../views/UserDetailView.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/profile',
      name: 'UserProfileView',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !authStore.user._id // we don't have a token, so we check if the user is logged in by checking _id
  if (to.matched.some((record) => record.meta.requiresAuth) && isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
