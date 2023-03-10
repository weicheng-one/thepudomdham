import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue')
    },
    {
      path: '/admin/post-edit/:postId',
      name: 'post-edit',
      component: () => import('@/views/PostEditView.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/posts-management',
      name: 'posts-management',
      component: () => import('@/views/PostsManagementView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: () => import('@/views/PostView.vue')
    }
  ]
});

router.beforeEach((to, from) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (to.meta.requiresAuth && from.meta.requiresAuth && !user) {
    return {
      name: 'signin'
    };
  }
});

export default router;
