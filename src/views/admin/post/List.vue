
<template>
  <v-layout justify-center>
    <v-flex xs2 d-flex>
      <category :datas="categories"></category>
    </v-flex>
    <v-flex xs9 offset-xs1>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>文章列表</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header" inset>{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="index" inset></v-divider>
            <v-list-tile v-else :key="item.title" avatar ripple @click>
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-layout fluid>
                  <v-flex xs10>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                  </v-flex>
                  <v-flex xs1 offset-xs1></v-flex>
                </v-layout>
              </v-list-tile-content>
              <v-chip color="blue" text-color="white" small>已发布</v-chip>
              <v-list-tile-action>
                <v-list-tile-action-text>编 辑</v-list-tile-action-text>
                <v-btn icon>
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Category from "@/components/Category";
export default {
  data: () => ({
    items: [
      {
        header: "Today"
      },
      { divider: true },
      {
        avatar: "https://picsum.photos/250/300?image=660",
        title: "Meeting @ Noon",
        subtitle:
          "<span class='text--primary'>Spike Lee</span> &mdash; I'll be in your neighborhood"
      },
      {
        avatar: "https://picsum.photos/250/300?image=821",
        title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
        subtitle:
          "<span class='text--primary'>to Operations support</span> &mdash; Wish I could come."
      },
      {
        avatar: "https://picsum.photos/250/300?image=783",
        title: "Yes yes",
        subtitle:
          "<span class='text--primary'>Bella</span> &mdash; Do you have Paris recommendations"
      },
      {
        header: "Yesterday"
      },
      { divider: true },
      {
        avatar: "https://picsum.photos/250/300?image=1006",
        title: "Dinner tonight?",
        subtitle:
          "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
      },
      {
        avatar: "https://picsum.photos/250/300?image=146",
        title: "So long",
        subtitle:
          "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
      },
      {
        header: "Last Week"
      },
      { divider: true },
      {
        avatar: "https://picsum.photos/250/300?image=1008",
        title: "Breakfast?",
        subtitle:
          "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
      },
      {
        avatar: "https://picsum.photos/250/300?image=839",
        title:
          'Winter Porridge <span class="grey--text text--lighten-1"></span>',
        subtitle:
          "<span class='text--primary'>cc: Daniel</span> &mdash; Tell me more..."
      },
      {
        avatar: "https://picsum.photos/250/300?image=145",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
      }
    ],
    categories: []
  }),
  components: {
    category: Category
  },
  methods: {
    loadCatetories: function() {
      this.$http
        .get("/api/category/findByParentId", {
          params: {
            parentId: 1
          }
        })
        .then(response => {
          this.categories = response.data.datas;
        })
        .catch(error => {
            if (error.response !== undefined) {
                this.$message.showMsg(
                    this,
                    error.response.status + ":" + error.response.data
                );
            } else {
                this.$message.showMsg(this, error);
            }
        });
    }
  },
  created: function() {
    this.loadCatetories();
  }
};
</script>
