<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <v-dialog v-model="isLoading" hide-overlay persistent width="300">
        <v-card>
          <v-card-text class="headline">加载中...
            <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card>
        <v-card-title class="title font-weight-medium">{{ title }}</v-card-title>
        <v-dialog v-model="dialogMode" persistent max-width="60%">
          <image-select @imageSelect="selectImage"></image-select>
        </v-dialog>
        <v-form>
          <v-layout>
            <v-flex xs6 mx-3>
              <v-text-field
                v-model="editedItem[headers[0].value]"
                v-validate="headers[0].validate"
                :data-vv-name="headers[0].text"
                :counter="headers[0].counter"
                :error-messages="errors.collect(headers[0].text)"
                :label="headers[0].text"
                :required="headers[0].required"
                box
              ></v-text-field>
              <v-textarea
                v-model="editedItem[headers[1].value]"
                v-validate="headers[1].validate"
                :data-vv-name="headers[1].text"
                :counter="headers[1].counter"
                :error-messages="errors.collect(headers[1].text)"
                :label="headers[1].text"
                :required="headers[1].required"
                box
              ></v-textarea>
              <v-autocomplete
                v-model="selectedCategories"
                :items="categories"
                box
                chips
                item-text="name"
                item-value="id"
                multiple
                :label="headers[2].text"
                v-validate="headers[2].validate"
                :data-vv-name="headers[2].text"
                :error-messages="errors.collect(headers[2].text)"
                :required="headers[2].required"
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="removeCategories(data.item)"
                  >
                    <v-icon left small>{{data.item.icon}}</v-icon>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template slot="item" slot-scope="data">
                  <v-list-tile-avatar>
                    <v-icon left small>{{data.item.icon}}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="selectedTags"
                :items="tags"
                box
                chips
                item-text="name"
                item-value="id"
                multiple
                :label="headers[3].text"
                v-validate="headers[3].validate"
                :data-vv-name="headers[3].text"
                :error-messages="errors.collect(headers[3].text)"
                :required="headers[3].required"
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="removeTags(data.item)"
                  >
                    <v-icon left small>{{data.item.icon}}</v-icon>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template slot="item" slot-scope="data">
                  <v-list-tile-avatar>
                    <v-icon left small>{{data.item.icon}}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs6>
              <v-img :aspect-ratio="16/9" :src="imageSrc">
                <v-flex text-xs-right xs12>
                  <v-btn round outline @click="switchImg" color="blue-grey darken-4">
                    <v-icon>fa fa-picture-o</v-icon>
                    <span class="ml-1">选择图片</span>
                  </v-btn>
                </v-flex>
                <v-layout wrap>
                  <v-layout align-start column justify-end pa-3>
                    <h3 class="headline">{{ editedItem.name }}</h3>
                    <span class="grey--text text--lighten-1">{{ editedItem.description }}</span>
                  </v-layout>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="save">
            <v-icon left>fas fa-save</v-icon>保存
          </v-btn>
          <v-btn color="orange" @click="publish">
            <v-icon left>fa fa-paper-plane</v-icon>发布
          </v-btn>
        </v-card-actions>
        <div id="editor">
          <mavon-editor
            v-model="editedItem.content"
            placeholder="输入文章内容..."
            style="height: 100%;z-index: inherit;"
            :codeStyle="codeStyle"
            :ishljs="true"
            :externalLink="externalLink"
            :toolbars="toolbars"
          ></mavon-editor>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AutoForm from "@/components/base/AutoForm";
