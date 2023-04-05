const wa = require('@open-wa/wa-automate');
const fs = require("fs")
wa.create({
  sessionId: "My-session",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  logFile:true,
  sessionDataPath: "./data",
  popup:true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  waitForRipeSessionTimeout:0,
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));
//delay function
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve, ms))
}
async function start(client) {
    let group;
    let archives =[];
  await client.getAllGroups().then((chat)=>{
    group = chat;
  })
 
 
  fs.writeFile("./groups.js", JSON.stringify(group), function(err) {
    if(err) {
          console.log(err);
    } 
    else {
      console.log("Output saved to /groups.js.");
    }
  }); 
  group.map((singleGroup)=>{
    if(singleGroup.archive){
        archives.push({groupName:singleGroup.name, groupId:singleGroup.id})
    }
  })
  fs.writeFile("./archives.js", JSON.stringify(archives)+"\n", function(err) {
    if(err) {
          console.log(err);
    } 
    else {
      console.log("Archives saved");
    }
  }); 
  archives.forEach(async element => {
    delay(5000)//delay for 5 seconds
    await client.sendText(element.groupId, "Just wanted to test this group using OPEN_WA bot")
  });
}   