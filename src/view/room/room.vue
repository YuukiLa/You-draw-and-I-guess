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
    },
    watch: {
      onEnterRoomEvent: function (o, n) {
        if (o !== n && o) {
          this.room.roomUsers = o.data
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
      }
    },
    methods: {
      startGame() {
        let data = {
          cmd: "10010",
          data: {},
          msg: ""
        }
        this.$store.dispatch("sendWs",JSON.stringify(data))
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