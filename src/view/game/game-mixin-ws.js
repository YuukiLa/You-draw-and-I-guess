const wsMixin = {
  data() {
    return {
      isYou: false,
      gameOver: false
    }
  },
  computed: {
    onGameParamEvent() {
      return this.$store.getters.onEvent("10011")
    },
    onIsYouEvent() {
      return this.$store.getters.onEvent("11000")
    },
    onDrawEvent() {
      return this.$store.getters.onEvent("10012")
    },
    onDanmuEvent() {
      return this.$store.getters.onEvent("10013")
    },
    onGameOverEvent() {
      return this.$store.getters.onEvent("13000")
    }
  },
  watch: {
    onGameParamEvent: function (o, n) {
      if (o !== n && o) {
        let username=this.$store.getters.currUserName(o.data.currUser)
        let round = o.data.round
        this.isYou = false
        this.$Notice.info({title:`第${round}轮，${username}开始作画`})
      }
    },
    onIsYouEvent: function (o, n) {
      if (o !== n && o) {
        this.isYou = true
        this.$Notice.success({title:`轮到你了，题目是${o.data.currWord}`,duration:0})
      }
    },
    onDanmuEvent: function (o, n) {
      if (o !== n && o) {
        this.createDanmu(o.data)
      }
    },
    onDrawEvent: function (o, n) {
      if (o !== n && o) {
        let {type,x,y} = o.data
        if(type==1){
          this.ctx.beginPath()  // 移动的起点
          this.ctx.moveTo(x, y)
        }else if(type==2){
          this.ctx.lineTo(x, y)
          this.ctx.stroke()
        }
      }
    },
    onGameOverEvent: function (o, n) {
      if (o !== n && o) {
        this.$Message.success("游戏结束啦~稍候会返回到首页，请重新创建房间哦~")
        this.$store.dispatch("closeWs")
        this.$router.replace("/")
      }
    },
  },
  methods: {
    getFirstGameParam() {
      this.$store.dispatch("sendWs",JSON.stringify({cmd:"10011"}))
    },
    wsSend(data) {
      this.$store.dispatch("sendWs",JSON.stringify(data));
    }
  }
}
export default wsMixin