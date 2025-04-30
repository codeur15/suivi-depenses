// Importation des modules nécessaires de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-wGCPNpOg8jcgqvKencm4ZCEIIuvpQXo",
    authDomain: "suivi-depenses-a75ef.firebaseapp.com",
    projectId: "suivi-depenses-a75ef",
    storageBucket: "suivi-depenses-a75ef.firebasestorage.app",
    messagingSenderId: "10646602925",
    appId: "1:10646602925:web:b952f5b50bc12a1af57224"
  };

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de la base de données Firebase
const database = getDatabase(app);

// Référence vers le chemin où les données de suivi des dépenses seront stockées
const expensesRef = ref(database, 'expenses/');
const balanceRef = ref(database, 'balance/');

// Fonction pour enregistrer une dépense dans Firebase
function saveExpense(description, amount, date) {
    const newExpenseRef = ref(database, 'expenses/' + date);
    set(newExpenseRef, {
        description: description,
        amount: amount,
        date: date
    })
    .then(() => {
        console.log("Dépense enregistrée avec succès !");
    })
    .catch((error) => {
        console.error("Erreur lors de l'enregistrement de la dépense :", error);
    });
}

// Fonction pour récupérer les dépenses d'une date spécifique
function getExpenses(date) {
    const expenseData = ref(database, 'expenses/' + date);
    get(expenseData).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val();
        } else {
            console.log("Aucune dépense pour cette date.");
            return null;
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération des dépenses :", error);
    });
}

// Fonction pour modifier le solde du mois
function setBalance(newBalance) {
    update(balanceRef, {
        amount: newBalance
    })
    .then(() => {
        console.log("Solde mis à jour avec succès !");
    })
    .catch((error) => {
        console.error("Erreur lors de la mise à jour du solde :", error);
    });
}

// Fonction pour récupérer le solde du mois
function getBalance() {
    const balanceData = ref(database, 'balance/');
    get(balanceData).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val().amount);
            return snapshot.val().amount;
        } else {
            console.log("Solde non défini.");
            return 0;
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération du solde :", error);
    });
}

export { saveExpense, getExpenses, setBalance, getBalance };
