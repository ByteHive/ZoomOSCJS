import axios from "axios";
import {Zosc }from "./ZOSC";	// import the class
let zosc = new Zosc("127.0.0.1",9090,8081);	// create a new instance of the ZOSC class
const Breakoutrooms = [1,2,3,4,5,6]
zosc.joinMeetingwithID("892722325988");	// join a meeting with ID 123

for(let i = 0; i < Breakoutrooms.length; i++){
    zosc.createBreakout(Breakoutrooms[i]);
}
zosc.openBreakouts();
zosc.on("newUser",(user)=>{
   //move User to Breakoutroom By Emoji
   user.on('emojiChanged',(emoji)=>{
    let breakoutRoom = Breakoutrooms[emoji-1];
    user.sendToBreakout(breakoutRoom)
})
})






