import { useEffect, useRef, useState } from "react"
import ss1 from "./assets/ss1.png"
import video from "./assets/nesto.mp4"
import { FaBolt, FaShieldAlt, FaChartLine, FaMoneyBillWave, FaFingerprint } from "react-icons/fa";
import { useLayoutEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const fullText = "Isprobaj 7 dana ________"

  const [text, setText] = useState("")
  const [showStamp, setShowStamp] = useState(false)
  const [sent, setSent] = useState(false)

  const aboutRef = useRef(null)
  const videoRef = useRef(null)

  const [visibleAbout, setVisibleAbout] = useState(false)
  const [visibleVideo, setVisibleVideo] = useState(false)

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
          setVisibleAbout(true)
        }
        if (entry.target === videoRef.current && entry.isIntersecting) {
          setVisibleVideo(true)
        }
      })
    }, { threshold: 0.2 })

    if (aboutRef.current) observer.observe(aboutRef.current)
    if (videoRef.current) observer.observe(videoRef.current)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

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
            Sistem za upravljanje narudžbama u restoranu
          </p>

          <p className="subtitle">
            Brza prijava i početak korišćenja u par sekundi
          </p>
        </header>

        {/* BENEFITS */}
        <div className="trustBlock">
          <div className="benefitsGrid">

            <div className="benefitCard">
              <FaBolt className="benefitIcon" />
              <span>Brža obrada narudžbi</span>
            </div>

            <div className="benefitCard">
              <FaShieldAlt className="benefitIcon" />
              <span>Siguran i stabilan sistem</span>
            </div>

            <div className="benefitCard">
              <FaChartLine className="benefitIcon" />
              <span>Bolja organizacija rada</span>
            </div>

            <div className="benefitCard">
              <FaMoneyBillWave className="benefitIcon" />
              <span>Veća efikasnost i profit</span>
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
                <input type="tel" placeholder="Broj telefona" />
                <textarea placeholder="Dodatne informacije" />

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
        <h2>Kako aplikacija izgleda</h2>

        <div className="phoneFrame">
          <video src={video} autoPlay loop controls playsInline />
        </div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        className={`section ${visibleAbout ? "show" : ""}`}
      >
        <h2>O aplikaciji</h2>

        <div className="aboutText">
          Sistem za upravljanje restoranom u realnom vremenu —
          narudžbe, kuhinja i osoblje na jednom mjestu.
        </div>

        <div className="aboutImageWrap">
          <img src={ss1} alt="preview" />
        </div>
      </section>

 {/* FOOTER */}
<footer className="footer">
  <div className="footerContent">

    <div className="footerItem">
      <b>Developer:</b> Selmir Muminović
    </div>

    <div className="footerItem">
      <b>Kontakt:</b> Selmirmne@hotmail.com
    </div>

    <div className="footerItem">
        +38268274764
    </div>

    <div className="footerItem copyright">
      © Plav 2026
    </div>

  </div>
</footer>

    <Analytics />


    </div>
  )
}