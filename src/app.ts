import e from "express";
import nbaRouter from "./routes/nbaRouter.js";
import followGamesRouter from "./routes/followGameRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors"

export const app = e()

app.use(cors({
  origin: "*"
}));

app.use(e.json())

app.use(userRouter)
app.use(nbaRouter)
app.use(followGamesRouter)