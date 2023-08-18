const fs = require('fs')
const http = require('http');
const { dirname } = require('path');
const url = require('url')

/* -------------------- manera sincrona --------------- */
/* fs: Significa  - File System */
/* lee archivos asincronamente */
// let textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
/* console.log(textIn); */

/* Escribimos en archivos o editamos archivos */
// const textOut =  `Hola amigos de youtube ${textIn} \nHola perros la fecha de hoy es ${new Date()}`;
// console.log(textOut);

/* fs.writeFileSync('./txt/output.txt', textOut) */


/* -------------------- manera asincrona --------------- */
/* fs.readFile('./txt/start.txt', 'utf-8', (error, data1)=>{
    if(error) return console.log('Error mi rey xd');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2)=>{
        console.log(data2);
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3)=>{
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2},\n${data3}`, 'utf-8', error=>{
                console.log('El archivo a sido escrito 🤧');
            })
        })
    })
})
console.log('Buena amigos de youtube'); */




/* --------------------------------------------- */
/* ------------- PRIMER SERVIDOR --------------- */
/* Codigo de nivel superior es decir solo se ejecuta una vez y hay muere xd, no se reinicia ni nada */
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
/* EL punto "." es donde se ejecuta la acción y el __dirname es donde se encuentra la carpeta actual */
const dataObject = JSON.parse(data)

const server =  http.createServer((req,res)=>{
    console.log(req.url);

    const pathName = req.url

    if(pathName === "/" || pathName === "/overview" ){
        res.end('Hola mi so estamos en overview');
    }else  if(pathName === "/product"){
        res.end('Hola mi so estamos en el producto');
    }else if(pathName === "/api"){
        res.writeHead(200, {'Content-type':'application/json'})
        res.end(data);
    }else{
        /* Un encabezado http wa basicamente una información sobre la respuesta que estamos enviando */
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header': 'hello-word'
        });
        res.end('<h1>Página no encontrada papá</h1>');
    }
})

server.listen(8000,'localhost', ()=>{
    console.log('Se escuchan las respuestas desde el servidor 8000');
})
