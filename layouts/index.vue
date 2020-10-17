<template>

  <div>
    <welcome-navbar></welcome-navbar>
    <!--    <nuxt/>-->
    <b-row class="my-4">

      <b-col sm="10">
        <div class="ss search-level">
          <b-input-group
            v-for="size in ['lg']"
            :key="size"
            :size="size"
            class="mb-3"
          >
            <b-form-input placeholder="Search Recipe, Tag, Ingredient or Menu" id="input-large" v-model="query"></b-form-input>
            <b-input-group-append>
              <nuxt-link :to="`/search/?query=${query}`" class="btn btn-sm btn-success">
                <b-button size="sm" text="Button" variant="success">Search</b-button>
              </nuxt-link>
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-col>

    </b-row>
  </div>

</template>

<style>
  .search-level {
    width: 600px;
    top: 600px;
    position: center;
    margin: 250px 200px;
  }

</style>
<script>
  import Loginbutton from "../components/loginbutton";
  import Nutrientcreation from "../components/nutrientcreation";
  import Ingredientcreation from "../components/recipecreation";
  import RegisterPage from "../components/registerpage";

  import WelcomeNavbar from "../components/welcome-navbar";

  export default {
    components: {Ingredientcreation, Nutrientcreation, Loginbutton, RegisterPage, WelcomeNavbar},
    data() {
      return {
        query: "",
      }
    },
  }
</script>
