<template>
  <div>
    <v-alert v-model="alertShow" dismissible :type="alterType">{{ message }}</v-alert>
    <v-toolbar flat dark>
      <v-toolbar-title>菜单列表</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" fab dark>
          <v-icon>fas fa-plus-circle</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="菜单名称"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.parentId" label="上级ID"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.icon" label="图 标"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.expanded" label="是否展开"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.orderSeq" label="显示序号"></v-text-field>
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
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.parentId }}</td>
        <td class="text-xs-left">{{ props.item.icon }}</td>
        <td class="text-xs-left">{{ props.item.url }}</td>
        <td class="text-xs-left">{{ props.item.expanded }}</td>
        <td class="text-xs-left">{{ props.item.orderSeq }}</td>
        <td>
          <v-icon small class="mr-2" @click="editItem(props.item)">
            fas fa-edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            fas fa-trash-alt
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data: () => ({
      alertShow: false,
      message: '',
      alterType: 'error',
      dialog: false,
      headers: [
        {text: 'ID', value: 'id'},
        {text: '菜单名称', value: 'name'},
        {text: '上级ID', value: 'parentId'},
        {text: '图 标', value: 'icon'},
        {text: 'URL', value: 'url'},
        {text: '是否展开', value: 'expanded'},
        {text: '显示序号', value: 'orderSeq'},
        {text: '操作', value: ''}
      ],
      datas: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        parentId: null,
        icon: '',
        url: '',
        expanded: true,
        orderSeq: 0,
        target: 'BLANK'
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '新增' : '修改';
      }
    },

    watch: {
      dialog(val) {
        val || this.close();
      }
    },

    created() {
      this.initialize();
    },

    methods: {
      initialize() {
        axios
          .get('/api/menus/listMenu')
          .then(response => {
            this.datas = response.data.datas;
          })
          .catch(error => {
            this.alterType = 'error';
            this.message = error.response.data;
            this.alertShow = true;
          });
      },

      editItem(item) {
        this.editedIndex = this.datas.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        const index = this.datas.indexOf(item);
        confirm('Are you sure you want to delete this item?') &&
        this.datas.splice(index, 1);
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },
      save() {
        axios.post('/api/menus/saveOrModify', this.editedItem)
          .then(response => {
            if (response.data.status === 'OK') {
              this.editedItem = response.data.datas;
              if (this.editedIndex > -1) {
                Object.assign(this.datas[this.editedIndex], this.editedItem);
              } else {
                this.datas.push(this.editedItem);
              }
              this.close();
              this.alterType = 'success';
            } else {
              this.alterType = 'error';
            }
            this.message = '操作成功!';
            this.alertShow = true;
            setTimeout(() => {
              this.alertShow = false;
            }, 1000);
          })
          .catch(error => {
            this.alterType = 'error';
            this.message = error.response.data;
            this.alertShow = true;
            setTimeout(() => {
              this.alertShow = false;
            }, 1000);
          });
      }
    }
  };
</script>
