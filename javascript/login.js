var fichaUsuario = {};
enterLogin();
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
        requisicao.catch(loginErrado).then(tiraLogin);
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
    fichaUsuario =
    {
        headers: {'User-Token':resposta.data.token}
    }
    pegaQuizzServidor();
    var mainLogin = document.querySelector(".telaLogin");
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var header = document.querySelector("header");
    mainLogin.style.opacity = "0";
    mainLogin.style.zIndex = "0";
    mainListaQuizz.style.opacity = "1";
    mainListaQuizz.style.zIndex = "1";
    header.style.opacity = "1";
    header.style.zIndex = "1";
}
function enterLogin()
{
    var input = document.querySelectorAll(".telaLogin input");
    for(var i=0;i<2;i++)
    {
        input[i].addEventListener("keyup",function(evento)
        {
            if (evento.keyCode === 13)
            {
                evento.preventDefault();
                document.querySelector(".telaLogin button").click();
            }
        });
    }    
}