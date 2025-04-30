// Firebase config
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
const db = firebase.firestore();

// Get elements
const timeBlocks = document.querySelectorAll('.time-block');
const staffSelector = document.getElementById('staff');
const saveButton = document.getElementById('save-schedule');

// Staff color coding (assigning a color to each staff member)
const staffColors = {
  "staff1": "#FF5733", // Red
  "staff2": "#33FF57", // Green
  "staff3": "#3357FF", // Blue
  "staff4": "#F0E130", // Yellow
  "staff5": "#8E44AD", // Purple
  "staff6": "#FF8C00", // Orange
  "staff7": "#2ECC71"  // Teal
};

// Set up click listener for time blocks
timeBlocks.forEach(block => {
  block.addEventListener('click', () => {
    const staffMember = staffSelector.value;
    block.textContent = `${block.getAttribute('data-time')} - ${staffMember}`;
    block.style.backgroundColor = staffColors[staffMember];
    
    // Save to Firestore
    const day = block.parentElement.id;
    const time = block.getAttribute('data-time');
    db.collection('schedule').doc(day).set({
      [time]: { name: staffMember, color: staffColors[staffMember] }
    }, { merge: true });
  });
});

// Save schedule button (if you want to save the entire week at once)
saveButton.addEventListener('click', () => {
  alert("Schedule saved successfully!");
});

