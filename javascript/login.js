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
        requisicao.catch(loginErrado)
    }
}
function loginErrado()
{
    alert("Email e/ou senha incorretos");
}