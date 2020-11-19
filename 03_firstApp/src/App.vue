<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    let html = document.querySelector("html");
    debugger
    html.style.fontSize = document.documentElement.clientWidth / 19.2 + "px";
    window.onresize = () => {
      this.resizeFont();
    };
  },
  methods: {
    resizeFont() {
      let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
      if (deviceWidth < 1366){
        deviceWidth = 1366;
      }
      document.documentElement.style.fontSize = deviceWidth / 19.2 + "px";
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0.1rem;
  font-size:0.16rem;
}
</style>
