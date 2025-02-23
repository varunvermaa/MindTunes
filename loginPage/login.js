import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Import bcrypt.js for password hashing
import bcrypt from "https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm";

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active"); // Add 'active' class for Sign Up
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active"); // Remove 'active' class for Sign In
});

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqzM8Jn476R6Np9gxkSSFuUN3-YHitKx4",
    authDomain: "mindtunes-c09c9.firebaseapp.com",
    projectId: "mindtunes-c09c9",
    storageBucket: "mindtunes-c09c9.appspot.com",
    messagingSenderId: "711226726879",
    appId: "1:711226726879:web:23ab595820e81663660c6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

window.onload = function() {
    if (performance.navigation.type === 2) { // Detect Back/Forward navigation
        window.location.reload(); // Force a page reload
    }
};


// Google Sign-In
const googleSignInButtons = document.querySelectorAll("#google-signin"); 

googleSignInButtons.forEach(button => {
    button.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google sign-in success:", result.user);
            alert("Google Sign-In Successful");
            window.location.href = "/Onboarding/onboarding.html";
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    });
});


// Email Sign-Up with Hashed Password Storage
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Store user details with hashed password in Firestore
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: name,
                email: email,
                password: hashedPassword, // Storing hashed password
                createdAt: new Date()
            });

            alert("Account Created Successfully");
            window.location.href = "/Onboarding/onboarding.html";
        } catch (error) {
            document.getElementById("signup-error").innerText = error.message;
        }
    });
}

// Email Sign-In
const signinForm = document.getElementById("signin-form");
if (signinForm) {
    signinForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("signin-email").value.trim();
        const password = document.getElementById("signin-password").value.trim();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Sign-In Successful:", userCredential.user);
            alert("Sign-In Successful");
            window.location.href = "/Onboarding/onboarding.html";
        } catch (error) {
            document.getElementById("signin-error").innerText = error.message;
        }
    });
}

// Forgot Password
const forgotPassword = document.getElementById("forgot-password");
if (forgotPassword) {
    forgotPassword.addEventListener("click", async () => {
        const email = prompt("Enter your email to reset password:");
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Password reset link sent to your email.");
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
    });
}
