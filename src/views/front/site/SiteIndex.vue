<template>
    <div>
        <v-alert v-model="alertShow" outline dismissible :type="alterType">{{ message }}</v-alert>
        <v-layout row wrap>
            <v-flex xs3 offset-xs1 d-flex>
                <category :datas="datas"></category>
            </v-flex>
            <v-flex xs8>
                <v-container fluid my-0 py-0>
                <v-layout row wrap>
                    <v-flex xs5 mx-4>
                    <v-card>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"></v-img>

                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                        </div>
                        </v-card-title>

                        <v-card-actions>
                        <v-btn flat color="blue">Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-flex>
                    <v-flex xs5 mx-4>
                    <v-card>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"></v-img>
                        <v-card-title primary-title>
                        <div>
                            <h5 class="headline mb-0">Kangaroo Valley Safari</h5>
                            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                        </div>
                        </v-card-title>
                        <v-card-actions>
                        <v-btn flat color="blue">Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-flex>
                    <v-flex xs5 mx-4 my-4>
                    <v-card>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"></v-img>

                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                        </div>
                        </v-card-title>

                        <v-card-actions>
                        <v-btn flat color="blue">Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-flex>
                    <v-flex xs5 my-4 mx-4>
                    <v-card>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"></v-img>

                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                        </div>
                        </v-card-title>

                        <v-card-actions>
                        <v-btn flat color="blue">Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import axios from "axios";
import Category from "@/components/Category";
export default {
  components: {
    category: Category
  },
  created() {
    this.loadData();
  },
  data: () => ({
    alertShow: false,
    message: "",
    alterType: "error",
    datas: []
  }),
  methods: {
    loadData: function() {
      axios
        .get("/api/category/findByParentId", {
          params: { parentId: 0 }
        })
        .then(response => {
          this.datas = response.data.datas;
        })
        .catch(error => {
          this.alterType = "error";
          this.message = error.response.data;
          this.alertShow = true;
        });
    }
  }
};
</script>
