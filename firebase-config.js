// Importation des modules nécessaires de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  databaseURL: "VOTRE_DATABASE_URL",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_MEASUREMENT_ID"
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
