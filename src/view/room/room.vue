<template>
  <div class="content">
    <Card class="center-card">
      <p slot="title">
        <Icon type="ios-home-outline"></Icon>
        {{room.roomId}}
      </p>
      <a slot="extra">
        退出房间
      </a>
      <div>
        <Row type="flex" justify="space-around">
          <Col span="4" v-for="(item,index) in room.roomUsers" :key="index" class-name="item">
            <MyAvatar :avatarName="item.avatar" class="avatar"></MyAvatar>
            {{item.username}}
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style="margin-top: 100px">
          <Button>开始游戏</Button>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
  import MyAvatar from '@/components/my-avatar/my-avatar'

  export default {
    name: "room",
    components: {
      MyAvatar
    },
    data() {
      return {
        room: {
          roomId: '',
          roomUsers: []
        }
      }
    },
    computed: {
      onEnterRoomEvent() {
        return this.$store.getters.onEvent("10001")
      }
    },
    watch: {
      onEnterRoomEvent: function (o, n) {
        console.log(o)
        if (o !== n && o) {
          this.room.roomUsers = o.data
        }
      }
    },
    methods: {
      handleEnterRoom(users) {

      }
    },
    mounted() {
      this.room.roomId = this.$route.params.id
      this.$store.dispatch("initWs", {cmd: "10001", data: {roomId: this.room.roomId}})
    }
  }
</script>

<style scoped>
  .avatar {
    width: 85px;
    height: 85px;
  }

  .item {
    text-align: center;
  }
</style>