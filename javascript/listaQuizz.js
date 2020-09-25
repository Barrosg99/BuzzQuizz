var Quizz = [];
var quizzAtual;
function pegaQuizzServidor()
{
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",fichaUsuario);
    requisicao.catch(deuErrado).then(carregaQuizz)
}
function deuErrado(erro)
{
    console.log(erro);
}
function carregaQuizz(resposta)
{
    Quizz = []
    for(var i=0;i<resposta.data.length;i++)
    {
        Quizz.push(resposta.data[i])
    }
    renderizaListaQuizz();
}
function renderizaListaQuizz()
{
    var caixa = document.querySelector(".telaListaQuizz ul");
    caixa.innerHTML ="";
    var li = document.createElement("li");
    li.classList.add("criaQuizz")
    var span = document.createElement("span");
    var butao = document.createElement("button");
    span.innerText = "Novo Quizz";
    butao.setAttribute("onclick","tiraListaQuizz()");
    butao.innerHTML = '<ion-icon name="add-outline">';
    li.appendChild(span);
    li.appendChild(butao);
    caixa.appendChild(li);
    for(var i=0;i<Quizz.length;i++)
    {
        var li = document.createElement("li")
        var span = document.createElement("span");
        var id = document.createElement("span");
        id.innerText = Quizz[i].id;
        id.classList.add("id");
        span.innerText = Quizz[i].title;
        li.appendChild(id);
        li.appendChild(span);
        li.setAttribute("onclick","jogarQuizz(this)");
        caixa.appendChild(li);
    }    
}
function tiraListaQuizz()
{
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
    contadorPerg = 1;
    contadorNivel = 1;
    mainCriaQuizz.children[1].innerHTML = "";
    mainCriaQuizz.children[3].innerHTML = "";
    adicionaQuizz();
    adicionaNivel();
    mainListaQuizz.style.opacity = "0";
    mainListaQuizz.style.zIndex = "0";
    mainCriaQuizz.style.opacity = "1";
    mainCriaQuizz.style.zIndex = "1";
}
function jogarQuizz(elemento)
{
    var id = parseInt(elemento.children[0].innerText);
    for(var i=0;i<Quizz.length;i++)
    {
        if(id===Quizz[i].id)
        {
            quizzAtual = Quizz[i];
        }
    }
    montaQuizz();
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var mainTelaQuizz = document.querySelector(".telaQuizz");
    mainListaQuizz.style.opacity = "0";
    mainListaQuizz.style.zIndex = "0";
    mainTelaQuizz.style.opacity = "1";
    mainTelaQuizz.style.zIndex = "1";
}
function voltaPraHome()
{
    if(clicou)
    {   
        var mainListaQuizz = document.querySelector(".telaListaQuizz");
        var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
        var mainQuizz = document.querySelector(".telaQuizz");
        mainListaQuizz.style.opacity = "1";
        mainListaQuizz.style.zIndex = "1";
        mainCriaQuizz.style.opacity = "0";
        mainCriaQuizz.style.zIndex = "0"
        mainQuizz.style.opacity = "0";
        mainQuizz.style.zIndex = "0"
        acertos = 0;
        erros = 0;
        numeroPergunta = 0;
    }
}