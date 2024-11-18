var empresaModel = require("../models/empresaModel");

function buscarOficina(req, res) {
  var idUsuario = req.params.idUsuario;

  empresaModel.buscarOficina(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrarVeiculo(req, res) {
  var idCliente = req.body.idCliente;
  var marca = req.body.marca;
  var modelo = req.body.modelo;
  var ano = req.body.ano;
  var placa = req.body.placa;

  empresaModel.cadastrarVeiculo(idCliente, marca, modelo, ano, placa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao cadastrar o veículo do Cliente: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrarCliente(req, res) {
  chkEmpresa = req.body.chkEmpresa;
  idMecanico = req.body.idMecanico;
  nome = req.body.nome;
  email = req.body.email;
  telefone = req.body.telefone;
  cpf = req.body.cpf;
  empresa = req.body.empresa;
  cnpj = req.body.cnpj;

  empresaModel.cadastrarCliente(idMecanico, nome,email, telefone, cpf).then((resultado) => {

      console.log('Passei o Cadastro do Cliente, indo pro Buscar Cliente')

      if (chkEmpresa == true) {
        empresaModel.buscarCliente(cpf)
        .then((resultadoCliente) => {
          if (resultadoCliente.length > 0) {
            res.status(200).json(resultadoCliente);
            
            var idCliente = resultadoCliente[0].idCliente;
            empresaModel.cadastrarEmpresa(idCliente, empresa, cnpj)
            .then((resultadoCliente) => {
              if (resultadoCliente.length > 0) {
                res.status(200).json(resultadoCliente);
      
              } else {
                res.status(204).json([]);
              }
      
            }).catch(function (erro) {
              console.log(erro);
              console.log("Houve um erro ao cadastrar a empresa do Cliente: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
            });
  
          } else {
            res.status(200).json(resultado);
          }
  
        }).catch(function (erro) {
          console.log(erro);
          console.log("Houve um erro ao select no ID do Cliente: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }); 
      } else {
        console.log('Cliente não possuí empresa')
        res.status(204).json([]);
      }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao cadastrar o Cliente: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  var id = req.body.id;

  empresaModel.listar(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.query.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  cadastrarVeiculo,
  cadastrarCliente,
  buscarOficina,
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
