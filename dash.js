let income = 0;
let expense = 0;

let expenses = {
  Food: 0,
  Travel: 0,
  Bills: 0,
  Shopping: 0,
  other:0
};
const user = localStorage.getItem("user")
const username = user.split("@")[0]
document.getElementById("username").innerText= username

function addIncome(){
  const amt = parseInt(document.getElementById("incomeAmount").value);
  if(!amt) return;

  income += amt;
  updateSummary();
}


function updateSummary(){
  document.getElementById("incomeDisplay").innerText = "₹" + income;
  document.getElementById("expenseDisplay").innerText = "₹" + expense;
  document.getElementById("balanceDisplay").innerText = "₹" + (income - expense);
}

const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: Object.keys(expenses),
    datasets: [{
      data: Object.values(expenses),
      backgroundColor: [
        "#60A5FA",
        "#34D399",
        "#93C5FD",
        "#6EE7B7",
        "#FF6384"
      ]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

function updateChart(){
  chart.data.datasets[0].data = Object.values(expenses);
  chart.update();
}

const logout = () => {
    localStorage.clear()
    window.location.href ="index.html"
}

//expense format "food,bills,travel,shopping,others|10,20,30,40,50"

function addExpense(){
  const amt = parseInt(document.getElementById("expenseAmount").value);
  const cat = document.getElementById("category").value;

  if(!amt) return;

  expense += amt;
  expenses[cat] += amt;

  updateSummary();
  updateChart();
}

function formatexpense(a,b,c,d,e,f){
    const exp ="food,bills,shopping,travel,others|"
    const items = [a,b,c,d,e,f]
    let ex = exp.split("|")
    console.log(ex)
    for(let i = 0;i<5;i++){
        ex.push(items[i])
        ex.push(",")
    }
    ex[1] = "|"
    console.log(ex.join(""))
}

formatexpense(10,2,4,2,4)

function deformatexpense(str){
    let a = str.split("|")
    console.log(a)
}

deformatexpense("food,bills,shopping,travel,others|10,2,4,2,4,")