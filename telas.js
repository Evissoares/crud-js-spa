var indiceSelecionado
var usuarios = []
usuarios.push(
    {"nome": "a", "senha": "a", "cargo": "ADMIN"},
    {"nome": "g", "senha": "g", "cargo": "Gerente"},
    {"nome": "v", "senha": "v", "cargo": "Vendedor"}
    )
var marcas = []
var produtos = []
var usuarioLogado = []
var vendasRealizadas = []

function limparIndiceSelecionado(){
    indiceSelecionado = ''
}

// CARREGAR LISTAS DO LOCALSTORAGE
window.onload = function(){
    
    localStorage.setItem("usuarios", JSON.stringify(usuarios) )
    if (localStorage.getItem("usuarios") != null) {
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
        
    }

    if (localStorage.getItem("marcas") != null) {
        marcas = JSON.parse(localStorage.getItem("marcas"))   
        carregarDropDownMarcas()
        
    }
    
    if (localStorage.getItem("produtos") != null) {
        produtos = JSON.parse(localStorage.getItem("produtos"))
    }
}

function salvarNoLocalStorage(lista, nomeDaLista) {
    localStorage.setItem(nomeDaLista, JSON.stringify(lista))
}

// FUNÇÕES CRUD USUARIOS
function salvarUsuario() {
    let nome = document.getElementById('nome')
    let senha = document.getElementById('cadastrarSenha')
    let cargo = document.getElementById('dropDownCargo')

    if (nome.value == '') {
        nome.focus();

    } else if (senha.value == '') {
        senha.focus();

    } else if (cargo.value == '') {
        cargo.focus();

    }
    else {
        usuarios.push({
            "nome": nome.value,
            "senha": senha.value,
            "cargo": cargo.value
        });

        salvarNoLocalStorage(usuarios, "usuarios")
        listarUsuarios()

    }
}

function listarUsuarios() {

    var tabela = document.getElementById('dados-usuario');

    tabela.innerHTML = "";

    for (var i = 0; i < usuarios.length; i++) {

        if(usuarios[i].cargo == "ADMIN"){
            continue
        }

        var linha = tabela.insertRow(-1);
        var colunaNumero = linha.insertCell(0);
        var colunaNome = linha.insertCell(1);
        var colunaSenha = linha.insertCell(2);
        var colunaCargo = linha.insertCell(3);
        var colunaSelecionar = linha.insertCell(4);

        if(usuarioLogado.cargo == "Gerente"){
            if(usuarios[i].cargo == "Vendedor"){
                
                colunaNumero.innerHTML = i 
                colunaNome.innerHTML = usuarios[i].nome
                colunaSenha.innerHTML = usuarios[i].senha
                colunaCargo.innerHTML = usuarios[i].cargo
                colunaSelecionar.innerHTML =
                    `
                <th >
                <input type="button" value="editar" class="btn btn-warning col-12" style="width:40%" onclick="editarUsuario(${i})">
                <input type="button" value="deletar" class="btn btn-danger col-12" style="width:40%" onclick="deletarUsuario(${i})">
                </th>
                `
                continue
            }
        }else {
            colunaNumero.innerHTML = i
            colunaNome.innerHTML = usuarios[i].nome
            colunaSenha.innerHTML = usuarios[i].senha
            colunaCargo.innerHTML = usuarios[i].cargo
            colunaSelecionar.innerHTML =
                `
                <th >
                <input type="button" value="editar" class="btn btn-warning col-12" style="width:40%" onclick="editarUsuario(${i})">
                <input type="button" value="deletar" class="btn btn-danger col-12" style="width:40%" onclick="deletarUsuario(${i})">
                </th>
                `
        }
    }
}

function atualizarUsuario() {
    document.getElementById('btnCancelarEdicaoUsuario').style.display = 'inline-block'
    let nome = document.getElementById('nome')
    let senha = document.getElementById('cadastrarSenha')
    let cargo = document.getElementById('dropDownCargo')

    if (nome.value == '') {
        nome.focus();
    } else if (senha.value == '') {
        senha.focus();
    } else if (cargo.value == '') {
        cargo.focus();
    }else {

        usuarios[indiceSelecionado] = {
            'nome': nome.value,
            'senha': senha.value,
            'cargo': cargo.value
        }

        document.getElementById('btnSalvar').style.display = 'block'
        document.getElementById('btnAtualizarUsuario').style.display = 'none'
        document.getElementById('btnCancelarEdicaoUsuario').style.display = 'none'
        salvarNoLocalStorage(usuarios, "usuarios")
        listarUsuarios()
        limparIndiceSelecionado()
        nome.value = ""
        senha.value = ""
        cargo.value = ""
        nome.focus()

    }
}

