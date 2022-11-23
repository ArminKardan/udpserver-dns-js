var udp = require('dgram');

var getDNS = (buffer)=>
{
  return new Promise(r=>
  {
    var client = udp.createSocket('udp4');
    client.on('message',(msg,info)=>
    {
      r(msg);
    });
    client.send(buffer, 53,'8.8.8.8',error=>{
      if(error)
      {
        console.log("error while sending to 8.8.8.8");
      }
    });
  })
}


var server = udp.createSocket('udp4');

server.on('message',async (msg,info)=>
{
  server.send(await getDNS(msg), info.port,info.address)
  // console.log('Data received from client : ' ,msg);
  // console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

//sending msg
// server.send(msg,info.port,'localhost',function(error){
//   if(error){
//     client.close();
//   }else{
//     console.log('Data sent !!!');
//   }
// });

});

server.bind(53);






