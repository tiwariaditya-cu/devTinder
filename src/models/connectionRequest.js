const mongoose = require('mongoose');
const { equals } = require('validator');


const connectionRequestScehma = new mongoose.Schema(

    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
        },

        status:{
            type:String,
            enum:{
                values:["ignore","interested","accepted","rejected"],
                message:`{VALUE} is incorrect type.`
            }
        }
    },
    {
    timestamps:true
    }
);   

connectionRequestScehma.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot sedn connection to yourself!");
    }
    next();
});

const ConnectionRequest =  new mongoose.model("Connection Request", connectionRequestScehma);

module.exports = ConnectionRequest;