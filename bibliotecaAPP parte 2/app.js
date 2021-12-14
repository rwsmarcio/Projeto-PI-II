
let body = document.querySelector("body");
let main = document.querySelector("main");

/*
body.onload = function() {
    console.log("Carregando Tabela de Livros");
    setInterval(buscarPorId, 5000);
}

let cont = 1;

function buscarPorId() {
    console.log(cont++);
}
*/



body.onload = function() {
    console.log("Carregando tabela de produtos");
    buscarPorId();
    setInterval(buscarPorId, 5000);
};

let cont = 1;

function buscarPorId() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const listaLivros = JSON.parse(this.responseText);
        //main.innerHTML = listaLivros.lengh;
        let lista = `<ul>`;
        for(let i = 0; i < listaLivros.length; i++)
        {
            lista += `<li>${listaLivros[i].titulo}</li>`
        }
        lista += `</ul>`
        main.innerHTML = lista;
        
    }
    xhttp.open("GET", "http://localhost:3000/livros", true);
    xhttp.send();
}