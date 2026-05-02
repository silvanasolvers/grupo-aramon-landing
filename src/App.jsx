import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { ArrowUpRight, Check, Factory, Sparkles, Shirt, BadgeCheck } from 'lucide-react';
import './styles.css';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] } }
};

function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale = useTransform(scrollYProgress, [0, .35], [1, 1.08]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.to('.orb', { y: -28, x: 18, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .4 });
      gsap.to('.ticker-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' });
    }, heroRef);
    return () => { ctx.revert(); lenis.destroy(); };
  }, []);

  return <main ref={heroRef}>
    <nav className="nav">
      <div className="brand"><span>GA</span> Grupo Aramon</div>
      <a className="navCta" href="#contacto">Cotizar <ArrowUpRight size={16}/></a>
    </nav>

    <section className="hero">
      <div className="orb orbA" />
      <div className="orb orbB" />
      <motion.div className="heroCopy" initial="hidden" animate="show" variants={fadeUp}>
        <p className="kicker">Producción corporativa premium</p>
        <h1>Camisetas y gorras personalizadas para marcas que compran en serio.</h1>
        <p className="lead">Grupo Aramon crea prendas B2B de alto impacto para activaciones, dotaciones, lanzamientos y regalos corporativos con pedidos desde <strong>$50M COP</strong>.</p>
        <div className="heroBtns">
          <a className="primary" href="#contacto">Quiero una propuesta <ArrowUpRight size={18}/></a>
          <a className="secondary" href="#proceso">Ver proceso</a>
        </div>
      </motion.div>
      <motion.div className="heroVisual" style={{ y: heroY, scale }}>
        <img src="/images/hero.jpg" alt="Showroom premium de camisetas y gorras personalizadas" />
        <div className="floatCard top"><Sparkles size={18}/> B2B +50M COP</div>
        <div className="floatCard bottom"><BadgeCheck size={18}/> Producción premium</div>
      </motion.div>
    </section>

    <section className="ticker" aria-label="Servicios destacados">
      <div className="ticker-track">
        {Array.from({ length: 2 }).map((_, i) => <div className="ticker-row" key={i}>
          <span>CAMISETAS</span><span>GORRAS</span><span>BORDADO</span><span>ESTAMPACIÓN</span><span>DOTACIÓN</span><span>MERCH B2B</span>
        </div>)}
      </div>
    </section>

    <section className="intro">
      <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-90px' }} variants={fadeUp}>
        <p className="kicker">No es mercancía genérica</p>
        <h2>Es presencia de marca convertida en prenda.</h2>
      </motion.div>
      <div className="introGrid">
        <Feature icon={<Shirt/>} title="Camisetas a medida" text="Cortes, telas, paletas y acabados pensados para campañas corporativas con volumen." />
        <Feature icon={<Factory/>} title="Gorras personalizadas" text="Bordado, parches, etiquetas, combinaciones de color y producción consistente por lote." />
        <Feature icon={<Check/>} title="Solo B2B calificado" text="Trabajamos pedidos empresariales desde $50M COP para cuidar calidad, tiempos y atención." />
      </div>
    </section>

    <section className="gallery">
      <motion.article className="photoCard" initial="hidden" whileInView="show" viewport={{ once:true }} variants={fadeUp}>
        <img src="/images/shirts.jpg" alt="Camisetas corporativas personalizadas" />
        <div><p>01</p><h3>Camisetas corporativas</h3><span>Prendas para equipos, eventos, retail y activaciones.</span></div>
      </motion.article>
      <motion.article className="photoCard reverse" initial="hidden" whileInView="show" viewport={{ once:true }} variants={fadeUp}>
        <img src="/images/caps.jpg" alt="Gorras corporativas personalizadas" />
        <div><p>02</p><h3>Gorras con acabados premium</h3><span>Piezas que se sienten cuidadas, no improvisadas.</span></div>
      </motion.article>
    </section>

    <section id="proceso" className="process">
      <div className="sectionHead">
        <p className="kicker">Método Aramon</p>
        <h2>Del brief al lote final sin perder control.</h2>
      </div>
      <div className="steps">
        {[
          ['01', 'Brief B2B', 'Entendemos uso, cantidad, presupuesto, fechas y lineamientos de marca.'],
          ['02', 'Diseño + muestra', 'Proponemos ruta visual, materiales, técnicas y prototipos.'],
          ['03', 'Producción', 'Control de calidad por lote, acabados y empaque listo para entrega.'],
          ['04', 'Entrega corporativa', 'Coordinación logística para campañas, sedes o eventos.']
        ].map(([n,t,txt]) => <motion.div className="step" key={n} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7}}><b>{n}</b><h3>{t}</h3><p>{txt}</p></motion.div>)}
      </div>
    </section>

    <section className="qualification">
      <div>
        <p className="kicker">Filtro de calidad</p>
        <h2>Pedidos desde $50M COP.</h2>
        <p>Ese umbral permite dedicar dirección creativa, producción seria y seguimiento real a cada cuenta. Menos improvisación. Más marca.</p>
      </div>
      <div className="metric"><span>+50M</span><small>COP mínimo por proyecto B2B</small></div>
    </section>

    <section id="contacto" className="finalCta">
      <p className="kicker">Grupo Aramon</p>
      <h2>Si tu marca necesita vestir una campaña completa, hablemos.</h2>
      <a className="primary bigBtn" href="mailto:comercial@grupoaramon.com?subject=Cotización%20B2B%20Grupo%20Aramon">Solicitar cotización <ArrowUpRight size={20}/></a>
    </section>
  </main>
}

function Feature({ icon, title, text }) {
  return <motion.div className="feature" initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{once:true}} transition={{duration:.7}}>
    <div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p>
  </motion.div>
}

createRoot(document.getElementById('root')).render(<App />);
