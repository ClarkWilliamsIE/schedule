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

// Fetch schedule from Firestore
db.collection('schedule').get().then(snapshot => {
  snapshot.forEach(doc => {
    const day = doc.id;
    const daySchedule = doc.data();
    
    for (let time in daySchedule) {
      const staffMember = daySchedule[time];
      const block = document.querySelector(`#${day} .time-block[data-time="${time}"]`);
      if (block) {
        block.textContent = `${time} - ${staffMember}`;
      }
    }
  });
});
