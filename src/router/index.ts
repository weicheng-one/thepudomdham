import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('@/views/HomeView.vue');
const SigninView = () => import('@/views/SigninView.vue');
const PostView = () => import('@/views/PostView.vue');
const PostEditView = () => import('@/views/PostEditView.vue');
const PostsManagementView = () => import('@/views/PostsManagementView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    beforeEnter: () => {
      const user = localStorage.getItem('auth:user');
      if (user) {
        router.push({ name: 'home' });
      }
    }
  },
  {
    path: '/admin/post-edit/:postId',
    name: 'post-edit',
    component: PostEditView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/posts-management',
    name: 'posts-management',
    component: PostsManagementView,
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:slug',
    name: 'post',
    component: PostView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  const user = localStorage.getItem('auth:user');
  if (to.meta.requiresAuth && !user) {
    router.push({ name: 'signin', query: { redirect: to.fullPath } });
  }
});

export default router;
