var database = require("../database/config");

function buscarOficina(idUsuario) {

  var instrucaoSql = `SELECT nome FROM oficina WHERE fkUsuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarCliente(cpf) {

  var instrucaoSql = `SELECT idCliente FROM cliente WHERE cpf = ${cpf};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarVeiculo(idCliente, marca, modelo, ano, placa) {

  var instrucaoSql = `INSERT INTO veiculo (fkCliente, marca, modelo, ano, placa) VALUES 
(${idCliente}, '${marca}', '${modelo}', '${ano}', '${placa}');`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarCliente(idMecanico, nome,email, telefone, cpf) {

  var instrucaoSql = `INSERT INTO cliente (fkOficina, nome, email, telefone, cpf) VALUES 
    (${idMecanico}, '${nome}', '${email}', '${telefone}', '${cpf}');`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(idCliente, empresa, cnpj) {

  var instrucaoSql = `INSERT INTO empresa (razaoSocial, cnpj, fkDono) VALUES 
    ('${empresa}', '${cnpj}', ${idCliente});`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar(id) {
  var instrucaoSql = `SELECT idCliente, nome FROM cliente WHERE fkOficina = ${id};`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrarVeiculo,cadastrarCliente, cadastrarEmpresa, buscarOficina, buscarCliente, buscarPorCnpj, buscarPorId, cadastrar, listar };
