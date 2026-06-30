import { useEffect, useRef, useState } from "react"
import ss1 from "./assets/ss1.png"
import { FaBolt, FaShieldAlt, FaChartLine, FaMoneyBillWave, FaFingerprint } from "react-icons/fa";
import { useLayoutEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Player from "@vimeo/player"
import {  ref, push, set } from "firebase/database";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { getAuth } from "firebase/auth";

import {
 
  FaClock,
  
} from "react-icons/fa";


export default function App() {


const iframeRef = useRef(null);

  const fullText = "Isprobaj 7 dana ________"




const navigate = useNavigate();
  const [text, setText] = useState("")
  const [showStamp, setShowStamp] = useState(false)
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null);

  const aboutRef = useRef(null)
  const videoRef = useRef(null)

  const [visibleAbout, setVisibleAbout] = useState(false)
  const [visibleVideo, setVisibleVideo] = useState(false)

 const auth = getAuth();

 
 const [phone, setPhone] = useState("");
const [info, setInfo] = useState("");
 
 
 const [toast, setToast] = useState(null);
const [toastType, setToastType] = useState("error"); // error | success
 
const toastTimeoutRef = useRef(null);


const handlePanel = () => {
  const user = auth.currentUser;

  if (user) {
    navigate("/Prijave");
  } else {
    navigate("/Login");
  }
};

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
 
 
 
const showToast = (message, type = "error") => {
  setToast(message);
  setToastType(type);

  // očisti prethodni timeout
  if (toastTimeoutRef.current) {
    clearTimeout(toastTimeoutRef.current);
  }

  // novi timeout
  toastTimeoutRef.current = setTimeout(() => {
    setToast(null);
  }, 3000);
};
 
 
const handleSubmit = async () => {
  if (!phone.trim()) {
    showToast("Unesite broj telefona", "error");
 
    return;
  }

  if (phone.length < 9) {
    showToast("Broj nije ispravan.", "error");
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



const benefits = [
 
   {
    icon: <FaClock className="benefitIcon" />,
    text: "Brža usluga"
  },
  {
    icon: <FaChartLine className="benefitIcon" />,
    text: "Više usluženih gostiju i veći profit"
  },
  {
    icon: <FaShieldAlt className="benefitIcon" />,
    text: "Sve narudžbe i profit na jednom mjestu"
  },
  {
  icon: <FaUsers className="benefitIcon" />,
  text: "Manje stresa za konobare i kuhinju"
  },
   {
    icon: <FaBolt className="benefitIcon" />,
    text: "Početak korišćenja za nekoliko minuta"
  }
];


const faqs = [
  {
    q: "Kome je aplikacija namijenjena?",
    a: "Aplikacija je namijenjena svim ugostiteljskim objektima koji žele da digitalizuju proces naručivanja hrane, unaprijede organizaciju rada i u svakom trenutku imaju uvid u promet i poslovne izvještaje."
  },
 
 
  {
    q: "Da li obučavate osoblje?",
    a: "Da. Nakon instalacije pružamo kratku obuku kako bi konobari, kuhinja i administratori mogli da koriste sistem."
  },
  
  {
  q: "Na kojim jezicima je dostupna aplikacija?",
  a: "Aplikacija trenutno podržava Srpski, Engleski, Francuski i Njemački jezik."
},
 
  {
    q: "Da li aplikacija radi bez interneta?",
    a: "Ne, aplikacija za sinhronizaciju podataka zahtijeva aktivnu internet konekciju kako bi sve funkcije radile ispravno i podaci bili ažurirani u realnom vremenu."
  },
  
    {
    q: "Da li aplikacija dobija redovne nadogradnje?",
    a: "Da. Aplikacija se kontinuirano unapređuje kroz nove funkcionalnosti, optimizacije i poboljšanja sistema, kako bi uvijek bila u skladu sa potrebama ugostiteljskog poslovanja."
  },
  {
    q: "Koliko traje instalacija?",
    a: "Instalacija se završava u kratkom roku i aplikacija je odmah spremna za korišćenje na vašim uređajima."
  },
 
  {
    q: "Da li mogu koristiti postojeći tablet ili telefon?",
    a: "Da. Aplikacija radi na Android uređajima koji ispunjavaju minimalne tehničke zahtjeve."
  },
  {
    q: "Da li je moguće prilagoditi aplikaciju mom restoranu?",
    a: "Da. Moguće je prilagoditi meni, kategorije, korisnička prava i dodatne funkcionalnosti prema vašim potrebama."
  },
  {
    q: "Da li su podaci sigurni?",
    a: "Da. Podaci se čuvaju sigurno i pristup imaju samo ovlašteni korisnici prema dodijeljenim ovlaštenjima."
  },
   {
    q: "Koji su načini plaćanja?",
    a: "Plaćanje se vrši bankovnim transverom. Preko aplikacije koju koristite od banke ili u vašoj banci navodite IBAN i ime primaoca koje ćete dobiti ako budete zadovoljni probnim periodom. Možete odabrati jednokratnu kupovinu ili mjesečnu pretplatu. Koju god da odaberete pružamo kontinuiranu tehničku podršku i održavanje u skladu s potrebama vašeg poslovanja."
  }
  
];




const [startIndex, setStartIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setStartIndex((prev) => {
      const next = prev + 2;
      return next >= benefits.length ? 0 : next;
    });
  }, 4000);

  return () => clearInterval(interval);
}, []);


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
		  
		      
            Ne gubite narudžbe ni tokom najvećih gužvi!

          </p>

