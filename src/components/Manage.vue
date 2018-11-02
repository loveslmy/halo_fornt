<template>
  <div>
    <v-alert v-model="alertShow" outline dismissible :type="alterType">{{ message }}</v-alert>
    <v-toolbar flat dark>
        <v-toolbar-title>{{ barTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog persistent v-model="dialog" max-width="600">
            <v-btn slot="activator" color="primary" small fab dark>
                <v-icon>fas fa-plus-circle</v-icon>
            </v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap> 
                            <v-flex xs12 sm6 md4 v-for="header in headers" 
                                :key="header.value" v-if="header.canEdit">
                                <v-select v-if="header.type==='select'"
                                    no-data-text='没有数据'
                                    v-model="editedItem[header.value]" 
                                    :items="header.options" 
                                    v-validate="header.validate"
                                    :data-vv-name="header.text"
                                    :error-messages="errors.collect(header.text)"
                                    :label="header.text" :required="header.required">
                                </v-select>
                                <v-text-field v-else v-model="editedItem[header.value]" 
                                    v-validate="header.validate"
                                    :data-vv-name="header.text"
                                    :counter="header.counter"
                                    :error-messages="errors.collect(header.text)"
                                    :label="header.text" :required="header.required">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="datas" hide-actions>
      <template slot="items" slot-scope="props">
        <td v-for="(header,index) in headers" :key="header.value" v-if="index!=(headers.length-1)">
          <template v-if="headers[index].value=='icon' && props.item[headers[index].value]">
              <v-icon small>{{ props.item[headers[index].value] }}</v-icon>
          </template>
          <span v-else>
            {{ props.item[headers[index].value] }}
          </span>
        </td>
        <td>
          <v-icon small class="mr-2" @click="editItem(props.item)">fas fa-edit</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="loadData">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  $_veeValidate: {
    validator: "new"
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  data: () => ({
    datas: [],
    alertShow: false,
    message: "",
    alterType: "error",
    dialog: false,
    editedIndex: -1
  }),
  props: [
    "barTitle",
    "headers",
    "editedItem",
    "defaultItem",
    "queryUrl",
    "saveUrl"
  ],
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新增" : "修改";
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(this.queryUrl)
        .then(response => {
          this.datas = response.data.datas;
        })
        .catch(error => {
          this.alterType = "error";
          this.message = error.response.data;
          this.alertShow = true;
        });
    },
    editItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.$parent.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.$parent.editedItem = Object.assign({}, this.$parent.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post(this.saveUrl, this.editedItem)
            .then(response => {
              if (response.data.status === "OK") {
                this.$parent.editedItem = response.data.datas;
                if (this.editedIndex > -1) {
                  Object.assign(
                    this.datas[this.editedIndex],
                    this.$parent.editedItem
                  );
                } else {
                  this.datas.push(this.$parent.editedItem);
                }
                this.close();
                this.alterType = "success";
                this.message = "操作成功!";
              } else {
                this.alterType = "error";
                this.message = response.data.msg;
              }
              this.alertShow = true;
              setTimeout(() => {
                this.alertShow = false;
              }, 3000);
            })
            .catch(error => {
              this.alterType = "error";
              this.message = error.message;
              this.alertShow = true;
              setTimeout(() => {
                this.alertShow = false;
              }, 3000);
            });
        }
      });
    }
  }
};
</script>