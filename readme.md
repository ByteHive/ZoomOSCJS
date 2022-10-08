# ZoomOSCJS 
## by Bytehive

ZoomOSCJS is a libary to controll Zoom trough ZoomOSC 
It maps the OSC API of ZoomOSC to a Node.js Event's based API.

## Implemented Functions:

### ZoomOSC Actions
startLocalRecord(),pauseLocalRecord(),resumeLocalRecord(),stopLocalRecord()
startCloudRecord(),pauseCloudRecord(),resumeCloudRecord(),stopCloudRecord()
enableUsersUnmute(),disableUsersUnmute()
muteAll(),unmuteAll()
lowerAllHands(),clearSpotlight()
ping(),leaveMeeting(),endMeeting(),ejectAttendees()
getWebinarReactionCounts(),resetWebinarReactionCounts()
chatAll(message)
createBreakout(name:String|number),deleteBreakout(name:String|number),deleteAllBreakouts()
openBreakouts(),closeBreakouts(),broadcastToBreakout(message)

### User Actions
videoOn(),videoOff()
mute(),unMute()
spot(),addSpot(),unSpot()
raiseHand(),lowerHand(),toggleHand()
sendToBreakout(breakoutRoom:String|number)
assignToBreakout(breakoutRoom:String|number)
unassignFromBreakout(breakoutRoom:String|number)
removeFrombreakout(breakoutRoom:String|number)
pin(),addPin(),unPin(),pin2(),unPin2(),clearPin()
makeHost(),makeCoHost(),reclaimHost(),revokeCoHost()
makePanelist(),makeAttendee(),eject()
rename(newname:string),allowToRecord()
disallowToRecord(),chat(message:string)
allowToSpeak(),disallowToSpeak()
sendToWaitingRoom(),admit()

### UserEvents 
"chat","userNameChanged","videoOff"
"videoOn","mute","unmute"
"handRaised","handLowered"
"emojiChanged","isSpeaking"
"stoppedSpeaking","activeSpeaker"
"askedQuestion","update"
## Example
```

```
## TODO's
- [ ] add join Zoom Meeting commands
- [ ] add more Exampels
- [ ] store Settings about the Meeting in the Meeting class