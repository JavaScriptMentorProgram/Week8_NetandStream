const net = require('net');

/*net.connect({
  port:7171,
  host: '10.22.19.83'
});*/
let socketArr = [];
let people = [];

net.createServer((socket)=>{
  socketArr.push(socket);
  console.log("Someone is hiking in");
  socket.setEncoding('utf-8');
  let person = {
    name: 'A'+people.length,
    socket: socket
  }
  people.push(person);
  socket.on('readable',()=>{
    let chunk = socket.read();
    if(chunk == null){
      return;
    }

    if(chunk.startsWith('/name')){
      let arr = chunk.split(' ');
      let name = arr[1];
      people.forEach((personObject) => {
        if(personObject.socket === socket){
          personObject.name = name;
        }
      });
    }
    let socketName = null;
    people.forEach((personObject)=>{
      if(personObject.socket === socket){
        socketName = personObject.name;
      }
    });
    people.forEach((personObject)=>{
      personObject.socket.write(socketName+'/'+chunk+'\n');
    });
  });
  socket.on('end',()=>{
    console.log("disconneted");
    for(let i = 0; i< people.length; i++){
      if(people[i].socket === socket){
        people.splice(i,1);
      }
    }
  });
}).listen(7171);