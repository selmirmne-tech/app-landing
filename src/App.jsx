import { useEffect, useRef, useState } from "react"
import ss1 from "./assets/ss1.png"
import { FaBolt, FaShieldAlt, FaChartLine, FaMoneyBillWave, FaFingerprint } from "react-icons/fa";
import { useLayoutEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Player from "@vimeo/player"
import {  ref, push, set } from "firebase/database";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";


export default function App() {


const iframeRef = useRef(null);

  const fullText = "Isprobaj 7 dana ________"




const navigate = useNavigate();
  const [text, setText] = useState("")
  const [showStamp, setShowStamp] = useState(false)
  const [sent, setSent] = useState(false)

  const aboutRef = useRef(null)
  const videoRef = useRef(null)

  const [visibleAbout, setVisibleAbout] = useState(false)
  const [visibleVideo, setVisibleVideo] = useState(false)

 
 
 const [phone, setPhone] = useState("");
const [info, setInfo] = useState("");
 
 
 
 




  // TEXT ANIMATION
  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++

      if (i === fullText.length) {
        clearInterval(interval)
        setTimeout(() => setShowStamp(true), 300)
      }
    }, 70)

    return () => clearInterval(interval)
  }, [])

useLayoutEffect(() => {
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}, []);


 
 
 

  // SCROLL ANIMATION
 useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === aboutRef.current && entry.isIntersecting) {
        setVisibleAbout(true);
      }

      if (entry.target === videoRef.current) {
        setVisibleVideo(entry.intersectionRatio >= 0.2);
      }
    });
  }, { threshold: 0.2 });

  if (aboutRef.current) observer.observe(aboutRef.current);
  if (videoRef.current) observer.observe(videoRef.current);

  return () => observer.disconnect();
}, []);
 
 
 
const handleSubmit = async () => {
  if (!phone.trim()) {
    alert("Unesite broj telefona");
    return;
  }

  if (phone.length < 9) {
    alert("Greska, broj nije ispravan.");
    return;
  }

  try {
    const newRequestRef = push(ref(db, "PRIJAVE"));

    await set(newRequestRef, {
      phone: phone.trim(),
      info: info.trim(),
      timestamp: Date.now(),
    });

    setSent(true);
    setPhone("");
    setInfo("");

    setTimeout(() => setSent(false), 5000);

  } catch (error) {
    console.error(error);
    alert("Greška pri slanju prijave");
  }
};

  return (
    <div className="page">

      {/* HERO */}
      <section className="hero">

        <header className="header">

          <h1 className="title stampTitle">
            <span className="gradient">{text}</span>

            {showStamp && (
              <span className="freeStamp">BESPLATNO</span>
            )}
          </h1>

          <p className="subtitleMain">
            Ne gubite narudžbe ni u najvećoj gužvi!

          </p>

          <p className="subtitle">
            Brza prijava i početak korišćenja u par sekundi
          </p>
		   
        </header>

        {/* BENEFITS */}
        <div className="trustBlock">
          <div className="benefitsGrid">

            
			 <div className="benefitCard">
              <FaChartLine className="benefitIcon" />
              <span>Više usluženih gosti i veći profit</span>
            </div>

            <div className="benefitCard">
              <FaShieldAlt className="benefitIcon" />
              <span>Sve narudžbe i profit na jednom mjestu</span>
            </div>

            <div className="benefitCard">
               <FaBolt className="benefitIcon" />
              <span>Bez grešaka u serviranju i manje stresa za osoblje</span>
            </div>

           

          </div>
        </div>

        {/* FORM */}
        <div className="formWrapper">







          <div className="formCard">
            <h3>Prijava restorana</h3>
            <p>Popunite podatke i kontaktiraćemo vas uskoro</p>

            {!sent ? (
              <>
			   
<input
  type="tel"
  placeholder="Broj telefona"
  value={phone}
  onChange={(e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setPhone(onlyNumbers);
  }}
/>

<textarea
  placeholder="Dodatne informacije (nije obavezno)"
  value={info}
  onChange={(e) => setInfo(e.target.value)}
/>
                <button onClick={handleSubmit}>
                  Pošalji prijavu
                </button>
              </>
            ) : (
              <div className="successInside">
                <div className="check">✓</div>
                <b>Prijava uspješna</b>
                <p>Kontaktiraćemo vas uskoro</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* VIDEO */}
      <section
        ref={videoRef}
        className={`section ${visibleVideo ? "show" : ""}`}
      >
        <h2>  </h2>
<div className="phoneFrame">
  
  <div className="powerBtn" />
  <div className="volUp" />
  <div className="volDown" />

<iframe
  ref={iframeRef}
  src="https://player.vimeo.com/video/1201021361?autoplay=1&loop=1"
  allow="autoplay; fullscreen"
  style={{ width: "100%", height: "100%", border: 0 }}
/>


</div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        className={`section ${visibleAbout ? "show" : ""}`}
      >
        <h2>O aplikaciji</h2>

 
 
 <div className="aboutText">

  <p className="aboutLead">
    VAŠ RESTORAN
  </p>

  <div className="aboutBlock">
    <p>
      Konobari unose narudžbe, a kuhinja ih odmah prima i izdaje bez grešaka i čekanja.
    </p>
    <p>
      Svaka narudžba se automatski evidentira i povezuje sa računom i konobarom.
    </p>
  </div>

  <div className="aboutBlock">
    <p>
      Vlasnici imaju potpunu kontrolu nad poslovanjem — pazar, smjene, mjesečni izvještaji i učinak osoblja.
    </p>
    <p>
      Sistem eliminiše ljudski faktor (greške) i daje jasnu sliku profita u svakom trenutku.
    </p>
  </div>

  <div className="aboutBlock">
    <p>
      Tri nivoa pristupa: Administratori, Konobari i Kuhinja — svaki sa jasno definisanim pravima.
    </p>
  </div>

</div>
 
 
 

        <div className="aboutImageWrap">
          <img src={ss1} alt="preview" />
        </div>
      </section>

 


 {/* FOOTER */}
 
<footer className="footer">
  <div className="footerContent">

    <div className="footerTop">
     

      <div className="brandInfo">
        <h4>Selmir Muminović</h4>
         
      </div>
    </div>

    <div className="footerDivider"></div>

    <div className="footerContact">
      <div className="footerItem">
        📧 Selmirmne@hotmail.com
      </div>

      <div className="footerItem">
        📞 +382 68 274 764
      </div>

      <div className="footerItem">
        📍 Plav, Montenegro
      </div>
    </div>

    <div className="copyright">
      © 2026 All rights reserved
    </div>
	
	 <button className="panelBtn" onClick={() => navigate("/prijave")}>
    📊 Otvori Panel
  </button>

  </div>
  
  <div className="ctaWrapper">
 
</div>
  
</footer>

    <Analytics />


    </div>
  )
}