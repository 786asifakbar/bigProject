
const asyncHandler = ( requesthandler ) => {

  return (req , res , next)=>{

    Promise.resolve(requesthandler(req , res , next)).catch((err)=> next(err)); 

  };

};
  
export default asyncHandler;


// ye tareqa bhi hai 
// asyncHandler = (func) =>async (req , res ,next)=>{
//     try {
//         await func(req , res , next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false,
//             massage : error.massage,
//         })
//     }
// }