function editarUsuario(indice) {
    document.getElementById('btnSalvar').style.display = 'none';
    document.getElementById('btnCancelarEdicaoUsuario').style.display = 'inline-block'
    document.getElementById('btnAtualizarUsuario').style.display = 'inline-block'

    indiceSelecionado = indice
    let nome = document.getElementById('nome')
    let senha = document.getElementById('cadastrarSenha')
    let cargo = document.getElementById('dropDownCargo')

    nome.value = usuarios[indice].nome
    senha.value = usuarios[indice].senha
    cargo.value = usuarios[indice].cargo

}

function cancelarEdicaoUsuario() {
    document.getElementById('btnSalvar').style.display = 'inline-block';
    document.getElementById('btnCancelarEdicaoUsuario').style.display = 'none'
    document.getElementById('btnAtualizarUsuario').style.display = 'none'
    document.getElementById('nome').value = ''
    document.getElementById('cadastrarSenha').value = ''
    document.getElementById('dropDownCargo').value = ''
    limparIndiceSelecionado()
}

function deletarUsuario(indice) {

    usuarios.splice(indice, 1);
    salvarNoLocalStorage(usuarios, "usuarios")
    listarUsuarios()

}

// FUNÇÕES CRUD MARCAS
function salvarMarca() {

    let marca = document.getElementById('marca')

    if (marca.value == '') {
        marca.focus();

    } else {
        marcas.push({
            "nome": marca.value,
        });

        salvarNoLocalStorage(marcas, "marcas")
        listarMarcas()
        carregarDropDownMarcas()
        marca.value = ''

    }
}

function listarMarcas() {

    var tabela = document.getElementById('dados-marcas');
    tabela.innerHTML = "";

    for (var i = 0; i < marcas.length; i++) {

        var linha = tabela.insertRow(-1);

        var colunaNumero = linha.insertCell(0);
        var colunaNome = linha.insertCell(1);
        var colunaSelecionar = linha.insertCell(2);

        colunaNumero.innerHTML = i + 1
        colunaNome.innerHTML = marcas[i].nome
        colunaSelecionar.innerHTML =
            `
        <th >
        <input type="button" value="editar" class="btn btn-warning col-12" style="width:40%" onclick="editarMarca(${i})">
        <input type="button" value="deletar" class="btn btn-danger col-12" style="width:40%" onclick="deletarMarca(${i})">
        </th>
        `
    }
}

function carregarDropDownMarcas(){
    dropDownMarcas = document.getElementById('dropDownMarca')            
        dropDownMarcas.innerHTML = `<option value="">Marcas</option>`
        
        for(let i = 0; i < marcas.length; i++){
            dropDownMarcas.innerHTML += `<option>${marcas[i].nome}</option>`
        }
}

function atualizarMarca() {
    document.getElementById('btnCancelarEdicaoMarca').style.display = 'inline-block'
    let marca = document.getElementById('marca')

    if (marca.value == '') {
        marca.focus();
    } else {

        marcas[indiceSelecionado] = {
            'nome': marca.value
        }

        salvarNoLocalStorage(marcas, "marcas")
        listarMarcas()
        carregarDropDownMarcas()
        limparIndiceSelecionado()
        marca.value = ""
    }

    document.getElementById('btnSalvarMarca').style.display = 'block'
    document.getElementById('btnAtualizarMarca').style.display = 'none'
    document.getElementById('btnCancelarEdicaoMarca').style.display = 'none'
}

function editarMarca(indice) {
    let marcaSelecionada = marcas[indice].nome

    for(let i = 0; i < produtos.length; i++){
        if(marcaSelecionada == produtos[i].marca){
            alert(`Marca em uso no produto ${produtos[i].nome}. Remova o produto para atualizar a marca.`)
            return
        }
    }

    let campoMarca = document.getElementById("marca")
    campoMarca.value = marcaSelecionada
    indiceSelecionado = indice

    document.getElementById('btnSalvarMarca').style.display = 'none';
    document.getElementById('btnCancelarEdicaoMarca').style.display = 'inline-block'
    document.getElementById('btnAtualizarMarca').style.display = 'inline-block'

}

function cancelarEdicaoMarca() {
    document.getElementById('btnSalvarMarca').style.display = 'inline-block';
    document.getElementById('btnCancelarEdicaoMarca').style.display = 'none'
    document.getElementById('btnAtualizarMarca').style.display = 'none'
    document.getElementById('marca').value = ''
    limparIndiceSelecionado()
}

