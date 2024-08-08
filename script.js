// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCl530HHvIyG-Lim48CxYRjM-rUihn7ZJs",
  authDomain: "lab-test-d08ac.firebaseapp.com",
  databaseURL: "https://lab-test-d08ac-default-rtdb.firebaseio.com",
  projectId: "lab-test-d08ac",
  storageBucket: "lab-test-d08ac.appspot.com",
  messagingSenderId: "934253333557",
  appId: "1:934253333557:web:30478dde643edf3046b57c",
  measurementId: "G-SKPK9B5VYG"
};

// Initialize Firebase
 const app = firebase.initializeApp(firebaseConfig);
const  db = firebase.getAnalytics(app);

// Function to update status in Firebase
function updateStatus(lab, status) {
    db.ref('labs/' + lab).set({
        status: status
    });
}

// Function to initialize buttons and attach event listeners
function initializeButtons() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        const lab = button.id.replace('btn', 'Lab');
        
        // Fetch initial status from Firebase
        db.ref('labs/' + lab).on('value', (snapshot) => {
            const status = snapshot.val()?.status || 'Free';
            button.textContent = status;
            button.className = `button ${status.toLowerCase()}`;
        });

        // Toggle status on click
        button.addEventListener('click', () => {
            const newStatus = button.textContent === 'Free' ? 'Occupied' : 'Free';
            updateStatus(lab, newStatus);
        });
    });
}

// Initialize buttons on page load
initializeButtons();
