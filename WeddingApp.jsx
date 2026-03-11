import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const colors = {
  cream: "#faf6f0",
  warm: "#f2e8d9",
  blush: "#e8c4b0",
  rose: "#c97d6a",
  sage: "#8a9e7e",
  earth: "#7a5c48",
  deep: "#3d2b1f",
  gold: "#c9a96e",
};

/* ── Initialize EmailJS ── */
emailjs.init("NGMKW-KZcldLv1h0S");

/* ── Google Fonts injected once ── */
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

/* ── Global styles ── */
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.85s ease, transform 0.85s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
  @keyframes floatL   { 0%,100%{ transform:translateY(0) rotate(0deg) } 50%{ transform:translateY(-18px) rotate(1.5deg) } }
  @keyframes floatR   { 0%,100%{ transform:rotate(180deg) scaleX(-1) translateY(0) } 50%{ transform:rotate(180deg) scaleX(-1) translateY(-14px) } }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .bot-left  { animation: floatL 9s ease-in-out infinite; }
  .bot-right { animation: floatR 11s ease-in-out infinite; transform: rotate(180deg) scaleX(-1); }

  .detail-card { transition: transform 0.3s, box-shadow 0.3s; }
  .detail-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(61,43,31,0.09); }
  .party-card  { transition: transform 0.3s; }
  .party-card:hover  { transform: translateY(-4px); }

  .nav-link { text-decoration:none; font-size:0.68rem; letter-spacing:0.22em; text-transform:uppercase; transition:color 0.3s; color:${colors.earth}; }
  .nav-link:hover { color:${colors.rose}; }

  .map-dir-btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.85rem 2rem; border:1px solid rgba(201,169,110,0.38); color:${colors.gold}; font-size:0.64rem; letter-spacing:0.25em; text-transform:uppercase; text-decoration:none; font-family:'Jost',sans-serif; transition:all 0.3s; }
  .map-dir-btn:hover { background:${colors.gold}; color:${colors.deep}; }

  @media (max-width:620px){
    .hero-names-text { font-size: clamp(3.5rem, 16vw, 6rem) !important; }
    .hcd-item { padding: 0.9rem 1rem !important; }
    .hcd-num  { font-size: 1.8rem !important; }
    .bot-left, .bot-right { width: min(280px, 68vw) !important; }
  }
