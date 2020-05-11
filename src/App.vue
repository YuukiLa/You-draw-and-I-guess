<template>
  <div>
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    beforeunloadFn(e) {
      console.log('刷新或关闭')
      if(this.$store.state.ws) {
        this.$store.state.ws.close()
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
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
  .s_show div {
    position: fixed;
    height: 18px;
    z-index: 9999;
  }
  .s_show span {
    line-height: 18px;
    font-size: 18px;
    font-weight: bold;
  }

  .s_show div img {
    width: 25px;
    height: 25px;
    vertical-align:middle;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
  }
</style>
