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
const dayBlocks = document.querySelectorAll('.day-block');

dayBlocks.forEach(dayBlock => {
  const day = dayBlock.id; // e.g., "monday"

  // Generate time blocks for each day
  for (let i = 9; i < 18; i++) {
    const timeSlot = `${i}:00 - ${i+1}:00`;
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
  }
});

// Save schedule button (if you want to save the entire week at once)
saveButton.addEventListener('click', () => {
  alert("Schedule saved successfully!");
});
