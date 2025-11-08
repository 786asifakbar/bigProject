import mongoose ,{ Schema } from "mongoose"

const subscriptionSchema = new Schema({
 subscriber : {
    type : Schema.Types.ObjectId,// one who subscribing
    ref : "User"
 },

channal : {
    type : Schema.Types.ObjectId,      // one whom is subscriber is  subscribing
     ref : "User"
 },

} , {timestamps : true });

export const subscription = mongoose.model("subscription" , subscriptionSchema); 