import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, push, set } from "firebase/database";
import { db } from "./firebase";
import slika1 from "./assets/clients/slika1.webp";
import slika2 from "./assets/clients/slika2.webp";
import slika3 from "./assets/clients/slika3.webp";
import slika4 from "./assets/clients/slika4.webp";
import slika5 from "./assets/clients/slika5.webp";
import slika6 from "./assets/clients/slika6.webp";
import preposleImage from "./assets/prePosle.webp";
import {
  FaBolt,
  FaShieldAlt,
  FaCheckCircle,
  FaChartLine,
  FaMoneyBillWave,
  FaFingerprint
} from "react-icons/fa";
// UBACI SVOJ LOGO OVDJE
import logo from "./assets/LOGO_FINAL.webp";

function App() {
  const [activeSection, setActiveSection] = useState("pocetna");



const sections = [
  { id: "pocetna", label: "Početna" },
  { id: "problem", label: "Problem" },
  { id: "rjesenje", label: "Rješenje" },
  { id: "funkcije", label: "Funkcije" },
  { id: "pre/posle", label: "Pre/Posle" },
  { id: "kako-zapoceti", label: "Kako-započeti" },
  { id: "paketi", label: "Paketi" },
  { id: "klijenti", label: "Klijenti" },
  { id: "faq", label: "FAQ" },
  { id: "kontakt", label: "Kontakt" },
];

  const navigate = useNavigate();



const auth = getAuth();

const [phone, setPhone] = useState("");
const [info, setInfo] = useState("");
const [sent, setSent] = useState(false);
const [sent1, setSent1] = useState(false);

const [isTrialOpen, setIsTrialOpen] = useState(false);



const [socialDialog, setSocialDialog] = useState(null);

const [openFaq, setOpenFaq] = useState(null);

const [toast, setToast] = useState(null);
const [toastType, setToastType] = useState("error");
const toastTimeoutRef = useRef(null);


const [activeTestimonial, setActiveTestimonial] = useState(0);
const testimonialTrackRef = useRef(null);

const scrollToSection = (id) => {
  const target = document.getElementById(id);

  if (!target) return;

  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;

  const duration = 800;
  let startTime = null;

  const animateScroll = (currentTime) => {
    if (!startTime) startTime = currentTime;

    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    // Smooth ease-in-out
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(
      0,
      start + distance * eased
    );

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

 
 
 
const openTrialDialog = () => {
  setSent1(false);
  setIsTrialOpen(true);
  document.body.style.overflow = "hidden";

  window.history.pushState({ trialModal: true }, "");
};

const closeTrialDialog = (fromBack = false) => {
  setIsTrialOpen(false);
  setSent1(false);
  document.body.style.overflow = "";

  if (!fromBack && window.history.state?.trialModal) {
    window.history.back();
  }
};



const openSocialDialog = (platform) => {
  setSocialDialog(platform);
  document.body.style.overflow = "hidden";

  window.history.pushState({ socialModal: true }, "");
};

const closeSocialDialog = (fromBack = false) => {
  setSocialDialog(null);
  document.body.style.overflow = "";

  if (!fromBack && window.history.state?.socialModal) {
    window.history.back();
  }
};

const openSocialPage = () => {
  const url =
    socialDialog === "instagram"
      ? "https://www.instagram.com/vasrestoran/"
      : "https://www.facebook.com/profile.php?id=61594371663467";

  window.open(url, "_blank", "noopener,noreferrer");

  closeSocialDialog();
};





useEffect(() => {
  const handlePopState = () => {
    if (isTrialOpen) {
      closeTrialDialog(true);
      return;
    }

    if (socialDialog) {
      closeSocialDialog(true);
    }
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [isTrialOpen, socialDialog]);




useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTrialDialog();
    }
  };

  if (isTrialOpen) {
    document.addEventListener("keydown", handleKeyDown);
  }

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  };
}, [isTrialOpen]);
 

const handlePanel = () => {
    const user = auth.currentUser;

    if (user) {
      navigate("/Prijave");
    } else {
      navigate("/Login");
    }
  };



