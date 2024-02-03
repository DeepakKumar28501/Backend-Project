const asyncHandler=(requestHandler)=>{
   (req,res,next)=>{
    Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
   }
}
export {asyncHandler};

// another method  
// below higher order function like function as parameter
// const asyncHandler=()=>{}
// const asyncHandler={func}=>()=>{}
// const asyncHandler = (fn)=>async() =>{}





// its a try catch method
// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{
//         await fn(req,req,next)
//     }catch(error){
//         res.status(erro.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

