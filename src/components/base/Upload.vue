<template>
  <v-card>
    <v-dialog v-model="confirmDialog" max-width="300">
        <v-card>
            <v-card-text>
            确认删除此文件?
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat="flat" @click="deleteOk">
                确 定
            </v-btn>
            <v-btn color="blue darken-1" flat="flat" @click="deleteCancel">
                取 消
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="processDialog" hide-overlay persistent width="300" >
        <v-card dark>
        <v-card-text>
            上传中，请稍后...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
        </v-card>
    </v-dialog> 
    <v-toolbar flat dark>
        <v-toolbar-title>{{ toolTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <upload-btn multiple title="添 加" :fileChangedCallback="fileChanged" :accept="accpet" small style="margin-right:0px;padding-right:0px;" color="primary">
            <template slot="icon-left">
                <v-icon small style="margin-right:5px;">fa fa-plus-circle</v-icon>
            </template>
        </upload-btn>
        <v-btn color="primary" :disabled="allUploaded" small @click="processDialog=true" :loading="processDialog"><v-icon style="margin-right:5px;" small>fa fa-upload</v-icon>上 传</v-btn>
        <v-btn icon dark @click.native="$emit('close')">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="files" hide-actions>
      <template slot="items" slot-scope="props">
        <td><span>{{ props.item.index }}</span></td>
        <td><span>{{ props.item.file.name }}</span></td>
        <td><span>{{ Math.ceil(props.item.file.size/1024) }}</span></td>
        <td><v-icon small>{{ props.item.status }}</v-icon></td>
        <td>
        <v-icon small class="mr-2" :disabled="props.item.status!=unUpload" @click="showConfirm(props.item)">fa fa-trash</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <p class="subheadline" style="text-align:center;margin-top:20px;">未选择文件</p>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Message from "@/util/Message";
import UploadButton from "vuetify-upload-button";
import axios from "axios";

/**
 * 上传文件类
 * @author liumy2009@126.com
 * @since 2018-11-13 16:15
 */
class UploadFile {
  constructor(file, index, status) {
    this.file = file;
    this.index = index;
    this.status = status;
    this.msg = null;
  }
}

export default {
  props: ["accpet", "toolTitle", "uploadUrl", "thumbnail"],
  watch: {
    processDialog: function(val) {
      if (val) {
        setTimeout(() => {
          this.uploadFile();
        }, 500);
      }
    }
  },
  data: () => ({
    unUpload: "fa fa-times",
    uploaded: "fa fa-check",
    confirmDialog: false,
    processDialog: false,
    editedItem: null,
    headers: [
      { text: "序 号", value: "id" },
      {
        text: "文件名称",
        value: "name",
        width: 600
      },
      {
        text: "大小(KB)",
        value: "size",
        width: 100
      },
      {
        text: "状 态",
        value: "status"
      },
      {
        text: "操 作",
        value: "action"
      }
    ],
    files: []
  }),
  computed: {
    allUploaded: function() {
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i].status === this.unUpload) {
          return false;
        }
      }
      return true;
    }
  },
  components: {
    "upload-btn": UploadButton
  },
  methods: {
    fileChanged(fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList;
        for (var i = 0; i < fileList.length; i++) {
          let file = fileList[i];
          let uploadFile = new UploadFile(file, i + 1, this.unUpload);
          this.files.push(uploadFile);
        }
      }
    },
    async uploadFile() {
      let length = this.files.length;
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let failFiles = [];
      for (var i = 0; i < length; i++) {
        let uploadFile = this.files[i];
        if (uploadFile.status != this.unUpload) {
          continue;
        }
        let formData = new FormData();
        formData.append("thumbnail", this.thumbnail);
        formData.append("token", "abc");
        formData.append("file", uploadFile.file);
        try {
          let response = await axios.post(this.uploadUrl, formData, config);
          if (response.data.status === "OK") {
            uploadFile.status = this.uploaded;
          } else {
            uploadFile.msg = response.data.msg;
            failFiles.push(uploadFile);
          }
        } catch (error) {
          uploadFile.msg = error;
          failFiles.push(uploadFile);
        }
      }
      this.closeProcessDialog(failFiles);
    },
    showConfirm(item) {
      this.editedItem = item;
      this.confirmDialog = true;
    },
    deleteOk() {
      if (this.editedItem) {
        const index = this.files.indexOf(this.editedItem);
        this.files.splice(index, 1);
      }
      this.confirmDialog = false;
    },
    deleteCancel() {
      this.editedItem = null;
      this.confirmDialog = false;
    },
    closeProcessDialog(failFiles) {
      this.processDialog = false;
      if (failFiles.length > 0) {
        let errorMsg = "文件上传失败:";
        for (var i = 0; i < failFiles.length; i++) {
          let uploadFile = failFiles[i];
          errorMsg += uploadFile.file.name + ",失败原因:" + uploadFile.msg;
        }
        Message.showMsg(this, errorMsg);
      } else {
        Message.showMsg(this, "上传成功!");
      }
    }
  }
};
</script>
