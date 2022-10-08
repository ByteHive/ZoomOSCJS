import {EventEmitter }from "events";
import { Meeting } from "./meeting";
import {Server,Client, ArgumentType} from 'node-osc';
import { User } from "./User";
import { UserCommands } from "./consts";
export default class Zosc extends EventEmitter {
    transmissionIp:string = "127.0.0.1";
    transmissionPort:number = 9090;
    receivingport:number = 8081;
    //To be Implmented 
    currentMeeting:Meeting;
    oscServer:Server;
    oscClient:Client;
    users:{[key:number]:User};
    self:User;
    constructor(transmissionIp:string,transmissionPort:number,receivingport:number) {
        super();
        this.transmissionIp = transmissionIp;
        this.transmissionPort = transmissionPort;
        this.receivingport = receivingport;
        this.users = {};
        this.oscServer = new Server(this.receivingport,"127.0.0.1");
        this.oscClient = new Client(this.transmissionIp,this.transmissionPort);
        this.oscServer.on("message",(message: [string, ...ArgumentType[]])=>{
            this.handleUpdate(message);
        })
    }
    

    handleUpdate(message: [string, ...ArgumentType[]]){
        
        let spliturl = message[0].split("/");
        let prefix = spliturl[1]; 
        //handle user Actions
        if(spliturl[2] == 'user'||spliturl[2] == 'me'){
            let zoomID = parseInt(<string>message[4]);
            let action = spliturl[3];
            //check if we know user if not create him 
            if(this.users[zoomID] == undefined){
                this.users[zoomID] = new User(this,zoomID,<string>message[2]);	// create a new instance of the User class
                if(spliturl[2] == 'me'){
                    this.self = this.users[zoomID];
                }
                this.emit("newUser",this.users[zoomID]);
            }
            if(UserCommands.includes(action)){
                this.users[zoomID].handleUpdate(action,message);	
            }
        }
    }
    sendCommand(command,user,data?){
        let oscURL = "/zoom/zoomID/"+command 
        if(data != undefined){
        this.oscClient.send(oscURL,user.zoomID,data);
        }else{
            this.oscClient.send(oscURL,user.zoomID);
        }
    
    }
    sendMeCommand(command,data?){
        let oscURL = "/zoom/me/"+command 
        if(data != undefined){
        this.oscClient.send(oscURL,data);
        }else{
            this.oscClient.send(oscURL);
        }
    }
    sendZoomCommand(command,data?){
        let oscURL = "/zoom/"+command
        if(data != undefined){
        this.oscClient.send(oscURL,data);
        }else{
            this.oscClient.send(oscURL);
        }

    }
    joinMeetingwithID(meetingID:string){
        	
    }
    // Recording Commands
    startLocalRecord(){
        this.sendZoomCommand("startLocalRecording");
    }
    pauseLocalRecord(){
        this.sendZoomCommand("pauseLocalRecording");
    }
    resumeLocalRecord(){
        this.sendZoomCommand("resumeLocalRecording");
    }
    stopLocalRecord(){
        this.sendZoomCommand("stopLocalRecording");
    }
    startCloudRecord(){
        this.sendZoomCommand("startCloudRecording");
    }
    pauseCloudRecord(){
        this.sendZoomCommand("pauseCloudRecording");
    }
    resumeCloudRecord(){
        this.sendZoomCommand("resumeCloudRecording");
    }
    stopCloudRecord(){
        this.sendZoomCommand("stopCloudRecording");
    }
    //Global Commands
    enableUsersUnmute(){
        this.sendZoomCommand("enableUsersUnmute");
    }
    disableUsersUnmute(){
        this.sendZoomCommand("disableUsersUnmute");
    }
    muteAll(){
        this.sendZoomCommand("all/mute");
    }
    unmuteAll(){
        this.sendZoomCommand("all/unmute");
    }
    lowerAllHands(){
        this.sendZoomCommand("lowerAllHands");
    }
    clearSpotlight(){
        this.sendZoomCommand("clearSpot");
    }
    ping(){
        this.sendZoomCommand("ping");
    }
    leaveMeeting(){
        this.sendZoomCommand("leaveMeeting");
    }
    endMeeting(){
        this.sendZoomCommand("endMeeting");
    }
    ejectAttendees(){
        this.sendZoomCommand("ejectAttendees");
    }
    getWebinarReactionCounts(){
        this.sendZoomCommand("getWebinarReactionCounts");
    }
    resetWebinarReactionCounts(){
        this.sendZoomCommand("resetWebinarReactionCounts");
    }
    //View Commands
    chatAll(message){
        this.sendZoomCommand("chatAll",message);
    }
    createBreakout(name:String|number){
        this.sendZoomCommand("createBreakout",name);
    }
    deleteBreakout(name:String|number){
        this.sendZoomCommand("deleteBreakout",name);
    }
    deleteAllBreakouts(){
        this.sendZoomCommand("deleteAllBreakouts");
    }
    openBreakouts(){
        this.sendZoomCommand("openBreakouts");
    }
    closeBreakouts(){
        this.sendZoomCommand("closeBreakouts");
    }
    //Todo configure Breakouts
    broadcastToBreakout(message){
        this.sendZoomCommand("broadcastToBreakout",message);
    }
}
