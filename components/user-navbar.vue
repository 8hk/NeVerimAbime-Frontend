<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">Ne Verim Abime?</b-navbar-brand>
      <!--      <b-nav-form @submit.prevent="search">-->
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="query" @keydown.native="eventListener" @keypress="eventListener"
                      ></b-form-input>
        <nuxt-link :to="`/search/?query=${query}`" class="btn btn-sm btn-success"> Search</nuxt-link>
        <!--        <b-button size="sm" class="my-2 my-sm-0" variant="success" type="submit">Search</b-button>-->
      </b-nav-form>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <div>
        <b-button @click="recipes" variant="success">Recipes</b-button>
      </div>
      <div v-if="currentUser.foodProvider ===true">
        <b-button @click="menus" variant="success">Menus</b-button>
      </div>
      <div>
        <b-button @click="showFollowers" variant="success">User List</b-button>
      </div>
      <div>
        <b-button @click="showProfile" variant="success">Profile</b-button>
      </div>
      <div>
        <b-button @click="showCalendar" variant="success">Recipe Calendar</b-button>
      </div>
      <div>
        <b-button @click="createRecipe" variant="success">Create Recipe</b-button>
      </div>
      <div v-if="currentUser.foodProvider ===true">
        <b-button @click="createMenu" variant="success">Create Menu</b-button>
      </div>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="m-lg-auto">
          <loginbutton></loginbutton>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


  </div>
</template>

<script>
  import loginbutton from './loginbutton'

  export default {
    name: "user-navbar",
    components: {
      loginbutton
    },

    methods: {
      recipes() {
        this.$router.push("/recipes/");
      },
      showFollowers() {
        this.$router.push("/userlist/");
      },
      showProfile() {
        // this.$router.push("/profile/");
        this.$router.push({path: `/user/?id=${this.currentUser.id}`});
      },
      createRecipe() {
        this.$router.push("/createrecipe/");
      },
      createMenu() {
        this.$router.push("/createmenu/");
      },
      menus() {
        this.$router.push({path: `/user/menulist/?id=${this.currentUser.id}`});
      },
      showCalendar() {
        this.$router.push("/calendar/");
      },
      eventListener(event) {
        //enter key
        if (event.which === 13) {
           this.$router.push({path: `/search/?query=${this.query}`});
        }
      }

    },
    data() {
      return {
        query: "",
        searchResult: [],
        currentUser: {}
      }
    },
    async mounted() {
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
        // console.log("current food provider:" + this.currentUser.foodProvider)
      });
    }
  }


</script>

<style scoped>

</style>
