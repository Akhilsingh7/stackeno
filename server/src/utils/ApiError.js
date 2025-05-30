
class ApiError extends Error {
    constructor(
        statusCode, 
        message = "Something went wrong", 
        errors = [],
        stack = ""
      ) 
        {         
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if(stack) { 
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);  //Shows where new ApiError() was called , Excludes the constructor itself from the trace
        }
    }
}

export {ApiError};

//stack refers to the stack trace
// A stack trace is like a "breadcrumb trail" that shows:

// Where the error happened (file, line number)
// How you got there (sequence of function calls)
// What functions were executing when the error occurred



// super is a reference to the parent class (superclass) from within a child class (subclass). It allows you to:

// Call the parent class constructor
// Access parent class methods
// Access parent class properties