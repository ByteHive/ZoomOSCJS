import axios from "axios";
import {Zosc }from "./ZOSC";	// import the class
let zosc = new Zosc("127.0.0.1",9090,8081);	// create a new instance of the ZOSC class

zosc.joinMeetingwithID("892722325988");	// join a meeting with ID 123
zosc.on("newUser",(user)=>{
    //Pin user if he sends a hello message 
   user.on('chat',(message)=>{
         console.log("chat",message);
         if(message.includes("on")){
                axios.put(`http://192.168.178.102:9123/elgato/lights`,{"numberofLights":1,"lights":[{"on":true}]})
         }else if(message.includes("off")){
                axios.put(`http://192.168.178.102:9123/elgato/lights`,{"numberofLights":1,"lights":[{"on":false}]})
         }
         console.log("user is:",user);
         
   })
   //add the emoji a user pressed to their name
   user.on('emojiChanged',(emoji)=>{
    console.log("emojiChanged",emoji);
    if(emoji == 2){
        user.rename(user.name+"👍");
    }

})

})