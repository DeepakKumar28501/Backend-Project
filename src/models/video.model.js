import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema=new Schema({
    videoFile:{
        type:String,//cloudinary url
        required:true
    },
    thumbnail:{
        type:String,//cloudinary url
        required:true
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    duration:{
        type:Number,//cloudinary give time info
        required:true
    },
    views:{
        type:Number,//cloudinary url
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true});
videoSchema.plugin(mongooseAggregatePaginate);//extra plugin for manage watch history

export const  Video=mongoose.model("Video",videoSchema);
