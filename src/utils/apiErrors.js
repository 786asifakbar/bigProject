class apiError extends error{
    constructor(
        statusCode ,
        massage = "something went to wrong",
        errors = [],
        stack = "", 

    ){ 
      super(massage)
      this.statusCode = statusCode
      this.data = null
      this.massage = massage 
      this.success = false;
      this.errors = errors 

      if(stack){
        this.stack = stack
      }else {
        Error.captureStackTrace(this,this.constructor)
      }
 
    }
}
export default apiError;