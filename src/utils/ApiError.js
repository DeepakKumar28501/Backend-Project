// it is handle API errors 

class ApiError extends Error{
    constructor(
        statuscode,
        message="something went wrong",
        errors=[],
        stack=""//error stack
    ){
        super(message)
        this.statuscode=statuscode
        this.data
        this.message=message
        this.success=false;
        this.errors=errors
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this.this.constructor)
        }
    }
}
export {ApiError};