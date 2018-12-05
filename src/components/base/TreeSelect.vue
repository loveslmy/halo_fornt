<template>
  <v-treeview activatable :items="datas"></v-treeview>
</template>
<script>
import axios from "axios";
import Message from "@/util/Message";
export default {
  beforeCreate: function() {},
  data: () => ({
    datas: []
  })
};
</script>
