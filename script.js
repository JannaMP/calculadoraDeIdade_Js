

function calcularIdade(event) { // "event" carrega informações sobre eventos que ocorrem na interação do usuário com a página 
event.preventDefault() // estou dando um comando para que o navegador nao siga o padrao que geralmente segue ao executar o evento

console.log("foi executada a funcao calcular")

let usuario = receberInformacoes()

let idade = calcularIdade (usuario.ano)

let faixaEtaria = calcularFaixaEtaria(idade)

usuario = organizarDados(usuario, idade, faixaEtaria)

cadastrarUsuario(usuario)

carregarUsuarios()

}

function receberInformacoes () {
    let nomeRecebido = document.getElementById ("nome").value.trim()
    let diaRecebido = document.getElementById ("dia-nascimento").value
    let mesRecebido = document.getElementById ("mes-nascimento").value
    let anoRecebido = document.getElementById ("ano-nascimento").value

    
    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaRecebido,
        mes: mesRecebido,
        ano: anoRecebido   
    }

    console.log(dadosUsuario)

    return dadosUsuario
}


// calculo: pegar a data de nasc do usuario > obter a data atual > calcular a diferenca entre as datas = pegar o ano atual e subtrair do ano da data informada


function calcularIdadeAtualizada(ano) { 
    let dataAtual = new Date().getFullYear(); // obter o ano atual

    let idade = dataAtual - ano; // calculo da idade

    return idade;
}

function calcularFaixaEtaria(idade) {

    if(idade >= 0 && idade <= 12){
        console.log("Criança")
        return "Criança"

    } else if(idade >= 13 && idade <= 17){
        console.log("Adolescente")
        return "Adolescente"

    } else if(idade >= 18 && idade <= 65){
        console.log("Adulto")
        return "Adulto"

    } else if(idade > 65){
        console.log("Idoso")
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, idade, faixaEtaria){
    let dadosUsuarioAtualizado = {
        ...dadosUsuario, // operador de espalhamento, esta criando uma copia do objeto dentro dessa let
        idade: idade,
        faixaEtaria: faixaEtaria,
    }

    return dadosUsuarioAtualizado
}

function cadastrarUsuario (dadosUsuario) {
    let listaUsuarios = [] // Array para armazenar os usuários cadastrados

    // Carregar a lista de usuários já cadastrados no localStorage
    if (localStorage.getItem("usuariosCadastrados") !== null) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));   
    }

    listaUsuarios.push(dadosUsuario)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
         
    }

function carregarUsuarios() {
     let listaUsuarios = [];
    
    if (localStorage.getItem("usuariosCadastrados")) {
            listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
        }
    
    if (listaUsuarios.length == 0) {
            let tabela = document.getElementById("corpo-tabela");
    
            tabela.innerHTML = ` <tr class="linha-mensagem"> <td colspan="6">Nenhum usuário cadastrado! :(</td> </tr> `
        } else {
    
            montarTabela(listaUsuarios);
        }
    
    }
    
    window.addEventListener('DOMContentLoaded', () => carregarUsuarios()); //chamar ao carregar a página
    
    
  
    
    function montarTabela(listaDeCadastrados) {
        let tabela = document.getElementById("corpo-tabela");
        let template = '';
    
        listaDeCadastrados.forEach(usuario => {
            template +=
                `<tr>
                    <td data-cell="nome">${usuario.nome}</td>
                    <td data-cell="data de nascimento">${usuario.ano}</td>
                    <td data-cell="idade">${usuario.idade}</td>
                    <td data-cell="faixa etária">${usuario.faixaEtaria}</td>
                 </tr>`;
        });
    
        tabela.innerHTML = template;
    }
    