const handleSubmit = async () => {
  if (!phone.trim()) {
    showToast("Unesite broj telefona.", "error");
    return;
  }

  if (phone.trim().replace(/\D/g, "").length < 4) {
    showToast("Unesite ispravan broj telefona.", "error");
    return;
  }

  try {
    const newRequestRef = push(ref(db, "PRIJAVE"));

    await set(newRequestRef, {
      phone: phone.trim(),
      info: info.trim(),
      timestamp: Date.now(),
    });

    if (window.fbq) {
      window.fbq("track", "Lead");
    }

    setPhone("");
    setInfo("");

    // Prikaži uspješnu poruku
    setSent(true);

    // Nakon 5 sekundi vrati formu
    setTimeout(() => {
      setSent(false);
    }, 5000);

  } catch (error) {
    console.error(error);

    showToast(
      "Došlo je do greške. Pokušajte ponovo.",
      "error"
    );
  }
};



const handleSubmit1 = async () => {
  if (!phone.trim()) {
    showToast("Unesite broj telefona.", "error");
    return;
  }

  if (phone.trim().replace(/\D/g, "").length < 4) {
    showToast("Unesite ispravan broj telefona.", "error");
    return;
  }

  try {
    const newRequestRef = push(ref(db, "PRIJAVE"));

    await set(newRequestRef, {
      phone: phone.trim(),
      info: info.trim(),
      timestamp: Date.now(),
    });

    if (window.fbq) {
      window.fbq("track", "Lead");
    }

    setPhone("");
    setInfo("");

    // Prikaži success ekran u modalu
    setSent1(true);

  } catch (error) {
    console.error(error);

    showToast(
      "Došlo je do greške. Pokušajte ponovo.",
      "error"
    );
  }
};

const showToast = (message, type = "error") => {
  setToast(message);
  setToastType(type);

  if (toastTimeoutRef.current) {
    clearTimeout(toastTimeoutRef.current);
  }

  toastTimeoutRef.current = setTimeout(() => {
    setToast(null);
  }, 3000);
};