import { mavonEditor } from "mavon-editor";
import ImageSelect from "@/components/base/ImageSelect";
import Validate from "@/util/Validate";
import DateUtil from "@/util/DateUtil";
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    "image-select": ImageSelect,
    "auto-form": AutoForm,
    "mavon-editor": mavonEditor
  },
  data: () => ({
    title: "",
    isLoading: false,
    dialogMode: false,
    md: mavonEditor,
    codeStyle: "idea",
    externalLink: {
      markdown_css: function() {
        return "/markdown/github-markdown.min.css";
      },
      hljs_js: function() {
        return "/highlightjs/highlight.min.js";
      },
      hljs_css: function(css) {
        return "/highlightjs/styles/" + css + ".min.css";
      },
      hljs_lang: function(lang) {
        return "/highlightjs/languages/" + lang + ".min.js";
      },
      katex_css: false,
      katex_js: false
    },
    toolbars: {
      bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: false, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: false, // 展示html源码
      help: true, // 帮助
      /* 1.3.5 */
      undo: false, // 上一步
      redo: false, // 下一步
      trash: false, // 清空
      save: false, // 保存（触发events中的save事件）
      /* 1.4.2 */
      navigation: false, // 导航目录
      /* 2.1.8 */
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: false, // 单双栏模式
      preview: true // 预览
    },
    categoryMap: new Map(),
    tagMap: new Map(),
    selectedCategories: [],
    selectedTags: [],
    categories: [],
    tags: [],
    imageSrc: "/default_post_edit.jpg",
    headers: [
      {
        text: "文章标题",
        value: "name",
        validate: "required|max:48",
        counter: 48,
        required: true
      },
      {
        text: "文章摘要",
        value: "description",
        validate: "required|max:128",
        counter: 128,
        required: true
      },
      {
        text: "文章分类",
        value: "categories",
        validate: "required",
        required: true
      },
      {
        text: "文章标签",
        value: "tags",
        validate: "required",
        required: true
      }
    ],
    editedItem: {
      name: "",
      description: "",
      thumbnail: "",
      postStatus: 0,
      content: "",
      categories: [],
      tags: [],
      refId: 0,
      active: true
    },
    defaultItem: {
      name: "草稿" + DateUtil.nowDate(),
      description: "",
      thumbnail: "",
      postStatus: 0,
      content: "",
      categories: [],
      tags: [],
      refId: 0,
      active: true
    }
  }),
  watch: {
    $route(to, from) {
      if (to.params.postId == 0) {
        this.title = "新增文章";
      } else {
        this.title = "编辑文章";
      }
      this.selectedCategories.splice(0, this.selectedCategories.length);
      this.selectedTags.splice(0, this.selectedTags.length);
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  },
  created: function() {
    if (this.$route.params.postId != 0) {
      this.title = "编辑文章";
      this.isLoading = true;
      this.loadPost(this.$route.params.postId);
    } else {
      this.title = "新增文章";
      this.selectedCategories.splice(0, this.selectedCategories.length);
      this.selectedTags.splice(0, this.selectedTags.length);
      this.editedItem = Object.assign({}, this.defaultItem);
    }
    this.loadCatetories();
    this.loadTags();
  },
  methods: {
    switchImg: function() {
      this.dialogMode = true;
    },
    selectImage: function(img) {
      this.editedItem.refId = img.id;
      this.imageSrc = img.content;
      this.dialogMode = false;
    },
    removeCategories(item) {
      const index = this.selectedCategories.indexOf(item.id);
      if (index >= 0) {
        this.selectedCategories.splice(index, 1);
      }
    },
    removeTags(item) {
      const index = this.selectedTags.indexOf(item.id);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      }
    },
    loadPost: function(postId) {
      this.$http
        .get("/api/post/load", {
          params: {
            postId: postId
          }
        })
        .then(response => {
          if (response.data.status === "OK") {
            this.editedItem = response.data.datas;
            for (var i = 0; i < this.editedItem.categories.length; i++) {
              this.selectedCategories.push(this.editedItem.categories[i].id);
            }
            for (var j = 0; j < this.editedItem.tags.length; j++) {
              this.selectedTags.push(this.editedItem.tags[j].id);
            }
          } else {
            this.$message.showMsg(this, response.data.msg);
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.$message.showMsg(this, error);
        });
    },
    loadCatetories: function() {
      this.$http
        .get("/api/category/listCategoryForSelect", {
          params: {
            parentId: 1
          }
        })
        .then(response => {
          this.categories = response.data.datas;
          for (var i = 0; i < this.categories.length; i++) {
            let category = this.categories[i];
            this.categoryMap.set(category.id, category);
          }
        })
        .catch(error => {
            this.$message.showMsg(this, error);
        });
    },
    loadTags: function() {
      this.$http
        .get("/api/tag/listTag")
        .then(response => {
          this.tags = response.data.datas;
          for (var i = 0; i < this.tags.length; i++) {
            let tag = this.tags[i];
            this.tagMap.set(tag.id, tag);
          }
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
    },
    async save() {
      this.editedItem.categories.splice(0, this.editedItem.categories.length);
      this.editedItem.tags.splice(0, this.editedItem.tags.length);
      for (var i = 0; i < this.selectedCategories.length; i++) {
        this.editedItem.categories.push(
          this.categoryMap.get(this.selectedCategories[i])
        );
      }
      for (var j = 0; j < this.selectedTags.length; j++) {
        this.editedItem.tags.push(this.tagMap.get(this.selectedTags[j]));
      }
      this.$http
        .post("/api/post/saveOrModify", this.editedItem)
        .then(response => {
          if (response.data.status === "OK") {
            this.editedItem = response.data.datas;
            this.$message.showMsg(this, "操作成功!");
          } else {
            this.$message.showMsg(this, response.data.msg);
          }
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
    },
    async publish() {
      if (this.editedItem.refId == 0) {
        this.$message.showMsg(this, "请选择文章封面图片");
        return;
      }
      if (await Validate.validate(this.$validator, this.headers)) {
        this.editedItem.postStatus = 1;
        this.save();
      }
    }
  }
};
</script>
<style>
#editor {
  margin: auto;
  width: 100%;
  height: 800px;
}
</style>
