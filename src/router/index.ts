import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import SideBarNavigation from '@/components/SideBarNavigation.vue'
import TopNavBar from '@/components/TopNavBar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect() {
        return '/users'
      }
    },
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
          components: {
            default: () => import('../views/UsersView.vue'),
            topNav: TopNavBar,
            sideNav: SideBarNavigation
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: ':id',
          name: 'User',
          components: {
            default: () => import('../views/UserDetailView.vue'),
            topNav: TopNavBar,
            sideNav: SideBarNavigation
          },
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/profile',
      name: 'UserProfileView',
      components: {
        default: () => import('../views/ProfileView.vue'),
        topNav: TopNavBar,
        sideNav: SideBarNavigation
      },
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