function deletarMarca(indice) {
    let marcaSelecionada = marcas[indice].nome

    for(let i = 0; i < produtos.length; i++){
        if(marcaSelecionada == produtos[i].marca){
            alert(`Marca em uso no produto ${produtos[i].nome}. Remova o produto para deletar a marca.`)
            return
        }
    }
    
    marcas.splice(indice, 1);
    salvarNoLocalStorage(marcas, "marcas")
    listarMarcas()
    carregarDropDownMarcas()
}

// FUNÇÕES CRUD PRODUTOS
function salvarProduto() {

    let produto = document.getElementById('produto')
    let preco = document.getElementById('preco')
    let marca = document.getElementById('dropDownMarca')

    if (produto.value == '') {
        produto.focus();

    } else if (preco.value == '') {
        preco.focus();

    } else if (marca.value == '') {
        marca.focus();

    }
    else {
        produtos.push({
            "nome": produto.value,
            "preco": preco.value,
            "marca": marca.value
        });

        salvarNoLocalStorage(produtos, "produtos")
        listarProdutos()

    }
}

function listarProdutos() {

    var tabela = document.getElementById('dados-produtos');
    tabela.innerHTML = "";

    for (var i = 0; i < produtos.length; i++) {

        var linha = tabela.insertRow(-1);

        var colunaNumero = linha.insertCell(0);
        var colunaProduto = linha.insertCell(1);
        var colunaPreco = linha.insertCell(2);
        var colunaMarca = linha.insertCell(3)
        var colunaSelecionar = linha.insertCell(4);

        colunaNumero.innerHTML = i + 1
        colunaProduto.innerHTML = produtos[i].nome
        colunaPreco.innerHTML = produtos[i].preco
        colunaMarca.innerHTML = produtos[i].marca
        colunaSelecionar.innerHTML =
            `
            <th ><div class="col-12">
            <input type="button" value="editar" class="btn btn-warning col-12" style="width:40%" onclick="editarProduto(${i})">
            <input type="button" value="deletar" class="btn btn-danger col-12" style="width:40%" onclick="deletarProduto(${i})">
            </th>
            `
    }
}

function atualizarProduto() {
    document.getElementById('btnCancelarEdicaoProduto').style.display = 'inline-block'
    let produto = document.getElementById('produto')
    let preco = document.getElementById('preco')
    let marca = document.getElementById('dropDownMarca')

    if (produto.value == '') {
        produto.focus();
    } else if (preco.value == '') {
        preco.focus();
    } else if (marca.value == '') {
        preco.focus();
    } else {
        produtos[indiceSelecionado] = {
            'nome': produto.value,
            'preco': preco.value,
            'marca': marca.value
        }

        salvarNoLocalStorage(produtos, "produtos")
        listarProdutos()
        produto.value = ""
        preco.value = ""
        marca.value = ""
    }

    document.getElementById('btnSalvarProduto').style.display = 'block'
    document.getElementById('btnAtualizarProduto').style.display = 'none'
    document.getElementById('btnCancelarEdicaoProduto').style.display = 'none'
}

function editarProduto(indice) {

    document.getElementById('btnSalvarProduto').style.display = 'none';
    document.getElementById('btnCancelarEdicaoProduto').style.display = 'inline-block'
    document.getElementById('btnAtualizarProduto').style.display = 'inline-block'

    indiceSelecionado = indice
    let produto = document.getElementById('produto')
    let preco = document.getElementById('preco')
    let marca = document.getElementById('dropDownMarca')
    produto.value = produtos[indice].nome
    preco.value = produtos[indice].preco
    marca.value = produtos[indice].marca

}

function cancelarEdicaoProduto() {
    document.getElementById('btnSalvarProduto').style.display = 'inline-block';
    document.getElementById('btnCancelarEdicaoProduto').style.display = 'none'
    document.getElementById('btnAtualizarProduto').style.display = 'none'

    document.getElementById('produto').value = ''
    document.getElementById('preco').value = ''
    document.getElementById('dropDownMarca').value = ''
    limparIndiceSelecionado()
}

function deletarProduto(indice) {
    produtos.splice(indice, 1);
    salvarNoLocalStorage(produtos, "produtos")
    listarProdutos();
}

// FUNÇÕES DE VENDAS

