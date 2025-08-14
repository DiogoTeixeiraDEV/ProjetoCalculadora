const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const acButton = document.querySelector("button");

let expression = ""

// função para mudar o botão de AC para apagar, que nem o iphone faz
function updateACButton() {
  if (expression.length > 0) {
    acButton.textContent = "⌫"; // Botão de apagar
  } else {
    acButton.textContent = "AC"; // Botão de limpar tudo
  }
}


// adiciona eventos para todos os buttons
buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        const value = button.textContent;
        
        if (value ==="AC" || value === "⌫"){ //condicional de apagar e limpar a expression
            if (value === "AC") {
                expression = "";
                display.value = "0";
            }
            else {
                expression = expression.slice(0, -1);
                display.value = expression || "0";
            }
        }
        else { // adiciona números
            expression += value;
            display.value = expression;
        }

        updateACButton(); // implementa a função de dar update no botão de apagar por último
    })
});