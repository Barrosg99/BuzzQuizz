var acertos=0;
var erros=0;
var numeroPergunta = 0;
var clicou;
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
    montaPergunta(numeroPergunta);
}
function montaPergunta(indice)
{
    var perguntas = quizzAtual.data.perg;
    clicou = true;
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
    else
    {
        montaNiveis();
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
            div.setAttribute("onclick","selecionaResposta(this)");
            div.style.background = "";
            div.classList.remove("certa");
            div.classList.remove("errada");
            div.classList.add("certa");
            div.children[0].setAttribute("src",opcao[i].imgCerta);
            div.children[1].innerText = opcao[i].respostaCerta;
        }
        else
        {
            var div = fotos.children[i];
            div.setAttribute("onclick","selecionaResposta(this)");
            div.style.background = "";
            div.classList.remove("certa");
            div.classList.remove("errada");
            div.classList.add("errada");
            div.children[0].setAttribute("src",opcao[i].img)
            div.children[1].innerText = opcao[i].resposta;
        }
    }
}
function selecionaResposta(elemento)
{
    if(clicou)
    {
        clicou = false;
        var fotos = document.querySelector(".fotos");
        acertou = elemento.classList.contains("certa");
        if(acertou)
        {
            acertos++;
        }
        else
        {
            erros++;
        }
        for(var i=0;i<4;i++)
        {
            if(fotos.children[i].classList.contains("certa"))
            {
                fotos.children[i].style.background = "#68d668";
            }
            else
            {
                fotos.children[i].style.background = "#ec3838";
            }
        }
        setTimeout(proxPergunta,2000);
    }
}
function proxPergunta()
{
    numeroPergunta++;
    montaPergunta(numeroPergunta);
}
function montaNiveis()
{
    var niveis = quizzAtual.data.nivel;
    porcentagem = (acertos/(acertos+erros))*100;
    placar = Math.round(porcentagem);
    for(var i=0;i<niveis.length;i++)
    {
        if(porcentagem>=niveis[i].min&&porcentagem<=niveis[i].max)
        {
            renderizaNivel(niveis[i],placar)
        }
    }
}
function renderizaNivel(nivel,placar)
{
    var section = document.querySelector(".telaQuizz section");
    var fotos = document.querySelector(".fotos");
    fotos.style.display = "none";
    section.children[1].innerText = "Você acertou "+acertos+" de "+(acertos+erros)+"!\nScore: "+placar+"%";
    var div = document.createElement("div");
    div.classList.add("nivel")
    div2 = document.createElement("div")
    var h2 = document.createElement("h2");
    h2.innerText = nivel.titulo;
    var p = document.createElement("p");
    p.innerText = nivel.descricao;
    div2.appendChild(h2);
    div2.appendChild(p);
    div.appendChild(div2);
    var img = document.createElement("img");
    img.setAttribute("src",nivel.img)
    div.appendChild(img);
    section.appendChild(div);
}
function randomiza()
{
    return Math.random() - 0.5;
}