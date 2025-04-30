const loginBtn = document.getElementById("login-btn");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");

const loginScreen = document.getElementById("login-screen");
const balanceScreen = document.getElementById("balance-screen");
const mainApp = document.getElementById("main-app");
const saveBalanceBtn = document.getElementById("save-balance-btn");
const monthlyBalanceInput = document.getElementById("monthly-balance");
const currentBalanceDisplay = document.getElementById("current-balance");

// Vérifier si un mot de passe est déjà défini
let savedPassword = localStorage.getItem("expense_password");
let savedBalance = localStorage.getItem("expense_balance");

// Vérifier le mois actuel
let currentMonth = new Date().getMonth(); // Mois courant (0-11)
let lastMonth = localStorage.getItem("last_month");

const checkNewMonth = () => {
  // Si nous sommes dans un nouveau mois
  if (currentMonth !== lastMonth) {
    localStorage.removeItem("expense_balance"); // Supprimer l'ancien solde
    localStorage.setItem("last_month", currentMonth); // Enregistrer le nouveau mois
    return true; // Nouveau mois, on demande un solde
  }
  return false; // Pas de nouveau mois
};

// Connexion
loginBtn.addEventListener("click", () => {
  const enteredPassword = passwordInput.value;

  if (!savedPassword) {
    localStorage.setItem("expense_password", enteredPassword);
    alert("Mot de passe enregistré !");
    loginScreen.style.display = "none";
    balanceScreen.style.display = "block";
  } else {
    if (enteredPassword === savedPassword) {
      loginScreen.style.display = "none";

      // Si nous sommes dans un nouveau mois, demander un solde
      if (checkNewMonth() && savedBalance === null) {
        balanceScreen.style.display = "block"; // Afficher le formulaire pour entrer le solde
      } else if (savedBalance) {
        mainApp.style.display = "block"; // Afficher l'application avec le solde actuel
        currentBalanceDisplay.textContent = savedBalance;
      } else {
        balanceScreen.style.display = "block";
      }
    } else {
      loginError.textContent = "Mot de passe incorrect.";
    }
  }
});

// Sauvegarder le solde mensuel
saveBalanceBtn.addEventListener("click", () => {
  const balance = parseFloat(monthlyBalanceInput.value);
  if (balance > 0) {
    localStorage.setItem("expense_balance", balance);
    currentBalanceDisplay.textContent = balance;
    balanceScreen.style.display = "none";
    mainApp.style.display = "block";
  }
});



const datepicker = document.getElementById("datepicker");
const expenseAmountInput = document.getElementById("expense-amount");
const saveExpenseBtn = document.getElementById("save-expense-btn");
const expenseList = document.getElementById("expense-list");
let currentBalance = parseFloat(localStorage.getItem("expense_balance") || 0);

// Initialisation de Flatpickr pour le calendrier
flatpickr(datepicker, {
  dateFormat: "Y-m-d", // Format de date (année-mois-jour)
});

// Sauvegarder une dépense
saveExpenseBtn.addEventListener("click", () => {
  const selectedDate = datepicker.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (!selectedDate || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert("Veuillez sélectionner une date et entrer un montant valide.");
    return;
  }

  // Calcul du nouveau solde
  currentBalance -= expenseAmount;
  localStorage.setItem("expense_balance", currentBalance);
  document.getElementById("current-balance").textContent = currentBalance;

  // Enregistrer la dépense dans une liste (localStorage pour la persistance)
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ date: selectedDate, amount: expenseAmount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Afficher les dépenses enregistrées
  updateExpenseList();

  // Réinitialiser le champ de dépense
  expenseAmountInput.value = "";
});

// Mettre à jour la liste des dépenses affichée
function updateExpenseList() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenseList.innerHTML = "";
  expenses.forEach(exp => {
    const listItem = document.createElement("li");
    listItem.textContent = `${exp.date}: ${exp.amount} FCFA`;
    expenseList.appendChild(listItem);
  });
}

// Afficher les dépenses au chargement de la page
updateExpenseList();
