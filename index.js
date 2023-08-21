const fs = require('fs')
const http = require('http');
const url = require('url');

/* Es lo que va al final de la url, es como un indicador más breve xd */
const slugify = require('slugify')

const replaceTemplate = require('./modules.js/replaceTemplate.js')

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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

/* EL punto "." es donde se ejecuta la acción y el __dirname es donde se encuentra la carpeta actual */
const dataObject = JSON.parse(data)

/* const slugs = dataObject.map(ele => slugify(ele.productName, { lower: true}))
console.log(slugs); */

console.log(slugify('Aguacates frescos xd', { lower: true}));

const server =  http.createServer((req,res)=>{
    
    const { query, pathname } = url.parse(req.url, true)

    if(pathname === "/" || pathname === "/overview" ){
        res.writeHead(200, {'Content-type':'text/html'});

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output);

    }else  if(pathname === "/product"){
        res.writeHead(200, {'Content-type':'text/html'});

        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);


    }else if(pathname === "/api"){
        res.writeHead(200, {'Content-type':'application/json'})
        res.end(data);
    }else{
        /* Un encabezado http wa basicamente una información sobre la respuesta que estamos enviando */
        res.writeHead(404,'utf-8',{
            'Content-type':'text/html',
            'my-own-header': 'hello-word'
        });
        res.end('<h1>Página no encontrada papá</h1>');
    }
})

server.listen(8000,'localhost', ()=>{
    console.log('Se escuchan las respuestas desde el servidor 8000');
})
