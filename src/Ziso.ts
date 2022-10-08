import { User } from "./User";
import Zosc from "./Zosc";
import {Server,Client, ArgumentType} from 'node-osc';
import { UserCommands } from "./consts";

export default class Ziso extends Zosc {
    constructor(transmissionIp:string,transmissionPort:number,receivingport:number){
        super(transmissionIp,transmissionPort,receivingport)
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
                this.users[zoomID] = new IsoUser(this,zoomID,<string>message[2]);	// create a new instance of the User class
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
}

export class IsoUser extends User {
    constructor(ziso:Zosc|Ziso,zoomID:number,userName:string) {
        super(ziso,zoomID,userName)
    }
    outputIso(outputNumber:number){
        this.sendCommand("outputISO",outputNumber);
    }
    audioIso(outputNumber:number){
        this.sendCommand("audioISO",outputNumber);

    }
}