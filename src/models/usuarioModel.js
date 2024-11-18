var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nomeCompleto, email, telefone FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUser(nomeUser, email, senha, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeUser, email, senha, telefone);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nomeCompleto, email, senha, telefone) VALUES ('${nomeUser}', '${email}', '${senha}', '${telefone}');
        `;
        
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(nomeEmpresa, cnpj, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, cnpj);

    var instrucaoSql = `
        INSERT INTO oficina (nome, cnpj, fkUsuario) VALUES ('${nomeEmpresa}', ${cnpj}, ${id});
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)        
}

function capturarIdUsuario(nomeUser, email, senha) {
    console.log('Capturando o ID do Usuário');

    var instrucaoSql = `
        SELECT idUsuario FROM usuario WHERE nomeCompleto = '${nomeUser}' and email = '${email}' and senha = '${senha}';
        `;

        console.log('Executando o select: ', instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrarUser,
    cadastrarEmpresa,
    capturarIdUsuario
};
