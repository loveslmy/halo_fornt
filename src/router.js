import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/front/Home.vue'),
      children: [
        {
          path: '',
          components: {
            site: () => import('./views/front/site/SiteIndex.vue'),
            post: () => import('./views/front/post/PostIndex.vue'),
            album: () => import('./views/front/album/AlbumIndex.vue'),
            video: () => import('./views/front/video/VideoIndex.vue')
          }
        },
        {
          path: 'post',
          component: () => import('./views/front/post/PostIndex.vue')
        },
        {
          path: 'album',
          component: () => import('./views/front/album/AlbumIndex.vue')
        },
        {
          path: 'site',
          component: () => import('./views/front/site/SiteIndex.vue')
        }
      ]
    },
    {
      path: '/admin/',
      component: () => import('./views/admin/Index.vue'),
      children: [
        {
          path: 'menu',
          component: () => import('./views/admin/menu/MenuManage.vue')
        },
        {
          path: 'category',
          component: () => import('./views/admin/category/CategoryManage.vue')
        }
      ]
    }
  ]
})