useEffect(() => {
  const track = testimonialTrackRef.current;

  if (!track) return;

  const updateActiveTestimonial = () => {
    const cards = track.querySelectorAll(".testimonial-card");

    if (!cards.length) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;

      const distance = Math.abs(cardCenter - trackCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveTestimonial(closestIndex);
  };

  track.addEventListener("scroll", updateActiveTestimonial, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveTestimonial);

  updateActiveTestimonial();

  return () => {
    track.removeEventListener("scroll", updateActiveTestimonial);
    window.removeEventListener("resize", updateActiveTestimonial);
  };
}, []);
 
 
 
 
 
useEffect(() => {
  const handleScroll = () => {
    let currentSection = sections[0].id;

    for (const section of sections) {
      const element = document.getElementById(section.id);

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (rect.top <= 120) {
        currentSection = section.id;
      }
    }

    // Ako smo na samom dnu stranice,
    // zadnja sekcija je aktivna
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5;

    if (atBottom) {
      currentSection = sections[sections.length - 1].id;
    }

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
 
 
 




const faqs = [
  {
    q: "Kome je aplikacija namijenjena?",
    a: "Aplikacija je namijenjena svim ugostiteljskim objektima koji žele da digitalizuju proces naručivanja hrane, unaprijede organizaciju rada i u svakom trenutku imaju uvid u promet i poslovne izvještaje."
  },

  {
    q: "Da li obučavate osoblje?",
    a: "Da. Nakon instalacije pružamo besplatnu kratku obuku kako bi konobari, kuhinja i administratori mogli da koriste sistem."
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
    a: "Plaćanje se vrši bankovnim transferom. Preko aplikacije koju koristite od banke ili u vašoj banci navodite IBAN i ime primaoca koje ćete dobiti ako budete zadovoljni probnim periodom. Možete odabrati jednokratnu kupovinu ili mjesečnu pretplatu. Koju god da odaberete, pružamo kontinuiranu tehničku podršku i održavanje u skladu s potrebama vašeg poslovanja."
  }
];














  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

    
 <header className="navbar">
        <div className="navbar-inner">

          <a href="#pocetna" className="logo-link">
            <img src={logo} alt="Vaš restoran" className="logo" />
          </a>

    
	
   
   <nav className="nav-links">
  {sections.map((section) => (
    <a
      key={section.id}
      href={`#${section.id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(section.id);
      }}
      className={
        activeSection === section.id
          ? "nav-link active"
          : "nav-link"
      }
    >
      {section.label}
    </a>
  ))}
</nav>
 
   
   
   
	
	

        </div>
      </header>











<div className="floating-socials">

  {/* Instagram */}
  <button
    type="button"
    className="floating-social-button"
    onClick={() => openSocialDialog("instagram")}
    aria-label="Instagram"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"
      />
    </svg>
  </button>

  {/* Facebook */}
  <button
    type="button"
    className="floating-social-button"
    onClick={() => openSocialDialog("facebook")}
    aria-label="Facebook"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 8h3V4h-3c-2.761 0-5 2.239-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.552.448-1 1-1Z"
      />
    </svg>
  </button>

</div>

      {/* ================= HERO ================= */}

      <section id="pocetna" className="hero">























        {/* Video u pozadini */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/restaurant.mp4" type="video/mp4" />
        </video>

        {/* Blur + tamni sloj */}
        <div className="hero-overlay"></div>

        <div className="hero-content">

         <h1>
  <span>Vaš restoran organizovan</span>
  <span>do posljednjeg detalja</span>
</h1>

          <p>
            Narudžbine, stanje pića, QR meni i svakodnevno
            <br className="desktop-break" />
            poslovanje u jednom sistemu
          </p>

<div className="hero-buttons">

  <button
    className="hero-button"
    onClick={openTrialDialog}
  >
    Isprobaj besplatno
  </button>

 

</div>

        </div>

        <div className="hero-bottom-text">
          SOFTVER ZA UGOSTITELJE
        </div>

      </section>


    
	  
	  
	  
	 

 
	  
	  
	  
	  
	  
	        {/* ================= PROBLEM ================= */}

      
<section id="problem" className="content-section">

  <div className="section-container">

    <span className="section-label">
      {/*Ovdje ide teekst "PROBLEM" */}
    </span>

    <h2>
      Kada je restoran pun, svaka greška skupo košta.
    </h2>

    <p>
      Pogrešno unešena porudžbina, loše naplaćen račun, haos u kuhinji a na sve to gosti koji ti broje svaki sekund čekanja.
       
    </p>
	
	<p>
      Vlasnik koji analizira poslovanje nema pojma odakle da počne i kako uopšte da se snađe u toj džungli.
       
    </p>
	
	<p>
      Problem nije u tome što vaš tim ne radi dovoljno već u tome što sistem rada ne funkcioniše kako treba ili još gore, uopšte ne postoji.
    </p>

  </div>

</section>

	  
	  
	  

{/* ================= RJESENJE ================= */}
 
<section id="rjesenje" className="content-section solution-section">

  <div className="section-container">

    <span className="section-label">
      {/*Ovdje ide teekst "RJESENJE" */}
    </span>

    <h2>
      Savršeno usklađen sistem koji spaja cio restoran!
    </h2>

 
	


    {/* =========================================
        RESTAURANT WORKFLOW
        ========================================= */}

    <div className="restaurant-flow">

      {/* STEP 01 */}
      <div className="flow-step">

        <div className="flow-video-wrap">

          <div className="flow-video">
            <iframe
              src="https://player.vimeo.com/video/VIDEO_ID_1?autoplay=1&muted=1&loop=1&background=1&autopause=0"
              title="Konobar unosi porudžbinu"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

        </div>

        <div className="flow-content">

          <span className="flow-label">
            KORAK 01
          </span>

          <h3>
            Konobar unosi porudžbinu
          </h3>

          <p>
            Porudžbina se unosi direktno u sistem, brzo i bez papira.
          </p>

        </div>

      </div>


      {/* ARROW */}
      <div className="flow-arrow" aria-hidden="true">
        <span>→</span>
      </div>


      {/* STEP 02 */}
      <div className="flow-step">

        <div className="flow-video-wrap">

          <div className="flow-video">
            <iframe
              src="https://player.vimeo.com/video/VIDEO_ID_2?autoplay=1&muted=1&loop=1&background=1&autopause=0"
              title="Kuhinja prima porudžbinu"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

        </div>

        <div className="flow-content">

          <span className="flow-label">
            KORAK 02
          </span>

          <h3>
            Kuhinja prima porudžbinu
          </h3>

          <p>
            Porudžbina odmah stiže u kuhinju, bez dodatnog prepisivanja.
          </p>

        </div>

      </div>


      {/* ARROW */}
      <div className="flow-arrow" aria-hidden="true">
        <span>→</span>
      </div>


      {/* STEP 03 */}
      <div className="flow-step">

        <div className="flow-video-wrap">

          <div className="flow-video">
            <iframe
              src="https://player.vimeo.com/video/VIDEO_ID_3?autoplay=1&muted=1&loop=1&background=1&autopause=0"
              title="Jelo stiže do gosta"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

        </div>

        <div className="flow-content">

          <span className="flow-label">
            KORAK 03
          </span>

          <h3>
            Jelo je spremno za serviranje
          </h3>

          <p>
            Svaka porudžbina prati svoj tok od kuhinje do gosta.
          </p>

        </div>

      </div>


      {/* ARROW */}
      <div className="flow-arrow" aria-hidden="true">
        <span>→</span>
      </div>


      {/* STEP 04 */}
      <div className="flow-step flow-step-owner">

        <div className="flow-video-wrap">

          <div className="flow-video">
            <iframe
              src="https://player.vimeo.com/video/VIDEO_ID_4?autoplay=1&muted=1&loop=1&background=1&autopause=0"
              title="Vlasnik prati poslovanje"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

        </div>

        <div className="flow-content">

          <span className="flow-label">
            KORAK 04
          </span>

          <h3>
            Vlasnik prati statistiku 24/7
          </h3>

          <p>
            Vlasnik prati statistiku i poslovanje gdje god da se nalazi.
          </p>

        </div>

      </div>

    </div>


<button
  className="start-button"
  onClick={openTrialDialog}
>
  Isprobaj odmah
</button>

    <p>
      Vaš Restoran povezuje konobare, kuhinju i vlasnika u jednostavan tok rada, tako da se svaka narudžbina kreće kroz restoran bez nepotrebnog prepisivanja, traženja i gubljenja vremena.
    </p>

    <p>
      Konobar unosi porudžbine za sekund, kuhinja ih dobija odmah a vlasnik može da sedi na plaži i isprati svaki detalj restorana.
    </p>

    <p>
      Sa ovim softverom restoran postaje organizovan bolje nego bilo koja pljačka banke na svetu.
    </p>



  </div>

</section>
      

 
      {/* ================= FUNKCIJE ================= */}

 <section id="funkcije" className="content-section funkcije-section">

  <div className="section-container funkcije-container">

    <span className="section-label">
      
    </span>

    <h2>
      Još uvek se pitaš zašto nas biraju?
    </h2>

    <p className="funkcije-intro">
      Sve što je potrebno da restoran radi brže, jednostavnije i sa više kontrole.
    </p>

    <div className="funkcije-cards">

      {/* BRŽI RAD */}
      <div className="funkcija-card">

        <div className="funkcija-icon">
          <FaBolt />
        </div>

        <h3>
          BRŽI RAD
        </h3>

        <p>
          Brže primanje i obrada narudžbina, manje nepotrebnih koraka
          i manje čekanja između konobara i kuhinje.
        </p>

      </div>


      {/* MANJE GREŠAKA */}
      <div className="funkcija-card">

        <div className="funkcija-icon">
          <FaCheckCircle />
        </div>

        <h3>
          MANJE GREŠAKA
        </h3>

        <p>
          Svaka narudžbina se unosi jednom i prati kroz sistem,
          bez papira, prepisivanja i nepotrebnog ponavljanja.
        </p>

      </div>


      {/* POTPUNA KONTROLA */}
      <div className="funkcija-card">

        <div className="funkcija-icon">
          <FaChartLine />
        </div>

        <h3>
          POTPUNA KONTROLA
        </h3>

        <p>
          U svakom trenutku imate pregled narudžbina, računa, smena
          i poslovanja, čak i kada niste u lokalu.
        </p>

      </div>

    </div>

  </div>

</section>





{/* PRE/POSLE */}

<section id="pre/posle" className="content-section preposle-section">
  <div className="section-container preposle-container">

    <span className="section-label">
      {/* PRIJE / POSLIJE */}
    </span>

    <h2>
      Od papira do digitalnog poslovanja
    </h2>

    <p className="preposle-intro">
      Pogledajte kako izgleda svakodnevni rad restorana prije i nakon
      uvođenja našeg sistema.
    </p>

    <div className="preposle-image-wrapper">
      <img
        src={preposleImage}
        alt="Prikaz poslovanja restorana prije i nakon uvođenja sistema"
        className="preposle-image"
      />
    </div>

  </div>
</section>





{/* kako-zapoceti */}
<section id="kako-zapoceti" className="content-section start-section">
  <div className="section-container start-container">


<span className="section-label">
  {/*Ovdje ide teekst "KAKO_ZAPOCETI" */}
</span>

<h2>
  Kako započeti za nekoliko minuta
</h2>

<p className="start-intro">
  Bez komplikovanog podešavanja. Napravite nekoliko jednostavnih koraka
  i odmah počnite koristiti sistem.
</p>

<div className="start-steps">

  <div className="start-step">
    <div className="start-number">01</div>
    <div className="start-content">
      <h3>Probajte besplatno</h3>
      <p>Dobijate 7 dana potpunog pristupa.</p>
    </div>
  </div>

  <div className="start-arrow">
    <span>↓</span>
  </div>

  <div className="start-step">
    <div className="start-number">02</div>
    <div className="start-content">
      <h3>Podesite svoj lokal</h3>
      <p>Unesite jelovnik i osnovne podatke.</p>
    </div>
  </div>

  <div className="start-arrow">
    <span>↓</span>
  </div>

  <div className="start-step">
    <div className="start-number">03</div>
    <div className="start-content">
      <h3>Počnite da radite</h3>
      <p>Konobari, kuhinja i administracija koriste isti sistem.</p>
    </div>
  </div>

</div>

 <div className="start-arrow">
    <span>↓</span>
  </div>

<button
  className="start-button"
  onClick={openTrialDialog}
>
  Isprobaj odmah
</button>
 

 


  </div>
</section>















 
 
{/* ================= PAKETI ================= */}

<section id="paketi" className="pricing-section">

  <div className="pricing-wrapper">

    <span className="pricing-label">
       
    </span>

    <h2>
      Jednostavni paketi
    </h2>

    <p className="pricing-intro">
      Odaberite paket koji odgovara načinu rada
      vašeg restorana.
    </p>

    <div className="pricing-cards">

      {/* 7 DANA */}

      <div
        className="pricing-card free"
        onClick={openTrialDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openTrialDialog();
          }
        }}
      >

        <h3>
          7 dana
        </h3>

        <p className="price">
          0€
        </p>

        <p className="desc">
          Uključeno: potpuni pristup svim funkcijama
          tokom 7 dana, bez obaveze plaćanja i mogućnost
          da isprobate sistem prije odabira paketa.
        </p>

      </div>


      {/* MJESEČNO */}

      <div
        className="pricing-card monthly"
        onClick={openTrialDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openTrialDialog();
          }
        }}
      >

        <h3>
          Mjesečno
        </h3>

        <p className="price">
          39€ <span>/ mjesec</span>
        </p>

        <p className="desc">
          Uključeno: potpuni pristup svim funkcijama,
          korištenje sistema bez ograničenja i podrška
          tokom korištenja usluge.
        </p>

      </div>


      {/* GODIŠNJE */}

      <div
        className="pricing-card yearly"
        onClick={openTrialDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openTrialDialog();
          }
        }}
      >

        <div className="recommendedBadge">
          PREPORUČENO
        </div>

        <h3>
          Godišnje
        </h3>

        <p className="price">
          399€ <span className="old-price">468€</span>
        </p>

        <p className="desc">
          Uključeno: potpuni pristup svim funkcijama,
          korištenje sistema bez ograničenja i podrška
          tokom cijele godine. Uštedite 69€ u odnosu
          na mjesečnu pretplatu.
        </p>

      </div>

    </div>

  </div>

</section>
 





{/* ================= SOCIAL PROOF ================= */}

<section id="klijenti" className="content-section social-proof-section">
  <div className="section-container social-proof-container">

    <span className="section-label">
      {/* SOCIA PROOF */}
    </span>

    <h2>
      Ugostitelji koji su prešli na jednostavniji način rada.
    </h2>

    <p className="social-proof-intro">
      Pogledajte restorane i ugostiteljske objekte koji koriste naš sistem
      za svakodnevno poslovanje.
    </p>


    {/* ================= LOGOI KLIJENATA ================= */}

    <div className="clients-logos">

      <div className="client-logo">
        <img src={slika1} alt="Klijent 1" />
      </div>

      <div className="client-logo">
        <img src={slika2} alt="Klijent 2" />
      </div>

      <div className="client-logo">
        <img src={slika3} alt="Klijent 3" />
      </div>

      <div className="client-logo">
        <img src={slika4} alt="Klijent 4" />
      </div>

      <div className="client-logo">
        <img src={slika5} alt="Klijent 5" />
      </div>

      <div className="client-logo">
        <img src={slika6} alt="Klijent 6" />
      </div>

    </div>


    {/* ================= RECENZIJE ================= */}

    <div className="testimonial-slider">

      <button
        className="testimonial-arrow testimonial-arrow-left"
        aria-label="Prethodni utisak"
        onClick={() => {
          const cards =
            testimonialTrackRef.current?.querySelectorAll(
              ".testimonial-card"
            );

          if (!cards?.length) return;

          const nextIndex = Math.max(activeTestimonial - 1, 0);

          cards[nextIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }}
      >
        ←
      </button>


      <div
        className="testimonial-track"
        ref={testimonialTrackRef}
      >

        {/* TESTIMONIJAL 1 */}
        <article className="testimonial-card">

          <div className="testimonial-stars">
            ★★★★★
          </div>



          <p className="testimonial-text">
            "Jednostavno za korišćenje i mnogo praktičnije od
            papirnih narudžbi."
          </p>

           

          <div className="testimonial-author">

            <div className="testimonial-avatar">
              A
            </div>

            <div>
              <strong>Marko</strong>
              <span>Vlasnik restorana</span>
            </div>

          </div>

        </article>


        {/* TESTIMONIJAL 2 */}
        <article className="testimonial-card">

          <div className="testimonial-stars">
            ★★★★★
          </div>

          <p className="testimonial-text">
            "Konobari sada sve unose direktno preko telefona,
            a kuhinja dobija narudžbu bez dodatnog dogovaranja."
          </p>

          <div className="testimonial-author">

            <div className="testimonial-avatar">
              N
            </div>

            <div>
              <strong>Nikola</strong>
              <span>Menadžer lokala</span>
            </div>

          </div>

        </article>


        {/* TESTIMONIJAL 3 */}
        <article className="testimonial-card">

          <div className="testimonial-stars">
            ★★★★★
          </div>

          <p className="testimonial-text">
            "Najviše nam znači što imamo bolji pregled narudžbi,
            smjena i prometa na jednom mjestu."
          </p>

          <div className="testimonial-author">

            <div className="testimonial-avatar">
              S
            </div>

            <div>
              <strong>Stefan</strong>
              <span>Vlasnik kafića</span>
            </div>

          </div>

        </article>


        {/* TESTIMONIJAL 4 */}
        <article className="testimonial-card">

          <div className="testimonial-stars">
            ★★★★★
          </div>

          <p className="testimonial-text">
            "Od kada koristimo sistem, narudžbe su mnogo preglednije
            i kuhinja odmah zna šta treba da pripremi."
          </p>

          <div className="testimonial-author">

            <div className="testimonial-avatar">
              M
            </div>

            <div>
              <strong>Miloš</strong>
              <span>Ugostitelj</span>
            </div>

          </div>

        </article>

      </div>


      <button
        className="testimonial-arrow testimonial-arrow-right"
        aria-label="Sljedeći utisak"
        onClick={() => {
          const cards =
            testimonialTrackRef.current?.querySelectorAll(
              ".testimonial-card"
            );

          if (!cards?.length) return;

          const nextIndex = Math.min(
            activeTestimonial + 1,
            cards.length - 1
          );

          cards[nextIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }}
      >
        →
      </button>

    </div>


    {/* ================= DONJA TRAKA ================= */}

    <div className="clients-bottom">
      <span></span>

      <p>
        ISKUSTVA UGOSTITELJA KOJI KORISTE NAŠ SISTEM
      </p>

      <span></span>
    </div>


    {/* DOTS */}

    <div className="testimonial-dots">

      {[0, 1, 2, 3].map((index) => (
        <button
          key={index}
          type="button"
          className={`testimonial-dot ${
            activeTestimonial === index ? "active" : ""
          }`}
          onClick={() => {
            const cards =
              testimonialTrackRef.current?.querySelectorAll(
                ".testimonial-card"
              );

            if (!cards?.[index]) return;

            cards[index].scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }}
          aria-label={`Prikaži utisak ${index + 1}`}
        />
      ))}

    </div>

  </div>
</section>




      {/* ================= FAQ ================= */}
 
{/* FAQ */}
<section id="faq" className="faq-section">
  <div className="faq-container">

    <span className="faq-label">
      {/*Ovdje ide teekst "FAQ" */}
    </span>

    <h2>
      Često postavljena pitanja
    </h2>

    <p className="faq-intro">
      Sve što želite da znate o sistemu,
      načinu rada i korišćenju aplikacije.
    </p>

    <div className="faq-list">

      {faqs.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${
            openFaq === index ? "active" : ""
          }`}
        >

          <div
            className="faq-question"
            onClick={() =>
              setOpenFaq(
                openFaq === index ? null : index
              )
            }
          >

            <span>
              {item.q}
            </span>

            <span className="faq-icon">
              {openFaq === index ? "−" : "+"}
            </span>

          </div>

          <div className="faq-answer">
            <p>
              {item.a}
            </p>
          </div>

        </div>
      ))}

    </div>

  </div>
</section>




	  



{/* ================= KONTAKT ================= */}

<section className="contact-section" id="kontakt">
  <div className="contact-container">

    <div className="contact-info">

      <h2>Imate pitanje?</h2>

      <p>
        Javite nam se ili ostavite podatke i saznajte kako vaš ugostiteljski objekat može biti bolje organizovan.
      </p>

      <div className="contact-details">

        <div className="contact-detail">
          <span>📞</span>
          <div>
            <small>Telefon</small>
            <strong>+382 68 274 764</strong>
          </div>
        </div>

        <div className="contact-detail">
          <span>📧</span>
          <div>
            <small>Email</small>
            <strong>Selmirmne@hotmail.com</strong>
          </div>
        </div>

        <div className="contact-detail">
          <span>📍</span>
          <div>
            <small>Lokacija</small>
            <strong>Plav, Montenegro</strong>
          </div>
        </div>

      </div>


 
{/* ================= DRUŠTVENE MREŽE ================= */}

<div className="contact-socials">

  <a
    href="https://www.instagram.com/vasrestoran/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="instagram"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"
      />
    </svg>

    Instagram
  </a>


  <a
    href="https://www.facebook.com/profile.php?id=61594371663467"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="facebook"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M14 8h3V4h-3c-2.761 0-5 2.239-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.552.448-1 1-1Z"
      />
    </svg>

    Facebook
  </a>

</div>
 



      

    </div>


    {/* ================= DESNA STRANA - FORMA ================= */}

   <div className="contact-form-card">

  <div className="contact-form-heading">
    <h3>Unesite podatke</h3>
    
  </div>

   

      {!sent ? (

        <div className="contact-form">


          <div className="contact-field">
            <label>Broj telefona</label>

            <input
              type="tel"
              placeholder="Unesite broj telefona"
              value={phone}
              autoComplete="tel"
              inputMode="tel"
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d+]/g, "");
                setPhone(value);
              }}
            />
          </div>


          <div className="contact-field">
            <label>Ime restorana</label>

            <input
              type="text"
              placeholder="Ime vašeg restorana (nije obavezno)"
              value={info}
              autoComplete="off"
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>


          <button
            className="contact-submit"
            onClick={handleSubmit}
          >
            Pošalji prijavu
          </button>


          <small className="contact-security">
            🔒 Vaši podaci su sigurni i koriste se samo za kontakt.
          </small>

        </div>

      ) : (

        <div className="contact-success">

          <div className="check">✓</div>

          <b>Prijava uspješna</b>

          <p>
            Kontaktiraćemo vas uskoro
          </p>

        </div>

      )}

    </div>

  </div>
