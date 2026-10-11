import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Cpu, Menu, Radio, X } from 'lucide-react';

const motionIn = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.22, 1, .36, 1] } } };
const disciplines = [
  { number: '01', icon: Cpu, title: 'Design & build', copy: 'From the first sketch to the final bolt check, we turn ideas into mechanisms we can test and improve.' },
  { number: '02', icon: Code2, title: 'Code & control', copy: 'Software gives the robot purpose: clear driver controls, thoughtful automation, and room to keep iterating.' },
  { number: '03', icon: Radio, title: 'Learn together', copy: 'FTC is bigger than match day. We share what we learn and invite our community into the process.' },
];
const roles = ['Hardware & CAD', 'Software', 'Drive team & testing', 'Outreach'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', organization: '' });
  function submitInterest(event) {
    event.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', organization: '' });
  }
  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Swervo, FTC team 26256 home"><img src="/swervo-logo.png" alt="Swervo team logo, team 26256" /></a>
      <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {[['Robot', '#robot'], ['Our approach', '#approach'], ['Team', '#team'], ['Outreach', '#outreach'], ['Sponsors', '#sponsors']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
      </nav>
      <a className="header-cta" href="#sponsors">Support the team <ArrowUpRight size={15} /></a>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <motion.div className="hero-copy" initial="hidden" animate="show" variants={motionIn}>
          <div className="eyebrow"><span className="eyebrow-rule" /> FIRST TECH CHALLENGE <span className="eyebrow-divider">/</span> TEAM 26256</div>
          <h1>Meet the team<br/>behind <span>the turn.</span></h1>
          <p>We’re Swervo — students designing, building, and programming a robot for the FIRST Tech Challenge. Every version starts with a question: what can we make better?</p>
          <div className="hero-actions"><a href="#robot" className="button button-primary">Meet our robot <ArrowRight size={16}/></a><a href="#approach" className="quiet-link">How we work <ArrowDown size={14}/></a></div>
          <div className="hero-footnote"><span className="signal-dot"/> STUDENT BUILT <span>·</span> FIRST TECH CHALLENGE</div>
        </motion.div>
        <motion.figure className="hero-visual" initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} transition={{duration:.7,delay:.1}}>
          <img src="/swervo-robot.png" alt="Swervo's blue FTC competition robot, with an articulated lift and metal frame" />
          <div className="photo-shade" />
          <figcaption><span className="photo-kicker">ON THE FIELD <i/></span><b>SWERVO <span>·</span> 26256</b><span className="photo-caption">Our robot, built by our team.</span></figcaption>
          <span className="photo-index">01 — ROBOT</span>
        </motion.figure>
      </section>

      <section className="intro-band" id="robot">
        <div className="section-inner intro-layout">
          <motion.div variants={motionIn} initial="hidden" whileInView="show" viewport={{once:true}}>
            <div className="eyebrow">A REAL ROBOT. A LOT OF ITERATION.</div>
            <h2>Built to learn.<br/><span>Ready to compete.</span></h2>
          </motion.div>
          <div className="intro-copy"><p>Every part of the robot reflects a team decision: what to prototype, what to test, and what to change next. We bring the same curiosity to code, outreach, and match strategy.</p><a className="text-arrow" href="#team">Get to know Swervo <ArrowRight size={15}/></a></div>
        </div>
      </section>

      <section className="section-inner approach-section" id="approach">
        <div className="section-title"><div><div className="eyebrow">THE WORK BEHIND THE ROBOT</div><h2>Many skills.<br/>One build.</h2></div><p>FTC brings engineering, programming, and teamwork together. We learn by doing the work, then sharing what we find.</p></div>
        <div className="discipline-grid">{disciplines.map(({number,icon:Icon,title,copy},i)=><motion.article className="discipline-card" key={number} variants={motionIn} initial="hidden" whileInView="show" viewport={{once:true,amount:.25}} transition={{delay:i*.08}} whileHover={{y:-5}}><span className="discipline-number">{number}</span><span className="discipline-icon"><Icon size={19}/></span><h3>{title}</h3><p>{copy}</p><span className="card-arrow"><ArrowUpRight size={16}/></span></motion.article>)}</div>
      </section>
      <section className="team-section" id="team"><div className="section-inner team-layout">
        <motion.div className="team-copy" variants={motionIn} initial="hidden" whileInView="show" viewport={{once:true}}><div className="eyebrow">PEOPLE MAKE THE ROBOT</div><h2>One team.<br/><span>Every perspective.</span></h2><p>Swervo is a student team learning by designing, programming, testing, and competing together. We bring different strengths to the same workbench.</p><a className="text-arrow" href="https://www.firstinspires.org/programs/ftc" target="_blank" rel="noreferrer">Explore FIRST Tech Challenge <ArrowUpRight size={15}/></a></motion.div>
        <div className="role-grid">{roles.map((role,index)=><motion.div className="role-card" key={role} variants={motionIn} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:index*.06}}><span>0{index+1}</span><b>{role}</b><ArrowUpRight size={15}/></motion.div>)}</div>
      </div></section>

      <section className="outreach-section section-inner" id="outreach"><div className="outreach-image"><img src="/swervo-robot.png" alt="Close view of the Swervo robot at a robotics event" loading="lazy"/><span>DESIGN · BUILD · SHARE</span></div><div className="outreach-copy"><div className="eyebrow">BEYOND MATCH DAY</div><h2>Robotics is better<br/>when it’s shared<span>.</span></h2><p>FIRST is about more than building a robot. It’s a chance to learn with others, support new makers, and make STEM feel welcoming in our community.</p><a href="#sponsors" className="text-arrow">Help us keep building <ArrowRight size={15}/></a></div></section>

      <section className="sponsor-section" id="sponsors"><div className="section-inner sponsor-layout"><motion.div className="sponsor-copy" variants={motionIn} initial="hidden" whileInView="show" viewport={{once:true}}><div className="eyebrow"><span className="eyebrow-rule"/> BUILD THE NEXT ITERATION</div><h2>Help students<br/>make it move<span>.</span></h2><p>Community support helps student teams get the tools, materials, and competition experience to keep learning through robotics.</p><div className="support-tags"><span>TOOLS & MATERIALS</span><span>EVENTS & TRAVEL</span><span>STUDENT LEARNING</span></div></motion.div>
        <motion.div className="interest-card" variants={motionIn} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}><div className="interest-heading"><div><div className="eyebrow">SPONSORSHIP & PARTNERSHIPS</div><h3>Let’s start a conversation.</h3></div><ArrowUpRight size={19}/></div><form onSubmit={submitInterest}><label>Your name<input required autoComplete="name" placeholder="Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email address<input required type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Organization <span>OPTIONAL</span><input autoComplete="organization" placeholder="Your organization" value={form.organization} onChange={e=>setForm({...form,organization:e.target.value})}/></label><button className="button button-lime" type="submit">{sent?<><Check size={16}/> Interest noted</>:<>I’d like to support Swervo <ArrowRight size={15}/></>}</button><p className="form-disclaimer">This demo form confirms locally; add a team email or form service to receive submissions.</p></form></motion.div>
      </div></section>
    </main>

    <footer className="site-footer section-inner"><a href="#home" className="footer-logo"><img src="/swervo-logo.png" alt="Swervo team logo"/></a><div className="footer-meta"><span>FIRST TECH CHALLENGE · TEAM 26256</span><small>Swervo is an independent FIRST team. FIRST® and FIRST Tech Challenge® are trademarks of For Inspiration and Recognition of Science and Technology.</small></div><div className="footer-links"><a href="https://github.com/rugved-codes/ftc26256" aria-label="GitHub"><Code2 size={17}/></a></div><a className="back-top" href="#home">BACK TO TOP ↑</a></footer>
    <AnimatePresence>{sent&&<motion.div className="confirmation-toast" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}><span><Check size={14}/></span><div><b>Thanks for your interest.</b><small>This demo form has not sent your details.</small></div><button onClick={()=>setSent(false)} aria-label="Dismiss"><X size={15}/></button></motion.div>}</AnimatePresence>
  </div>;
}
export default App;




