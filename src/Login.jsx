import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pass === "Selmirpmf123!") {
      localStorage.setItem("auth", "true");
      navigate("/prijave");
    } else {
      alert("Pogrešna šifra");
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
          type="password"
          placeholder="Šifra"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <button
          onClick={handleLogin}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}