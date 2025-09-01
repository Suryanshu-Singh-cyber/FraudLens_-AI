// Import Firebase (use CDN in index.html head)
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "SENDER-ID",
  appId: "APP-ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign Up (with email verification)
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const message = document.getElementById("loginMessage");

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      message.textContent = "✅ Verification email sent! Please verify before login.";
    })
    .catch(err => {
      message.textContent = "❌ " + err.message;
    });
}

// Login (only if verified)
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const message = document.getElementById("loginMessage");

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential.user.emailVerified) {
        message.textContent = "✅ Login successful!";
        if (role === "bank") showPage("bank");
        else showPage("police");
      } else {
        message.textContent = "⚠️ Please verify your email before login.";
        auth.signOut();
      }
      // Reset Password
function resetPassword() {
  const email = document.getElementById("email").value;
  const message = document.getElementById("loginMessage");

  if (!email) {
    message.textContent = "⚠️ Please enter your email first.";
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      message.textContent = "📧 Password reset email sent! Check your inbox.";
      message.classList.remove("text-red-400");
      message.classList.add("text-green-400");
    })
    .catch(err => {
      message.textContent = "❌ " + err.message;
    });
}

    })
    .catch(err => {
      message.textContent = "❌ " + err.message;
    });
}
