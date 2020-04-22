<template>
  <div>
    <Modal :value="show" :closable="false" width="900" footer-hide @on-visible-change="onVisibleChange">
      <Row justify="space-around" type="flex">
        <img @click="changeAvatar(item)" v-for="(item,index) in avatars" :key="index" :src="buildImg(item)">
      </Row>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "edit-info",
    props: {
      show: false
    },
    data() {
      return {
        avatars: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"]
      }
    },

    methods: {
      buildImg(name) {
        return require(`@/assets/avatar/${name}`)
      },
      onVisibleChange(flag) {
        if(!flag) {
          this.$emit("close")
        }
      },
      changeAvatar(name) {
        this.$emit('change',name)
      }
    }
  }
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>