import { app } from "./app.js";
import { dataSource } from "./conf/db_conf.js";

app.listen(3000, async ()=>{
  try {
    await dataSource.initialize()
    console.log("base de datos prendida.")
    console.log(`Server escuchando: http://localhost:3000`)
    
  } catch (error) {
    console.log("Problema al iniciar la base de datos.")
  }
})