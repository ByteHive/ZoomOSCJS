import Zosc from "../ZOSC";	// import the libary
let WebinarZosc = new Zosc("192.168.178.110",9090,8080);	// create a new instance for The Webinar / origin
let MeetingZosc = new Zosc("127.0.0.1",9090,8081);// create a new instance for the Meeting where the messages should go

WebinarZosc.on("newUser",(user)=>{
   user.on('askedQuestion',(question)=>{
    MeetingZosc.chatAll(""+user.userName+" asked:"+question.toString())
   })
   })