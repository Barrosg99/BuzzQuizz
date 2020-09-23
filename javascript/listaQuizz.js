var contadorPerg = 1;
var contadorNivel = 1;
adicionaQuizz();
adicionaNivel();
function tiraListaQuizz()
{
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
    mainListaQuizz.style.display = "none";
    mainCriaQuizz.style.display = "flex";
}
function adicionaQuizz()
{
    var caixaQuizz = document.querySelector(".questoes");
    var section = document.createElement("section");
    var h1 = document.createElement("h1");
    h1.innerText = "Pergunta "+contadorPerg;
    contadorPerg++
    section.appendChild(h1);
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Digite a pergunta");
    section.appendChild(input);
    var div = document.createElement("div");
    div.classList.add("perguntas");
    for(var i=0;i<4;i++)
    {
        var input1 = document.createElement("input");
        input1.setAttribute("type","text");
        var input2 = document.createElement("input");
        input2.setAttribute("type","text");
        if(i===0)
        {
            input1.setAttribute("placeholder","Digite a resposta correta");
            input2.setAttribute("placeholder","Link para imagem correta");
            div.appendChild(input1);
            div.appendChild(input2);
        }
        else
        {
            input1.setAttribute("placeholder","Digite uma resposta errada "+i);
            input2.setAttribute("placeholder","Link para imagem correta "+i);
            div.appendChild(input1);
            div.appendChild(input2);
        } 
    }
    section.appendChild(div);
    caixaQuizz.appendChild(section);
}
function adicionaNivel()
{
    caixaNivel = document.querySelector(".niveis");
    var section = document.createElement("section");
    var h1 = document.createElement("h1");
    h1.innerText = "Nível "+contadorNivel;
    section.appendChild(h1);
    contadorNivel++;
    var div = document.createElement("div");    
    for(var i=0;i<2;i++)
    {
        var input = document.createElement("input");
        input.setAttribute("type","text");
        if(i===0)
        {
            input.setAttribute("placeholder","% Mínima de Acerto do nível");
            div.appendChild(input);
        }
        else
        {
            input.setAttribute("placeholder","% Máxima de Acerto do nível");
            div.appendChild(input);
        }
    }
    section.appendChild(div);
    for(var i=0;i<2;i++)
    {
        var input = document.createElement("input");
        input.setAttribute("type","text");
        if(i===0)
        {
            input.setAttribute("placeholder","Título do nível");
            section.appendChild(input);
        }
        else
        {
            input.setAttribute("placeholder","Link da imagem do nível");
            section.appendChild(input);
        }
    }
    var textarea = document.createElement("textarea");
    textarea.setAttribute("rows","6");
    textarea.setAttribute("placeholder","Descrição do nível");
    section.appendChild(textarea);  
    caixaNivel.appendChild(section);  
}