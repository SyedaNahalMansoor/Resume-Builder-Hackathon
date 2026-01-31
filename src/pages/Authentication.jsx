import { useState } from "react";
import { auth } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const nav = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Additional signup fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation for signup
    if (isSignup) {
      if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match!", "error");
        return;
      }

      if (password.length < 6) {
        Swal.fire("Error", "Password must be at least 6 characters!", "error");
        return;
      }

      if (phone.length < 10) {
        Swal.fire("Error", "Please enter a valid phone number!", "error");
        return;
      }
    }

    try {
      if (isSignup) {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update user profile with name
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        Swal.fire("Success", "Signup successful", "success");
        nav("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Swal.fire("Welcome", "Login successful", "success");
        nav("/dashboard");
      }

    } catch (err) {
      let message = "Something went wrong!";

      if (isSignup) {
        if (err.code === "auth/email-already-in-use") {
          message = "This email is already registered!";
        } else if (err.code === "auth/invalid-email") {
          message = "Please enter a valid email!";
        } else if (err.code === "auth/weak-password") {
          message = "Password must be at least 6 characters!";
        }
      } else {
        if (
          err.code?.includes("auth/user-not-found") ||
          err.message?.includes("user-not-found")
        ) {
          message = "No account found with this email!";
        } else if (
          err.code?.includes("auth/wrong-password") ||
          err.message?.includes("wrong-password")
        ) {
          message = "Incorrect password!";
        } else if (
          err.code?.includes("auth/invalid-credential") ||
          err.message?.includes("invalid-email")
        ) {
          message = "Invalid Credentials!";
        }
      }

      Swal.fire("Error", message, "error");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>{isSignup ? "Signup Page" : "Login Page"}</h2>

      <form onSubmit={submitHandler}>
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="date"
              placeholder="Date of Birth"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button type="submit">{isSignup ? "Create Account" : "Login"}</button>
      </form>

      <p className="link" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "No account? Signup"}
      </p>
    </div>
  );
}