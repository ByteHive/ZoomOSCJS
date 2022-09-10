import {Zosc }from "./ZOSC";	// import the class
let WebinarZosc = new Zosc("192.168.178.110",9090,8080);	// create a new instance of the ZOSC class
let MeetingZosc = new Zosc("127.0.0.1",9090,8081);


WebinarZosc.on("newUser",(user)=>{
   user.on('askedQuestion',(question)=>{
    MeetingZosc.chatAll(""+user.userName+" asked:"+question.toString())
   })
   })