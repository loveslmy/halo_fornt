<template>
  <v-layout row wrap>
    <data-table tableTitle="站点列表" :headers="headers" :datas="datas" 
    :showOp="true" @newItem="newItem" @editItem="editItem" @loadData="loadData"></data-table>
  </v-layout>  
</template>  

<script>
import axios from "axios";
import DataTable from "@/components/base/DataTable";
import Message from "@/util/Message";
export default {
  created: function() {
    this.loadData();
  },
  components: {
    "data-table": DataTable
  },
  methods: {
    editItem: function(item) {},
    newItem: function() {},
    loadData: function() {
      axios
        .get("/api/site/listSite")
        .then(response => {
          this.datas = response.data.datas;
        })
        .catch(error => {
          Message.showMsg(this, error.response.data);
        });
    }
  },
  data: () => ({
    categorys: [],
    headers: [
      { text: "操作", value: "op", sortable: false },
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
        type: "select",
        text: "站点分类",
        value: "categoryId",
        tableDisable: true,
        required: true,
        canEdit: true,
        options: [{ text: "有效", value: true }, { text: "失效", value: false }]
      },
      {
        text: "缩略图",
        value: "refId",
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
    datas: []
  })
};
</script>
