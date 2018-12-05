<template>
  <manage
    :tableTitle="'标签列表'"
    :headers="headers"
    :defaultItem="defaultItem"
    :queryUrl="'/api/tag/listTag'"
    :saveUrl="'/api/tag/saveOrModify'"
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
        text: "标签名称",
        value: "name",
        counter: 32,
        validate: "required|max:32",
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
      icon: "",
      active: true
    }
  })
};
</script>
