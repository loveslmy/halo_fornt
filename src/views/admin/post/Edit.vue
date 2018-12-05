<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="title font-weight-medium">编辑文章</v-card-title>
        <v-dialog v-model="dialogMode" persistent max-width="60%">
          <image-select @imageSelect="selectImage"></image-select>
        </v-dialog>
        <v-form>
          <v-layout>
            <v-flex xs6 mx-3>
              <v-text-field
                v-model="editedItem[headers[0].value]"
                :v-validate="headers[0].validate"
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
                v-model="editedItem.categories"
                :items="categories"
                box
                chips
                label="文章分类"
                item-text="name"
                item-value="id"
                multiple
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
                v-model="editedItem.tags"
                :items="tags"
                box
                chips
                label="文章标签"
                item-text="name"
                item-value="id"
                multiple
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
          <v-btn color="orange">
            <v-icon left>fa fa-paper-plane</v-icon>发布
          </v-btn>
        </v-card-actions>
        <div id="editor">
          <mavon-editor
            v-model="content"
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
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    "image-select": ImageSelect,
    "auto-form": AutoForm,
    "mavon-editor": mavonEditor
  },
  data: () => ({
    dialogMode: false,
    md: mavonEditor,
    content: "",
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
    categories: [],
    tags: [],
    imageSrc: "/default_post_edit.jpg",
    panel: [true],
    headers: [
      {
        text: "文章标题",
        row: "true",
        value: "name",
        counter: 48,
        validate: "required|max:48",
        required: true
      },
      {
        type: "textarea",
        text: "文章摘要",
        value: "description",
        validate: "required|max:128",
        counter: 128
      }
    ],
    editedItem: {
      name: "",
      description: "",
      thumbnail: "",
      categories: [],
      tags: [],
      content: "",
      refId: 0,
      active: true
    }
  }),
  created: function() {
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
      const index = this.editedItem.categories.indexOf(item.id);
      if (index >= 0) this.editedItem.categories.splice(index, 1);
    },
    removeTags(item) {
      const index = this.editedItem.tags.indexOf(item.id);
      if (index >= 0) this.editedItem.tags.splice(index, 1);
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
        })
        .catch(error => {
          this.$message.showMsg(
            this,
            error.response.status + ":" + error.response.data
          );
        });
    },
    loadTags: function() {
      this.$http
        .get("/api/tag/listTag")
        .then(response => {
          this.tags = response.data.datas;
        })
        .catch(error => {
          this.$message.showMsg(
            this,
            error.response.status + ":" + error.response.data
          );
        });
    },
    save: function() {
      // console.log(this.md);
      // console.log(this.content);
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