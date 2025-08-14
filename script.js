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

function updateFontSize(px){
    display.style.fontSize = px + "px";
}


// adiciona eventos para todos os buttons
buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        const value = button.textContent;
        
        if (value === "AC" || value === "⌫"){ //condicional de apagar e limpar a expression
            if (value === "AC") {
                expression = "";
                display.value = "";
            }
            else {
                expression = expression.slice(0, -1);
                display.value = expression || "0";
            }
        }

        else if (value === "+/-") {
          expression *= -1;
          display.value = expression;
        }

        else if (value === "=") {
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

        else { // adiciona números
            expression += value;
            display.value = expression;
        }

        updateACButton();// implementa a função de dar update no botão de apagar por último
        if (expression.length > 8){
          updateFontSize(45);
        }
        else {
          updateFontSize(90); 
        }
    })
});