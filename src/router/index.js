import Vue from 'vue'
import Router from 'vue-router'
import Post from '@/components/post/Post'
import Alblum from '@/components/alblum/Alblum'
import Editor from '@/components/editor/Editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Editor
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/alblum',
      name: 'Alblum',
      component: Alblum
    }
  ]
})
