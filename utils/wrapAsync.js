// A utility function to wrap async route handlers and forward errors to Express
module.exports = (fn) => {
    return (req, res, next) => {
        // Execute the async function and catch any errors to pass to next()
        fn(req, res, next).catch(next);
    };
};