</section>


 

	  
	  
	  {/* TOAST */}
 {toast && (
  <div className="notification">
    <div className="notification-icon">
      {toastType === "success" ? "✓" : "!"}
    </div>

    <div className="notification-content">
      <div className="notification-title">
        {toastType === "success" ? "Uspješno" : "Provjerite podatke"}
      </div>

      <div className="notification-message">
        {toast}
      </div>
    </div>

    <button
      className="notification-close"
      onClick={() => setToast(null)}
      aria-label="Zatvori"
    >
      ×
    </button>
  </div>
)}






{/* ================= SOCIAL DIALOG ================= */}

{socialDialog && (
  <div
    className="social-modal-overlay"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        closeSocialDialog();
      }
    }}
  >
    <div className="social-modal">

      <button
        className="social-modal-close"
        onClick={() => closeSocialDialog()}
        aria-label="Zatvori"
      >
        ×
      </button>

    <div
  className={`social-modal-icon ${
    socialDialog === "instagram" ? "instagram" : "facebook"
  }`}
>
        {socialDialog === "instagram" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M14 8h3V4h-3c-2.761 0-5 2.239-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.552.448-1 1-1Z"
            />
          </svg>
        )}
      </div>

      <h2>
        Otvoriti{" "}
        {socialDialog === "instagram"
          ? "Instagram"
          : "Facebook"}?
      </h2>

      <p>
        Bićete preusmjereni na naš{" "}
        {socialDialog === "instagram"
          ? "Instagram"
          : "Facebook"} profil.
      </p>

      <div className="social-modal-actions">

        <button
          type="button"
          className="social-modal-cancel"
          onClick={() => closeSocialDialog()}
        >
          Ostani na sajtu
        </button>

        <button
          type="button"
          className="social-modal-confirm"
          onClick={openSocialPage}
        >
          Otvori
        </button>

      </div>

    </div>
  </div>
)}








	  {/* ================= TRIAL DIALOG ================= */}

