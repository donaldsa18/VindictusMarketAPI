
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

Location = require('./locationModel');


//Location.watch.on('change',(data) => {
    //TODO: figure out what data format this is
//})


const clients = {};

const broadcastDict = {};
for(let i=-2;i<=200;i++) {//number of channels
    broadcastDict[i] = {};
    for(let j=0;j<4;j++) {//number of towns
        broadcastDict[i][j] = {};
    }
}
const onRequest = (request) => {
    const connection = request.accept(null,request.origin);
    clients[userID] = connection;
    
};

const onMessage = (msg) => {
    if(msg.op === 'setchannel') {
        getRecentData(msg.channel,msg.town);
        broadcastDict[msg.channel][msg.town][userID] = clients[userID];
    }
    if(msg.op === 'getuser') {
        getUserData(msg.cid);
    }
};

const getUserData = (cid) => {
    Location.find({"CID":cid},function (err, items) {
        if (err)
            ws.send(JSON.stringify({
                message: 'error',
                data: err
            }));
        else
            ws.send(JSON.stringify({
                message: 'success',
                data: items
            }));
    });
};

const getRecentData = (channel,town) => {
    Location.aggregate([
        {$match: {Channel: 1, TownID: 0}},
        {$sort: {Time: -1}},
        {$group: {
            _id: "$CID",
            CID: {$first: "$$ROOT.CID"},
            X: {$first: "$$ROOT.X"},
            Y: {$first: "$$ROOT.Y"},
            Vx: {$first: "$$ROOT.Vx"},
            Vy: {$first: "$$ROOT.Vy"},
            Yaw: {$first: "$$ROOT.Yaw"},
            Time: {$first: "$$ROOT.Time"},
            Channel: {$first: "$$ROOT.Channel"},
            TownID: {$first: "$$ROOT.TownID"}
          }}
    ],function (err, items) {
        if (err)
            ws.send(JSON.stringify({
                message: 'error',
                data: err
            }));
        else
            ws.send(JSON.stringify({
                message: 'success',
                data: items
            }));
    });
}

const onOpen = () => {
    getRecentData(1,0);
};

const onClose = (connection) => {
    delete broadcastDict[msg.channel][msg.town][userID];
    delete clients[userID];
};

exports.location = (ws, req) => {
    var userID = getUniqueID();
    ws.on('request',onRequest);
    ws.on('open',onOpen);
    ws.on('message',onMessage);
    ws.on('close',onClose);
}