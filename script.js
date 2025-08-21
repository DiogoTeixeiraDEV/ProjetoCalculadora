  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");
  const acButton = document.querySelector(".specialOp");
 
  let expression = ""

  const buttonValuesMap = {
    "x²": "²",
    "eˣ": "e^",
    "exp" : "^"
  };

  const operators = 
    ["+",  "÷", "×", "√", ".", "!", "cos", "^", 
    "tan", "sin", "ln", "e^", "log", "²", "-"]; 

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
    if (expression.length > 5 && expression.length < 10) {
      acButton.textContent = "⌫"; // Botão de apagar
    } 
    
    else {
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

  function factorial (num) { // função para numero fatorial
    if (num < 0)  return undefined;

    if (num === 1 || num === 0) return 1;

    let result = 1
    for (let i = 2; i <= num ; i ++) {
      result *= i;
    }
    return result
  }

  function calculate (){  //arruma a equação para conseguir ser lida e dá o eval
    
    try{

      function toRadians (num){
        return num * Math.PI /180
      }

      let fixedExpression = expression
      .replace('^', '**')
      .replace('×', '*')
      .replace('÷', '/')
      .replace(/\be\b/g, "Math.E")
     
      fixedExpression = fixedExpression
      .replace(/(\d+)([\+\-\*\/])(\d+)%/g, (_, num1, operador, num2) => {  // trata a porcentagem para    casos tipo 10 + 10%
        const base = Number(num1);
        const perc = Number(num2);
        const valorPercentual = (base * perc) / 100;
        return `${num1}${operador}${valorPercentual}`;
      })
      .replace(/(\d+)%/g, (_, perc) => { // trata a porcentagem isolada
        const decimal = (Number(perc) / 100)
        return decimal
      })
      fixedExpression = fixedExpression
        // os regex tratam os casos de operadores de calculadora científica
      .replace(/sin([0-9.]+)/gi, (_, num) => `Math.sin(${toRadians(num)})`)
      .replace(/cos([0-9.]+)/gi, (_, num) => `Math.cos(${toRadians(num)})`)
      .replace(/tan([0-9.]+)/gi, (_, num) => `Math.tan(${toRadians(num)})`)
      .replace(/log([0-9.]+)/gi, (_, num) => `Math.log10(${num})`)
      .replace(/ln([0-9.]+)/gi, (_, num) => `Math.log(${num})`)
      .replace(/√([0-9.]+)/gi, (_, num) => `Math.sqrt(${num})`)
      .replace(/([0-9.]+)²/gi, (_, num) => `Math.pow(${num}, 2)`)
      .replace(/e\^([0-9.]+)/gi, (_, num) => `Math.pow(Math.E, ${num})`)
      .replace(/([0-9.]+)!/gi, (_, num) => `factorial(${num})`);
      
      
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

          else if (value === "=") {

              calculate();
          }

          else { // adiciona números  
  
            const addAllValues = buttonValuesMap[value] || value // pega todos operadores, inclusive os que foram mudados no display value

              if (operators.includes(addAllValues)){

                if (operators.some(op => expression.endsWith(op))){
                  return
                }
              }

            addNumToEquation(addAllValues);
          }

          updateACButton();// implementa a função de dar update no botão de apagar 
        
          
          if (expression.length > 8){ // muda o fontsize para caber mais numeros na tela
            updateFontSize(45);
          }
          else {
            updateFontSize(85); 
          }

          if (expression.length > 14) {
            
            display.value = expression.slice(0, 14);
          }
      })
  });