import { startLogger } from "./logger.js"
import { games } from "./store.js"


startLogger();
setInterval(()=>{
    games.push({
        id: Math.random().toString(),
        whitePlayerName: "Nishant",
        blackPlayerName: "Chhotu",
        moves:[]
    })
},5000)
