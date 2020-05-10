const wsMixin = {
  data() {
    return {
      isYou: false
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
    }
  },
  watch: {
    onGameParamEvent: function (o, n) {
      if (o !== n && o) {

      }
    },
    onIsYouEvent: function (o, n) {
      if (o !== n && o) {
        this.isYou = true
      }
    },
    onDanmuEvent: function (o, n) {
      if (o !== n && o) {

        let {danmu} = o.data
        this.createDanmu(danmu)
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