var contadorPerg = 1;
var contadorNivel = 1;
var dados = [];
var info =
{
    perg: [],
    nivel:[]
};
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
function validaQuizz()
{
    var inputPerg = document.querySelectorAll(".questoes input");
    var todosInput = document.querySelectorAll(".telaCriaQuizz input");
    var inputNivel = document.querySelectorAll(".niveis input");
    var inputTitulo = document.querySelector(".telaCriaQuizz input");
    var textarea = document.querySelectorAll("textarea");
    for(var i=0;i<todosInput.length;i++)
    {
        todosInput[i].value = todosInput[i].value.trim();
        if(todosInput[i].value==="")
        {
            alert("Todos os campos devem ser preenchidos");
            return false;
        }
    }
    for(var i=0;i<textarea.length;i++)
    {
        textarea[i].value = textarea[i].value.trim();
        if(textarea[i].value==="")
        {
            alert("Todos os campos devem ser preenchidos");
            return false;
        }
    }  
    var letra =  inputTitulo.value.charAt();
    letra = letra.toUpperCase();
    var restoFrase = inputTitulo.value.substring(1);  
    inputTitulo.value = letra+restoFrase;
    for(var i=0;i<inputPerg.length;i++)
    {
        if(i%9===0)
        {
            var indice = inputPerg[i].value.indexOf("?");
            if(indice!==(inputPerg[i].value.length-1)||indice === -1)
            {
                alert('As perguntas devem ter apenas uma interrogação e ela tem que estar no final.');
                return false;
            }
            var letra =  inputPerg[i].value.charAt();
            letra = letra.toUpperCase();
            var restoFrase = inputPerg[i].value.substring(1);  
            inputPerg[i].value = letra+restoFrase;
        }
        else if((i-1)%9===0||(i-3)%9===0||(i-5)%9===0||(i-7)%9===0)
        {
            var letra =  inputPerg[i].value.charAt();
            letra = letra.toUpperCase();
            var restoFrase = inputPerg[i].value.substring(1);  
            inputPerg[i].value = letra+restoFrase;
        }

    }
    var j=0;
    for(var i=0;i<inputNivel.length;i++)
    {
        if((i-2)%4===0)
        {
            var letra =  inputNivel[i].value.charAt();
            letra = letra.toUpperCase();
            var restoFrase = inputNivel[i].value.substring(1);  
            inputNivel[i].value = letra+restoFrase;
            letra = textarea[j].value.charAt();
            letra = letra.toUpperCase();
            restoFrase = textarea[j].value.substring(1);
            textarea[j].value = letra+restoFrase;
            j++;
        }
    }
    return true;
}
function publicaQuizz()
{
    if(validaQuizz())
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
            else if((i-1)%9===0||(i-3)%9===0||(i-5)%9===0||(i-7)%9===0)
            {perguntas.respostas.push(inputPerg[i].value)}
            else if((i-2)%9===0||(i-4)%9===0||(i-6)%9===0||(i-8)%9===0)
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
        var quizz = 
        {
            "title": inputTitulo.value,
            "data":info
        };
        enviaQuizzServidor(quizz);
        tiraCriaQuizz();
    }    
}
function enviaQuizzServidor(quizz)
{
    var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",quizz,fichaUsuario);
    requisicao.catch(deuErrado).then(pegaQuizzServidor);
}
function tiraCriaQuizz()
{
    var mainListaQuizz = document.querySelector(".telaListaQuizz");
    var mainCriaQuizz = document.querySelector(".telaCriaQuizz");
    mainListaQuizz.style.opacity = "1";
    mainCriaQuizz.style.opacity = "0";
    mainListaQuizz.style.zIndex = "1";
    mainCriaQuizz.style.zIndex = "0";
    setTimeout(resetaHTML,500);
}