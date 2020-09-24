var contadorPerg = 1;
var contadorNivel = 1;
var dados = [];
var quizz = {};
var info =
{
    perg: [],
    nivel:[]
};
adicionaQuizz();
adicionaNivel();
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
function publicaQuizz()
{
    var inputTitulo = document.querySelector(".telaCriaQuizz input");
    var inputPerg = document.querySelectorAll(".questoes input");
    var inputNivel = document.querySelectorAll(".niveis input");
    var textarea = document.querySelectorAll("textarea");
    var perguntas =
    {
        titulo:"",
        respostas:[],
        imgs:[]
    }
    var niveis =
    {
        min:0,
        max:0,
        titulo:"",
        img : "",
        descricao: ""
    }
    for(var i=0;i<inputPerg.length;i++)
    {
        if(i%9===0)
         {perguntas.titulo = inputPerg[i].value;}
        else if(i%2!==0)
         {perguntas.respostas.push(inputPerg[i].value)}
        else if(i%2===0)
         {perguntas.imgs.push(inputPerg[i].value)}
        if((i+1)%9===0)
        {
            info.perg.push(perguntas);
            perguntas =
            {
                titulo:"",
                respostas:[],
                imgs:[]
            }
        }
    }
    var j=0;
    for(var i=0;i<inputNivel.length;i++)
    {
        if(i%4===0)
         {niveis.min = parseFloat(inputNivel[i].value);}
        if((i-1)%4===0)
         {niveis.max = parseFloat(inputNivel[i].value);}
        if((i-2)%4===0)
         {niveis.titulo = inputNivel[i].value;}
        if((i-3)%4===0)
        {
            niveis.img = inputNivel[i].value;
            niveis.descricao = textarea[j].value;
            j++;
            info.nivel.push(niveis);
            niveis =
            {
                min:0,
                max:0,
                titulo:"",
                img : "",
                descricao: ""
            }
        }        
    }
    quizz = 
    {
        "title": inputTitulo.value,
        "data":info
    };
    tiraCriaQuizz();
}
function enviaQuizz()
{
    var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",quizz,fichaUsuario);
}
function tiraCriaQuizz()
{
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
    mainListaQuizz.style.display = "flex";
    mainCriaQuizz.style.display = "none";
}