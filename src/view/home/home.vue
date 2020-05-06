<template>
  <div class="content">
    <Card class="center-card">
      <div class="wrapper">
        <Tooltip content="点击修改头像" theme="light" transfer placement="right-start">
          <MyAvatar @click.native="showEditInfo=true" class="avatar" :avatarName="user.avatar"/>
        </Tooltip>
        <div class="username">
          <Input size="small" class="username-input" v-show="editMode" search enter-button="确定"
                 @on-search="handleEditName" v-model="username"/>
          <div v-show="!editMode">
            <span>{{user.username}}</span>&nbsp;<a @click="editMode=true">编辑</a>
          </div>
        </div>
      </div>
      <Row type="flex" justify="space-around" style="margin-top: 100px">
        <Button type="success" @click="createRoom">创建房间</Button>
        <Button type="info" @click="enterRoom">加入房间</Button>
      </Row>
    </Card>
    <edit-info @close="showEditInfo=false" @change="changeAvatar" :show="showEditInfo"></edit-info>
  </div>
</template>

<script>
  import EditInfo from './choose-avatar'
  import MyAvatar from '@/components/my-avatar/my-avatar'

  export default {
    name: "home",
    components: {
      EditInfo, MyAvatar
    },
    data() {
      return {
        showEditInfo: false,
        editMode: false,
        username: "",
        roomId: ''
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      changeAvatar(name) {
        this.$ajax.put('/api/user/avatar', {avatar: name}).then(res => {
          if (res.code === 200) {
            this.$store.commit("set_user", {username: this.username, avatar: name})
            this.$Message.success(res.msg)
          } else {
            this.$Message.error(res.msg)
          }
          this.showEditInfo = false
        })

      },
      handleEditName() {
        this.$ajax.put('/api/user/username', {username: this.username}).then(res => {
          if (res.code === 200) {
            this.$store.commit("set_user", {username: this.username, avatar: this.user.avatar})
            this.$Message.success(res.msg)
          } else {
            this.$Message.error(res.msg)
          }

          this.editMode = false
        })
      },
      createRoom() {
        this.$ajax.post("/api/room").then(res => {
          if (res.code === 200) {
            this.$Message.success('创建成功')
            this.$router.push({name: "room", params: {id: res.data}})
          } else {
            this.$Message.error("创建失败，请稍候再试...")
          }
        })
      },
      enterRoom() {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.roomId,
                autofocus: true,
                placeholder: '请输入房间号'
              },
              on: {
                input: (val) => {
                  this.roomId = val;
                }
              }
            })
          },
          onOk: ()=> {
            this.$ajax.post("/api/room/enter",{roomId:this.roomId}).then(res=> {
              if(res.code===200) {
                this.$Message.success('加入房间成功')
                this.$router.push({name: "room", params: {id: this.roomId}})
              } else {
                this.$Message.error(res.msg)
              }
              this.roomId = ""
            })
          }
        })
      }
    },
    mounted() {
      console.log(this.user)
      this.username = this.user.username
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .username {
    margin: 10px 0;
  }

  .username-input {
    width: 120px;
  }
</style>