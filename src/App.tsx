import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type Page = "home" | "beauty" | "tarot" | "about" | "portfolio" | "contact";

const images = {
  beautyHero:
    "https://images.unsplash.com/photo-1616926885190-52dbe533292f?auto=format&fit=crop&w=1800&q=88",
  beautySoft:
    "https://images.unsplash.com/photo-1563170446-9c3c0622d8a9?auto=format&fit=crop&w=1400&q=88",
  portrait:
    "https://images.unsplash.com/photo-1637325262485-5cf1abb98c05?auto=format&fit=crop&w=1500&q=88",
  detail:
    "https://images.unsplash.com/photo-1684361436003-aa575b96bc2d?auto=format&fit=crop&w=1400&q=88",
  hair: "https://images.unsplash.com/photo-1560869713-bf165a9cfac1?auto=format&fit=crop&w=1400&q=88",
  hairStudio:
    "https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=1600&q=88",
  hairArtist:
    "https://images.unsplash.com/photo-1695527081848-1e46c06e6458?auto=format&fit=crop&w=1300&q=88",
  tarot:
    "https://images.unsplash.com/photo-1607773709367-06b7a91f7e4a?auto=format&fit=crop&w=1800&q=88",
  tarotTable:
    "https://images.unsplash.com/photo-1728241189719-ea4327c16eee?auto=format&fit=crop&w=1500&q=88",
  tarotCards:
    "https://images.unsplash.com/photo-1671013033034-5ea58e9c5008?auto=format&fit=crop&w=1500&q=88",
  candle:
    "https://images.unsplash.com/photo-1703074907714-4cd6a222fc39?auto=format&fit=crop&w=1400&q=88",
};

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Beauty Studio", page: "beauty" },
  { label: "Kimpriestess Tarot", page: "tarot" },
  { label: "About Kimberly", page: "about" },
  { label: "Portfolio", page: "portfolio" },
  { label: "Contact", page: "contact" },
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? "arrow down" : "arrow"} viewBox="0 0 24 24" aria-hidden="true">
      <path d={down ? "M12 3v17m0 0 6-6m-6 6-6-6" : "M4 12h16m0 0-6-6m6 6-6 6"} />
    </svg>
  );
}

function MoonMark({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "moon-mark large" : "moon-mark"}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="27" />
      <path d="M60 25a29 29 0 0 0 0 50 28 28 0 1 1 0-50Z" />
      <path d="M50 5v10M50 85v10M5 50h10M85 50h10M18 18l7 7M75 75l7 7M82 18l-7 7M25 75l-7 7" />
    </svg>
  );
}

function Button({
  children,
  onClick,
  light = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  light?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button className={`lux-button ${light ? "light" : ""}`} onClick={onClick} type={type}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </div>
  );
}

