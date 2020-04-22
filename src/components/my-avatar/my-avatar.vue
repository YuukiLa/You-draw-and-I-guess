<template>
  <div>
    <Avatar @on-error="onError" :src="avatar" style="width: 100%;height: 100%"></Avatar>
  </div>
</template>

<script>
  export default {
    name: "my-avatar",
    props: {
      avatarName: {
        type: String,
        default: ''
      }
    },
    computed: {
      avatar() {
        return require(`@/assets/avatar/${this.avatarName}`)
      }
    },
    methods: {
      onError() {

      }
    }
  }
</script>

<style scoped>

</style>