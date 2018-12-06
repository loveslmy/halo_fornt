<template>
  <manage
    :tableTitle="this.$route.params.parentId==1?'文章分类列表':'收藏站点分类列表'"
    :headers="headers"
    :defaultItem="defaultItem"
    :queryUrl="'/api/category/listCategory?parentId='+this.$route.params.parentId"
    saveUrl="/api/category/saveOrModify"
  />
</template>  
<script>
import Manage from "@/components/Manage";
export default {
  components: {
    manage: Manage
  },
  data: () => ({
    headers: [
      { text: "操作", value: "op", sortable: false },
      { text: "ID", value: "id" },
      {
        text: "序 号",
        value: "orderSeq",
        validate: "numeric",
        canEdit: true
      },
      {
        text: "分类名称",
        value: "name",
        counter: 32,
        validate: "required|max:32",
        required: true,
        canEdit: true
      },
      {
        text: "上级ID",
        value: "parentId",
        validate: "numeric",
        required: true,
        canEdit: true
      },
      {
        text: "图 标",
        value: "icon",
        counter: 64,
        validate: "max:64",
        canEdit: true
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
        text: "是否展开",
        value: "expanded",
        validate: "required",
        canEdit: true,
        options: [{ text: "是", value: true }, { text: "否", value: false }]
      },
      {
        type: "select",
        text: "状态",
        value: "active",
        validate: "required",
        canEdit: true,
        options: [{ text: "有效", value: true }, { text: "失效", value: false }]
      },
      { text: "更新时间", value: "updDate" }
    ],
    datas: [],
    defaultItem: {
      name: "",
      parentId: null,
      icon: "",
      url: "",
      expanded: true,
      orderSeq: 0,
      active: true
    }
  })
};
</script>
