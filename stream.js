const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();

// const out = fs.createWriteStream(process.argv[2]);

/*process.stdin.on('data', (chunk) => {
  // process.stdout.write(chunk);
  // out.write(chunk);

});*/

const inp = fs.createReadStream(process.argv[2]);
const out = fs.createWriteStream(process.argv[3]);
inp.pipe(gzip).pipe(out);


// inp.setEncoding('utf-8');

// let numSpace = 0;

// /*floaing mode*/
// inp.on('data', (chunk) => {
//   // console.log(chunk);
//   chunk.split('').forEach((c) =>{
//     if(c === ' '){
//       numSpace++;
//     }
//   })
// });


// /*none-floating mode*/
// inp.on('readable', () => {
//   const chunk = inp.read();

//   if(chunk === null){
//     return;
//   }
//   chunk.split('').forEach((c) =>{
//     if(c === ' '){
//       numSpace++;
//     }
//   })

// });

// inp.on('end', () =>{
//   console.log(`there are ${numSpace} space`);
// });