const fichaUsuario;
function verificaLogin()
{
    var div = document.querySelector(".telaLogin div");
    inputEmail = div.children[0];
    inputSenha = div.children[1];
    botao = div.children[2];
    if( inputEmail.value==="" || inputSenha.value==="" )
    {
        alert("Campo Email ou Senha não preenchido");
    }
    else
    {
        botao.disabled = true;
        var usuario = 
        {
            email: inputEmail.value,
            password: inputSenha.value
        };
        var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",usuario);
        requisicao.then(tiraLogin).catch(loginErrado);
    }
}
function loginErrado(erro)
{
    var botao = document.querySelector(".telaLogin div").children[2];
    alert("Email e/ou senha incorretos");
    botao.disabled = false;
}
function tiraLogin(resposta)
{
    main = document.querySelector(".telaLogin");
    main.style.display = "none";
    fichaUsuario = resposta.data.token;
}