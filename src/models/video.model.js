import mongoose , {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({

    videfile :{
        type : String,  //cloudnery url
        required : true,
    },
    thumbnail :{
        type : String,  //cloudnery url
        required : true,
    },
    title :{   
        type : String, 
        required : true,
    },
    description :{
        type : String,
    },
    
    duration :{
        type : Number, // cloudnery url
    },
    view :{
        type : Number, 
        default :0,
    },
    ispublished :{
        type : Boolean,  // iska matlb hai kiya ye published kar sakty hen ya nh 
        required : true,
    },
    owner :{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    
},{timestamp : true});

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video",videoSchema);