import {EventEmitter }from "events";
import { Zosc } from "./Zosc";

export class User extends EventEmitter {
    targetIndex: number = -1;
    userName: string = "";
    galleryIndex: number = -1;
    zoomID: number = -1;
    targetCount:number = -1;
    listCount:number =-1;
    userRole:userRole = userRole.user;
    userStatus:userStatus = userStatus.offline;
    videoStatus:boolean = false;
    audioStatus:boolean = false;
    handRaised:boolean = false;
    isSpeaking:boolean = false;
    zosc:Zosc;
    constructor(zosc:Zosc,zoomID:number,userName:string) {
        super();
        this.zoomID = zoomID;
        this.userName = userName;
        this.zosc = zosc;
    }
    handleUpdate(type:string,data:any){
        console.log("got action type :",type)
        this.targetIndex = data[1];
        this.userName = data[2];
        this.galleryIndex = data[3];
        if(this.zoomID!=data[4]){
            console.log("zoomID changed from",this.zoomID,"to",data[3],"create a new user");
        }
        //todo should we always return this ? 
        switch (type) {
            case "chat":
                this.emit("chat",data[5]);
                break;
            case "userNameChanged":
                this.userName = data[5];
                this.emit("userNameChanged",this.userName);
                break;
            case "videoOff":
                this.videoStatus = false;
                this.emit("videoOff");
                break;
            case "videoOn":
                this.videoStatus = true;
                this.emit("videoOn");
                break;
            case "mute":
                this.audioStatus = false;
                this.emit("mute");
                break;
            case "unmute":
                this.audioStatus = true;
                this.emit("unmute");
                break;
            case "handRaised":
                this.handRaised = true;
                this.emit("handRaised");
                break;
            case "handLowered":
                this.handRaised = false;
                this.emit("handLowered");
                break;
            case "emojiChanged":
                //todo should we store which Emoji was selecteds last ? 
                this.emit("emojiChanged",data[5]);
                break;
            case "isSpeaking":
                this.isSpeaking = true;
                this.emit("isSpeaking");
                break;
            case "stoppedSpeaking":
                this.isSpeaking = false;
                this.emit("stoppedSpeaking");
                break;
            case "activeSpeaker":
                this.emit("activeSpeaker");
                break;
            case "askedQuestion":
                //todo should we store which questions where asked ?
                this.emit("askedQuestion",data[5]);
                break;
            case "list":
                this.targetCount = data[5];
                this.listCount = data[6];
                this.userRole = data[7];
                this.userStatus = data[8];
                this.videoStatus = data[9];
                this.audioStatus = data[10];
                this.handRaised = data[11];
                this.emit("update",this);
                break
            default:
                console.log("got unknown action type :",type);
                
                break;
        }
    }
    videoOn(){
        this.sendCommand("videoOn");
    }
    videoOff(){
        this.sendCommand("videoOff");
    }
    //this function is non-deterministic.. probably should not offer it to end users
    toggleVideo(){
        this.sendCommand("toggleVideo");
    }
    mute(){
        this.sendCommand("mute");
    }
    unMute(){
        this.sendCommand("unMute");
    }
    //this function is non-deterministic.. probably should not offer it to end users
    toggleMute(){
        this.sendCommand("toggleMute");
    }
    //Spotlight Commands
    spot(){
        this.sendCommand("spot");
    }
    addSpot(){
        this.sendCommand("addSpot");
    }
    unSpot(){
        this.sendCommand("unSpot");
    }
    //this function is non-deterministic.. probably should not offer it to end users
    toggleSpot(){
        this.sendCommand("toggleSpot");
    }


    //Hand Commands
    raiseHand(){
        this.sendCommand("raiseHand");
    }
    lowerHand(){
        this.sendCommand("lowerHand");
    }
    //this function is non-deterministic.. probably should not offer it to end users
    toggleHand(){
        this.sendCommand("toggleHand");
    }
    //Breakouroom Commands#
    sendToBreakout(breakoutRoom:String|number){
        this.sendCommand("sendToBreakout",breakoutRoom);
    }
    assignToBreakout(breakoutRoom:String|number){
        this.sendCommand("assignToBreakout",breakoutRoom);
    }
    unassignFromBreakout(breakoutRoom:String|number){
        this.sendCommand("unassignFromBreakout",breakoutRoom);
    }
    removeFrombreakout(breakoutRoom:String|number){
        this.sendCommand("removeFrombreakout",breakoutRoom);
    }
    //Pin commands 
    pin(){
        this.sendCommand("pin");
    }
    addPin(){
        this.sendCommand("addPin");
    }
    unPin(){
        this.sendCommand("unPin");
    }
    pin2(){
        this.sendCommand("pin2");
    }
    unPin2(){
        this.sendCommand("unPin2");
    }
    //this function is non-deterministic.. probably should not offer it to end users
    togglePin(){
        this.sendCommand("togglePin");
    }
    //this function is non-deterministic.. probably should not offer it to end users
    togglePin2(){
        this.sendCommand("togglePin2");
    }
    clearPin(){
        this.sendCommand("clearPin");
    }
    makeHost(){
        this.sendCommand("makeHost");
    }
    makeCoHost(){
        this.sendCommand("makeCoHost");
    }
    reclaimHost(){
        this.sendCommand("reclaimHost");
    }
    revokeCoHost(){
        this.sendCommand("revokeCoHost");
    }
    makePanelist(){
        this.sendCommand("makePanelist");
    }
    makeAttendee(){
        this.sendCommand("makeAttendee");
    }
    eject(){
        this.sendCommand("eject");
    }
    rename(newname:string){
        this.sendCommand("rename",newname);
    }
    allowToRecord(){
        this.sendCommand("allowToRecord");
    }
    disallowToRecord(){
        this.sendCommand("disallowToRecord");
    }
    chat(message:string){
        this.sendCommand("chat",message);
    }
    allowToSpeak(){
        this.sendCommand("allowToSpeak");
    }
    disallowToSpeak(){
        this.sendCommand("disallowToSpeak");
    }
    sendToWaitingRoom(){
        this.sendCommand("sendToWaitingRoom");
    }
    admit(){
        this.sendCommand("admit");
    }
    sendCommand(command,data?){
        this.zosc.sendCommand(command,this,data);
    }
}



export enum userRole{
    user,
    atendee,
    host,
    cohost}

export enum userStatus{
    offline,
    online
}