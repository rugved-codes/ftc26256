import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Cpu, Menu, Radio, X } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home' }, { id: 'robot', label: 'Robot' },
  { id: 'approach', label: 'Our approach' }, { id: 'team', label: 'Team' },
  { id: 'outreach', label: 'Outreach' }, { id: 'sponsors', label: 'Sponsors' },
];
const motionIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .45, ease: [.22, 1, .36, 1] } } };
const disciplines = [
  { icon: Cpu, title: 'Design & build', copy: 'From early sketches to the finished robot, we prototype mechanisms, test them, and improve what we learn.' },
  { icon: Code2, title: 'Code & control', copy: 'Software brings the robot to life through driver controls, automation, and careful testing.' },
  { icon: Radio, title: 'Learn together', copy: 'FIRST is about more than match day. We share what we learn and invite our community into the process.' },
];
const roles = ['Hardware & CAD', 'Software', 'Drive team & testing', 'Outreach'];

function getTabFromHash() {
  const id = window.location.hash.replace('#', '');
  return tabs.some(tab => tab.id === id) ? id : 'home';
}
function Logo() { return <img className="brand-logo" src="/swervo-logo-clean.png" alt="Swervo · FIRST Tech Challenge team 26256" />; }

function App() {
  const [activeTab, setActiveTab] = useState(getTabFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', organization: '' });

  useEffect(() => {
    const syncTab = () => setActiveTab(getTabFromHash());
    window.addEventListener('popstate', syncTab);
    window.addEventListener('hashchange', syncTab);
    return () => { window.removeEventListener('popstate', syncTab); window.removeEventListener('hashchange', syncTab); };
  }, []);

  function navigate(id) {
    if (!tabs.some(tab => tab.id === id)) return;
    setActiveTab(id);
    setMenuOpen(false);
    const destination = id === 'home' ? `${window.location.pathname}${window.location.search}` : `#${id}`;
    window.history.pushState(null, '', destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function handleTabKeyDown(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = tabs.findIndex(tab => tab.id === activeTab);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    navigate(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  }
  function submitInterest(event) {
    event.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', organization: '' });
  }

  return <div className="site-shell">
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Swervo home" onClick={event => { event.preventDefault(); navigate('home'); }}><Logo /></a>
      <nav className={`site-tabs ${menuOpen ? 'is-open' : ''}`} role="tablist" aria-label="Website sections" onKeyDown={handleTabKeyDown}>
        {tabs.map(tab => <button key={tab.id} id={`tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls="main-panel" tabIndex={activeTab === tab.id ? 0 : -1} className={activeTab === tab.id ? 'tab-button active' : 'tab-button'} onClick={() => navigate(tab.id)}>{tab.label}</button>)}
      </nav>
      <button className="header-cta" onClick={() => navigate('sponsors')}>Support the team <ArrowUpRight size={15}/></button>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <main id="main-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0} className="page-panel">
      <AnimatePresence mode="wait"><motion.div key={activeTab} className="tab-page" initial={{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-7}} transition={{duration:.18}}>
        {activeTab === 'home' && <>
          <section className="home-hero section-inner"><motion.div className="home-copy" initial="hidden" animate="show" variants={motionIn}><div className="eyebrow"><span className="eyebrow-rule"/> FIRST TECH CHALLENGE <span className="eyebrow-divider">/</span> TEAM 26256</div><h1>Meet Swervo.<br/><span>Built to move.</span></h1><p>We’re students designing, building, and programming a robot for the FIRST Tech Challenge. Every version starts with a question: what can we make better?</p><div className="hero-actions"><button className="button button-primary" onClick={()=>navigate('robot')}>Meet our robot <ArrowRight size={16}/></button><button className="text-arrow" onClick={()=>navigate('team')}>Meet the team <ArrowDown size={14}/></button></div><div className="hero-proof"><span className="signal-dot"/> STUDENT BUILT <i>·</i> FIRST TECH CHALLENGE</div></motion.div><motion.div className="home-robot" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.55}}><div className="robot-aura"/><img src="/swervo-robot-cutout.png" alt="Swervo's blue and silver FTC robot"/><span className="robot-chip">ROBOT 01 <i/> SWERVO</span><span className="team-chip">FTC · 26256</span></motion.div></section>
          <section className="home-strip"><div className="section-inner strip-inner"><span>ENGINEERING</span><i/><span>PROGRAMMING</span><i/><span>TEAMWORK</span><i/><span>COMMUNITY</span><button onClick={()=>navigate('approach')}>Explore how we work <ArrowRight size={14}/></button></div></section>
          <section className="section-inner home-intro"><div><div className="eyebrow">THE PEOPLE BEHIND THE PROTOTYPES</div><h2>Curious minds.<br/><span>One shared workbench.</span></h2></div><div><p>FTC gives us a reason to imagine, build, test, and try again. Swervo is where we bring those ideas to life—together.</p><button className="text-arrow" onClick={()=>navigate('approach')}>Our approach <ArrowRight size={15}/></button></div></section>
        </>}

        {activeTab === 'robot' && <section className="section-inner inner-page robot-page"><div className="page-kicker"><button onClick={()=>navigate('home')} aria-label="Back home"><ArrowLeft size={15}/></button><img className="page-logo" src="/swervo-logo-clean.png" alt=""/><span>SWERVO / ROBOT</span></div><div className="page-heading"><div className="eyebrow">OUR FTC BUILD</div><h1>Designed to<br/><span>keep iterating.</span></h1><p>A closer look at the robot we bring to the field. Each part is a team decision, tested and refined as we learn.</p></div><div className="robot-gallery"><figure className="cutout-frame"><div className="robot-aura"/><img src="/swervo-robot-cutout.png" alt="Swervo competition robot, photographed against a transparent background"/><figcaption>SWERVO <span>·</span> TEAM 26256</figcaption></figure><aside className="robot-notes"><img src="/swervo-logo-clean.png" alt="Swervo team logo"/><div className="eyebrow">BUILT BY STUDENTS · TEAM 26256</div><h2>Meet the machine.</h2><p>A student-built FTC robot shaped by testing, iteration, and a lot of careful tuning. Every mechanism reflects a choice the team made together.</p><div className="robot-note-tags"><span>DESIGN</span><span>BUILD</span><span>REFINE</span></div></aside></div><div className="robot-note"><span className="signal-dot"/> STUDENT-DESIGNED · TESTED BY THE TEAM · ALWAYS EVOLVING</div></section>}

        {activeTab === 'approach' && <section className="section-inner inner-page approach-page"><div className="page-kicker"><button onClick={()=>navigate('home')} aria-label="Back home"><ArrowLeft size={15}/></button><img className="page-logo" src="/swervo-logo-clean.png" alt=""/><span>SWERVO / OUR APPROACH</span></div><div className="page-heading"><div className="eyebrow">THE WORK BEHIND THE ROBOT</div><h1>Many skills.<br/><span>One build.</span></h1><p>FIRST Tech Challenge brings engineering, programming, and teamwork together. We learn by doing the work, then sharing what we find.</p></div><div className="discipline-grid">{disciplines.map(({icon:Icon,title,copy},index)=><motion.article className="discipline-card" key={title} variants={motionIn} initial="hidden" animate="show" transition={{delay:index*.08}} whileHover={{y:-5}}><span className="discipline-number">0{index+1}</span><span className="discipline-icon"><Icon size={19}/></span><h3>{title}</h3><p>{copy}</p><span className="card-arrow"><ArrowUpRight size={16}/></span></motion.article>)}</div><div className="approach-callout"><span>BUILD</span><b>Make an idea real.</b><span>TEST</span><b>Learn from the result.</b><span>REFINE</span><b>Try the next version.</b></div></section>}
        {activeTab === 'team' && <section className="section-inner inner-page team-page"><div className="page-kicker"><button onClick={()=>navigate('home')} aria-label="Back home"><ArrowLeft size={15}/></button><img className="page-logo" src="/swervo-logo-clean.png" alt=""/><span>SWERVO / TEAM</span></div><div className="team-hero"><div><div className="eyebrow">PEOPLE MAKE THE ROBOT</div><h1>Every perspective.<br/><span>One team.</span></h1><p>Swervo is a student team learning by designing, programming, testing, and competing together. We bring different strengths to the same workbench.</p><a className="text-arrow" href="https://www.firstinspires.org/programs/ftc" target="_blank" rel="noreferrer">About FIRST Tech Challenge <ArrowUpRight size={15}/></a></div><img src="/swervo-logo-clean.png" alt="Swervo team logo, FTC 26256"/></div><div className="team-role-grid">{roles.map((role,index)=><motion.article className="team-role-card" key={role} variants={motionIn} initial="hidden" animate="show" transition={{delay:index*.07}}><span>0{index+1}</span><h2>{role}</h2><p>{['Turn concepts into mechanisms we can build and improve.','Write and tune the software that makes the robot respond.','Practice, observe, and make each run more consistent.','Bring robotics into our community and share what we learn.'][index]}</p></motion.article>)}</div></section>}

        {activeTab === 'outreach' && <section className="section-inner inner-page outreach-page"><div className="page-kicker"><button onClick={()=>navigate('home')} aria-label="Back home"><ArrowLeft size={15}/></button><img className="page-logo" src="/swervo-logo-clean.png" alt=""/><span>SWERVO / OUTREACH</span></div><div className="outreach-hero"><div className="outreach-copy"><div className="eyebrow">BEYOND MATCH DAY</div><h1>Robotics is better<br/><span>when it’s shared.</span></h1><p>FIRST is about more than building a robot. It’s a chance to learn with others, welcome new makers, and make STEM feel accessible in our community.</p><button className="button button-primary" onClick={()=>navigate('sponsors')}>Help us keep building <ArrowRight size={15}/></button></div><figure><img src="/swervo-robot-cutout.png" alt="Swervo's full robot at a robotics event"/><figcaption>DESIGN <i/> BUILD <i/> SHARE</figcaption></figure></div><div className="outreach-bottom"><span>LEARN BY MAKING</span><span>SHARE WHAT WORKS</span><span>GROW THE COMMUNITY</span></div></section>}

        {activeTab === 'sponsors' && <section className="section-inner inner-page sponsors-page"><div className="page-kicker"><button onClick={()=>navigate('home')} aria-label="Back home"><ArrowLeft size={15}/></button><img className="page-logo" src="/swervo-logo-clean.png" alt=""/><span>SWERVO / SPONSORS</span></div><div className="sponsor-layout"><motion.div className="sponsor-copy" variants={motionIn} initial="hidden" animate="show"><div className="eyebrow"><span className="eyebrow-rule"/> BUILD THE NEXT ITERATION</div><h1>Help students<br/>make it <span>move.</span></h1><p>Community support helps student teams get the tools, materials, and competition experience to keep learning through robotics.</p><div className="support-tags"><span>TOOLS & MATERIALS</span><span>EVENTS & TRAVEL</span><span>STUDENT LEARNING</span></div><div className="sponsor-logo"><Logo/></div></motion.div><motion.div className="interest-card" variants={motionIn} initial="hidden" animate="show" transition={{delay:.1}}><div className="interest-heading"><div><div className="eyebrow">SPONSORSHIP & PARTNERSHIPS</div><h2>Let’s start a conversation.</h2></div><ArrowUpRight size={19}/></div><form onSubmit={submitInterest}><label>Your name<input required autoComplete="name" placeholder="Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email address<input required type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Organization <span>OPTIONAL</span><input autoComplete="organization" placeholder="Your organization" value={form.organization} onChange={e=>setForm({...form,organization:e.target.value})}/></label><button className="button button-lime" type="submit">{sent?<><Check size={16}/> Interest noted</>:<>I’d like to support Swervo <ArrowRight size={15}/></>}</button><p className="form-disclaimer">This form confirms locally and doesn’t send submissions yet.</p></form></motion.div></div></section>}
      </motion.div></AnimatePresence>
    </main>
    <footer className="site-footer"><a href="#home" onClick={event=>{event.preventDefault();navigate('home');}} aria-label="Back to Swervo home"><Logo/></a><div><b>FIRST TECH CHALLENGE · TEAM 26256</b><small>Swervo is an independent FIRST team. FIRST® and FIRST Tech Challenge® are trademarks of For Inspiration and Recognition of Science and Technology.</small></div><a className="repo-link" href="https://github.com/rugved-codes/ftc26256" target="_blank" rel="noreferrer">VIEW REPOSITORY <ArrowUpRight size={13}/></a></footer>
    <AnimatePresence>{sent&&<motion.div className="confirmation-toast" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}><span><Check size={14}/></span><div><b>Thanks for your interest.</b><small>This form has not sent your details.</small></div><button onClick={()=>setSent(false)} aria-label="Dismiss"><X size={15}/></button></motion.div>}</AnimatePresence>
  </div>;
}
export default App;

