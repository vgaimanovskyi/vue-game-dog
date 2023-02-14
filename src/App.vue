<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/dog">Dog</router-link> |
    <router-link to="/layer">Layer</router-link> |
    <router-link to="/npc">NPC</router-link> |
    <router-link to="/shooter">Shooter</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
