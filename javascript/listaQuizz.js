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
        console.log(i);
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
    mainListaQuizz.style.display = "none";
    mainCriaQuizz.style.display = "flex";
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
    mainListaQuizz.style.display = "none";
    mainTelaQuizz.style.display = "flex";
}