import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, push, set } from "firebase/database";
import { db } from "./firebase";
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
  { id: "klijenti", label: "Klijenti" },
  { id: "problem", label: "Problem" },
  { id: "rjesenje", label: "Rješenje" },
  { id: "funkcije", label: "Funkcije" },
  { id: "pre/posle", label: "Pre/Posle" },
  { id: "kako-zapoceti", label: "Kako-započeti" },
  { id: "social-proof", label: "Social-Proof" },
  { id: "paketi", label: "Paketi" },
  { id: "faq", label: "FAQ" },
  { id: "isprobaj", label: "Isprobaj" },
  { id: "kontakt", label: "Kontakt" },
];

  const navigate = useNavigate();



const auth = getAuth();

const [phone, setPhone] = useState("");
const [info, setInfo] = useState("");
const [sent, setSent] = useState(false);

const [openFaq, setOpenFaq] = useState(null);

const [toast, setToast] = useState(null);
const [toastType, setToastType] = useState("error");
const toastTimeoutRef = useRef(null);


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
    showToast("Unesite broj telefona", "error");
    return;
  }

  if (phone.trim().length < 4) {
    showToast("Broj nije ispravan.", "error");
    return;
  }

  try {

    const newRequestRef = push(
      ref(db, "PRIJAVE")
    );

    await set(newRequestRef, {
      phone: phone.trim(),
      info: info.trim(),
      timestamp: Date.now(),
    });

    if (window.fbq) {
      console.log("META LEAD POSLAT");

      window.fbq("track", "Lead");
    } else {
      console.log("META PIXEL NIJE UCITAN");
    }

    setSent(true);

    setPhone("");
    setInfo("");

    setTimeout(() => {
      setSent(false);
    }, 5000);

  } catch (error) {

    console.error(error);

    showToast(
      "Greška pri slanju prijave",
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
    onClick={() => scrollToSection("isprobaj")}
  >
    Isprobaj odmah
  </button>

  <button
    className="hero-button"
    onClick={() => scrollToSection("isprobaj")}
  >
    Isprobaj odmah
  </button>

</div>

        </div>

        <div className="hero-bottom-text">
          SOFTVER ZA UGOSTITELJE
        </div>

      </section>


    
	  
	  
	  
	  
      {/* ================= KLIJENTI ================= */}

      <section id="klijenti" className="content-section dark-section">
        <div className="section-container">

          <span className="section-label">
            KLIJENTI
          </span>

          <h2>
            Restorani koji nam vjeruju
          </h2>

          <p>
            Pogledajte restorane i ugostiteljske objekte
            koji koriste naš sistem za svakodnevno poslovanje.
          </p>

        </div>
      </section>
	  
	  
	  
	  
	  
	  
	        {/* ================= PROBLEM ================= */}

      
<section id="problem" className="content-section">

  <div className="section-container">

    <span className="section-label">
      PROBLEM
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
      REŠENJE
    </span>

    <h2>
      Savršeno usklađen sistem koji spaja cio restoran!
    </h2>

    <p>
      Vaš Restoran povezuje konobare, kuhinju i vlasnika u jednostavan tok rada, tako da se svaka narudžbina kreće kroz restoran bez nepotrebnog prepisivanja, traženja i gubljenja vremena.
    </p>

    <p>
      Konobar unosi porudžbine za sekund, kuhinja ih dobija odmah a vlasnik može da sedi na plaži i isprati svaki detalj restorana.
    </p>

    <p>
      Sa ovim softverom restoran postaje organizovan bolje nego bilo koja pljačka banke na svetu.
    </p>
	


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
  PRIJE / POSLIJE
</span>

<h2>
  Od papira do digitalnog poslovanja
</h2>

<p className="preposle-intro">
  Pogledajte kako izgleda svakodnevni rad restorana prije i nakon
  uvođenja našeg sistema.
</p>

<div className="preposle-comparison">

  {/* LIJEVA STRANA — PRE */}
  <div className="preposle-side pre-side">

    <div className="preposle-title">
      PRIJE
    </div>

    <div className="preposle-items">

      <div className="preposle-item">
        <div className="preposle-icon">📝</div>
        <span>Blokčić</span>
      </div>

      <div className="preposle-item">
        <div className="preposle-icon">📄</div>
        <span>Papirne narudžbe</span>
      </div>

      <div className="preposle-item">
        <div className="preposle-icon">📞</div>
        <span>Dovikivanje kuhinji</span>
      </div>

      <div className="preposle-item">
        <div className="preposle-icon">🧮</div>
        <span>Ručno sabiranje</span>
      </div>

    </div>
  </div>


  {/* SREDINA */}
  <div className="preposle-divider">
    <span></span>
  </div>


  {/* DESNA STRANA — SADA */}
  <div className="preposle-side now-side">

    <div className="preposle-title">
      SADA
    </div>

    <div className="preposle-items">

      <div className="preposle-item">
        <div className="preposle-icon">📱</div>
        <span>Telefon</span>
      </div>

      <div className="preposle-item">
        <div className="preposle-icon">⚡</div>
        <span>Trenutna narudžba</span>
      </div>

      <div className="preposle-item">
        <div className="preposle-icon">👨‍🍳</div>
        <span>Direktno kuhinji</span>
      </div>

      <div className="preposle-item">
        <div className="preposle-icon">📊</div>
        <span>Automatski izvještaji</span>
      </div>

    </div>
  </div>

</div>


  </div>
</section>






{/* kako-zapoceti */}
<section id="kako-zapoceti" className="content-section start-section">
  <div className="section-container start-container">


<span className="section-label">
  KAKO ZAPOČETI
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
    <span>→</span>
  </div>

  <div className="start-step">
    <div className="start-number">02</div>
    <div className="start-content">
      <h3>Podesite svoj lokal</h3>
      <p>Unesite jelovnik i osnovne podatke.</p>
    </div>
  </div>

  <div className="start-arrow">
    <span>→</span>
  </div>

  <div className="start-step">
    <div className="start-number">03</div>
    <div className="start-content">
      <h3>Počnite da radite</h3>
      <p>Konobari, kuhinja i administracija koriste isti sistem.</p>
    </div>
  </div>

</div>

<button
  className="start-button"
  onClick={() => scrollToSection("isprobaj")}
>
  Isprobaj odmah
</button>
 

 


  </div>
</section>





{/* social-proof */}
<section id="social-proof" className="content-section social-proof-section">
  <div className="section-container social-proof-container">

    <span className="section-label">
      SOCIAL PROOF
    </span>

    <h2>
      Ugostitelji koji su prešli na jednostavniji način rada.
    </h2>

    <p className="social-proof-intro">
      Pogledajte iskustva ugostitelja koji koriste sistem u svakodnevnom radu.
    </p>

    <div className="testimonial-slider">

      <button
        className="testimonial-arrow testimonial-arrow-left"
        aria-label="Prethodni utisak"
        onClick={() => {
          document
            .querySelector(".testimonial-track")
            ?.scrollBy({
              left: -380,
              behavior: "smooth"
            });
        }}
      >
        ←
      </button>

      <div className="testimonial-track">

        {/* TESTIMONIJAL 1 */}
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
            "Jednostavno za korišćenje i mnogo praktičnije od
            papirnih narudžbi."
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
          document
            .querySelector(".testimonial-track")
            ?.scrollBy({
              left: 380,
              behavior: "smooth"
            });
        }}
      >
        →
      </button>

    </div>

    <div className="testimonial-dots">
      <span className="testimonial-dot active"></span>
      <span className="testimonial-dot"></span>
      <span className="testimonial-dot"></span>
      <span className="testimonial-dot"></span>
    </div>

  </div>
