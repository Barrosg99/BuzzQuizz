var contador = 1;
function tiraListaQuizz()
{
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
    mainListaQuizz.style.display = "none";
    mainCriaQuizz.style.display = "flex";
}
function adicionaQuizz()
{
    var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
    var section = document.createElement("section");
    var h1 = document.createElement("h1");
    h1.innerText = "Pergunta "+contador;
    section.appendChild(h1);
    
}