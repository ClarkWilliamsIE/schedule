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
const saveButton = document.getElementById('save-schedule');
const staffSelector = document.getElementById('staff');

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

// Generate time slots for the week (Monday to Friday)
const timeSlots = [
  "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00",
  "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00",
  "13:00 - 13:30", "13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00",
  "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30", "16:30 - 17:00"
];

// Create time blocks for each day (Monday to Friday)
const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
days.forEach(day => {
  const dayBlock = document.getElementById(day);

  timeSlots.forEach(timeSlot => {
    const timeBlock = document.createElement('div');
    timeBlock.classList.add('time-block');
    timeBlock.setAttribute('data-time', timeSlot);
    timeBlock.textContent = timeSlot;
    dayBlock.appendChild(timeBlock);

    // Add click listener to each time block
    timeBlock.addEventListener('click', () => {
      const staffMember = staffSelector.value;
      timeBlock.style.backgroundColor = staffColors[staffMember];
      timeBlock.textContent = `${timeSlot} - ${staffMember}`;

      // Save to Firestore
      db.collection('schedule').doc(day).set({
        [timeSlot]: { name: staffMember, color: staffColors[staffMember] }
      }, { merge: true });
    });
  });
});

// Save schedule button (if you want to save the entire week at once)
saveButton.addEventListener('click', () => {
  alert("Schedule saved successfully!");
});
