var equation;
// Gera uma equação aleatória
function generateEquation() {
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    var operator = Math.floor(Math.random() * 4);
  
    switch (operator) {
      case 0:
        equation = num1 + " + " + num2;
        break;
      case 1:
        equation = num1 + " - " + num2;
        break;
      case 2:
        equation = num1 + " * " + num2;
        break;
      case 3:
        equation = num1 + " / " + num2;
        break;
    }
  
    return equation;
  }
  
  // Verifica a resposta do usuário
  function checkAnswer() {
    var answer = document.getElementById("answer").value;
    var result = document.getElementById("result");
    var correctAnswer = eval(equation);
  
    if (answer == correctAnswer) {
      result.innerHTML = "Correto!";
    } else {
      result.innerHTML = "Incorreto. A resposta correta era " + correctAnswer + ".";
    }
  
    // Limpa o campo de resposta
    document.getElementById("answer").value = "";
    
    // Gera uma nova equação
    document.getElementById("equation").innerHTML = generateEquation();
  }
  
  // Inicializa o jogo
  document.getElementById("equation").innerHTML = generateEquation();
  