<template>
  <div class="screen">
    <div class="s_show" ref="content"></div>
    <canvas ref="canvas"
            width="800"
            height="600"
            @mousedown="canvasDown($event)"
            @mousemove="canvasMove($event)"
            @mouseup="canvasUp($event)"
            @mouseleave="canvasLeave($event)"></canvas>
    <div class="footer">
      <Row type="flex" justify="center" align="middle" style="height: 100%">
        <Poptip trigger="click" title="调整笔触" content="content" width="400">
          <div slot="content" class="pencil-change">
            <Slider v-model="pencilSize" :step="0.5" :tip-format="()=> null" :min="1" :max="10" @on-change="onPencilSizeChange"></Slider>
          </div>
          <Button class="marginR20" >✏调整笔触</Button>
        </Poptip>
        <ColorPicker @on-active-change="onPencilColorChange" v-model="pencilColor" class="marginR20"/>
        <Button @click="clearCanvas" class="marginR20" type="warning">清空</Button>
        <Input v-model="answer" placeholder="输入你的答案" style="width: 220px;" class="marginR20" />
        <Button @click="sendDanmu">发送</Button>

      </Row>
    </div>
  </div>
</template>

<script>
  import mixinWs from './game-mixin-ws'
  export default {
    name: "game",
    mixins: [mixinWs],
    data() {
      return {
        answer: '',
        pencilColor: '#000',
        pencilSize: 0,
        canvasMoveUse: false,
        canvas: null,
        ctx: null,
        userInfo: this.$store.state.user
      }
    },
    methods: {
      onPencilSizeChange(size) {
        this.ctx.lineWidth = size
      },
      onPencilColorChange(color) {
        this.pencilColor = color
        this.ctx.strokeStyle=color
      },
      clearCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
      },
      sendDanmu() {
        let danmu = {
          danmu: this.answer,
          user: this.userInfo.username,
          avatar:this.userInfo.avatar
        }
        // this.createDanmu(danmu)
        let wsData = {
          cmd:"10013",
          data: danmu
        }
        this.wsSend(wsData)
        this.answer = '';
      },
      createDanmu(danmu) {
        if(danmu.isAnswer) {
          this.$Notice.success({title:`${danmu.user}猜对了答案！15s后进入下一轮~`})
        }
        let div =document.createElement('div')
        let oDiv = document.createElement('span');
        let userDiv = document.createElement('span');
        let avatarDiv = document.createElement('img');
        oDiv.innerHTML = danmu.danmu
        div.className = 'magictime twisterInUp';
        userDiv.innerHTML = danmu.user+": "
        avatarDiv.src = require(`@/assets/avatar/${danmu.avatar}`)
        div.appendChild(avatarDiv)
        div.appendChild(userDiv)
        div.appendChild(oDiv)
        this.$refs.content.appendChild(div)
        this.init(div);
      },
      show(){
        this.canvas = this.$refs.canvas;//指定canvas
        this.canvas.width = document.documentElement.clientWidth
        this.canvas.height = document.documentElement.clientHeight-50
        this.ctx = this.canvas.getContext("2d");//设置2D渲染区域
        this.ctx.lineWidth = this.size;//设置线的宽度
        this.ctx.strokeStyle = this.pencilColor
      },
      canvasDown(e) {
        if (!this.isYou) return
        this.canvasMoveUse = true;
        const canvasX = e.clientX - e.target.offsetLeft;
        const canvasY = e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
        this.ctx.beginPath() // 移动的起点
        this.ctx.moveTo(canvasX, canvasY);
        let wsData = {
          cmd:"10012",
          data: {
            type: 1,
            x: canvasX,
            y: canvasY
          }
        }
        this.wsSend(wsData)

      },
      canvasMove(e) {
        if (this.canvasMoveUse) {
          // 只有允许移动时调用
          const t = e.target;
          let canvasX;
          let canvasY;
          canvasX = e.clientX - t.offsetLeft;
          canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
          this.ctx.lineTo(canvasX, canvasY);
          this.ctx.stroke()
          let wsData = {
            cmd:"10012",
            data: {
              type: 2,
              x: canvasX,
              y: canvasY
            }
          }
          this.wsSend(wsData)
        }
      },
      canvasUp(e) {
        this.canvasMoveUse = false;
      },
      canvasLeave(e) {
        this.canvasMoveUse = false;
      },
      init(obj) {
        let screenHeight = document.documentElement.clientHeight;
        let maxTop = screenHeight - 50 - obj.offsetHeight;
        obj.style.top = maxTop * Math.random() + 'px';
        let screenWidth = document.documentElement.clientWidth;
        let maxLeft = screenWidth - obj.offsetWidth
        obj.style.left = maxLeft + 'px';

        obj.style.color = this.randomColor();
        this.move(Math.random()*5+1,obj,maxLeft);
      },
      move(k,obj,maxLeft) {
        let that = this
        let speed = k;
        maxLeft -= speed;
        if(maxLeft > -obj.offsetWidth){
          obj.style.left = maxLeft + 'px';

          requestAnimationFrame(function(){
            that.move(k,obj,maxLeft);
          });
        }else{
          this.$refs.content.removeChild(obj)
        }
      },
      randomColor() {
        return '#' + Math.random().toString(16).slice(-6);
      },
      resize() {
        let data = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
        this.canvas.width = document.documentElement.clientWidth
        this.canvas.height = document.documentElement.clientHeight-50
        this.ctx.putImageData(data,0,0)
      }
    },
    mounted() {
      this.show()
      window.onresize = this.resize
      this.getFirstGameParam()
    }
  }
</script>

<style scoped>
  .screen{
    overflow: hidden;
    position: relative;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
.footer {
  position: fixed;
  height: 50px;
  width: 100%;
  bottom: 0;
  left: 0;
}
.pencil-change {
  width: 350px;
  margin: 0 auto;
}
.marginR20 {
  margin-right: 20px;
}
</style>