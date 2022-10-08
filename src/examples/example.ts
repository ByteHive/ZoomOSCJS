import Zosc from "../ZOSC";	// import the class
let zosc = new Zosc("192.168.178.110",9090,1234);	// create a new instance of the ZOSC class
const Breakoutrooms = [1,2,3,4,5,6]
//zosc.joinMeetingwithID("892722325988");	// join a meeting with ID 123


zosc.on("newUser",(user)=>{
   //move User to Breakoutroom By Emoji
   console.log("New user") 
})




   

