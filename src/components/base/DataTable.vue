<template>
    <v-flex xs10 offset-xs1>
      <v-toolbar flat dark dense>
        <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field  class="mr-5 mb-2 " v-model="search" 
          append-outer-icon="fa fa-search" label="Search" single-line hide-details></v-text-field>
        <v-btn v-if="!disAdd" color="primary" small fab dark @click="$emit('newItem')">
          <v-icon>fas fa-plus-circle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="datas" :search="search">
        <template slot="items" slot-scope="props">
          <td v-for="(header,index) in headers" :key="header.value">
            <template v-if="header.value=='icon' && props.item[headers[index].value]">
                <v-icon small>{{ props.item[headers[index].value] }}</v-icon>
            </template>
            <template v-else-if="header.value=='op'">
              <v-icon v-if="showOp" small class="mr-2" @click="$emit('showItem',props.item)">fa fa-info</v-icon>
              <v-icon small class="mr-2" @click="$emit('editItem',props.item)">fas fa-edit</v-icon>
            </template>
            <span v-else-if="!header.tableDisable">
              {{ props.item[headers[index].value] }}
            </span>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="$emit('loadData')">Reload</v-btn>
        </template>
      </v-data-table>
    </v-flex>
</template>
<script>
export default {
  data: () => ({
    search: ""
  }),
  props: ["tableTitle", "headers", "datas", "showOp", "disAdd"]
};
</script>
