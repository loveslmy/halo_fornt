<template>
  <v-treeview activatable :items="items"></v-treeview>
</template>
<script>
import axios from "axios";
import Message from "@/util/Message";
export default {
  beforeCreate: function() {
    axios
      .get("/api/category/findByParentId", {
        params: {
          parentId: 0
        }
      })
      .then(response => {
        this.items = response.data.datas;
      })
      .catch(error => {
        Message.showMsg(
          this,
          error.response.status + ":" + error.response.data
        );
      });
  },
  data: () => ({
    items: []
  })
};
</script>
