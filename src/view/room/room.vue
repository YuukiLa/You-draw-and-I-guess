<template>
  <div class="content">
    <Card class="center-card">
      <p slot="title">
        <Icon type="ios-home-outline"></Icon>
        {{room.roomId}}
      </p>
      <a slot="extra" @click="exitRoom">
        {{showStartGameBtn?'解散房间':'退出房间'}}
      </a>
      <div>
        <Row type="flex" justify="space-around">
          <Col span="4" v-for="(item,index) in room.roomUsers" :key="index" class-name="item">
            <MyAvatar :avatarName="item.avatar" class="avatar"></MyAvatar>
            {{item.username}}
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style="margin-top: 100px">
          <Button v-if="showStartGameBtn" @click="startGame">开始游戏</Button>
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
        },
        showStartGameBtn: false
      }
    },
    computed: {
      onEnterRoomEvent() {
        return this.$store.getters.onEvent("10001")
      },
      onMasterEvent() {
        return this.$store.getters.onEvent("10002")
      },
      onStartGameEvent() {
        return this.$store.getters.onEvent("10010")
      },
      onDissolveRoomEvent() {
        return this.$store.getters.onEvent("10008")
      }
    },
    watch: {
      onEnterRoomEvent: function (o, n) {
        if (o !== n && o) {
          this.room.roomUsers = o.data
          this.$store.commit("set_gamer",o.data)
        }
      },
      onMasterEvent: function (o, n) {
        if (o !== n && o) {
          this.showStartGameBtn = true
        }
      },
      onStartGameEvent: function (o, n) {
        if (o !== n && o) {
          this.$router.push({name:"game",params:{id:this.room.roomId}})
        }
      },
      onDissolveRoomEvent:function (o, n) {
        if (o !== n && o) {
          this.$Message.warning("房间已被房主解散!即将返回首页...")
          this.$store.dispatch("closeWs")
          setTimeout(()=>this.$router.replace("/"),3000)
        }
      },
    },
    methods: {
      startGame() {
        let data = {
          cmd: "10010",
          data: {},
          msg: ""
        }
        this.$store.dispatch("sendWs",JSON.stringify(data))
      },
      exitRoom() {
        let data = {
          cmd: "10008",
          data: {},
          msg: ""
        }
        this.$store.dispatch("sendWs",JSON.stringify(data))
        this.$store.dispatch("closeWs")
        this.$router.back()
      }
    },
    mounted() {
      this.room.roomId = this.$route.params.id
      if(!this.$store.state.ws)
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