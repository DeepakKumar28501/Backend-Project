import multer from "multer";

const storage =multer.diskStorage({destination:function(req,file,cb){//cb call back
    cb(null,"./public/temp")
},
    filename:function(req,file,cb){
        // const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);// generate a string to amke unique name
        // cb(null,file.fieldname+'-'+uniqueSuffix)
        // or 
        cb(null,file.originalname)
    }
})
export const upload =multer({
    // storage:storage  also write like this when both name are same in ES6
    storage
})