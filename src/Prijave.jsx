import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "./firebase";
import "./Prijave.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function Prijave() {
  const navigate = useNavigate();
  const [prijave, setPrijave] = useState([]);



const [checking, setChecking] = useState(true);


  const [notes, setNotes] = useState({});
  const [openNotes, setOpenNotes] = useState({});

  const saveNote = (id) => {
    const newNote = notes[id] || "";
    const existingNote = prijave.find((p) => p.id === id)?.notes;

    if (existingNote && existingNote !== newNote) {
      const confirmOverwrite = window.confirm(
        "Da li ste sigurni da zelite da izmijenite napomenu?"
      );

      if (!confirmOverwrite) {
        setOpenNotes((prev) => ({
          ...prev,
          [id]: false,
        }));

        setNotes((prev) => ({
          ...prev,
          [id]: "",
        }));

        return;
      }
    }

    update(ref(db, `PRIJAVE/${id}`), {
      notes: newNote,
    });

    setOpenNotes((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  // AUTH CHECK
useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    }
    setChecking(false);
  });

  return () => unsub();
}, [navigate]);
  // FIREBASE DATA
  useEffect(() => {
    const starRef = ref(db, "PRIJAVE");

    const unsubscribe = onValue(starRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const lista = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));

        lista.sort((a, b) => b.timestamp - a.timestamp);
        setPrijave(lista);
      } else {
        setPrijave([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = (id, status) => {
    update(ref(db, `PRIJAVE/${id}`), { status });
  };

  const deleteItem = (id) => {
    remove(ref(db, `PRIJAVE/${id}`));
  };


if (checking) return null;

  return (
  
  
  
  
    <div className="page">
      <h1 className="title">📋 Prijave</h1>

      {/* STATS */}
      <div className="statsRow">
        <div className="statItem">📦 Ukupno: {prijave.length}</div>
        <div className="statItem">
          🆕 Novih: {prijave.filter(p => !p.status || p.status === "new").length}
        </div>
        <div className="statItem">
          📞 Kontaktirani: {prijave.filter(p => p.status === "contacted").length}
        </div>
        <div className="statItem">
          ✅ Završenih: {prijave.filter(p => p.status === "done").length}
        </div>
      </div>

      {prijave.length === 0 && (
        <p style={{ opacity: 0.6 }}>Nema prijava...</p>
      )}

      <div className="grid">
        {prijave.map((item) => (
          <div key={item.id} className="card">

            <div className="phone">📞 {item.phone}</div>
            <div className="info">📝 {item.info}</div>

            <div className="time">
              ⏱{" "}
              {new Date(item.timestamp).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour12: false,
              })}
            </div>

            <span className={`status ${item.status || "new"}`}>
              {item.status || "new"}
            </span>

            {/* NOTES */}
            <div className="notesSection">
              {openNotes[item.id] && (
                <div className="notesBox">
                  <textarea
                    className="notesInput"
                    placeholder="Upiši napomenu..."
                    value={notes[item.id] ?? ""}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  />

                  <div className="notesActions">
                    <button
                      className="btn btn-note"
                      onClick={() => saveNote(item.id)}
                    >
                      Sačuvaj
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() => {
                        setOpenNotes((prev) => ({
                          ...prev,
                          [item.id]: false,
                        }));

                        setNotes((prev) => ({
                          ...prev,
                          [item.id]: "",
                        }));
                      }}
                    >
                      Otkaži
                    </button>
                  </div>
                </div>
              )}

              {item.notes && (
                <div className="savedNote">📝 {item.notes}</div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="btnGroup">
              <button
                className="btn btn-contact"
                onClick={() => updateStatus(item.id, "contacted")}
              >
                Kontaktiran
              </button>

              <button
                className="btn btn-done"
                onClick={() => updateStatus(item.id, "done")}
              >
                Gotovo
              </button>

              <button
                className="btn btn-note"
                onClick={() => {
                  setOpenNotes((prev) => ({
                    ...prev,
                    [item.id]: true,
                  }));

                  setNotes((prev) => ({
                    ...prev,
                    [item.id]: "",
                  }));
                }}
              >
                📝 Napomena
              </button>

              <button
                className="btn btn-delete"
                onClick={() => {
                  if (window.confirm("Da li ste sigurni da želite da obrišete ovu prijavu?")) {
                    deleteItem(item.id);
                  }
                }}
              >
                Obriši
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}