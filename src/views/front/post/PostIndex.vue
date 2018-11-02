<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs3 d-flex>
        <category :datas="datas"></category>
      </v-flex>
      <v-flex xs9>
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
  </v-container>
</template>

<script>
import Category from "@/components/Category";

export default {
  data: () => ({
    datas: [
      {
        icon: "far fa-clock",
        name: "TimeLine",
        expanded: true,
        children: [
          {
            icon: "fab fa-qq",
            name: "2018",
            expanded: true,
            children: [
              {
                icon: "fa-qq",
                name: "12"
              }
            ]
          },
          { icon: "fa-telegram", name: "2017" }
        ]
      },
      {
        icon: "fas fa-atom",
        name: "Technologies",
        expanded: true,
        children: [
          { icon: "fab fa-java", name: "Java" },
          { icon: "fab fa-linux", name: "Linux" }
        ]
      }
    ]
  }),
  components: {
    category: Category
  }
};
</script>