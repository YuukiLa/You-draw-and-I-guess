<template>
  <div>
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  .content {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  .center-card {
    width: 600px;
    height: 320px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .s_show span{
    position: fixed;
    font-size: 18px;
    font-weight: bold;
    z-index: 9999;
  }
</style>
