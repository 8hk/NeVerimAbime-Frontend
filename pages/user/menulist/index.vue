<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <p> {{ this.$auth.user.email }}</p>
    <template v-for="(menu,counter) in menus">
      <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <menu-card :menu="menu"></menu-card>
      </div>
    </template>

  </div>
</template>

<script>
  import MenuCard from "~/components/MenuCard.vue";
  import {mapGetters, mapState} from "vuex";
  import UserNavbar from "~/components/user-navbar";

  export default {
    name: "index.vue",
    data() {
      return {
        menus: [],
        currentUser: {}
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    async mounted() {
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
      });
      this.$axios.get('/api/menu/getmenus', {
          params: {
            id: this.$nuxt.$route.query.id
          }
        }
      ).then((resp) => {
        this.menus = resp.data;
      });
    }, components: {
      MenuCard, UserNavbar
    },
  }
</script>

<style scoped>

</style>
