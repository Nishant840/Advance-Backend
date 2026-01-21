
import { GameManager } from "./store.js";

export function startLogger(){
    setInterval(()=>{
        GameManager.getInstance().log();
    },5000)
}