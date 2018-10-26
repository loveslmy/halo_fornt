<template>
  <div>
    <v-toolbar fixed>
      <v-toolbar-title>
        <v-btn icon large>
          <v-avatar size="30px" tile>
            <img src="@/assets/logo.png" alt="Jack.Liu Website">
          </v-avatar>
        </v-btn>
        <span class="hidden-sm-and-down font-weight-black">Jack.Liu</span><span> Official Site</span>
      </v-toolbar-title>
      <v-btn v-for="item in items" :key="item.id" :to="item.url" medium flat>
        <span class="font-weight-black">{{ item.name }}</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn dark icon :href="sendMail">
        <v-icon size="24px">fas fa-envelope</v-icon>
      </v-btn>
      <v-btn dark icon :href="addQQ">
        <v-icon size="24px">fab fa-qq</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid my-5>
      <router-view></router-view>
      <router-view name="post"></router-view>
      <router-view name="album"></router-view>
      <router-view name="video"></router-view>
    </v-container>
    <site-footer :showConcat="true"/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Home",
    data: () => ({
      dialog: false,
      items: [],
      mail: "liumy2009@126.com",
      qq: "39191941"
    }),
    computed: {
      sendMail: function () {
        return "mailto:" + this.mail;
      },
      addQQ: function () {
        return (
          "tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=" +
          this.qq +
          "&website=www.oicqzone.com"
        );
      }
    },
    methods: {
      loadMenus() {
        axios
          .get("/api/menus/findByParentId", {
            params: {
              parentId: 0
            }
          })
          .then(response => {
            this.items = response.data.datas;
          })
          .catch(error => {
            alert(error);
          });
      }
    },
    created: function () {
      this.loadMenus();
    }
  };
</script>
