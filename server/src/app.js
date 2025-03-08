
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",  
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials : true ,

}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//farmer routing
import farmerRoutes from "./routes/farmer.routes.js"; // Import the new routes

app.use("/api/farmers", farmerRoutes); // Register the route



// routing

import userRouter from "./routes/auth.routes.js"

app.use("/api/auth" , userRouter)

export {app}