{isTrialOpen && (
  <div
    className="trial-modal-overlay"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        closeTrialDialog();
      }
    }}
  >

    <div className="trial-modal">

      {/* CLOSE */}

      <button
        className="trial-modal-close"
        onClick={closeTrialDialog}
        aria-label="Zatvori"
      >
        ×
      </button>


     {!sent1 ? (
        <>

          <div className="trial-modal-top">

            <div className="trial-modal-badge">
              7 DANA BESPLATNO
            </div>

            <h2>
              Isprobaj Vaš Restoran
            </h2>

            <p>
              Pogledaj kako tvoj restoran može raditi
              jednostavnije, brže i organizovanije.
            </p>

          </div>


          <div className="trial-modal-benefits">

            <div>
              <span>✓</span>
              Potpuni pristup sistemu
            </div>

            <div>
              <span>✓</span>
              Besplatna kratka obuka
            </div>

            <div>
              <span>✓</span>
              Bez obaveze nakon probnog perioda
            </div>

          </div>


          <div className="trial-form">

            <label>
              Broj telefona
            </label>

            <input
              type="tel"
              placeholder="+382 6X XXX XXX"
              value={phone}
              autoComplete="tel"
              inputMode="tel"
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d+]/g, "");
                setPhone(value);
              }}
            />


            <label>
              Naziv restorana
              
            </label>

            <input
              type="text"
              placeholder="Npr. Restoran Aurora (nije obavezno)"
              value={info}
              autoComplete="off"
              onChange={(e) => setInfo(e.target.value)}
            />


         <button
  className="trial-submit"
  onClick={handleSubmit1}
>
  Zatraži besplatni test
</button>

          </div>


          <div className="trial-modal-note">
            Vaši podaci se koriste samo za kontakt
            i dogovor oko početka testiranja.
          </div>

        </>
      ) : (

       <div className="trial-success">

  <div className="trial-success-icon">
    ✓
  </div>

  <h2>
    Prijava je uspješna!
  </h2>

  <p>
    Hvala vam. Kontaktiraćemo vas uskoro
    kako bismo dogovorili početak besplatnog testa.
  </p>

  <button
  className="trial-success-button"
  onClick={closeTrialDialog}
>
  U redu
</button>

</div>

      )}

    </div>

  </div>
)}

    </div>
  );
}

export default App;