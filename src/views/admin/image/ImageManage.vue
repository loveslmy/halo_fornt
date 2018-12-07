<template>
  <v-layout row wrap>
    <v-dialog persistent v-model="dialog" max-width="60%">
      <upload
        accpet="image/*"
        v-if="dialog"
        toolTitle="图片上传"
        uploadUrl="/api/file/upload/image"
        thumbnail="false"
        v-on:close="close"
      ></upload>
    </v-dialog>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-toolbar dark dense>
          <v-toolbar-title>图片列表</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" small fab dark @click="dialog=true">
            <v-icon>fas fa-plus-circle</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="image in images" :key="image.name" xs4 d-flex>
              <v-card>
                <v-img
                  :src="image.content"
                  @click="brower"
                  :aspect-ratio="16/9"
                  class="grey lighten-2"
                ></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <div class="text-xs-center">
        <v-pagination v-model="pageNo" :length="totalPages" total-visible="5"></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import upload from "@/components/base/Upload";
export default {
  components: {
    upload
  },
  watch: {
    pageNo: function(val) {
      this.loadData(val - 1);
    }
  },
  data: () => ({
    images: [],
    dialog: false,
    pageNo: 1,
    totalPages: 1
  }),
  methods: {
    brower: function() {},
    loadData: function(pageNo) {
      let formData = new FormData();
      formData.append("page", pageNo);
      formData.append("size", 9);
      this.$http
        .post("/api/file/listImage", formData)
        .then(response => {
          let pageable = response.data.datas;
          this.images = pageable.content;
          this.pageNo = pageable.number + 1;
          this.totalPages = pageable.totalPages;
        })
        .catch(error => {
          this.$message.showMsg(this, error);
        });
    },
    close: function() {
      this.dialog = false;
    }
  },
  created() {
    this.loadData(0);
  }
};
</script>
