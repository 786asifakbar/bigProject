import mongoose , {Schema} from "mongoose";

const playlistSchema = new Schema({
    title :{
        type : String,  
        required : true,
    },
    description :{  
        type : String,  
    },
    videos :[   
        {
            type : Schema.Types.ObjectId,
            ref : "Video",
        },  
    ],
    owner :{
        type : Schema.Types.ObjectId,
        ref : "User",
    },  
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
// --- a/vscode-scm:git/scm0/input?rootUri%3Dfile%253A%252F%252F%252Fd%25253A%252FbigProject
// +++ b/vscode-scm:git/scm0/input?rootUri%3Dfile%253A%252F%252F%252Fd%25253A%252FbigProject
// @@ -1,1 +1,1 @@
// +
// -feat: add initial comment model with pagination support --- IGNORE ---