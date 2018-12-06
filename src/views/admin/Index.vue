<template>
  <div>
    <v-snackbar v-model="snackbar" top auto-height vertical :timeout="8000">
      <p>{{message}}</p>
      <v-btn dark flat @click="snackbar = false">close</v-btn>
    </v-snackbar>
    <v-navigation-drawer v-model="drawer" app fixed clipped floating width="230">
      <v-list expand>
        <v-list-group
          v-for="menu in menus"
          v-model="menu.active"
          :key="menu.id"
          v-if="menu.children.length>0"
        >
          <v-list-tile slot="activator">
            <v-list-tile-action>
              <v-icon>{{menu.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-black">{{ menu.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="subMenu in menu.children" :key="subMenu.id" :to="subMenu.url">
            <v-list-tile-action class="ml-4">
              <v-icon>{{ subMenu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ subMenu.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :to="menu.url">
          <v-list-tile-action>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{menu.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn icon large>
          <v-avatar size="30px" tile>
            <img src="@/assets/logo.png" alt="Jack.Liu Website">
          </v-avatar>
        </v-btn>网站管理控制台
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <site-footer/>
  </div>
</template>
<script>
export default {
  name: "Console",
  data: () => ({
    snackbar: false,
    message: "",
    drawer: false,
    menus: []
  }),
  methods: {
    loadMenus: function() {
      this.$http
        .get("/api/menu/findByParentId", {
          params: {
            parentId: 1
          }
        })
        .then(response => {
          this.menus = response.data.datas;
        })
        .catch(error => {
            this.$message.showMsg(this, error);
        });
    }
  },
  created: function() {
    this.loadMenus();
  }
};
</script>
