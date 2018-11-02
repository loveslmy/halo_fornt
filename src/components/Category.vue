<template>
  <v-list dense expand subheader>
    <template v-for="item in datas">
      <v-list-group v-if="item.children.length > 0" v-model="item.expanded" :key="item.name">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title class="subheading" @click="go(item.url)">
              <v-icon>{{ item.icon }}</v-icon>
              <span style="margin-left:15px;" class="font-weight-black font-italic">
                {{ item.name }}
              </span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="go(child.url)">
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ child.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile v-else :key="item.name" @click="go(item.url)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.name }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  props: ["datas"],
  methods: {
    go: function(url) {
      this.$router.push({ path: url });
    }
  }
};
</script>
