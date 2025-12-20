// Load the serverless handler
const serverlessHandler = require('../dist/serverless.cjs');

// Export the handler
module.exports = async (req, res) => {
    console.log('API route hit:', req.method, req.url);

    try {
        // Get the default export or the module itself
        const handler = serverlessHandler.default || serverlessHandler;

        if (typeof handler === 'function') {
            return await handler(req, res);
        } else {
            console.error('Handler is not a function:', typeof handler);
            res.status(500).json({ error: 'Invalid handler' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
