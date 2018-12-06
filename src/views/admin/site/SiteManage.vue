<template>
  <v-layout row wrap>
    <v-dialog persistent v-model="dialog" max-width="60%">
      <v-card class="mx-auto">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <auto-form :headers="headers" :editedItem="editedItem"></auto-form>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text>
              <v-treeview
                open-on-click
                activatable
                :active.sync="selectedItem"
                :items="items"
                :load-children="loadCategories"
                item-key="id"
                open-all
              ></v-treeview>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <image-select @imageSelect="selectImage"></image-select>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="step === 1" color="blue darken-1" flat @click="step--">返回</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="blue darken-1" flat @click="next">下一步</v-btn>
          <v-btn :disabled="step != 3" color="blue darken-1" flat @click.native="save">保存</v-btn>
          <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <data-table
      tableTitle="收藏站点列表"
      :headers="headers"
      :datas="sites"
      @newItem="newItem"
      @editItem="editItem"
      @loadData="loadSites"
    ></data-table>
  </v-layout>
</template>

<script>
import AutoForm from "@/components/base/AutoForm";
import DataTable from "@/components/base/DataTable";
import ImageSelect from "@/components/base/ImageSelect";
import Validate from "@/util/Validate";
export default {
  computed: {
    items: function() {
      return [{ id: 2, name: "站点分类", children: this.categories }];
    },
    currentTitle: function() {
      switch (this.step) {
        case 1:
          return "站点信息";
        case 2:
          return "站点分类";
        case 3:
          return "站点缩略图";
      }
    },
    selected() {
      if (!this.selectedItem.length) return undefined;
      return this.selectedItem[0];
    }
  },
  created: function() {
    this.loadSites();
    this.loadImages(0);
  },
  components: {
    "image-select": ImageSelect,
    "data-table": DataTable,
    "auto-form": AutoForm
  },
  methods: {
    async next() {
      switch (this.step) {
        case 1:
          if (await Validate.validate(this.$validator, this.headers)) {
            this.step++;
          }
          break;
        case 2:
          if (this.selected) {
            this.editedItem.categoryId = this.selected;
            this.step++;
          } else {
            this.$message.showMsg(this, "请选择站点分类!");
          }
          break;
      }
    },
    selectImage: function(img) {
      this.editedItem.refId = img.id;
    },
    editItem: function(item) {
      this.newOp = false;
      this.editedItem = item;
      this.dialog = true;
    },
    newItem: function() {
      this.newOp = true;
      this.dialog = true;
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    loadSites: function() {
      this.$http
        .get("/api/site/listSite")
        .then(response => {
          this.sites = response.data.datas;
        })
        .catch(error => {
            this.$message.showMsg(this, error);
        });
    },
    loadCategories: function(item) {
      if (item.leaf) {
        item.children = null;
        return;
      }
      this.$http
        .get("/api/category/findByParentId", {
          params: {
            parentId: item.id
          }
        })
        .then(response => {
          if (response.data.datas.length > 0) {
            for (var i = 0; i < response.data.datas.length; i++) {
              var child = response.data.datas[i];
              item.children.push(child);
            }
          }
        })
        .catch(error => {
            this.$message.showMsg(this, error);
        });
    },
    close: function() {
      this.step = 1;
      this.newOp = false;
      this.dialog = false;
    },
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
            this.$message.showMsg(this, error);
        });
    },
    save: function() {
      this.$http
        .post("/api/site/saveOrModify", this.editedItem)
        .then(response => {
          if (response.data.status === "OK") {
            this.editedItem = response.data.datas;
            if (this.newOp) {
              this.sites.push(this.editedItem);
            }
            this.close();
            this.$message.showMsg(this, "操作成功!");
          } else {
            this.$message.showMsg(this, response.data.msg);
          }
        })
        .catch(error => {
            this.$message.showMsg(this, error);
        });
      this.dialog = false;
    }
  },
  data: () => ({
    active: false,
    pageNo: 1,
    totalPages: 1,
    images: [],
    selectedItem: [],
    sites: [],
    categories: [],
    dialog: false,
    newOp: false,
    step: 1,
    headers: [
      { text: "操 作", value: "op", sortable: false, width: "100px" },
      { text: "ID", value: "id" },
      {
        text: "站点名称",
        value: "name",
        counter: 64,
        validate: "required|max:32",
        required: true,
        canEdit: true
      },
      {
        text: "站点分类",
        value: "categoryId",
        required: true
      },
      {
        text: "缩略图",
        value: "refId"
      },
      {
        text: "URL",
        value: "url",
        validate: "required|max:128",
        counter: 128,
        required: true,
        canEdit: true
      },
      {
        type: "select",
        text: "状 态",
        value: "active",
        validate: "required",
        canEdit: true,
        options: [{ text: "有效", value: true }, { text: "失效", value: false }]
      },
      {
        type: "textarea",
        text: "站点描述",
        value: "description",
        validate: "required|max:128",
        counter: 128,
        canEdit: true
      },
      { text: "更新时间", value: "updDate" }
    ],
    editedItem: {
      name: "",
      refId: null,
      categoryId: null,
      url: "",
      active: true,
      description: ""
    },
    defaultItem: {
      name: "",
      refId: null,
      categoryId: null,
      url: "",
      active: true
    }
  })
};
</script>
