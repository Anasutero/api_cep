'use strict';

/* para apagar as informaçoes que ja tem , para colocar as novas */
const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

/* para preencher o formulario */
const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}
 

/* para insirir quantos numeros deve ser inseridos e para identificar quando o usuario colocar letra */
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 


/* para mostrar que saiu do campo selecionado */
const pesquisarCep = async() => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url= `http://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
        const dados =  await fetch(url);
        const endereco = await dados.json();
    
     /* para quando o usuario colocar cep que nao existe  */
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value =  "CEP Não encontrado!";
        }else{
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value =  "CEP incorreto!";
    }   
}

/* pega um elemento cep e quando sair, vai acionar a função pesquisar cep */
document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);

 /* fetch(url).then(responde => responde.json()).then(console.log);o fetch retorna "promessa" ou seja e um retorno assincrono */       