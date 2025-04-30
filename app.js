// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKSQ9w5hLdz1DPxFe81rchy37wwllzzOw",
  authDomain: "makerspace-timetable.firebaseapp.com",
  projectId: "makerspace-timetable",
  storageBucket: "makerspace-timetable.firebasestorage.app",
  messagingSenderId: "655861565850",
  appId: "1:655861565850:web:84a61c21cbd5e145ad9223",
  measurementId: "G-QBED3MNMTK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      alert("Logged in as: " + user.email);
      // Hide login and show calendar
      document.getElementById("login-container").style.display = "none";
      document.getElementById("calendar-container").style.display = "block";
      loadCalendar(); // Call a function to load calendar after login
    })
    .catch((error) => {
      alert("Error logging in: " + error.message);
    });
});

// Sign Up function
const signupButton = document.getElementById("signup-button");
signupButton.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  // Create new user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully created user
      const user = userCredential.user;
      alert("Account created successfully! Logged in as: " + user.email);
      // Hide login and show calendar
      document.getElementById("login-container").style.display = "none";
      document.getElementById("calendar-container").style.display = "block";
      loadCalendar(); // Call a function to load calendar after sign-up
    })
    .catch((error) => {
      alert("Error creating account: " + error.message);
    });
});

// Calendar loading function (just a placeholder here)
function loadCalendar() {
  // Code to load and display calendar
  console.log("Calendar should load here.");
}
