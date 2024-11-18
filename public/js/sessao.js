// sessão
function validarSessao() {
  var email = sessionStorage.EMAIL_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;

  var b_usuario = document.getElementById("b_usuario");

  if (email != null && nome != null) {
    b_usuario.innerHTML = nome;
  } else {
    window.location = "../acess.html";
  }
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "../index.html";
}

function switchInput() {
  var password = input_password;
  var confirm = input_confirm;

  if (password.type === "password") {
    password.type = "text";
    confirm.type = "text";
  } else {
    confirm.type = "password";
    password.type = "password";
  }
}

function switchCheckBox() {
  var checkBox = input_toEmpresa;

  if (checkBox.checked == false) {
    containerEmpresa.style.display = "none";
    containerCNPJ.style.display = "none";
    txtEmpresa1.style.display = "none";
    txtEmpresa2.style.display = "none";
  } else {
    containerEmpresa.style.display = "flex";
    containerCNPJ.style.display = "flex";
    txtEmpresa1.style.display = "flex";
    txtEmpresa2.style.display = "flex";
  }
}

// carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }

// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";

//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }

function redirect(way, page) {
  document.location.href = way;

  if (page == "login") {
    acess.style.display = "flex";
    signin.style.display = "none";
  } else if (page == "signin") {
    acess.style.display = "none";
    signin.style.display = "flex";
  }
}

var listaServicos = [];

function moreOption() {
  var modalHtml = `
            <div id="modalServico_">
            1° - Tipo do serviço: 
            <select name="" id="select_client_">
              <option value="#" selected disabled>Selecione o tipo de serviço</option>
              <option value="Funilaria">Funilaria</option>
              <option value="Pintura">Pintura</option>
              <option value="Mecanica">Mecanica</option>
            </select>
            Descrição do serviço: 
            <input type="text" id="input_descricao_">
            Valor:
            <input type="number" id="input_valor_">
          </div>
  `;

  var msg = "";

  var servico = {
    tipo: "",
    descricao: "",
    valor: "",
  };

  listaServicos.push(servico);

  for (var i = 0; i <= listaServicos.length; i++) {
    msg += `
    <div id='modalServico_${i}'>
            ${i + 1}° - Tipo do serviço: 
            <select name="" id="select_client_${i}">
              <option value="#" selected disabled>Selecione o tipo de serviço</option>
              <option value="Funilaria">Funilaria</option>
              <option value="Pintura">Pintura</option>
              <option value="Mecanica">Mecanica</option>
            </select>
            Descrição do serviço: 
            <input type="text" id="input_descricao_${i}">
            Valor:
            <input type="number" id="input_valor_${i}">
          </div>
        `;
  }

  servicos.innerHTML = msg;
}
