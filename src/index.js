function eval() {
    // Do not use eval!!!
    return;
}

let opPriorities = {"+":1, "-":1, "/":2, "*":2};
let numArr = [];
let operationArr = [];

function expressionCalculator(expr) {
  if (checkBrackets(expr) == false) throw new Error("ExpressionError: Brackets must be paired");
  let parsedExpr = parseString(expr);

  for(let i = 0; i < parsedExpr.length; i++) {
    if (typeof(parsedExpr[i]) == "number") numArr.push(parsedExpr[i]);
    else if (parsedExpr[i] == "(") operationArr.push(parsedExpr[i]);
    else if (parsedExpr[i] == ")") {
      while(operationArr[operationArr.length - 1] != '(') doOperations();
      operationArr.pop();
    }
    else {
      while(true) {
        if(operationArr.length == 0 || operationArr[operationArr.length - 1] == '(' || opPriorities[parsedExpr[i]] > opPriorities[operationArr[operationArr.length - 1]]) {
          operationArr.push(parsedExpr[i]);
          break;
        }
        else doOperations();
      }
    }
  }
  while(operationArr.length != 0) doOperations();
  let result = numArr.pop();
  numArr = [];
  operationArr = [];
  return result;
}

function calculateOperation(arg1, arg2, op) {
  let res = 0;
  switch (op) {
    case '+':
      res = arg1 + arg2; break;
    case '-':
      res = arg1 - arg2; break;
    case '*':
      res = arg1 * arg2; break;  
    case '/':
      if(arg2 == 0) {
        numArr = [];
        operationArr = [];
        throw new Error("TypeError: Division by zero.");
      }
      res = arg1 / arg2; 
  }
  return res;
}

function parseString(expr) {
  let arr = [];
  for(let i = 0; i < expr.length; i++) {
    if(arr[i] == ' ') {
      arr = expr.split(' ');
      arr = arr.filter(el => el != '');
      break;
    } else {
      arr = expr.split('');
    }
  }
 
  for(let i = 0; i < arr.length; i++) {
    if(isNaN(Number(arr[i]))) {
      continue;
    } else {
      arr[i] = Number(arr[i]);
    }
  }
  return arr;
}

function checkBrackets(expr) {
  let openBrackets = 0;
  let closedBrackets = 0;
  for(let i = 0; i < expr.length; i++) {
    if(expr[i] == '(') openBrackets++;
    if(expr[i] == ')') closedBrackets++;
  }
  if(openBrackets == closedBrackets) return true;
  else return false;
}

function doOperations() {
  let y = numArr.pop();
  let x = numArr.pop();
  let currentOp = operationArr.pop();
  let val = calculateOperation(x, y, currentOp);
  numArr.push(val);
}

module.exports = {
    expressionCalculator
}