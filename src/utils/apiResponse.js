class ApiResponse{
    constructor(statusCode , data , massage = "Success"){
     this.statusCode = statusCode
     this.data = data
     this.massage = massage
     this.success = statusCose < 400

    }
}