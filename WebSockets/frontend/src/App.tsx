import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [socket, setSocket] = useState<null | WebSocket>(null)
    const [latestMessage, setlatestMessage] = useState<string>("")
    const [Message, setMessage] = useState<string>("")
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = ()=>{
            console.log("connected");
            setSocket(socket)
        }
        socket.onmessage = (message)=>{
            console.log("Recieved Message:", message.data);
            setlatestMessage(message.data);
        }
        return ()=>{
            socket.close()
        }
    },[])
    if(!socket){
        return <div>
            Conecting to socket server...
        </div>
    }
    return (
        <div>
            <input type="text" onChange={(e)=>{
                setMessage(e.target.value);
            }} />
            <br /><br />
            <button onClick={()=>{
                socket.send(Message)
            }} >send</button>
            <br /><br />
            {latestMessage}
        </div>
    )
}

export default App
