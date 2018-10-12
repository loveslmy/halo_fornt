<template>
  <b-navbar toggleable="md" style="background-color: #1A1A17" type="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand tag="h1" class="px-5" href="#">
      <b-img src="/static/img/logo.png" alt="logo" width="30" height="30"/><span class="pl-2 mt-2" style="font-family:'Impact';font-size:18px;">JACK.LIU BLOG</span>
      </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-bind="items" v-bind:key="item.id" v-for="item in items" v-bind:to="item.menuUrl">{{item.menuName}}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="输入搜索关键字"/>
          <b-button size="sm" type="submit"><font-awesome-icon icon="search" fixed-width /></b-button>
        </b-nav-form>
        <b-nav-item href="#">&nbsp;登录<font-awesome-icon icon="sign-in-alt" fixed-width /></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TopNav',
  data () {
    return {items: []}
  },
  methods: {
    queryMenuByParentId () {
      axios.get('/api/menus/findByParentId', {
        params: {
          menuType: 'TOP_NAV',
          parentId: 0
        }
      }).then(response => {
        this.items = response.data.datas
      }
      ).catch(error => {
        console.log(error)
      }
      )
    }
  },
  created: function () {
    this.queryMenuByParentId()
  }
}
</script>
