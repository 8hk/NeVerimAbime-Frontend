<template>
  <main class="container ">
    <template class="loading" v-if="loading">
      <img class="loading-icon" src="../assets/loading.gif">
    </template>
    <template v-else>

      <form @submit.prevent="submitMenu">
        <b-form-group>
          <div class="form-group">
            <label for>Menu Name</label>
            <input type="text" class="form-control" v-model="menu.name">
          </div>
        </b-form-group>
        <b-form-group>
          <div>
            <!--                 @click="menu.cuisine = cuisine">-->
            <b-dropdown id="dropdown-1"
                        text="Recipes"
                        class="m-md-2"
                        variant="outline-warning">
              <b-dropdown-item v-for="(recipe,counter) in recipes"
                               v-bind:key="counter"
                               :key="recipe"
                               :value="recipe"
                               @click="addRecipe(counter)">
               Recipe: {{recipe.name}} - Owner: {{recipe.user.username}}
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
            </b-dropdown>
          </div>
          <br>

        </b-form-group>

        <b-form-group>

          <div class="form-group">
            <template v-if="selectedMealItems.length>0">
              <template v-for="(meal,counter) in selectedMealItems">
                <div v-bind:key="counter" class="form-group">
                  <h4>{{meal.name}}</h4>
                  <!-- name-->
                  <b-input-group size="lg" prepend="Name" >
                    <b-form-input v-model="menu.createMealItems[counter].name"></b-form-input>
                  </b-input-group>


                  <!-- price-->
                  <b-input-group size="lg" prepend="Price($)" append=".00" >
                    <b-form-input v-model="menu.createMealItems[counter].price"></b-form-input>
                  </b-input-group>

                  <!-- amount-->
                  <b-input-group size="lg" prepend="Amount(gr)" >
                    <b-form-input v-model="menu.createMealItems[counter].amount"></b-form-input>
                  </b-input-group>

                  <!-- description-->
                  <h3>Description</h3>
                  <b-form-textarea class="form-control" rows="3" max-rows="18"
                                   v-model="menu.createMealItems[counter].description"/>


                  <h4>{{meal.uuid}}</h4>
                </div>
              </template>
            </template>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </b-form-group>
      </form>
    </template>
  </main>
</template>

<script>
  import jsonToFormData from 'json-form-data';

  export default {
    name: "menucreation",
    loading: false,
    data() {
      return {
        selectedMealItems: [],
        recipes: [{
          user:{}
        }],
        menu: {
          name: "",
          createMealItems: [{
            name: "",
            recipe: "",
            amount: "",
            price: "",
            description: ""
          }],
        },
        loading: true
      }
    },
    methods: {
      async addRecipe(counter) {
        this.selectedMealItems.push(this.recipes[counter]);
        // this.menu.createMealItems.recipe=this.recipes[counter].uuid;
        this.menu.createMealItems.push({
          name:"",
          recipe:"",
          amount:"",
          price: "",
          description: ""
          }
        )
        this.menu.createMealItems[this.selectedMealItems.length-1].recipe=this.recipes[counter].uuid;
      },
      async submitMenu() {
        const config = {
          headers: {"content-type": "application/json"}
        };
        var _this = this;
        try {
          this.$toast.show("Menu Creation Process Started", {icon: "menu"});
          let response = await this.$axios.$post("/api/menu/", this.menu, config).then(resp => {
            // console.log("response:" + resp);
            this.$toast.show("Menu Creation Process Finished", {icon: "Menu"});
            this.$router.push({path: `/menuviewer/?uuid=${resp}`})
          })
            .catch(function (error) {
              _this.$toast.show("Menu Creation Failed", {icon: "Menu"});
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
      this.$axios.get('/api/recipe/getallrecipes/').then((recipes) => {
        this.recipes = recipes.data;
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
    width: 600px;
  }

  .previous {
    border: 1.5px solid;
    padding: 5px;
    margin-bottom: 40px;
    width: 300px;
    color: orangered;
  }
</style>
