import {EventEmitter }from "events";

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
    constructor(userName:string) {
        super();
    }
    handleUpdate(type:string,data:any){
        console.log("got action type :",type)
        //todo check if any of the typical User Params changed like target id or gallery index
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
                this.emit("askedQuestion");
                break;
            default:
                console.log("got unknown action type :",type);
                
                break;
        }
    }
    videoOn(){

    }
    videoOff(){
    }
    //this function is no deterministic.. propaply should not ofer it to endusers
    toggleVideo(){

    }
    mute(){

    }
    unMute(){

    }
    //this function is no deterministic.. propaply should not ofer it to endusers
    toggleMute(){
        
    }
    //Spotlight Commands
    spot(){

    }
    addSpot(){

    }
    unSpot(){
    }
    //this function is no deterministic.. propaply should not ofer it to endusers
    toggleSpot(){ }


    //Hand Commands
    raiseHand(){}
    lowerHand(){}
    //this function is no deterministic.. propaply should not ofer it to endusers
    toggleHand(){}

    //Pin commands 
    pin(){}
    addPin(){}
    unPin(){}
    pin2(){}
    unPin2(){}
    //this function is no deterministic.. propaply should not ofer it to endusers
    togglePin(){}
    //this function is no deterministic.. propaply should not ofer it to endusers
    togglePin2(){}
    clearPin(){}
    makeHost(){}
    makeCoHost(){}
    reclaimHost(){}
    revokeCoHost(){}
    makePanelist(){}
    makeAttendee(){}
    eject(){}
    rename(){}
    allowToRecord(){}
    disallowToRecord(){}
    chat(message:string){}
    allowToSpeak(){}
    disallowToSpeak(){}
    sendToWaitingRoom(){}
    admit(){}
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