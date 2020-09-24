function montaQuizz()
{
    var main = document.querySelector(".telaQuizz");
    var section = document.createElement("section");
    main.appendChild(section);
    var section = document.querySelector(".telaQuizz section");
    var h1 = document.createElement("h1");
    h1.innerText = quizzAtual.title;
    section.appendChild(h1);
    for(var i=0;i<2;i++)
    {
        var div = document.createElement("div")
        section.appendChild(div);
    }
    section.children[2].classList.add("fotos");
    var fotos = document.querySelector(".fotos");
    for(var i=0;i<4;i++)
    {
        var div = document.createElement("div");
        var p = document.createElement("p");
        var img = document.createElement("img");
        div.appendChild(img);
        div.appendChild(p);
        fotos.appendChild(div);
    }
    montaPergunta(0);
}
function montaPergunta(indice)
{
    var perguntas = quizzAtual.data.perg;
    if(indice<perguntas.length)
    {
        tituloPergunta = perguntas[indice].titulo;
        var opcao =[];
        for(var i=0;i<4;i++)
        {
            if(i===0)
            {
                opcao.push(
                    {
                        respostaCerta:perguntas[indice].respostas[i],
                        imgCerta:perguntas[indice].imgs[i]
                    }
                );
            }
            else
            {
                opcao.push(
                    {
                        resposta:perguntas[indice].respostas[i],
                        img:perguntas[indice].imgs[i]
                    }
                );
            }
        }
        opcao = opcao.sort(randomiza);
        renderizaPergunta(opcao,tituloPergunta)
    }
}
function renderizaPergunta(opcao,titulo)
{
    var section = document.querySelector(".telaQuizz section");
    var fotos = document.querySelector(".fotos");
    section.children[1].innerText = titulo;
    for(var i=0;i<opcao.length;i++)
    {
        if(opcao[i].imgCerta!==undefined)
        {
            var div = fotos.children[i];
            div.children[0].setAttribute("src",opcao[i].imgCerta)
            div.children[1].innerText = opcao[i].respostaCerta;
        }
        else
        {
            var div = fotos.children[i];
            div.children[0].setAttribute("src",opcao[i].img)
            div.children[1].innerText = opcao[i].resposta;
        }
    }
}
function randomiza()
{
    return Math.random() - 0.5;
}