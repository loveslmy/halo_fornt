<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3 my-5>
        <search></search>
      </v-flex>
      <v-flex xs11 offset-xs1>
        <v-container fluid my-0 py-0>
          <v-layout row wrap>
            <v-flex v-for="site in sites" :key="site.id" xs3 mx-3 my-3>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-img :src="site.file.content" :aspect-ratio="16/9"></v-img>
                  <v-card-title primary-title>
                    <h3 class="title mb-2">{{site.name}}</h3>
                    <div class="body-1 text-truncate" :title="site.description">{{site.description}}</div>
                  </v-card-title>
                  <v-card-actions class="pt-0">
                    <v-btn color="blue" @click="open(site.url)">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Search from "@/components/base/Search";
export default {
  components: {
    search: Search
  },
  created() {
    this.loadSites();
  },
  data: () => ({
    drawer: true,
    sites: []
  }),
  methods: {
    open: function(url) {
      window.open(url);
    },
    loadSites: function() {
      this.$http
        .get("/api/site/listSite")
        .then(response => {
          this.sites = response.data.datas;
        })
        .catch(error => {
          this.$message.showMsg(error.response);
        });
    }
  }
};
</script>