</section>












      {/* ================= PAKETI ================= */}

     <section id="paketi" className="pricing-section">

  <div className="pricing-wrapper">

    <span className="pricing-label">
      PAKETI
    </span>

    <h2>
      Jednostavni paketi
    </h2>

    <p className="pricing-intro">
      Odaberite paket koji odgovara načinu rada
      vašeg restorana.
    </p>

    <div className="pricing-cards">

      {/* BESPLATNA PROBNA VERZIJA */}

      <div className="pricing-card free">

        <h3>
          Besplatna probna verzija
        </h3>

        <p className="price">
          7 dana besplatno
        </p>

        <p className="desc">
          Potpuni pristup svim funkcijama
        </p>

      </div>


      {/* MJESEČNO */}

      <div className="pricing-card monthly">

        <h3>
          Mjesečno
        </h3>

        <p className="price">
          39€ <span>/ mjesec</span>
        </p>

        <p className="desc">
          Potpuni pristup svim funkcijama + podrška
        </p>

      </div>


      {/* GODIŠNJE */}

      <div className="pricing-card yearly">

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
          Ušteda 69€ godišnje. Potpuni pristup
          svim funkcijama + podrška
        </p>

      </div>

    </div>

  </div>

</section>


      {/* ================= FAQ ================= */}
 
{/* FAQ */}
<section id="faq" className="faq-section">
  <div className="faq-container">

    <span className="faq-label">
      FAQ
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




  {/* ================= ISPROBAJ ================= */}

      <section id="isprobaj" className="try-section">
  <div className="try-container">

    <span className="try-label">
      ISPROBAJ
    </span>

    <h2>
      Isprobaj "Vaš restoran" sistem
    </h2>

    <p className="try-description">
      Isprobaj sistem 7 dana potpuno besplatno
      i upoznaj se sa svim mogućnostima aplikacije.
    </p>

    <div className="try-form-card">

  {!sent ? (
    <>

      <h3>
        Pošalji podatke za besplatan test
      </h3>

      <p>
        Digitalizuj svoj restoran
      </p>

   

      <input
        type="tel"
        placeholder="Broj telefona"
        value={phone}
        autoComplete="tel"
        inputMode="tel"
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d+]/g, "");
          setPhone(value);
        }}
      />

      <textarea
        placeholder="Ime vašeg restorana (nije obavezno)"
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

      <div className="check">
        ✓
      </div>

      <b>
        Prijava uspješna
      </b>

      <p>
        Kontaktiraćemo vas uskoro
      </p>

    </div>
  )}

</div>

  </div>
</section>
	  



      {/* ================= KONTAKT ================= */}

 <section id="kontakt" className="content-section">

  <div className="section-container">

    <span className="section-label">
      KONTAKT
    </span>

    <h2>
      Imate pitanje?
    </h2>

    <p>
      Javite nam se i saznajte kako Vaš restoran
      može biti bolje organizovan.
    </p>

    <button
      className="panelBtn"
      onClick={handlePanel}
    >
      📊 Panel
    </button>





  </div>

</section>
	  
	  
	  {/* TOAST */}
{toast && (
  <div className={`toast ${toastType}`}>
    <span className="toastIcon">!</span>
    {toast}
  </div>
)}

	  

    </div>
  );
}

export default App;