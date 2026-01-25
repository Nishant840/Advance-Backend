import { useEffect, useState } from "react"


export function Sender(){
    const [socket,setScoket] = useState<WebSocket|null> (null)

    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = ()=>{
            socket.send(JSON.stringify({type: "sender"}));
        }
        setScoket(socket);
    },[])
    async function startSendingVideo(){
        if(!socket) return;

        const pc = new RTCPeerConnection();
        pc.onnegotiationneeded = async ()=>{
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({type:"createOffer", sdp:pc.localDescription}))
        }

        pc.onicecandidate = (event)=>{
            if(event.candidate){
                socket.send(JSON.stringify({type:'iceCandidate', candidate:event.candidate}));
            }
        }

 
        socket.onmessage = async (event)=>{
            const data = JSON.parse(event.data);
            if(data.type == "createAnswer"){
                pc.setRemoteDescription(data.sdp);
            }
            else if(data.type == 'iceCandidate'){
                pc.addIceCandidate(data.candidate);
            }
        }

        const stream = await navigator.mediaDevices.getUserMedia({video:true, audio: false});
        pc.addTrack(stream.getVideoTracks()[0]);
    }
    return <div>
        Sender
        <button onClick={startSendingVideo} >Send video</button>
    </div>
}