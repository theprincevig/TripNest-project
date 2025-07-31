// Custom error class for handling Express-related errors
class ExpressError extends Error {
    constructor(status, message) {
        super();                  // Call the parent Error class constructor
        this.status = status;     // HTTP status code (e.g., 404, 500)
        this.message = message;   // Custom error message
    }
}

// Export the custom error class so it can be used in other files
module.exports = ExpressError;
