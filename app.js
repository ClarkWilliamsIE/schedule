// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCKSQ9w5hLdz1DPxFe81rchy37wwllzzOw",
  authDomain: "makerspace-timetable.firebaseapp.com",
  projectId: "makerspace-timetable",
  storageBucket: "makerspace-timetable.firebasestorage.app",
  messagingSenderId: "655861565850",
  appId: "1:655861565850:web:84a61c21cbd5e145ad9223",
  measurementId: "G-QBED3MNMTK"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginButton = document.getElementById("login-button");
const loginContainer = document.getElementById("login-container");
const calendarContainer = document.getElementById("calendar-container");
const calendarDiv = document.getElementById("calendar");

// Login function
loginButton.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginContainer.style.display = "none";
      calendarContainer.style.display = "block";
      loadCalendar();
    })
    .catch((error) => {
      alert("Error logging in: " + error.message);
    });
});

// Load calendar with available shifts
function loadCalendar() {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // Create the calendar grid
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarDiv.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");
    dayCell.textContent = day;

    // Fetch availability from Firestore
    const user = auth.currentUser;
    const availabilityRef = db.collection("availability").doc(user.uid);
    availabilityRef.get().then((doc) => {
      const availableDays = doc.exists ? doc.data().days : [];
      if (availableDays.includes(day)) {
        dayCell.classList.add("available");
      }

      dayCell.addEventListener("click", () => {
        if (dayCell.classList.contains("available")) {
          dayCell.classList.add("selected");
          saveAvailability(day);
        }
      });
    });

    calendarDiv.appendChild(dayCell);
  }
}

// Save selected availability to Firestore
function saveAvailability(day) {
  const user = auth.currentUser;
  const availabilityRef = db.collection("availability").doc(user.uid);

  availabilityRef.set({
    days: firebase.firestore.FieldValue.arrayUnion(day)
  }, { merge: true });
}

// Listen for changes in authentication state
auth.onAuthStateChanged((user) => {
  if (user) {
    loginContainer.style.display = "none";
    calendarContainer.style.display = "block";
    loadCalendar();
  }
});
