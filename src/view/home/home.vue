<template>
  <div class="content">
    <Card class="center-card">
      <div class="wrapper">
        <Tooltip content="点击修改头像" theme="light" transfer placement="right-start">
          <MyAvatar @click.native="showEditInfo=true" class="avatar" :avatarName="avatarName"/>
        </Tooltip>
        <div class="username">
          <Input size="small" class="username-input" v-show="editMode" search enter-button="确定" @on-search="editMode=false" v-model="username"/>
          <div v-show="!editMode">
            <span>{{user.username}}</span>&nbsp;<a @click="editMode=true">编辑</a>
          </div>
        </div>
      </div>
      <Row type="flex" justify="space-around" style="margin-top: 100px">
        <Button type="success">创建房间</Button>
        <Button type="info">加入房间</Button>
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
      EditInfo,MyAvatar
    },
    data() {
      return {
        showEditInfo: false,
        editMode: false,
        username: 'yuuki',
        avatarName: '1.webp'
      }
    },
    computed: {
      avatar() {
        return require(`@/assets/avatar/${this.user.avatar}`)
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      changeAvatar(name) {
        this.avatarName =name
        this.showEditInfo=false
      }
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