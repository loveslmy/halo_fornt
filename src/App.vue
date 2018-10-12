<template>
  <div id="app">
    <!--导航栏-->
    <top-nav/>
    <b-container :fluid="true" class="px-0 mx-0">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TopNav from './components/navigation/TopNav'
export default {
  name: 'Halo',
  components: {
    'top-nav': TopNav
  }
}
</script>
