var usuarioModel = require("../models/usuarioModel");
var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // if (email == undefined) {
    //     res.status(400).send("Seu email está undefined!");
    // } else if (senha == undefined) {
    //     res.status(400).send("Sua senha está indefinida!");
    // } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        console.log(resultadoAutenticar[0].idUsuario)

                        empresaModel.buscarOficina(resultadoAutenticar[0].idUsuario)
                        .then(
                            function(resultadoOficinas) {
                                console.log(`\nResultado oficinas: ${JSON.stringify(resultadoOficinas)}`)
                                res.json({
                                    id: resultadoAutenticar[0].idUsuario,
                                    email: resultadoAutenticar[0].email,
                                    nome: resultadoAutenticar[0].nomeCompleto,
                                    senha: resultadoAutenticar[0].senha,
                                    empresa: resultadoOficinas[0].nome
                                });
                            }
                        )
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

// }

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;
    var cnpj = req.body.cnpjServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores
    // if (nome == undefined) {
    //     res.status(400).send("Seu nome está undefined!");
    // } else if (email == undefined) {
    //     res.status(400).send("Seu email está undefined!");
    // } else if (senha == undefined) {
    //     res.status(400).send("Sua senha está undefined!");
    // } else if (fkEmpresa == undefined) {
    //     res.status(400).send("Sua empresa a vincular está undefined!");  
    // } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUser(nome, email, senha, telefone)
            .then(
                function (resultadoUser) {
                    console.log("\nCadastro de Usuário Realizado")
                    usuarioModel.capturarIdUsuario(nome, email, senha)
                    .then(
                        function(resultadoSelectUser) {
                            var idUser = resultadoSelectUser[0].idUsuario;
                            usuarioModel.cadastrarEmpresa(empresa, cnpj, idUser) 
                            .then(
                                function (resultadoEmpresa) {
                                    console.log("\nCadastro de Empresa Realizado");
                                    res.json(resultadoUser);
                                    res.json(resultadoEmpresa);
                                }
                            ) .catch(
                                function (erro) {
                                    console.log(erro);
                                    console.log(
                                        "\nHouve um erro ao realizar o cadastro da Empresa! Erro: ",
                                        erro.sqlMessage
                                    );
                                    res.status(500).json(erro.sqlMessage);                        
                                }
                            )
                        }
                    )
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
// }

module.exports = {
    autenticar,
    cadastrar
}