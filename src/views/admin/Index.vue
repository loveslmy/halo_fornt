<template>
  <div>
    <v-snackbar v-model="snackbar" top auto-height vertical :timeout="8000">
      <p>{{message}}</p>
      <v-btn dark flat @click="snackbar = false">close</v-btn>
    </v-snackbar>   
    <v-navigation-drawer v-model="drawer" clipped app floating width="200">
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.id" :to="item.url">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-black">{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Site Management Console</v-toolbar-title>
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
    <site-footer />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Console",
  data: () => ({
    snackbar: false,
    message: "",
    drawer: false,
    items: []
  }),
  methods: {
    showSnakbar: function(msg) {
      this.snackbar = true;
      this.message = msg;
    },
    loadMenus: function() {
      axios
        .get("/api/menu/findByParentId", {
          params: {
            parentId: -1
          }
        })
        .then(response => {
          this.items = response.data.datas;
        })
        .catch(error => {
          this.message = error.response.status + ":" + error.response.data;
          this.snackbar = true;
        });
    }
  },
  created: function() {
    this.loadMenus();
  }
};
</script>