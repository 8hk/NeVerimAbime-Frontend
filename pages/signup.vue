<template>
  <div>
    <welcome-navbar></welcome-navbar>
    <registerpage></registerpage>
  </div>
</template>

<script>
  import loginbutton from "../components/loginbutton";
  import WelcomeNavbar from "../components/welcome-navbar";
  import Registerpage from "../components/registerpage";

  export default {
    name: "signup",
    components: {
      loginbutton, WelcomeNavbar, Registerpage
    },
  }
</script>

<style scoped>

</style>