`;
const styleEl = document.createElement("style");
styleEl.textContent = globalCSS;
document.head.appendChild(styleEl);

/* ── Botanical SVG ── */
function BotanicalSVG() {
  return (
    <svg viewBox="0 0 500 620" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M55 610 Q85 420 130 310 Q165 225 215 162" stroke="#8a9e7e" strokeWidth="2.2" opacity="0.9"/>
      <path d="M95 590 Q135 460 168 358 Q198 278 248 208" stroke="#8a9e7e" strokeWidth="1.6" opacity="0.65"/>
      <path d="M35 575 Q58 455 88 368 Q118 295 170 238" stroke="#c9a96e" strokeWidth="1.3" opacity="0.55"/>
      <circle cx="215" cy="158" r="46" fill="#c97d6a" opacity="0.75"/>
      <ellipse cx="215" cy="112" rx="20" ry="30" fill="#e8c4b0" opacity="0.85" transform="rotate(-15 215 112)"/>
      <ellipse cx="250" cy="130" rx="18" ry="28" fill="#e8c4b0" opacity="0.75" transform="rotate(22 250 130)"/>
      <ellipse cx="180" cy="133" rx="17" ry="27" fill="#e8c4b0" opacity="0.75" transform="rotate(-28 180 133)"/>
      <ellipse cx="233" cy="167" rx="15" ry="23" fill="#c97d6a" opacity="0.95" transform="rotate(38 233 167)"/>
      <circle cx="215" cy="162" r="18" fill="#a85a4a" opacity="0.65"/>
      <circle cx="128" cy="310" r="35" fill="#c97d6a" opacity="0.55"/>
      <ellipse cx="128" cy="278" rx="14" ry="22" fill="#e8c4b0" opacity="0.65" transform="rotate(-12 128 278)"/>
      <ellipse cx="155" cy="292" rx="13" ry="21" fill="#e8c4b0" opacity="0.55" transform="rotate(22 155 292)"/>
      <circle cx="128" cy="312" r="13" fill="#a85a4a" opacity="0.5"/>
      <ellipse cx="172" cy="248" rx="38" ry="16" fill="#8a9e7e" opacity="0.75" transform="rotate(42 172 248)"/>
      <ellipse cx="82" cy="402" rx="44" ry="15" fill="#8a9e7e" opacity="0.65" transform="rotate(-32 82 402)"/>
      <ellipse cx="185" cy="372" rx="33" ry="12" fill="#8a9e7e" opacity="0.55" transform="rotate(58 185 372)"/>
      <ellipse cx="48" cy="472" rx="40" ry="14" fill="#7a9070" opacity="0.52" transform="rotate(-22 48 472)"/>
      <ellipse cx="252" cy="208" rx="11" ry="18" fill="#e8c4b0" opacity="0.65" transform="rotate(12 252 208)"/>
      <ellipse cx="168" cy="442" rx="9" ry="15" fill="#c97d6a" opacity="0.55" transform="rotate(-38 168 442)"/>
      <circle cx="102" cy="352" r="6" fill="#c9a96e" opacity="0.75"/>
      <circle cx="115" cy="341" r="5" fill="#c9a96e" opacity="0.65"/>
      <circle cx="97" cy="336" r="5" fill="#c9a96e" opacity="0.55"/>
      <circle cx="68" cy="492" r="9" fill="#e8c4b0" opacity="0.5"/>
      <circle cx="136" cy="515" r="7" fill="#c9a96e" opacity="0.4"/>
    </svg>
  );
}

/* ── Floral corner SVG (original hero) ── */
function FloralCorner({ style }) {
  return (
    <svg style={style} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="38" fill="#c97d6a" opacity="0.4"/>
      <circle cx="120" cy="50" r="22" fill="#e8c4b0" opacity="0.5"/>
      <circle cx="50" cy="120" r="26" fill="#8a9e7e" opacity="0.4"/>
      <circle cx="160" cy="90" r="18" fill="#c9a96e" opacity="0.3"/>
      <ellipse cx="95" cy="155" rx="30" ry="18" fill="#8a9e7e" opacity="0.3" transform="rotate(-30 95 155)"/>
      <ellipse cx="60" cy="60" rx="40" ry="12" fill="#8a9e7e" opacity="0.2" transform="rotate(40 60 60)"/>
      <ellipse cx="80" cy="45" rx="8" ry="20" fill="#e8c4b0" opacity="0.6" transform="rotate(-20 80 45)"/>
      <ellipse cx="105" cy="55" rx="7" ry="18" fill="#c97d6a" opacity="0.5" transform="rotate(15 105 55)"/>
      <ellipse cx="55" cy="90" rx="7" ry="18" fill="#e8c4b0" opacity="0.5" transform="rotate(50 55 90)"/>
    </svg>
  );
}

/* ── Countdown ── */
function useCountdown(target) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setTime({ done: true });
      setTime({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── NAV ── */
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", justifyContent: "center", gap: "2.5rem",
      padding: "1.1rem 2rem",
      background: "rgba(250,246,240,0.9)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(201,169,110,0.18)",
      fontFamily: "'Jost', sans-serif",
    }}>
      {[["#hero","Home"],["#details","Details"],["#rsvp","RSVP"],["#location","Location"]].map(([href,label]) => (
        <a key={href} href={href} className="nav-link">{label}</a>
      ))}
    </nav>
  );
}

/* ── HERO (original boho style) ── */
function Hero() {
  const cd = useCountdown("2026-06-12T19:00:00");
  const anim = (delay) => ({
    animation: `fadeUp 1s ${delay}s ease both`,
  });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "6rem 2rem 4rem",
      position: "relative", overflow: "hidden",
      width: "100vw", marginLeft: "calc(-50vw + 50%)",
      background: colors.cream, fontFamily: "'Jost', sans-serif",
    }}>
      {/* Floral corners */}
      <FloralCorner style={{ position:"absolute", top:"-20px", left:"-20px", width:"min(320px,45vw)", opacity:0.22, pointerEvents:"none", zIndex:0 }}/>
      <FloralCorner style={{ position:"absolute", bottom:"-20px", right:"-20px", width:"min(280px,40vw)", opacity:0.18, pointerEvents:"none", zIndex:0, transform:"rotate(180deg) scaleX(-1)" }}/>
      <svg style={{ position:"absolute", top:"30%", left:"5%", opacity:0.1, width:"60px", pointerEvents:"none" }} viewBox="0 0 60 60"><ellipse cx="30" cy="30" rx="10" ry="28" fill="#c97d6a" transform="rotate(25 30 30)"/></svg>
      <svg style={{ position:"absolute", top:"60%", right:"8%", opacity:0.1, width:"50px", pointerEvents:"none" }} viewBox="0 0 60 60"><ellipse cx="30" cy="30" rx="10" ry="28" fill="#8a9e7e" transform="rotate(-15 30 30)"/></svg>

      {/* Content */}
      <p style={{ ...anim(0), position:"relative", zIndex:1, fontSize:"0.7rem", letterSpacing:"0.3em", textTransform:"uppercase", color:colors.gold, marginBottom:"1.5rem" }}>
        You are cordially invited to celebrate
      </p>

      <h1 style={{ ...anim(0.2), position:"relative", zIndex:1, fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(3rem, 8vw, 5.5rem)", fontWeight:300, lineHeight:1, color:colors.deep }}>
        Ziad
        <span style={{ display:"block", fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(1.8rem,4vw,3.2rem)", color:colors.gold, fontStyle:"italic", lineHeight:1.2 }}>
          &amp;
        </span>
        Diana
      </h1>

      {/* Gold divider */}
      <div style={{ ...anim(0.4), position:"relative", zIndex:1, width:"120px", height:"1px", background:`linear-gradient(to right, transparent, ${colors.gold}, transparent)`, margin:"2rem auto" }}/>

      <p style={{ ...anim(0.5), position:"relative", zIndex:1, fontFamily:"'Cormorant Garamond', serif", fontSize:"1rem", fontStyle:"italic", color:colors.earth, letterSpacing:"0.05em" }}>
        Friday, the Twelfth of June, Two Thousand &amp; Twenty-Six
      </p>
      <p style={{ ...anim(0.6), position:"relative", zIndex:1, fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", color:colors.sage, marginTop:"0.5rem" }}>
        Lumira Hall · Dar Al-Ishara · Al-Thawra Street
      </p>

      {/* Countdown */}
      <div style={{ ...anim(0.7), position:"relative", zIndex:1, display:"flex", gap:"1.5rem", marginTop:"2.5rem" }}>
        {cd.done ? (
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontStyle:"italic", color:colors.rose }}>
            Today is the day! 🌸
          </p>
        ) : (
          [["d","Days"],["h","Hours"],["m","Minutes"],["s","Seconds"]].map(([k,label], i) => (
            <div key={k} style={{ textAlign:"center" }}>
              {i > 0 && <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", color:colors.gold, opacity:0.5, position:"absolute", marginLeft:"-1.2rem", marginTop:"0.2rem" }}>·</span>}
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", fontWeight:300, lineHeight:1, color:colors.rose }}>{cd[k]}</div>
              <div style={{ fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:colors.earth, marginTop:"0.3rem" }}>{label}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

/* ── Section Header ── */
function SectionHeader({ tag, title, titleEm }) {
  return (
    <>
      <span className="reveal" style={{ fontSize:"0.62rem", letterSpacing:"0.32em", textTransform:"uppercase", color:colors.gold, display:"block", textAlign:"center", marginBottom:"1rem", fontFamily:"'Jost',sans-serif" }}>{tag}</span>
      <h2 className="reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:300, textAlign:"center", color:colors.deep }}>
        {title} <em style={{ color:colors.rose, fontStyle:"italic" }}>{titleEm}</em>
      </h2>
      <div className="reveal" style={{ width:"70px", height:"1px", margin:"1.5rem auto 3rem", background:`linear-gradient(to right,transparent,${colors.gold},transparent)` }}/>
    </>
  );
}

/* ── EVENT DETAILS ── */
function Details() {
  const cards = [
    { icon:"🗓", title:"The Date", body:"Friday\nJune 12, 2026" },
    { icon:"🕖", title:"The Time", body:"Ceremony begins at\n7:00 PM" },
    { icon:"🌿", title:"The Venue", body:"Lumira Hall\nDar Al-Ishara\nAl-Thawra Street" },
    { icon:"👗", title:"Dress Code", body:"Formal Attire\nSoft & Earthy Tones\nWelcome" },
  ];
  return (
    <section id="details" style={{ width:"100vw", marginLeft:"calc(-50vw + 50%)", background:colors.warm, padding:"6rem 2rem" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <SectionHeader tag="The Details" title="When &" titleEm="Where"/>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.5rem" }}>
          {cards.map(({ icon,title,body }) => (
            <div key={title} className="detail-card" style={{ background:colors.cream, padding:"2.5rem 1.8rem", textAlign:"center", border:"1px solid rgba(201,169,110,0.18)", borderRadius:"1px", fontFamily:"'Jost',sans-serif" }}>
              <div style={{ fontSize:"1.8rem", marginBottom:"1rem" }}>{icon}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", color:colors.earth, marginBottom:"0.7rem", fontWeight:400 }}>{title}</h3>
              <p style={{ fontSize:"0.83rem", color:colors.deep, lineHeight:1.8, opacity:0.8, whiteSpace:"pre-line" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WEDDING PARTY ── */
function PartyCard({ initial, name, role, bg }) {
  return (
    <div className="party-card" style={{ textAlign:"center", padding:"2rem 1rem", border:"1px solid rgba(201,169,110,0.15)", background:colors.warm, borderRadius:"1px", fontFamily:"'Jost',sans-serif" }}>
      <div style={{ width:"76px", height:"76px", borderRadius:"50%", margin:"0 auto 1rem", display:"flex", alignItems:"center", justifyContent:"center", background:bg, fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", color:colors.cream, fontStyle:"italic" }}>
        {initial}
      </div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", color:colors.deep, marginBottom:"0.3rem" }}>{name}</div>
      <div style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:colors.rose }}>{role}</div>
    </div>
  );
}

function WeddingParty() {
  const bridesSide = [
    { initial:"D", name:"Diana Weal",    role:"The Bride",      bg:`radial-gradient(circle at 35% 35%,${colors.blush},${colors.rose})` },
    { initial:"M", name:"Maid of Honor", role:"Maid of Honor",  bg:`radial-gradient(circle at 35% 35%,#f0d4c4,${colors.rose})` },
    { initial:"B", name:"Bridesmaid",    role:"Bridesmaid",     bg:`radial-gradient(circle at 35% 35%,#b5c9a8,${colors.sage})` },
  ];
  return (
    <section id="party" style={{ padding:"6rem 2rem", background:colors.cream }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <SectionHeader tag="The People" title="Wedding" titleEm="Party"/>
        <p className="reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontStyle:"italic", color:colors.earth, textAlign:"center", marginBottom:"1.8rem" }}>
          The Bride's Side
        </p>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"1.5rem" }}>
          {bridesSide.map((p) => <PartyCard key={p.name} {...p}/>)}
        </div>
      </div>
    </section>
  );
}