function carregarTabelaVendas(){

    let tabela = document.getElementById('dados-vendas');
    tabela.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        var linha = tabela.insertRow(-1);

        var colunaNumero = linha.insertCell(0);
        var colunaProduto = linha.insertCell(1);
        var colunaPreco = linha.insertCell(2);
        var colunaMarca = linha.insertCell(3)
        var colunaSelecionar = linha.insertCell(4);

        colunaNumero.innerHTML = i + 1
        colunaProduto.innerHTML = produtos[i].nome
        colunaPreco.innerHTML = produtos[i].preco
        colunaMarca.innerHTML = produtos[i].marca
        colunaSelecionar.innerHTML =
            `
            <th >
            <input type="button" value="Vender" class="btn btn-success col-12" style="width:40%" onclick="vender(${i})">
            </th>
            `
    }
}

function vender(indice){
    vendasRealizadas.push({
        vendedor: usuarioLogado.nome,
        produto: produtos[indice].nome,
        marca: produtos[indice].marca,
        preco: produtos[indice].preco,
    })

    salvarNoLocalStorage(vendasRealizadas, "vendas-realizadas")
    
}

function carregarVendasRealizadas(){
    if (localStorage.getItem("vendas-realizadas") != null) {
        vendasRealizadas = JSON.parse(localStorage.getItem("vendas-realizadas"))   
        
    }
}

function carregarEstatisticas(){ 
    carregarVendasRealizadas()
    var tabela = document.getElementById('dados-vendas-realizadas')
    tabela.innerHTML = ""
    var totalVendido = 0
    for (let i = 0; i < usuarios.length; i++) {
        var vendedor = usuarios[i].nome
        for(let j = 0; j < vendasRealizadas.length; j++){

            if(vendasRealizadas[j].vendedor == vendedor){
                totalVendido += parseFloat(vendasRealizadas[j].preco.replace(",", "."))
            }

        }

        var linha = tabela.insertRow(-1);

        var colunaNumero = linha.insertCell(0);
        var colunaVendedor = linha.insertCell(1);
        var colunaTotalVendas = linha.insertCell(2);
        var colunaSelecionar = linha.insertCell(3);

        colunaNumero.innerHTML = i + 1
        colunaVendedor.innerHTML = vendedor
        colunaTotalVendas.innerHTML = "R$" + totalVendido.toFixed(2)
        colunaSelecionar.innerHTML =
            `
            <td>
            <input type="button" value="listar vendas" class="btn btn-success col-12" style="width:40%" onclick="listarVendasPorVendedor(${i})">
            </td>
            `
    }

}

function listarVendasPorVendedor(indice){
    var tabela = document.getElementById('vendas-por-vendedor')
    tabela.innerHTML = ""
    
    for(let i = 0; i < vendasRealizadas.length; i++){
       console.log(vendasRealizadas[i].vendedor == usuarios[indice].nome)
       console.log("PASSEI AQUI " + i + " VEZES")
        if(vendasRealizadas[i].vendedor == usuarios[indice].nome){

            var linha = tabela.insertRow(-1);

            var colunaVendedor = linha.insertCell(0);
            var colunaProduto = linha.insertCell(1);
            var colunaMarca = linha.insertCell(2);
            var colunaPreco = linha.insertCell(3);

            colunaVendedor.innerHTML = usuarios[indice].nome
            colunaProduto.innerHTML = vendasRealizadas[i].produto
            colunaMarca.innerHTML = vendasRealizadas[i].marca
            colunaPreco.innerHTML = "R$" + vendasRealizadas[i].preco
        }
        
    }
    
    fecharEstatisticas()
    abrirRelatorioVendas()

}


// OPÇÕES DE TELAS

function logar() {
    let login = document.getElementById('login').value
    let senha = document.getElementById('senha').value

        for (let i = 0; i < usuarios.length; i++) {
            if (login == usuarios[i].nome && senha == usuarios[i].senha) {
                if (usuarios[i].cargo ==  "ADMIN") {
                    usuarioLogado = usuarios[i]
                    abrirPainelAdmin()
                    fecharLogin()
                    habilitarSair()
                
                }else if (usuarios[i].cargo == "Gerente") {
                    usuarioLogado = usuarios[i]
                    abrirPainelGerente()
                    fecharLogin()
                    habilitarSair()

                } else if (usuarios[i].cargo == "Vendedor") {
                    usuarioLogado = usuarios[i]
                    abrirPainelVendedor()
                    fecharLogin()
                    habilitarSair()
                }

            }
        }
    listarUsuarios();
    listarMarcas()
    listarProdutos()
    document.getElementById("login").value = ''
    document.getElementById("senha").value = ''
}

function sair(){
    document.getElementById("sair").style.display = "none"
    document.getElementById("login-form").style.display = "block"
    fecharTodosOsCruds()
    fecharTodosOsPaineis()
    desabilitarVoltar()
}

