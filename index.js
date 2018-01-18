var aws = require('aws-sdk');
var lambda = new aws.Lambda({region:"ap-northeast-1"});

exports.handler = (event, context, callback) => {
    
    var msg = event.lineMessage.events[0].message.text;
    console.log(msg);
    
    console.log(msg.indexOf("リダイレクト登録") > -1);
    
    if(msg.indexOf("リダイレクト登録") > -1){
        //TRUEの時
        var nameKey = msg.replace(/リダイレクト登録/g, "");
        console.log(nameKey);
        var userId = event.lineMessage.events[0].source.userId;
        console.log(userId);
        
        var awParam = {
            FunctionName: "cloud9-storageDao-storageSet-1NAOAUOZ4HX19",
            Payload: JSON.stringify({ "key":nameKey, "value":userId })
        };
            
        lambda.invoke(awParam, function(err, data) {
        　if(err) {
        　　console.log(err + err.stack);
        　　callback(null,{message:"登録失敗しました"});
        　}
        　else {
        　　console.log(data);
        　　callback(null,{message:"登録しました"});
        　}
        });
    }

    
    
    
};