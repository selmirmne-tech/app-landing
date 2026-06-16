import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    if (!email || !pass) {
      alert("Unesite email i šifru");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, pass);

      navigate("/prijave");
    } catch (error) {
      console.error(error);
      alert("Pogrešan login ili korisnik ne postoji");
	  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f0f0f",
      color: "white"
    }}>
      <div style={{
        padding: "30px",
        background: "#1c1c1c",
        borderRadius: "12px",
        width: "300px"
      }}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
		
 
		
      </div>
    </div>
  );
}