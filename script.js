  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");
  const acButton = document.querySelector(".specialOp");

  let expression = ""


  function atualizarRelogio() {  // função para mostrar o horário atual
    const time = new Date();
    const hour = String(time.getHours()).padStart(2, '0');
    const min = String(time.getMinutes()).padStart(2, '0');
    const fixedTime = `${hour}:${min}`;

    document.getElementById('time').textContent = fixedTime;
  }

  setInterval(atualizarRelogio, 1000); // dá update no horário cada 1000 ms
  atualizarRelogio();


  function updateACButton() {  // função para mudar o botão de AC para apagar, que nem o iphone faz
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

  function roundResult(num){
    return Number(num.toFixed(6)); // arredonda para 6 casas decimais.
  }



  function calculate (){  //arruma a equação para conseguir ser lida e dá o eval
    try{
      function toRadians (num){
        return num * Math.PI /180
      }
      const fixedExpression = expression   // dá replace em tudo que precisa e uma a Math para transformar o display em algo que possa ser calculado
      .replace('×', '*')
      .replace('÷', '/')
      .replace(/(\d+)%/g, (_, perc) => {
        return (Number(perc) / 100).toString();
      })
      .replace(/(\d+)([\+\-\*\/])(\d+)%/g, (_, num1, operador, num2) => {  // trata a porcentagem para casos tipo 10 + 10%
        const base = Number(num1);
        const perc = Number(num2);
        const valorPercentual = (base * perc) / 100;
        return `${num1}${operador}${valorPercentual}`;
      })
      .replace(/sin([0-9.]+)/gi, (_, num) => `Math.sin(${toRadians(num)})`)
      .replace(/cos([0-9.]+)/gi, (_, num) => `Math.cos(${toRadians(num)})`)
      .replace(/tan([0-9.]+)/gi, (_, num) => `Math.tan(${toRadians(num)})`)
      .replace(/log([0-9.]+)/gi, (_, num) => `Math.log10(${num})`)
      .replace(/ln([0-9.]+)/gi, (_, num) => `Math.log(${num})`)
      .replace(/√([0-9.]+)/gi, (_, num) => `Math.sqrt(${num})`)
      .replace(/([0-9.]+)²/gi, (_, num) => `Math.pow(${num}, 2)`)
      .replace(/([0-9.]+)²/gi, (_, num) => `Math.pow(${num}, 2)`)
      .replace(/e\^([0-9.]+)/gi, (_, num) => `Math.pow(Math.E, ${num})`)
      .replace(/π/gi, "Math.PI");
      
    const result = eval(fixedExpression);
    const finalResult = roundResult(result) // arredonda o result
    display.value = finalResult;
    expression = finalResult.toString();

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

          else if (value === "x²"){

            addNumToEquation("²")
          }


          else if (value === "eˣ"){

            addNumToEquation("e^")
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