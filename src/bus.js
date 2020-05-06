import Vue from 'vue'

const bus = new Vue()

var ws = null

bus.$initWebsocket = function () {
  const wsuri = "ws://127.0.0.1:8080/ws"
  ws = new WebSocket(wsuri)
  ws.onopen = bus.$wsOpen
  ws.onerror = bus.$wsError
  ws.onmessage = bus.$wsMessage
  ws.onclose = bus.$wsClose
}

bus.$wsOpen=()=>{
  // let enterRoom = {
  //   cmd: "1",
  //   data: {}
  // }
  // this.wsSend(enterRoom)
  console.log("ws open")
}
bus.$wsMessage=(e)=> {
  console.log(e.data)
  // this.handlerWs(e.data)
}
bus.$wsError=()=> {
  console.log("ws error")
}
bus.$wsSend=(data)=> {
  ws.send(JSON.stringify(data));
}
bus.$wsClose=()=> {

}
export default bus