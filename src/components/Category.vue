<template>
  <v-list dense expand subheader>
    <template v-for="item in items">
      <v-list-group v-if="item.children" v-model="item.model" :key="item.text">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">
              <v-icon>{{ item.icon }}</v-icon>
              <span style="margin-left:15px;" class="font-weight-black font-italic">
                                {{ item.text }}
                            </span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="sayHello">
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ child.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile v-else :key="item.text">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
  export default {
    props: ['items'],
    methods: {
      sayHello: function () {
        alert("hello!");
      }
    }
  }
</script>