/* ── LOCATION ── */
function Location() {
  return (
    <section id="location" style={{ width:"100vw", marginLeft:"calc(-50vw + 50%)", background:colors.deep, padding:"6rem 2rem" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <span className="reveal" style={{ fontSize:"0.62rem", letterSpacing:"0.32em", textTransform:"uppercase", color:colors.gold, display:"block", textAlign:"center", marginBottom:"1rem", fontFamily:"'Jost',sans-serif" }}>
          Find Us
        </span>
        <h2 className="reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:300, textAlign:"center", color:"#fff" }}>
          The <em style={{ color:colors.blush, fontStyle:"italic" }}>Location</em>
        </h2>
        <div className="reveal" style={{ width:"70px", height:"1px", margin:"1.5rem auto 3rem", background:`linear-gradient(to right,transparent,${colors.gold},transparent)` }}/>

        <div className="reveal" style={{ borderRadius:"2px", overflow:"hidden", border:"1px solid rgba(201,169,110,0.25)", boxShadow:"0 20px 60px rgba(0,0,0,0.45)", position:"relative" }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=31.3463%2C30.0791%2C31.3523%2C30.0831&layer=mapnik&marker=30.081106593046083%2C31.349298909974753"
            style={{ width:"100%", height:"420px", display:"block", border:"none" }}
            allowFullScreen loading="lazy" title="Lumira Hall Location"
          />
          <div style={{ position:"absolute", bottom:"1.5rem", left:"1.5rem", background:"rgba(26,15,10,0.9)", backdropFilter:"blur(8px)", border:"1px solid rgba(201,169,110,0.28)", padding:"1rem 1.4rem", maxWidth:"230px" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", color:colors.gold, marginBottom:"0.3rem" }}>Lumira Hall</div>
            <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.5)", lineHeight:1.6, fontFamily:"'Jost',sans-serif" }}>Dar Al-Ishara<br/>Al-Thawra Street, Cairo</div>
          </div>
        </div>

        <div className="reveal" style={{ textAlign:"center", marginTop:"2rem" }}>
          <a className="map-dir-btn" href="https://www.google.com/maps/dir/?api=1&destination=30.081106593046083,31.349298909974753" target="_blank" rel="noopener noreferrer">
            ↗ &nbsp; Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── RSVP FORM ── */
function RSVP() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem("weddingGuests");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(formRef.current);
      const guestData = {
        id: Date.now(),
        name: formData.get("name"),
        attendees: parseInt(formData.get("attendees")),
        message: formData.get("message"),
        timestamp: new Date().toLocaleDateString(),
      };

      const response = await emailjs.send("service_wdjka3c", "template_8k50qpf", {
        to_email: "zehab028@gmail.com",
        guest_name: guestData.name,
        attendees: guestData.attendees,
        message: guestData.message,
      });

      if (response.status === 200) {
        const updatedGuests = [...guests, guestData];
        setGuests(updatedGuests);
        localStorage.setItem("weddingGuests", JSON.stringify(updatedGuests));
        setSubmitted(true);
        formRef.current.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" style={{ width:"100vw", marginLeft:"calc(-50vw + 50%)", background:colors.warm, padding:"6rem 2rem" }}>
      <div style={{ maxWidth:"700px", margin:"0 auto" }}>
        <SectionHeader tag="Confirm Your Presence" title="RSVP &" titleEm="Join Us"/>
        
        {submitted && (
          <div className="reveal" style={{ 
            background: "#d4edda", 
            color: "#155724", 
            padding: "1.5rem", 
            borderRadius: "2px", 
            marginBottom: "2rem",
            textAlign: "center",
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.9rem"
          }}>
            ✓ Thank you! Your RSVP has been sent successfully.
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="reveal" style={{ fontFamily:"'Jost',sans-serif" }}>
          <div style={{ marginBottom:"1.8rem" }}>
            <label style={{ display:"block", fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:colors.earth, marginBottom:"0.5rem" }}>
              Your Name *
            </label>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Full Name"
              style={{
                width:"100%",
                padding:"0.85rem 1rem",
                border:`1px solid rgba(201,169,110,0.3)`,
                borderRadius:"2px",
                fontSize:"0.95rem",
                fontFamily:"'Jost',sans-serif",
                backgroundColor:"rgba(250,246,240,0.5)",
                color:colors.deep,
              }}
            />
          </div>

          <div style={{ marginBottom:"1.8rem" }}>
            <label style={{ display:"block", fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:colors.earth, marginBottom:"0.5rem" }}>
              Number of Attendees *
            </label>
            <select 
              name="attendees" 
              required
              style={{
                width:"100%",
                padding:"0.85rem 1rem",
                border:`1px solid rgba(201,169,110,0.3)`,
                borderRadius:"2px",
                fontSize:"0.95rem",
                fontFamily:"'Jost',sans-serif",
                backgroundColor:"rgba(250,246,240,0.5)",
                color:colors.deep,
              }}
            >
              <option value="">Select...</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
            </select>
          </div>

          <div style={{ marginBottom:"2rem" }}>
            <label style={{ display:"block", fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:colors.earth, marginBottom:"0.5rem" }}>
              Message
            </label>
            <textarea 
              name="message" 
              placeholder="Share your thoughts..."
              rows="4"
              style={{
                width:"100%",
                padding:"0.85rem 1rem",
                border:`1px solid rgba(201,169,110,0.3)`,
                borderRadius:"2px",
                fontSize:"0.95rem",
                fontFamily:"'Jost',sans-serif",
                backgroundColor:"rgba(250,246,240,0.5)",
                color:colors.deep,
                resize:"vertical",
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width:"100%",
              padding:"1rem",
              background:loading ? colors.sage : colors.rose,
              color:"white",
              border:"none",
              borderRadius:"2px",
              fontSize:"0.85rem",
              letterSpacing:"0.15em",
              textTransform:"uppercase",
              fontFamily:"'Jost',sans-serif",
              cursor:loading ? "not-allowed" : "pointer",
              transition:"all 0.3s",
              fontWeight:500,
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = colors.earth)}
            onMouseLeave={(e) => !loading && (e.target.style.background = colors.rose)}
          >
            {loading ? "Sending..." : "Confirm Invitation"}
          </button>
        </form>

        {/* Guests Board */}
        {guests.length > 0 && (
          <div style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: `1px solid rgba(201,169,110,0.2)` }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: colors.deep, textAlign: "center", marginBottom: "1.5rem" }}>
              Our Guests
            </h3>

            {/* Total Attendees Counter */}
            <div style={{ 
              background: colors.cream, 
              padding: "1.5rem", 
              borderRadius: "2px", 
              textAlign: "center", 
              marginBottom: "2rem",
              border: `1px solid rgba(201,169,110,0.2)`
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: colors.rose, fontWeight: 300 }}>
                {guests.reduce((sum, g) => sum + g.attendees, 0)}
              </div>
              <div style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: colors.earth }}>
                Total Attendees
              </div>
            </div>

            {/* Guest List */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.2rem" }}>
              {guests.map((guest) => (
                <div key={guest.id} className="reveal" style={{
                  background: colors.warm,
                  padding: "1.5rem",
                  borderRadius: "2px",
                  border: `1px solid rgba(201,169,110,0.15)`,
                  fontFamily: "'Jost', sans-serif"
                }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: colors.deep, marginBottom: "0.5rem" }}>
                    {guest.name}
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: colors.rose, marginBottom: "0.8rem", fontWeight: 500 }}>
                    👥 {guest.attendees} {guest.attendees === 1 ? "Person" : "People"}
                  </p>
                  {guest.message && (
                    <p style={{ fontSize: "0.85rem", color: colors.earth, fontStyle: "italic", lineHeight: 1.5 }}>
                      "{guest.message}"
                    </p>
                  )}
                  <p style={{ fontSize: "0.7rem", color: "rgba(122,92,72,0.5)", marginTop: "0.8rem" }}>
                    {guest.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ width:"100vw", marginLeft:"calc(-50vw + 50%)", background:"#130a07", color:"rgba(250,246,240,0.27)", textAlign:"center", padding:"3rem 2rem", fontSize:"0.67rem", letterSpacing:"0.15em", borderTop:"1px solid rgba(201,169,110,0.08)", fontFamily:"'Jost',sans-serif" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontStyle:"italic", color:"rgba(201,169,110,0.48)", marginBottom:"0.6rem" }}>Ziad &amp; Diana</div>
      <p>June 12, 2026 &nbsp;·&nbsp; Lumira Hall &nbsp;·&nbsp; Al-Thawra Street</p>
      <p style={{ marginTop:"1rem" }}>Made with <span style={{ color:colors.gold }}>♥</span></p>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  useReveal();

  return (
    <div style={{ fontFamily:"'Jost', sans-serif", background:colors.cream }}>
      <Nav />
      <Hero />
      <Details />
      <RSVP />
      <Location />
      <Footer />
    </div>
  );
}
