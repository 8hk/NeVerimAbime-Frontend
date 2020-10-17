<template>
  <main class="container ">
    <div class="loading" v-if="loading">
      <img class="loading-icon" src="../assets/loading.gif">
    </div>
    <div v-else>
      <div>
        <div class="col-12 text-center my-3">
          <h2 class="mb-3 display-4 text-uppercase">{{ recipe.name }}</h2>
        </div>
        <div class="col-md-6 mb-4">
        </div>
        <div>
          <form @submit.prevent="submitRecipe">
            <b-form-group>
              <div class="form-group">
                <label for>Recipe Name</label>
                <input type="text" class="form-control" v-model="recipe.name">
              </div>
            </b-form-group>
            <b-form-group>
              <div>
                <b-dropdown id="dropdown-1"
                            text="Cuisine"
                            class="m-md-2"
                            variant="outline-warning">
                  <b-dropdown-item v-for="(cuisine) in cuisines"
                                   :key="cuisine"
                                   :value="cuisine"
                                   @click="recipe.cuisine = cuisine">{{cuisine}}
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                </b-dropdown>
              </div>
              <br>
              <div>
                <b-alert show variant="success">{{"Cuisine: "+recipe.cuisine }}</b-alert>
              </div>
            </b-form-group>
            <b-form-group>
              <div class="form-group">
                <label for>Preparation</label>
                <input type="text" v-model="recipe.preparation" class="form-control" name="preparation">
              </div>
            </b-form-group>
            <b-form-group>
              <div class="form-group">
                <label for>Preparation Time in Minutes</label>
                <input type="text" v-model="recipe.prep_time" class="form-control" name="preparation_time">
              </div>
              <b-form-group>
                <div class="form-group">
                  <div>
                    <b-dropdown id="dropdown-1"
                                text="Difficulty"
                                class="m-md-2"
                                variant="outline-warning">
                      <b-dropdown-item @click="recipe.difficulty = 'Easy'" href="#">Easy</b-dropdown-item>
                      <b-dropdown-item @click="recipe.difficulty = 'Medium'" href="#">Medium</b-dropdown-item>
                      <b-dropdown-item @click="recipe.difficulty = 'Hard'" href="#">Hard</b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <br>
                  <div>
                    <b-alert show variant="success">{{"Difficulty: "+recipe.difficulty }}</b-alert>
                  </div>
                </div>
              </b-form-group>


            </b-form-group>
            <b-form-group>
              <div class="form-group">
                <label>Search Ingredient:</label>
                <input type="text" v-model="searchNutrient.name" required>
                <b-button class="mt-2" variant="outline-warning" @click="startProcess">Search Ingredient</b-button>
                <b-modal id="ingredient-list" hide-footer>
                  <template v-slot:modal-title>
                    Choose an Ingredient from List
                  </template>
                  <div v-for="(nutrient,counter) in usdaResponseNutrients" v-bind:key="counter" id="usdaSearchDiv">

                    <b-button v-if="nutrient.name!=''" class="mt-2" variant="outline-warning"
                              v-b-popover.hover.top="'Energy: '+nutrient.energy"
                              @click="addNutrient(counter)" id="usdaSearchButtons">
                      {{nutrient.name +' '+nutrient.additionalDescription}}
                    </b-button>
                  </div>
                  <b-button class="mt-3" block @click="$bvModal.hide('ingredient-list')">Close Me</b-button>
                </b-modal>
                <br>
                <label for>Ingredients</label>
                <br>
                <br>
                <b-alert show variant="success">{{"Total Calories: "+totalCalories }}</b-alert>
                <div class="previous"
                     v-for="(nutrient, counter) in recipe.ingredients" v-if="nutrient.name!=''"
                     v-bind:key="counter">
                  <img :src="nutrient.imgurl" v-if="nutrient.imgurl!=''" width="100">
                  <b-button v-if="nutrient.name!=''" class="mt-2" variant="danger"
                            v-b-popover.hover.top="nutrient.detail"
                            @click="deleteNutrient(counter)" id="insertedIngredients">
                    {{recipe.ingredients[counter].name + ' Energy: '+ recipe.ingredients[counter].energy}}
                  </b-button>
                  <br>
                  <br>
                  <b-form-group v-if="nutrient.name!=''"
                                label-cols-sm="3"
                                label="Quantity:"
                                label-align-sm="right"
                                label-for="nested-quantity">
                    <b-form-input v-if="nutrient.name!=''"
                                  v-model="nutrient.quantity"
                                  type="number" min="0.00"
                                  step="0.05"
                                  id="nutrient-quantity"
                                  @change="quantityUpdateCalories()"
                    ></b-form-input>
                  </b-form-group>
                  <b-dropdown id="dropdown-dropright" dropright
                              text="Choose Portion"
                              variant="outline-warning">
                    <b-dropdown-item v-for="(portion) in nutrient.portions"
                                     v-if="portion[4]!='Quantity not specified'"
                                     @click="updateQuantityField(portion[3],counter)">
                      {{portion[4]}}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div>
                  <label for="tags-remove-on-delete">Enter new tags separated by space</label>
                  <b-form-tags
                    input-id="tags-remove-on-delete"
                    tag-variant="success"
                    :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                    v-model="recipe.tags"
                    separator=" "
                    placeholder="Enter new tags separated by space"
                    remove-on-delete
                    no-add-on-enter
                    class="mb-2"
                  ></b-form-tags>
                  <b-form-text id="tags-remove-on-delete-help">
                    Press <kbd>Backspace</kbd> to remove the last tag entered
                  </b-form-text>
                </div>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </b-form-group>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import jsonToFormData from 'json-form-data';

  export default {
    name: "ingredientcreation",
    loading: false,
    data() {
      return {
        recipe: {
          name: "",
          preparation: "",
          // caloriesPerUnit: "",
          unitType: "",
          ingredients: [{
            name: "",
            fdcID: "",
            energy: "",
            quantity: 100,
            portions: [],
            detail: "",
            additionalDescription: "",
            imgurl: ""
          }],
          user: "",
          // recipeUuid: "",
          totalCalories: 0,
          cuisine: "",
          tags: [],
          prep_time: "",
          difficulty: ""
        },
        totalCalories: 0,
        usdaResponseNutrients: [
          {
            name: "",
            detail: "",
            fdcID: "",
            energy: "",
            additionalDescription: ""
          }
        ],
        searchNutrient: {
          name: ""
        },
        nutrients: {
          name: ""
        },
        savedNutrients: [
          {
            name: "",
            fdcID: "",
            energy: "",
            quantity: 100
          }
        ],
        cuisines: [],
        loading: true
      }
    },
    methods: {
      updateQuantityField(gram, counter) {
        this.recipe.ingredients[counter].quantity = gram;
        this.quantityUpdateCalories();
      },
      async quantityUpdateCalories() {
        this.totalCalories = 0;
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          this.totalCalories = this.totalCalories + ((this.recipe.ingredients[i].quantity / 100) * this.recipe.ingredients[i].energy);

        }
        this.recipe.totalCalories = this.totalCalories;
      },
      async addNutrient(counter) {
        this.$axios.get('/api/recipe/getportions/', {
          params: {
            fdcId: this.usdaResponseNutrients[counter].fdcID,
            searchNutrient: this.searchNutrient.name
          }
        }).then((resp) => {
          // console.log("response: " + resp);
          // console.log("response data: " + resp.data);
          // this.recipe = resp.data;

          this.recipe.ingredients.push({
            name: this.usdaResponseNutrients[counter].name,
            fdcID: this.usdaResponseNutrients[counter].fdcID,
            energy: this.usdaResponseNutrients[counter].energy,
            portions: resp.data['portions'],
            detail: this.usdaResponseNutrients[counter].detail,
            additionalDescription: this.usdaResponseNutrients[counter].additionalDescription,
            imgurl: resp.data['image_url']
          })
          this.totalCalories = this.totalCalories + (0 / 100) * this.usdaResponseNutrients[counter].energy;
          this.recipe.totalCalories = this.totalCalories;
          while (this.usdaResponseNutrients.length) {
            this.usdaResponseNutrients.pop();
          }
          this.$bvModal.hide('ingredient-list');
        });
      },
      async deleteNutrient(counter) {
        await this.recipe.ingredients.splice(counter, 1);
        await this.quantityUpdateCalories();
      },
      async submitIngredient() {
        const config = {
          headers: {"content-type": "application/json"}
        };
        let formData = new FormData();
        for (let data in this.recipe) {
          formData.append(data, this.recipe[data]);
        }
        try {
          let response = await this.$axios.$post("/api/ingredient/", formData, config);
          this.$router.push("/ingredient/");
        } catch (e) {
          // console.log(e);
        }
      },
      async fetchIngredient() {
        const params = new URLSearchParams();
        params.append('q', this.searchNutrient.name);
        await this.$axios.get('/api/ingredientsearch', {
          params: {
            q: this.searchNutrient.name
          }
        })
          .then((response) => {
            // console.log(response.data);
            for (let i = 0; i < response.data['ingredients'].length; i++) {
              this.usdaResponseNutrients.push({
                name: response.data['ingredients'][i][1],
                detail: response.data['ingredients'][i][response.data['ingredients'][i].length - 4],
                fdcID: response.data['ingredients'][i][0],
                energy: response.data['ingredients'][i][response.data['ingredients'][i].length - 1],
                additionalDescription: response.data['ingredients'][i][2]
              });
            }
          });
      },
      startProcess: async function () {
        /* call two methods. */
        // this.$nuxt.$loading.start();
        this.$toast.show("Ingredient Fetching", {icon: "ingredient"});
        await this.fetchIngredient();
        this.$bvModal.show('ingredient-list');
        this.$nuxt.$loading.finish();
      },
      async submitRecipe() {
        const config = {
          headers: {"content-type": "application/json"}
        };
        var options = {
          initialFormData: new FormData(),
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping: function (value) {
            if (typeof value === 'boolean') {
              return +value ? '1' : '0';
            }
            return value;
          }
        };
        var formData = jsonToFormData(this.recipe, options);
        var _this=this;
        try {
          // console.log("formdata: " + formData);
          this.$toast.show("Recipe Creation Process Started", {icon: "recipe"});
          let response = await this.$axios.$post("/api/recipe/", this.recipe, config).then(resp => {
            // console.log("response:" + resp);
            this.$toast.show("Recipe Creation Process Finished", {icon: "recipe"});
            this.$router.push({path: `/recipeviewer/?uuid=${resp}`})
          })
            .catch(function (error) {
              _this.$toast.show("Recipe Creation Failed", {icon: "recipe"});
              if (error.response) {
                // console.log(error.response)
              }
            });
        } catch
          (e) {
          // console.log(e);
        }
      }
      ,
    },
    mounted() {
      // this.$nuxt.$loading.start();
      this.$axios.get('/api/recipe/getcusines/').then((cuisines) => {
        this.cuisines = cuisines.data;
        this.loading = false;
        setTimeout(() => this.$nuxt.$loading.finish(), 5000)
      })
    }
  }
</script>

<style scoped>
  span {
    width: 30px;
    float: right;
    cursor: pointer;
  }

  span:hover {
    color: brown;
  }

  .form-group {
    width: 300px;
  }

  .previous {
    border: 1.5px solid;
    padding: 5px;
    margin-bottom: 40px;
    width: 300px;
    color: orangered;
  }
</style>
