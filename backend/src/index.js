import "dotenv/config"
import app from "./app.js";
import ConnectDB from "./db/db-Connect.js";
import ApiError from "./utils/APIError.js";


ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Started: http://localhost:${process.env.PORT}`);
    })
}).catch(() => {
    new ApiError(401, "Database connection Failed")
})

