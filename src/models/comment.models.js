import mongoose , {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const commentSchema = new Schema(
    {


    }, 
    { timestamps: true });

    commentSchema.plugin(mongooseAggregatePaginate);
    export const comment = mongoose.model("comment" , commentSchema);