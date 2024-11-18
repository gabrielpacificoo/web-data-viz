var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/:empresaId", function (req, res) {
  empresaController.buscarOficina(req, res);
});

router.put("/cadastrarVeiculo", function (req, res) {
  empresaController.cadastrarVeiculo(req, res);
});

router.post("/cadastrarCliente", function (req, res) {
  empresaController.cadastrarCliente(req, res);
});

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.post("/listar", function (req, res) {
  empresaController.listar(req, res);
});


module.exports = router;