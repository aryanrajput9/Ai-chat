import connectdb from './src/config/db.js';
import env from './src/config/env.js';
import app from './src/index.js';



function startServer() {
    connectdb()
    app.listen(env.port, () => {
        console.log(`server is running localhost ${env.port} ✅`)
    })
};

startServer()