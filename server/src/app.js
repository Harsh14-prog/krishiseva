
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
import farmerRoutes from "./routes/farmer.routes.js";
app.use("/api/farmer", farmerRoutes); // Register the route

// authentication routing

import userRouter from "./routes/auth.routes.js"
app.use("/api/auth" , userRouter)

// room routes
import roomRoutes from "./routes/room.routes.js"
app.use("/api/room" ,roomRoutes )

export {app}