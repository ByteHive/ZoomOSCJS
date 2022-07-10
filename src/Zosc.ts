import {EventEmitter }from "events";
import { Meeting } from "./meeting";
import {Server,Client, ArgumentType} from 'node-osc';
import { User } from "./User";
import { UserCommands } from "./consts";
export class Zosc extends EventEmitter {
    transmissionIp:string = "127.0.0.1";
    transmissionPort:number = 9090;
    receivingport:number = 8081;
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
    joinMeetingwithID(meetingID:string){

    }
    handleUpdate(message: [string, ...ArgumentType[]]){
        //console.log("message is:",message);
        let spliturl = message[0].split("/");
        let prefix = spliturl[1]; 
        //handle user Actions
        if(spliturl[2] == 'user'||spliturl[2] == 'me'){
            let zoomID = parseInt(<string>message[4]);
            let action = spliturl[3];
            //check if we know user if not create him 
            if(this.users[zoomID] == undefined){
                this.users[zoomID] = new User(<string>message[2]);	// create a new instance of the User class
                if(spliturl[2] == 'me'){
                    this.self = this.users[zoomID];
                }
            }
            if(UserCommands.includes(action)){
                this.users[zoomID].handleUpdate(action,message);	
            }
        }
    }
    sendCommand(){

    }
}