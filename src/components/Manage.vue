<template>
  <v-layout row wrap>
    <data-table :tableTitle="tableTitle" 
      :headers="headers" :datas="datas" @newItem="newItem" 
      @editItem="editItem" @loadData="loadData"></data-table>
    <v-dialog persistent v-model="dialog" max-width="60%">
      <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
            <auto-form v-if="dialog" :headers="headers" :editedItem="editedItem"></auto-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
          <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import AutoForm from "@/components/base/AutoForm";
import DataTable from "@/components/base/DataTable";
import Message from "@/util/Message";
import axios from "axios";
export default {
  created: function() {
    this.loadData();
  },
  components: {
    "data-table": DataTable,
    "auto-form": AutoForm
  },
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    datas: [],
    newOp: true,
    dialog: false,
    editedItem: null
  }),
  props: [
    "tableTitle",
    "headers",
    "defaultItem",
    "queryUrl",
    "queryParam",
    "saveUrl"
  ],
  computed: {
    formTitle() {
      return this.newOp ? "新增" : "修改";
    }
  },
  methods: {
    loadData: function() {
      axios
        .get(this.queryUrl, { params: this.queryParam })
        .then(response => {
          this.datas = response.data.datas;
        })
        .catch(error => {
          Message.showMsg(this, error.response.data);
        });
    },
    newItem: function() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
      this.newOp = true;
    },
    editItem: function(item) {
      this.newOp = false;
      this.editedItem = item;
      this.dialog = true;
    },
    close: function() {
      this.dialog = false;
    },
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post(this.saveUrl, this.editedItem)
            .then(response => {
              if (response.data.status === "OK") {
                this.editedItem = response.data.datas;
                if (this.newOp) {
                  this.datas.push(this.editedItem);
                }
                this.close();
                Message.showMsg(this, "操作成功!");
              } else {
                Message.showMsg(this, response.data.msg);
              }
            })
            .catch(error => {
              Message.showMsg(this, error.message);
            });
        }
      });
    }
  }
};
</script>