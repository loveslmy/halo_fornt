<template>
  <manage :barTitle="'菜单列表'" 
  :headers="headers" 
  :editedItem="editedItem" 
  :defaultItem="defaultItem"
  :queryUrl="'/api/menus/listMenu'"
  :saveUrl="'/api/menus/saveOrModify'" /> 
</template>  
<script>
import Manage from "@/components/Manage";
export default {
  components: {
    manage: Manage
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      {
        text: "菜单名称",
        value: "name",
        counter: 16,
        validate: "required|max:16",
        canEdit: true,
        required: true
      },
      { text: "上级ID", value: "parentId", canEdit: true },
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
        canEdit: true
      },
      {
        type: "select",
        text: "是否展开",
        value: "expanded",
        options: [{ text: "是", value: true }, { text: "否", value: false }],
        canEdit: true
      },
      {
        type: "select",
        text: "状态",
        value: "active",
        options: [
          { text: "有效", value: true },
          { text: "失效", value: false }
        ],
        canEdit: true
      },
      {
        type: "select",
        text: "打开方式",
        value: "target",
        options: [
          { text: "新建窗口", value: "BLANK" },
          { text: "当前窗口", value: "SELF" },
          { text: "父窗口", value: "PARENT" },
          { text: "顶级窗口", value: "TOP" }
        ],
        canEdit: true
      },
      {
        text: "显示序号",
        value: "orderSeq",
        validate: "numeric",
        canEdit: true
      },
      { text: "操作", value: "" }
    ],
    datas: [],
    editedItem: {
      name: "",
      parentId: null,
      icon: "",
      url: "",
      expanded: true,
      orderSeq: 0,
      target: "BLANK"
    },
    defaultItem: {
      name: "",
      parentId: null,
      icon: "",
      url: "",
      expanded: true,
      orderSeq: 0,
      target: "BLANK"
    }
  })
};
</script>