function fecharLogin(){
    document.getElementById("login-form").style.display = "none"
}

function abrirLogin(){
    document.getElementById("login-form").style.display = "block"
}

function habilitarSair(){
    document.getElementById("sair").style.display = "inline-block"
    
}

function habilitarVoltar(){
    document.getElementById("voltar").style.display = "inline-block"
}
function desabilitarVoltar(){
    document.getElementById("voltar").style.display = "none"
}

function habilitarCriarGerente(){
    document.getElementById("criarGerente").style.display = "block"
}

function desabilitarCriarGerente(){
    document.getElementById("criarGerente").style.display = "none"
}

function voltar(){
    fecharTodosOsCruds()
    if(usuarioLogado.cargo == "ADMIN"){
        abrirPainelAdmin()
        desabilitarVoltar()
        return
    }
    if(usuarioLogado.cargo == "Gerente"){
        abrirPainelGerente()
        desabilitarVoltar()
        return
    }
    if(usuarioLogado.cargo == "Vendedor"){
        abrirPainelVendedor()
        desabilitarVoltar()
        return
    }
    
}

function fecharTodosOsCruds(){
    fecharCrudUsuarios()
    fecharCrudMarcas()
    fecharCrudProdutos()
    fecharCrudVendas()
    fecharEstatisticas()
    fecharRelatorioVendas()
}

function fecharTodosOsPaineis(){
    fecharPainelAdmin()
    fecharPainelGerente()
    fecharPainelVendedor()
}

// TELAS DE GERENCIAMENTO 
function gerenciarUsuarios(){
    fecharTodosOsPaineis()
    habilitarVoltar()
    abrirCrudUsuarios()
}

function gerenciarMarcas(){
    fecharTodosOsPaineis()
    habilitarVoltar()
    abrirCrudMarcas()
}

function gerenciarProdutos(){
    fecharTodosOsPaineis()
    habilitarVoltar()
    abrirCrudProdutos()
}

function venderProdutos(){
    fecharTodosOsPaineis()
    habilitarVoltar()
    abrirCrudVendas()
}

function exibirEstatisticas(){
    fecharTodosOsPaineis()
    habilitarVoltar()
    abrirEstatisticas()
}

// ABRIR E FECHAR OPÇÕES

// USUARIOS
function abrirCrudUsuarios(){
    document.getElementById("crud-usuarios").style.display = "block"
}
function fecharCrudUsuarios(){
    document.getElementById("crud-usuarios").style.display = "none"
}

// MARCAS
function abrirCrudMarcas(){
    document.getElementById("crud-marcas").style.display = "block"
}
function fecharCrudMarcas(){
    document.getElementById("crud-marcas").style.display = "none" 
}

// PRODUTOS
function abrirCrudProdutos(){
    document.getElementById("crud-produtos").style.display = "block"
}
function fecharCrudProdutos(){
    document.getElementById("crud-produtos").style.display = "none" 
}

// VENDAS
function abrirCrudVendas(){
    carregarTabelaVendas()
    document.getElementById("crud-vendas").style.display = "block"
}
function fecharCrudVendas(){
    document.getElementById("crud-vendas").style.display = "none" 
}

// ESTATISTICAS
function abrirEstatisticas(){
    carregarEstatisticas()
    document.getElementById("estatisticas").style.display = "block"
}
function fecharEstatisticas(){
    document.getElementById("estatisticas").style.display = "none"
}

function abrirRelatorioVendas(){
    document.getElementById("relatorio-vendas").style.display = "block"
}
function fecharRelatorioVendas(){
    document.getElementById("relatorio-vendas").style.display = "none"
}


// OPÇÕES DE ADMINISTRADOR
function abrirPainelAdmin(){
    habilitarCriarGerente()
    document.getElementById("opcoes-admin").style.display = 'block'
}

function fecharPainelAdmin(){
    document.getElementById("opcoes-admin").style.display = 'none'
}

// OPÇÕES DE GERENTE
function abrirPainelGerente(){
    fecharLogin()
    document.getElementById("opcoes-gerente").style.display = 'block'
    desabilitarCriarGerente()
}
function fecharPainelGerente(){
    document.getElementById("opcoes-gerente").style.display = 'none'
}

// OPÇÕES DE VENDEDOR
function abrirPainelVendedor(){
    fecharLogin()
    document.getElementById("opcoes-vendedor").style.display = 'block'
}
function fecharPainelVendedor(){
    document.getElementById("opcoes-vendedor").style.display = 'none'
}



