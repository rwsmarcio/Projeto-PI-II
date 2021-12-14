
let body = document.querySelector("body");
let main = document.querySelector("main");


body.onload = function() {
    console.log("Carregando tabela de produtos");
    buscarPorId();
    setInterval(buscarPorId, 5000);
};

let cont = 1;

/*
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
}*/

function buscarPorId() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const listaLivros = JSON.parse(this.responseText);
        montarTabelaLivros(listaLivros);  
    }
    xhttp.open("GET", "http://localhost:3000/livros", true);
    xhttp.send();
}

function montarTabelaLivros(listaLivros) {
    let tabela = `<table>
        <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>autor</th>
            <th>editora</th>
            <th>Quantidade</th>
            <th>Disponíveis</th>
        </tr>`;
    for(let i=0; i<listaLivros.length; i++) {
        tabela += `
        <tr>
            <td>${listaLivros[i].livro_id}</td>
            <td>${listaLivros[i].titulo}</td>
            <td>${listaLivros[i].autor_id}</td>
            <td>${listaLivros[i].editora}</td>
            <td>${listaLivros[i].qtd}</td>
            <td>${listaLivros[i].disponivel}</td>
        </tr>`;
    }
    tabela += `</table>`;
    main.innerHTML = tabela;
}