<p className="subtitle">
  Aplikacija za vaš ugostiteljski objekat.
</p>
	
    <p className="subtitle">
  Digitalizujte narudžbe i pregled poslovanja.
</p>
 	   
		   
 
		   
 
		   
        </header>


 



        {/* BENEFITS */}
<div className="trustBlock">
  <div className="benefitsGrid">
  <div className="benefitsGrid animatedBenefits">
  <div className="benefitCard">
    {benefits[startIndex].icon}
    <span>{benefits[startIndex].text}</span>
  </div>

  <div className="benefitCard">
    {benefits[(startIndex + 1) % benefits.length].icon}
    <span>{benefits[(startIndex + 1) % benefits.length].text}</span>
  </div>
</div>
</div>
</div>
 
 
 
        {/* FORM */}
        <div className="formWrapper">







          <div className="formCard">
            <h3>Prijava vašeg restorana</h3>
            <p>Popunite podatke</p>

            {!sent ? (
              <>
<input
  type="tel"
  placeholder="Broj telefona"
  
  value={phone}
    autoComplete="off"

  onChange={(e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhone(value);
  }}
/>
<textarea
  placeholder="Dodatne informacije (nije obavezno)"
  value={info}
    autoComplete="off"

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
        <h2> Demonstracija </h2>
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
 
 
 

        
      </section>
	  
	  
	  
 <div class="pricing-wrapper">

  <div class="pricing-card free">
    <h3>Besplatna probna verzija</h3>
    <p class="price">7 dana besplatno</p>
    <p class="desc">Potpuni pristup svim funkcijama</p>
  </div>

  <div class="pricing-card monthly">
    <h3>Mjesečno</h3>
    <p class="price">20€ / mjesec</p>
    <p class="desc">Potpuni pristup svim funkcijama+podrška 24/7</p>
  </div>

<div className="pricing-card yearly highlight">
  <div className="recommendedBadge">PREPORUČENO</div>

  <h3>Godišnje</h3>

  <p className="price">
    200€ <span className="old-price">240€</span>
  </p>

  <p className="desc">
    Najbolja opcija — ušteda 40€/godišnje. Potpuni pristup svim funkcijama + podrška 24/7
  </p>
</div>

</div>
	  





 <section className="faqSection">
  <h2>Često postavljena pitanja</h2>

  <div className="faqWrapper">
    {faqs.map((item, index) => (
      <div
        key={index}
        className={`faqItem ${openFaq === index ? "active" : ""}`}
      >
        <div
          className="faqQuestion"
          onClick={() =>
            setOpenFaq(openFaq === index ? null : index)
          }
        >
          <span>{item.q}</span>
          <span className="faqIcon">
            {openFaq === index ? "−" : "+"}
          </span>
        </div>

        <div className="faqAnswer">
          <p>{item.a}</p>
        </div>
      </div>
    ))}
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
	
	 <button className="panelBtn" onClick={handlePanel}>
  📊 Otvori Panel
</button>

  </div>
  
  <div className="ctaWrapper">
 
</div>
  
  
 
  
  
  
</footer>

    <Analytics />
 
 {toast && (
  <div className={`toast ${toastType}`}>
    <span className="toastIcon">!</span>
    {toast}
  </div>
)}
 
 
 
    </div>
  )
}