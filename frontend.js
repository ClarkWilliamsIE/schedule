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
const dayBlocks = document.querySelectorAll('.day-block');

// Fetch schedule from Firestore
const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
days.forEach(day => {
  const dayBlock = document.getElementById(day);

  db.collection('schedule').doc(day).get().then(doc => {
    const daySchedule = doc.data();

    for (let time in daySchedule) {
      const staffMember = daySchedule[time].name;
      const color = daySchedule[time].color;

      const timeBlock = document.createElement('div');
      timeBlock.classList.add('time-block');
      timeBlock.setAttribute('data-time', time);
      timeBlock.textContent = `${time} - ${staffMember}`;
      timeBlock.style.backgroundColor = color;

      dayBlock.appendChild(timeBlock);
    }
  });
});
