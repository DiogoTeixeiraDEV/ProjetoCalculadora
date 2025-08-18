const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const acButton = document.querySelector("button");

let expression = ""

// função para mudar o botão de AC para apagar, que nem o iphone faz
function updateACButton() {
  if (expression.length > 0 && expression.length < 10) {
    acButton.textContent = "⌫"; // Botão de apagar
  } else {
    acButton.textContent = "AC"; // Botão de limpar tudo
  }
}

function updateFontSize(px){  // atualiza o fontsize no display
    display.style.fontSize = px + "px";
}

function clearDisplay (value) {  //limpa ou apaga 1 digito do display
  if (value === "AC") {
      expression = "";
      display.value = "";
  }
  else {
      expression = expression.slice(0, -1);
      display.value = expression || "0";
  }
  
}

function changeSignal (){  //muda o sinal da equação
    expression *= -1;
    display.value = expression;
}

function calculate (){  //arruma a equação para conseguir ser lida e dá o eval
  try{
    const fixedExpression = expression
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('%', '/100')
    
   const result = eval(fixedExpression);
   display.value = result;
   expression = result.toString();
  }

  catch  {
    display.value = "Erro";
    expression = ""
  }
}

function addNumToEquation (value){ // adiciona numeros a equação
    expression += value;
    display.value = expression;
}

// adiciona eventos para todos os buttons
buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        const value = button.textContent;
        
        if (value === "AC" || value === "⌫"){ 
        
            clearDisplay(value)
        }

        else if (value === "+/-") {

            changeSignal()
        }

        else if (value === "=") {

            calculate();
        }

        else { // adiciona números

            addNumToEquation(value);
        }

        updateACButton();// implementa a função de dar update no botão de apagar 
      
        
        if (expression.length > 8){
          updateFontSize(45);
        }
        else {
          updateFontSize(90); 
        }

        if (expression.length > 14) {
          
          display.value = expression.slice(0, 14);
        }
    })
});