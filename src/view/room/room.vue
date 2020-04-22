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
          roomId: '123445',
          roomUsers: [
            {
              username: '1',
              avatar: '1.webp'
            },
            {
              username: '2',
              avatar: '1.webp'
            },
            {
              username: '3',
              avatar: '1.webp'
            },
            {
              username: '4',
              avatar: '1.webp'
            },
            {
              username: '5',
              avatar: '1.webp'
            },
            {
              username: '6',
              avatar: '1.webp'
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>
.avatar {
  width: 85px;
  height: 85px;
}
  .item{
    text-align: center;
  }
</style>