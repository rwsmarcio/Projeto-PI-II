
let bodyElemento = document.querySelector("body");
let tabelaElemento = document.querySelector("#tabela");
let formElemento = document.querySelector("#formulario");


bodyElemento.onload = function() {
    console.log("Carregando tabela de produtos");
    buscarLivros();
    //setInterval(buscarPorId, 5000);
    montarFormularioLivros();
}

let cont = 1;

function buscarLivros() {
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
    tabelaElemento.innerHTML = tabela;
}

// OK

function montarFormularioLivros() {
    const formulario = `<form id="formLivros">
        <th>
            <label for='tituloInput'>Título</label>
            <input id='tituloInput'> <br/>
            <label type='number' for='autor_idInput'>Autor ID: </label>
            <input id='autor_idInput'> <br/>
            <label for='editoraInput'>Editora:</label>
            <input id='editoraInput'> <br/>
            <label type='number' for='qtdInput'>Quantidade:</label>
            <input id='qtdInput'> <br/>
            <label type='number' for='disponivelInput'>Disponíveis:</label>
            <input id='disponivelInput'> <br/>
            <input type="submit" value="Enviar">
        </th>
    </fom>`;

    formElemento.innerHTML = formulario;

    const formLivros = document.querySelector("#formLivros");
    formLivros.onsubmit = function(event) {
        event.preventDefault();
        const tituloValue = document.querySelector("#tituloInput");
        const autor_idValue = document.querySelector("#autor_idInput");
        const editoraValue = document.querySelector("#editoraInput");
        const qtdValue = document.querySelector("#qtdInput");
        const disponivelValue = document.querySelector("#disponivelInput");
        if(tituloValue.value && autor_idValue.value && editoraValue.value && qtdValue.value && disponivelValue.value) {
            let livro = new Object();
            livro.titulo = tituloValue.value;
            livro.autor_id = +autor_idValue.value;
            livro.editora = editoraValue.value;
            livro.qtd = +qtdValue.value;
            livro.disponivel = +disponivelValue.value;
            console.log(livro);
            //chamada AJAX
            inserirLivro(livro);
            tituloInput.value="";
            autor_idInput.value="";
            editoraInput.value="";
            qtdInput.value="";
            disponivelInput.value="";
        }
        else {
        alert("Todos os campos são obrigatórios, exceto editora!");
        }
    }
}
    
function inserirLivro(livro) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const livro = JSON.parse(this.responseText);
        alert(`Livro ${livro.livro_id} cadastrado com sucesso!`);
        buscarLivros();
    }
    xhttp.open("POST", "http://localhost:3000/livros", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(livro));
}