function Header({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (next: Page) => {
    setOpen(false);
    navigate(next);
  };

  return (
    <header className={`site-header ${scrolled || page !== "home" ? "solid" : ""}`}>
      <button className="wordmark" onClick={() => go("home")} aria-label="Kimberly Marissa, home">
        <span>KIMBERLY</span>
        <i>MARISSA</i>
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            className={page === item.page ? "active" : ""}
            key={item.page}
            onClick={() => go(item.page)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className="header-cta" onClick={() => go("contact")}>
        Book an experience
      </button>
      <button
        className={`menu-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span />
        <span />
      </button>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <p>Beauty · Artistry · Intuition</p>
        {navItems.map((item, index) => (
          <button key={item.page} onClick={() => go(item.page)}>
            <small>0{index + 1}</small>
            {item.label}
          </button>
        ))}
        <Button light onClick={() => go("contact")}>
          Book an experience
        </Button>
      </div>
    </header>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="footer-script">An experience in</p>
          <h2>Beauty & Intuition</h2>
        </div>
        <Button light onClick={() => navigate("contact")}>
          Begin your inquiry
        </Button>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <strong>KIMBERLY MARISSA</strong>
          <p>Beauty · Artistry · Intuition</p>
        </div>
        <div>
          <span>EXPLORE</span>
          {navItems.slice(1, 4).map((x) => (
            <button onClick={() => navigate(x.page)} key={x.page}>
              {x.label}
            </button>
          ))}
        </div>
        <div>
          <span>DISCOVER</span>
          {navItems.slice(4).map((x) => (
            <button onClick={() => navigate(x.page)} key={x.page}>
              {x.label}
            </button>
          ))}
          <button onClick={() => navigate("contact")}>Booking inquiry</button>
        </div>
        <div>
          <span>CONNECT</span>
          <p>Professional inquiries are welcomed through the contact form.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Kimberly Marissa</span>
        <span>Created with intention</span>
      </div>
    </footer>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <main className="home-hero">
        <div className="experience-panel beauty-panel">
          <img src={images.beautyHero} alt="Editorial beauty portrait" />
          <div className="panel-shade" />
          <div className="panel-number">01</div>
          <div className="panel-content">
            <span>THE STUDIO</span>
            <h2>
              Beauty as
              <br />
              <em>artistry.</em>
            </h2>
            <p>Permanent Makeup · Microblading · Hair Styling</p>
            <Button light onClick={() => navigate("beauty")}>
              Explore beauty
            </Button>
          </div>
        </div>
        <div className="experience-panel tarot-panel">
          <img src={images.tarot} alt="Tarot cards and candle in a mystical setting" />
          <div className="stars" />
          <div className="panel-shade" />
          <div className="panel-number">02</div>
          <div className="panel-content">
            <span>THE SANCTUARY</span>
            <h2>
              Wisdom from
              <br />
              <em>within.</em>
            </h2>
            <p>Intuitive Tarot · Spiritual Experiences</p>
            <Button light onClick={() => navigate("tarot")}>
              Explore tarot
            </Button>
          </div>
        </div>
        <div className="hero-center">
          <p className="hero-brand">KIMBERLY MARISSA</p>
          <span>BEAUTY · ARTISTRY · INTUITION</span>
          <h1>
            Where Artistry
            <br />
            Meets <em>Intuition</em>
          </h1>
          <p className="hero-support">
            An expression of beauty, transformation,
            <br />
            and deeper connection.
          </p>
        </div>
        <button
          className="scroll-cue"
          onClick={() =>
            document.getElementById("home-intro")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span>DISCOVER</span>
          <Arrow down />
        </button>
      </main>

      <section className="home-intro section-ivory" id="home-intro">
        <Reveal className="intro-layout">
          <div>
            <Eyebrow>A dual experience</Eyebrow>
            <h2>
              Two worlds.
              <br />
              One <em>intention.</em>
            </h2>
          </div>
          <div className="intro-copy">
            <p>
              Kimberly Marissa brings together the art of personal beauty and the quiet depth of
              intuitive practice—two distinct paths, united by presence, care, and self-expression.
            </p>
            <button className="text-link" onClick={() => navigate("about")}>
              Meet Kimberly <Arrow />
            </button>
          </div>
        </Reveal>
        <div className="orbit-line">
          <MoonMark />
        </div>
      </section>

      <section className="feature-story beauty-story">
        <div className="story-image">
          <img src={images.beautySoft} alt="Refined beauty portrait" />
        </div>
        <Reveal className="story-copy">
          <span className="story-index">01 / THE STUDIO</span>
          <h2>
            The Art of
            <br />
            <em>Refinement</em>
          </h2>
          <p>
            Thoughtful beauty services designed to enhance what is already uniquely yours. Every
            detail is approached with precision, artistry, and intention.
          </p>
          <ul>
            <li>Permanent Makeup</li>
            <li>Microblading</li>
            <li>Hair Styling</li>
          </ul>
          <Button onClick={() => navigate("beauty")}>Enter the studio</Button>
        </Reveal>
      </section>

      <section className="feature-story tarot-story">
        <div className="tarot-ornament">
          <MoonMark large />
        </div>
        <Reveal className="story-copy">
          <span className="story-index">02 / THE SANCTUARY</span>
          <h2>
            A Space for
            <br />
            <em>Inner Knowing</em>
          </h2>
          <p>
            Intuitive tarot readings created as a pause from the noise—a considered space for
            reflection, perspective, and meaningful connection.
          </p>
          <Button light onClick={() => navigate("tarot")}>
            Enter the sanctuary
          </Button>
        </Reveal>
        <div className="story-image">
          <img src={images.tarotTable} alt="Tarot cards arranged by candlelight" />
        </div>
      </section>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  italic,
  text,
  image,
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  italic: string;
  text: string;
  image: string;
  theme?: "light" | "dark";
}) {
  return (
    <section className={`page-hero ${theme}`}>
      <div className="page-hero-copy">
        <Eyebrow light={theme === "dark"}>{eyebrow}</Eyebrow>
        <h1>
          {title}
          <br />
          <em>{italic}</em>
        </h1>
        <p>{text}</p>
      </div>
      <div className="page-hero-image">
        <img src={image} alt="" />
      </div>
      {theme === "dark" && <div className="stars" />}
      <div className="page-count">
        01 <span /> 06
      </div>
    </section>
  );
}

const services = [
  {
    num: "01",
    title: "Permanent Makeup",
    text: "A considered approach to enhancing your natural features with detail-led, personalized artistry.",
    image: images.detail,
  },
  {
    num: "02",
    title: "Microblading",
    text: "Fine, natural-looking brow artistry tailored to the balance and character of your face.",
    image: images.beautySoft,
  },
  {
    num: "03",
    title: "Hair Styling",
    text: "Polished, expressive styling shaped around your personal look, occasion, and desired finish.",
    image: images.hair,
  },
];

function BeforeAfter() {
  const [position, setPosition] = useState(52);
  return (
    <div className="comparison">
      <img src={images.beautySoft} alt="Beauty result before treatment" />
      <div className="comparison-after" style={{ width: `${position}%` }}>
        <img src={images.detail} alt="Beauty result after treatment" />
      </div>
      <span className="compare-label before">BEFORE</span>
      <span className="compare-label after">AFTER</span>
      <input
        aria-label="Drag to compare before and after"
        type="range"
        min="8"
        max="92"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
      />
      <div className="compare-handle" style={{ left: `${position}%` }}>
        <span>‹</span>
        <span>›</span>
      </div>
    </div>
  );
}

function Beauty({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="The Beauty Studio"
        title="Your Beauty,"
        italic="Your Artistry."
        text="A refined beauty experience rooted in precision, individuality, and the art of enhancing what is naturally yours."
        image={images.beautyHero}
      />
      <section className="manifesto section-ivory">
        <Reveal>
          <span className="oversized-index">01</span>
          <Eyebrow>The approach</Eyebrow>
          <h2>
            Beauty, considered
            <br />
            with <em>intention.</em>
          </h2>
          <p>
            Kimberly’s beauty practice brings a thoughtful eye to every detail. Each service begins
            with you—your features, your style, and how you want to feel.
          </p>
        </Reveal>
      </section>
      <section className="services-section">
        <div className="section-heading">
          <Eyebrow>Signature services</Eyebrow>
          <h2>
            Crafted for <em>you</em>
          </h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <Reveal className="service-row" key={service.title}>
              <span>{service.num}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-thumb">
                <img src={service.image} alt="" />
              </div>
              <Arrow />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="comparison-section">
        <Reveal className="comparison-copy">
          <Eyebrow>The transformation</Eyebrow>
          <h2>
            Subtle artistry.
            <br />
            <em>Beautiful detail.</em>
          </h2>
          <p>
            Use the slider to explore a sample transformation. Portfolio imagery is representative
            and will be replaced with Kimberly’s own client work.
          </p>
        </Reveal>
        <Reveal>
          <BeforeAfter />
        </Reveal>
      </section>
      <section className="editorial-gallery">
        <div className="gallery-tall">
          <img src={images.hairArtist} alt="Hair styling in progress" />
        </div>
        <div className="gallery-copy">
          <span>THE PORTFOLIO</span>
          <h2>
            A study in
            <br />
            <em>beauty.</em>
          </h2>
          <button className="text-link" onClick={() => navigate("portfolio")}>
            View selected work <Arrow />
          </button>
        </div>
        <div>
          <img src={images.hairStudio} alt="Professional hair styling" />
        </div>
      </section>
      <BookingBanner navigate={navigate} title="Ready to begin your" italic="beauty experience?" />
    </>
  );
}

const readings = [
  {
    num: "01",
    title: "The Intuitive Reading",
    text: "A focused one-to-one reading centered around the questions or themes currently present for you.",
  },
  {
    num: "02",
    title: "The Open Reading",
    text: "An open, intuitive session for when you feel called to receive reflection without a single set question.",
  },
  {
    num: "03",
    title: "The Deep Dive",
    text: "An extended reading that offers more spacious exploration of a layered question, transition, or theme.",
  },
];

function Tarot({ navigate }: { navigate: (page: Page) => void }) {
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    [
      "What can I bring to a reading?",
      "You may arrive with a specific question, a broader area of focus, or simply an openness to reflect. The inquiry process can help clarify the best format for you.",
    ],
    [
      "Do I need experience with tarot?",
      "Not at all. Readings are designed to feel welcoming whether tarot is familiar to you or entirely new.",
    ],
    [
      "What format are readings offered in?",
      "Availability and session format can be discussed through the booking inquiry so no online or in-person format is assumed.",
    ],
    [
      "Can tarot predict a guaranteed outcome?",
      "Readings are offered as a reflective, intuitive experience—not as a guarantee, diagnosis, or promise of a particular outcome.",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="Kimpriestess Tarot"
        title="Discover the"
        italic="Wisdom Within."
        text="An intuitive space for reflection, guidance, and spiritual connection."
        image={images.tarot}
        theme="dark"
      />
      <section className="tarot-intro">
        <div className="celestial-column">
          <span>✦</span>
          <MoonMark large />
          <span>✦</span>
        </div>
        <Reveal>
          <Eyebrow light>The practice</Eyebrow>
          <h2>
            A quiet space
            <br />
            to <em>listen.</em>
          </h2>
          <p>
            Kimpriestess Tarot is an invitation to slow down and meet yourself with curiosity.
            Kimberly’s readings hold space for reflection, perspective, and your own inner knowing.
          </p>
          <p className="tarot-note">
            Tarot is offered as an intuitive and reflective practice. It does not replace medical,
            legal, financial, or mental health advice.
          </p>
        </Reveal>
        <div className="tarot-intro-image">
          <img src={images.candle} alt="Woman holding a candle in warm low light" />
        </div>
      </section>
      <section className="reading-section">
        <div className="section-heading centered">
          <Eyebrow light>Reading experiences</Eyebrow>
          <h2>
            Choose what <em>calls you</em>
          </h2>
          <p>Each experience is approached with presence and shaped around your inquiry.</p>
        </div>
        <div className="reading-grid">
          {readings.map((reading, i) => (
            <Reveal className="reading-card" key={reading.title}>
              <span>{reading.num}</span>
              {i === 1 && <MoonMark />}
              <h3>{reading.title}</h3>
              <p>{reading.text}</p>
              <button onClick={() => navigate("contact")}>
                INQUIRE ABOUT THIS READING <Arrow />
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="tarot-gallery">
        <div>
          <img src={images.tarotCards} alt="Tarot cards on a reading table" />
        </div>
        <div className="tarot-quote">
          <MoonMark />
          <blockquote>
            “The cards do not tell you who to be. They invite you to remember what you already
            know.”
          </blockquote>
          <span>KIMPRIESTESS TAROT</span>
        </div>
        <div>
          <img src={images.tarotTable} alt="Candlelit tarot card arrangement" />
        </div>
      </section>
      <section className="faq-section">
        <Reveal>
          <Eyebrow>Before your reading</Eyebrow>
          <h2>
            Questions,
            <br />
            <em>answered.</em>
          </h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <button
              className={openFaq === i ? "open" : ""}
              key={q}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            >
              <span>0{i + 1}</span>
              <strong>{q}</strong>
              <i>{openFaq === i ? "−" : "+"}</i>
              <p>{a}</p>
            </button>
          ))}
        </div>
      </section>
      <BookingBanner
        navigate={navigate}
        title="The next insight begins"
        italic="with a question."
        dark
      />
    </>
  );
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <section className="about-hero">
        <div className="about-title">
          <Eyebrow>About the artist</Eyebrow>
          <h1>
            Meet Kimberly
            <br />
            <em>Marissa</em>
          </h1>
        </div>
        <div className="about-portrait">
          <img
            src={images.portrait}
            alt="Professional editorial portrait representing Kimberly Marissa"
          />
          <span>BEAUTY · ARTISTRY · INTUITION</span>
        </div>
        <div className="about-intro">
          <p>An artist working at the meeting point of outer expression and inner connection.</p>
          <MoonMark />
        </div>
      </section>
      <section className="about-story section-ivory">
        <div className="vertical-label">THE STORY</div>
        <Reveal className="about-lead">
          <span>“</span>
          <h2>
            My work is about creating space for people to feel more deeply connected to{" "}
            <em>themselves.</em>
          </h2>
        </Reveal>
        <Reveal className="about-body">
          <Eyebrow>In her own words</Eyebrow>
          <p>
            This space is ready for Kimberly’s personal story—her own perspective on creativity,
            care, and the experiences she creates through beauty and tarot.
          </p>
          <p>
            As a PMU Artist, Microblading Artist, and Hair Stylist, her work is grounded in visual
            detail and considered self-expression. As Kimpriestess Tarot, she offers a different
            kind of space: intuitive, reflective, and quietly personal.
          </p>
          <p className="editable-note">
            Biography copy is intentionally editable and does not assume personal history,
            credentials, or background details.
          </p>
        </Reveal>
      </section>
      <section className="dual-practice">
        <div className="practice beauty-practice">
          <img src={images.detail} alt="Beauty artistry detail" />
          <span>01</span>
          <div>
            <small>THE ARTIST</small>
            <h3>
              Beauty &<br />
              Artistry
            </h3>
            <button onClick={() => navigate("beauty")}>
              Explore the studio <Arrow />
            </button>
          </div>
        </div>
        <div className="practice tarot-practice">
          <img src={images.tarotCards} alt="Tarot cards" />
          <span>02</span>
          <div>
            <small>THE INTUITIVE</small>
            <h3>
              Tarot &<br />
              Reflection
            </h3>
            <button onClick={() => navigate("tarot")}>
              Explore the sanctuary <Arrow />
            </button>
          </div>
        </div>
      </section>
      <BookingBanner navigate={navigate} title="Come as you are." italic="Leave more connected." />
    </>
  );
}

const portfolioItems = [
  {
    category: "Permanent Makeup",
    image: images.detail,
    title: "Refined Detail",
    className: "tall",
  },
  { category: "Tarot", image: images.tarotTable, title: "The Sanctuary", className: "wide" },
  { category: "Hair Styling", image: images.hair, title: "Soft Form", className: "" },
  {
    category: "Microblading",
    image: images.beautySoft,
    title: "Natural Definition",
    className: "",
  },
  {
    category: "Hair Styling",
    image: images.hairStudio,
    title: "Editorial Finish",
    className: "wide",
  },
  { category: "Tarot", image: images.tarotCards, title: "Intuitive Ritual", className: "tall" },
  {
    category: "Permanent Makeup",
    image: images.beautyHero,
    title: "Quiet Confidence",
    className: "",
  },
  { category: "Hair Styling", image: images.hairArtist, title: "In the Studio", className: "" },
];

function Portfolio() {
  const filters = ["All Work", "Permanent Makeup", "Microblading", "Hair Styling", "Tarot"];
  const [filter, setFilter] = useState("All Work");
  const shown =
    filter === "All Work"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);
  return (
    <>
      <section className="portfolio-header">
        <Eyebrow>Selected work</Eyebrow>
        <h1>
          Artistry in
          <br />
          <em>every detail.</em>
        </h1>
        <p>An evolving collection of beauty transformations, styling, and intuitive atmosphere.</p>
      </section>
      <div className="filter-bar" role="group" aria-label="Filter portfolio">
        {filters.map((item) => (
          <button
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="portfolio-grid">
        {shown.map((item, i) => (
          <article
            className={`portfolio-item ${item.className}`}
            key={`${filter}-${item.title}-${i}`}
          >
            <img src={item.image} alt={`${item.category} — ${item.title}`} />
            <div>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <i>VIEW</i>
            </div>
          </article>
        ))}
      </section>
      <p className="portfolio-disclaimer">
        Current imagery is representative photography and will be replaced with Kimberly’s actual
        client portfolio.
      </p>
    </>
  );
}

function Contact() {
  const [type, setType] = useState<"Beauty" | "Tarot">("Beauty");
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section className="contact-page">
      <div className="contact-aside">
        <div className="stars" />
        <Eyebrow light>Book an experience</Eyebrow>
        <h1>
          Begin with
          <br />
          <em>an inquiry.</em>
        </h1>
        <p>
          Tell Kimberly a little about what you’re seeking. This form begins the conversation and is
          not a confirmed appointment.
        </p>
        <div className="contact-divider" />
        <span>NOT SURE WHERE TO BEGIN?</span>
        <p>
          Choose the experience that feels closest. Details and availability can be clarified
          together.
        </p>
        <MoonMark large />
      </div>
      <div className="contact-form-wrap">
        {sent ? (
          <div className="success-state">
            <MoonMark large />
            <Eyebrow>Inquiry received</Eyebrow>
            <h2>
              Thank you for
              <br />
              <em>reaching out.</em>
            </h2>
            <p>
              This prototype has captured the form interaction. A future booking or email
              integration can connect this inquiry to Kimberly directly.
            </p>
            <button className="text-link" onClick={() => setSent(false)}>
              Send another inquiry <Arrow />
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-heading">
              <span>01</span>
              <h2>What brings you here?</h2>
            </div>
            <div className="experience-choice">
              <button
                className={type === "Beauty" ? "active" : ""}
                type="button"
                onClick={() => setType("Beauty")}
              >
                <span>01</span>
                <strong>Beauty Studio</strong>
                <small>PMU · Microblading · Hair</small>
              </button>
              <button
                className={type === "Tarot" ? "active" : ""}
                type="button"
                onClick={() => setType("Tarot")}
              >
                <span>02</span>
                <strong>Kimpriestess Tarot</strong>
                <small>Intuitive readings</small>
              </button>
            </div>
            <div className="form-heading">
              <span>02</span>
              <h2>Tell us about you</h2>
            </div>
            <div className="field-grid">
              <label>
                FULL NAME
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                EMAIL ADDRESS
                <input required type="email" name="email" placeholder="you@email.com" />
              </label>
              <label>
                SERVICE OF INTEREST
                <select name="service" defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {type === "Beauty" ? (
                    <>
                      <option>Permanent Makeup</option>
                      <option>Microblading</option>
                      <option>Hair Styling</option>
                    </>
                  ) : (
                    <>
                      <option>Intuitive Reading</option>
                      <option>Open Reading</option>
                      <option>Deep Dive</option>
                    </>
                  )}
                </select>
              </label>
              <label>
                PREFERRED DATE
                <input type="date" name="date" />
              </label>
              <label className="full">
                YOUR MESSAGE
                <textarea
                  required
                  name="message"
                  placeholder="Share what you’re looking for, any questions, or anything you’d like Kimberly to know."
                />
              </label>
            </div>
            <p className="form-note">
              Submitting this inquiry does not confirm an appointment. Availability, format, and
              next steps will be discussed directly.
            </p>
            <Button type="submit">Send inquiry</Button>
          </form>
        )}
      </div>
    </section>
  );
}

function BookingBanner({
  navigate,
  title,
  italic,
  dark = false,
}: {
  navigate: (page: Page) => void;
  title: string;
  italic: string;
  dark?: boolean;
}) {
  return (
    <section className={`booking-banner ${dark ? "dark" : ""}`}>
      {dark && <div className="stars" />}
      <MoonMark />
      <p>{title}</p>
      <h2>{italic}</h2>
      <Button light={dark} onClick={() => navigate("contact")}>
        Book an experience
      </Button>
    </section>
  );
}

export default function App() {
  const initial = window.location.hash.replace("#/", "") as Page;
  const [page, setPage] = useState<Page>(
    navItems.some((item) => item.page === initial) ? initial : "home",
  );

  const navigate = (next: Page) => {
    setPage(next);
    window.history.pushState({}, "", `#/${next}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPop = () => {
      const next = window.location.hash.replace("#/", "") as Page;
      setPage(navItems.some((item) => item.page === next) ? next : "home");
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = `${page === "home" ? "" : `${navItems.find((x) => x.page === page)?.label} — `}Kimberly Marissa`;
  }, [page]);

  return (
    <div className={`app page-${page}`}>
      <Header page={page} navigate={navigate} />
      {page === "home" && <Home navigate={navigate} />}
      {page === "beauty" && <Beauty navigate={navigate} />}
      {page === "tarot" && <Tarot navigate={navigate} />}
      {page === "about" && <About navigate={navigate} />}
      {page === "portfolio" && <Portfolio />}
      {page === "contact" && <Contact />}
      {page !== "contact" && <Footer navigate={navigate} />}
    </div>
  );
}
