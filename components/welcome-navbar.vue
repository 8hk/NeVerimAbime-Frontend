<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">Ne Verim Abime?</b-navbar-brand>
      <div>
        <loginbutton></loginbutton>
      </div>
      <div>
        <b-button @click="signup" variant="success">Signup</b-button>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  import loginbutton from './loginbutton'
 import WelcomeNavbar from "../components/welcome-navbar";
  export default {
    name: "welcome-navbar",
    components: {
      loginbutton,WelcomeNavbar
    },

    methods: {
      signup() {
        this.$router.push("/signup/");
      },
    },

  }


</script>

<style scoped>

</style>
