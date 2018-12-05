<template>
  <v-card>
    <v-card-title class="title">选择图片</v-card-title>
    <v-card-text class="ma-0 pa-0">
      <v-item-group>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex v-for="image in images" :key="image.id" xs4>
              <v-item v-model="image.id">
                <v-card
                  slot-scope="{ active, toggle }"
                  :color="active ? 'primary' : ''"
                  @mousedown="toggle"
                  @click.native="$emit('imageSelect',image)"
                >
                  <v-img :src="image.content" :aspect-ratio="16/9"></v-img>
                  <v-scroll-y-transition>
                    <div v-if="active" class="text-xs-center">选中</div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-flex>
          </v-layout>
        </v-container>
        <div class="text-xs-center">
          <v-pagination
            v-model="pageNo"
            circle
            :length="totalPages"
            total-visible="5"
            @input="loadImages(pageNo-1)"
          ></v-pagination>
        </div>
      </v-item-group>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  created: function() {
    this.loadImages(0);
  },
  methods: {
    loadImages: function(pageNo) {
      let formData = new FormData();
      formData.append("page", pageNo);
      formData.append("size", 6);
      this.$http
        .post("/api/file/listImage", formData)
        .then(response => {
          let pageable = response.data.datas;
          this.images = pageable.content;
          this.pageNo = pageable.number + 1;
          this.totalPages = pageable.totalPages;
        })
        .catch(error => {
          this.$message.showMsg(this, error.response.data);
        });
    }
  },
  data: () => ({
    pageNo: -1,
    totalPages: 1,
    images: []
  })
};
</script>