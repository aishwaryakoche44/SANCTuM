import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import sanctumLogo from './assets/sanctum-logo.svg'
import sanctumMark from './assets/sanctum-mark.svg'
import seniorCompanionship from './assets/senior-companionship.jpg'
import seniorClinicalCare from './assets/senior-clinical-care.jpg'
import {
  Activity, ArrowRight, CalendarCheck, Check, ChevronDown, Clock3, Globe2,
  HeartHandshake, HeartPulse, Home, Mail, MapPin, Menu, MessageCircle,
  Navigation, Phone, ShieldCheck, Sparkles, Stethoscope, Users, X
} from 'lucide-react'
import './index.css'

const office = [
  { name: 'Dr. Vishal More', phone: '+91 99755 58892' },
  { name: 'Mr. Prashant More (Krishna)', phone: '+91 89752 84832' },
]

const overseas = [
  { flag: '🇸🇬', name: 'Mr. Tushar N. Randhir', phone: '+91 94235 71671' },
  { flag: '🇺🇸', name: 'Dr. Rakesh Nandan', phone: '+1 (857) 413-6404' },
  { flag: '🇬🇧', name: 'Mr. Anurag Sonar', phone: '+91 83909 90202' },
  { flag: '🇬🇧', name: 'Dr. Ruchika Ingale', phone: '+44 7823 758674' },
]

const services = [
  { icon: HeartHandshake, title: 'SnehMitra', text: 'Companionship for walks, temple visits, conversation and everyday emotional support, helping reduce loneliness while protecting dignity.' },
  { icon: Stethoscope, title: 'Hospital-Level Expertise at Home', text: 'Doctor home visits, specialised nursing, health monitoring and coordinated support designed to bring clinical care into the home.' },
  { icon: Globe2, title: 'Family Connect', text: 'WhatsApp health reports, video updates and immediate alerts help children and families stay informed even when they live far away.' },
  { icon: ShieldCheck, title: 'Emergency & Safety', text: '24/7 emergency coordination, clear escalation pathways and home-safety support help families respond when urgent needs arise.' },
  { icon: Activity, title: 'Sneh Salagna', text: 'Post-hospital recovery and rehabilitation support designed to make the transition from hospital to home safer and more organised.' },
  { icon: Home, title: 'Dignified Ageing', text: 'A holistic care approach bringing preventive health, home care, rehabilitation, family connectivity and emotional support together.' },
]

const plans = [
  { name: 'Vindhyachal', tone: 'Foundation', text: 'A mountain-themed membership level within the SnehBandhu support system.', perks: ['Companionship support', 'Family communication', 'Care coordination'] },
  { name: 'Nilgiri', tone: 'Connected', text: 'A higher layer of ongoing support for families seeking more regular visibility.', perks: ['Family communication', 'Care coordination', 'Support follow-through'] },
  { name: 'Sahyadri', tone: 'Enhanced', text: 'An enhanced support level for evolving home-health and care requirements.', perks: ['Doctor coordination', 'Nursing support', 'Family updates'] },
  { name: 'Himalaya', tone: 'Comprehensive', text: 'The highest mountain-themed tier described in the supplied SnehBandhu material.', perks: ['Doctor coordination', 'Nursing support', 'Family updates'] },
]

const principles = [
  ['Responsibility', 'Leadership means taking ownership of outcomes.'],
  ['Trust', 'Deep trust is the foundation of compassionate care.'],
  ['Systems', 'Reliable systems reduce error and dependence on individual heroics.'],
  ['Communication', 'Clear communication is treated as a patient-safety system.'],
  ['Teamwork', 'Teams act as one unit and collective results matter more than ego.'],
  ['Accountability', 'Leaders and teams take responsibility and remain focused on results.'],
]

function App() {
  const [menu, setMenu] = useState(false)
  const [faq, setFaq] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [activeSection, setActiveSection] = useState('home')
  const nav = [
    { label: 'About', id: 'about', icon: HeartHandshake },
    { label: 'Services', id: 'services', icon: Stethoscope },
    { label: 'Plans', id: 'plans', icon: Activity },
    { label: 'Philosophy', id: 'philosophy', icon: Sparkles },
    { label: 'Contact', id: 'contact', icon: MessageCircle },
  ]
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); setMenu(false) }

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current) setActiveSection(current.target.id)
    }, { rootMargin: '-22% 0px -62% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll('.scroll-reveal, .service-card, .plan-card, .info-card, .principle-card')
    if (!('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' })
    targets.forEach(target => observer.observe(target))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-clip">
      <header className="site-nav sticky top-3 z-50 mb-4 px-3">
        <div className="nav-shell mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-5 lg:px-7">
          <button onClick={() => scrollTo('home')} className="brand-mark text-left" aria-label="SnehBandhu home">
            <img src={sanctumMark} alt="" className="nav-logo" />
            <div>
              <div className="font-display text-lg font-semibold text-[#006b52] sm:text-xl">SnehBandhu</div>
              <div className="text-[8px] font-semibold tracking-[.16em] text-[#8c7140] sm:text-[9px]">SENIOR CARE · FAMILY TRUST</div>
            </div>
          </button>
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {nav.map(({ label, id, icon: Icon }) => <button key={id} onClick={() => scrollTo(id)} aria-current={activeSection === id ? 'page' : undefined} className={`nav-link ${activeSection === id ? 'is-active' : ''}`}><Icon size={15} strokeWidth={1.8}/><span>{label}</span></button>)}
            <a href="tel:+919975558892" className="nav-cta"><Phone size={15}/> Talk to us</a>
          </nav>
          <button aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(v => !v)} className="nav-menu-button lg:hidden">{menu ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
        {menu && <div className="nav-mobile mx-3 mt-2 px-4 py-3 lg:hidden">
          {nav.map(({ label, id, icon: Icon }) => <button key={id} onClick={() => scrollTo(id)} aria-current={activeSection === id ? 'page' : undefined} className={`nav-mobile-link ${activeSection === id ? 'is-active' : ''}`}><Icon size={17}/>{label}<ArrowRight size={15} className="ml-auto"/></button>)}
          <a href="tel:+919975558892" className="mt-2 block rounded-xl bg-[#006b52] px-4 py-3 text-center font-semibold text-white">Call +91 99755 58892</a>
        </div>}
      </header>

      <main>
        <section id="home" className="hero-grid relative overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d4b06a]/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#006b52]/10 blur-3xl" />
          <div className="hero-inner mx-auto grid max-w-7xl items-center gap-6 px-5 py-3 lg:grid-cols-[1.05fr_.95fr] lg:gap-7 lg:px-8 lg:py-0">
            <div className="reveal">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4b06a]/50 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#8b6c31]"><Sparkles size={14}/> Care Beyond Distance</div>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.03] text-[#004c3b] sm:text-5xl lg:text-[4.25rem] lg:leading-[.98]">Bridging the distance with care & dignity.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-[1.5] text-slate-600">SnehBandhu is built to give families peace of mind when parents or loved ones are ageing at home and children live in another city or country.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo('contact')} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006b52] px-6 py-3 font-semibold text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#004c3b]">Start a care conversation <ArrowRight size={18}/></button>
                <a href="tel:+919975558892" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006b52]/20 bg-white/80 px-6 py-3 font-semibold text-[#006b52] transition hover:bg-white"><Phone size={18}/> Call office</a>
              </div>
              <div className="mt-5 grid max-w-xl grid-cols-3 gap-4 border-t border-emerald-900/10 pt-4">
                <Stat number="24/7" label="Emergency response" />
                <Stat number="5" label="Holistic care pillars" />
                <Stat number="Global" label="Family connection" />
              </div>
            </div>

            <div className="reveal" style={{animationDelay: '.12s'}}>
              <div className="premium-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#d4b06a]/15 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#ead19a]">SnehBandhu Care Model</span>
                    <HeartPulse className="text-[#d4b06a]" size={24}/>
                  </div>
                  <div className="mt-5 flex justify-center"><CareOrbit /></div>
                  <div className="hero-mini-grid mt-4 grid grid-cols-2 gap-2">
                    <MiniStat icon={HeartHandshake} title="SnehMitra" text="Companionship" dark />
                    <MiniStat icon={Stethoscope} title="Home Care" text="Clinical support" dark />
                    <MiniStat icon={Globe2} title="Family Connect" text="Updates & alerts" dark />
                    <MiniStat icon={ShieldCheck} title="Safety" text="Emergency support" dark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 lg:py-28">
          <div className="about-layout scroll-reveal mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.9fr_1.1fr] lg:gap-14 lg:px-8">
            <div>
              <Eyebrow>About SnehBandhu</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#004c3b] sm:text-5xl">A holistic senior-care ecosystem built around trust.</h2>
              <p className="mt-6 leading-8 text-slate-600">The supplied SnehBandhu material describes a care model that combines preventive health, home care, rehabilitation, family connectivity and emotional support. The goal is not only service delivery, but dignified ageing and reassurance for families.</p>
              <div className="mt-8 space-y-4">
                {['Companions, not just providers', 'Hospital quality in home comfort', 'A bridge for families living far away', 'Care with dignity, safety and continuity'].map(x => <div key={x} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006b52]/10 text-[#006b52]"><Check size={16}/></span><span className="font-medium text-slate-700">{x}</span></div>)}
              </div>
            </div>
            <div className="about-support">
              <div className="about-cards grid gap-4 sm:grid-cols-2">
                <InfoCard icon={HeartHandshake} title="Compassion" text="SnehMitra adds human companionship to the care journey, including walks, temple visits and conversation." />
                <InfoCard icon={Stethoscope} title="Clinical expertise" text="Doctor-led coordination, home visits, monitoring and specialised nursing support are part of the model." />
                <InfoCard icon={Globe2} title="Family trust" text="Regular reports and alerts help children stay connected to a parent's wellbeing from wherever they live." />
                <InfoCard icon={ShieldCheck} title="Dignified safety" text="Emergency coordination, home safety and continuity of support are designed to reduce uncertainty." />
              </div>
              <div className="care-pathway" aria-label="How SnehBandhu care connects">
                <div className="pathway-step"><span><HeartHandshake size={18}/></span><div><strong>Presence</strong><small>Companionship</small></div></div>
                <div className="pathway-step"><span><Stethoscope size={18}/></span><div><strong>Expertise</strong><small>Clinical care</small></div></div>
                <div className="pathway-step"><span><Globe2 size={18}/></span><div><strong>Connection</strong><small>Family updates</small></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#fbf8f1] py-20 lg:py-28">
          <div className="scroll-reveal mx-auto max-w-7xl px-5 lg:px-8">
            <div className="services-intro">
              <div className="max-w-3xl"><Eyebrow>Holistic Care Service Pillars</Eyebrow><h2 className="mt-4 font-display text-4xl font-semibold text-[#004c3b] sm:text-5xl">Care that covers the person, the home and the family.</h2><p className="mt-5 leading-7 text-slate-600">The service themes below are based on the supplied SnehBandhu reference material, organised into a website-ready care experience.</p></div>
              <figure className="service-photo">
                <img src={seniorClinicalCare} alt="A clinician providing attentive care to an older patient" />
                <figcaption><Stethoscope size={17}/> Clinical care, delivered with warmth</figcaption>
              </figure>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({icon:Icon,title,text},i)=><div key={title} className="service-card rounded-3xl border border-emerald-900/10 bg-white p-7 shadow-card transition hover:-translate-y-1"><div className="flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006b52]/10 text-[#006b52]"><Icon size={22}/></div><span className="font-display text-sm text-[#d0aa5d]">0{i+1}</span></div><h3 className="mt-6 font-display text-xl font-semibold text-[#004c3b]">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></div>)}</div>
          </div>
        </section>

        <section id="plans" className="bg-[#eaf2e9] py-20 lg:py-28">
          <div className="scroll-reveal mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl"><Eyebrow light>Mountain Care Plans</Eyebrow><h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Support as unshakable as mountains.</h2><p className="mt-5 leading-7 text-white/70">The supplied material names four membership levels: Vindhyachal, Nilgiri, Sahyadri and Himalaya. The exact pricing and final inclusions should be confirmed with the SnehBandhu office.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{plans.map((plan,i)=><div key={plan.name} className="plan-card rounded-3xl border border-white/10 bg-white/[.06] p-6"><div className="mountain-number">0{i+1}</div><div className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-[#d4b06a]">{plan.tone}</div><h3 className="mt-2 font-display text-2xl font-semibold">{plan.name}</h3><p className="mt-3 text-sm leading-6 text-white/65">{plan.text}</p><div className="mt-6 space-y-3">{plan.perks.map(p=><div key={p} className="flex items-center gap-2 text-sm text-white/80"><Check size={15} className="text-[#d4b06a]"/>{p}</div>)}</div></div>)}</div>
          </div>
        </section>

        <section id="philosophy" className="bg-white py-20 lg:py-28">
          <div className="philosophy-layout scroll-reveal mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 lg:px-8">
            <div className="philosophy-intro"><img src={sanctumLogo} alt="SANCTuM, The LivaRo Way" className="sanctum-logo philosophy-logo mb-6 w-full"/><Eyebrow>The LivaRo Way</Eyebrow><h2 className="mt-3 max-w-[16ch] font-display text-4xl font-semibold leading-tight text-[#004c3b]">Excellence through servant leadership and reliable systems.</h2><p className="mt-4 leading-7 text-slate-600">The supplied SANCTuM leadership doctrine places responsibility, trust and systems at the centre of care. It describes a culture where communication supports patient safety, teams act as one unit and leaders take ownership.</p></div>
            <div className="philosophy-values"><div className="principle-grid grid gap-3 sm:grid-cols-2">{principles.map(([title,text],i)=><div key={title} className="principle-card rounded-2xl border border-emerald-900/10 bg-[#fbfdfb] p-4"><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4b06a]/20 text-[#8b6c31]"><span className="font-display font-bold">{i+1}</span></div><Sparkles size={17} className="text-[#d4b06a]"/></div><h3 className="mt-3 font-display text-lg font-semibold text-[#004c3b]">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}</div><div className="purpose-panel mt-4 flex flex-col justify-between gap-3 rounded-2xl bg-[#eaf2e9] p-5 sm:flex-row sm:items-center"><div><div className="text-xs font-bold uppercase tracking-[.18em] text-[#a17d38]">Purpose</div><p className="mt-2 max-w-2xl font-display text-xl leading-7 text-[#004c3b]">Redefine healthcare delivery through trust-based teams, disciplined systems and compassionate leadership.</p></div><span className="purpose-mark" aria-hidden="true"><HeartHandshake size={25}/></span></div></div>
          </div>
        </section>

        <section id="contact" className="bg-[#eaf2e9] py-20 lg:py-28">
          <div className="scroll-reveal mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_.85fr] lg:px-8">
            <div><Eyebrow light>Start a conversation</Eyebrow><h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Let’s make care feel closer.</h2><p className="mt-5 max-w-xl leading-7 text-white/70">Tell the office team what kind of support your family is looking for. They can guide you to the appropriate next step.</p>
              <div className="mt-9 space-y-4">{office.map(x=><a key={x.phone} href={`tel:${x.phone.replace(/[^+\d]/g,'')}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d4b06a] text-[#173d32]"><Phone size={18}/></span><div><div className="font-semibold">{x.name}</div><div className="text-sm text-white/60">{x.phone}</div></div></a>)}</div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-[#d4b06a]" size={20}/><div className="text-sm leading-6 text-white/75"><strong className="text-white">SnehBandhu — Shriniwas Healthcare Clinic</strong><br/>Anuram Apartment, Kathe Galli – Mumbai Naka Link Road,<br/>Opp. Atal Bihari Vajpayee School, Bankar Chowk,<br/>Dwarka, Nashik, Maharashtra 422011</div></div><a href="mailto:care@snehbandhu.in" className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#d4b06a]"><Mail size={17}/> care@snehbandhu.in</a></div>
            </div>
            <div className="rounded-[2rem] bg-[#fbf8f1] p-6 text-slate-900 shadow-soft sm:p-8"><h3 className="font-display text-2xl font-semibold text-[#004c3b]">Request a callback</h3><p className="mt-2 text-sm text-slate-500">Share a few details and the team can contact you.</p><form className="mt-7 space-y-4" onSubmit={e=>{e.preventDefault(); alert(`Thank you ${form.name || 'for reaching out'}. Please call the office directly for immediate assistance.`)}}><Field label="Name" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Your name"/><Field label="Phone" value={form.phone} onChange={v=>setForm({...form,phone:v})} placeholder="Your phone number"/><label className="block"><span className="mb-2 block text-sm font-semibold">How can we help?</span><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows="4" placeholder="Tell us what support you are looking for..." className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#006b52] focus:ring-4 focus:ring-[#006b52]/10"/></label><button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#006b52] px-5 py-3.5 font-semibold text-white transition hover:bg-[#004c3b]">Send enquiry <ArrowRight size={17}/></button></form><p className="mt-4 text-center text-xs text-slate-400">For urgent situations, please contact emergency medical services directly.</p></div>
          </div>
        </section>

        <section className="bg-[#fbf8f1] py-16"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><div><Eyebrow>Overseas Coordinators</Eyebrow><h2 className="mt-3 font-display text-3xl font-semibold text-[#004c3b]">A family network that reaches across borders.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">The supplied contact reference lists coordinators for families connecting from Singapore, the USA and the UK.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{overseas.map(x=><a key={x.name} href={`tel:${x.phone.replace(/[^+\d]/g,'')}`} className="flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card"><span className="text-xl">{x.flag}</span><div><div className="text-sm font-semibold text-slate-800">{x.name}</div><div className="text-xs text-slate-500">{x.phone}</div></div></a>)}</div></div><div className="network-panel rounded-3xl p-7"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4b06a]/20 text-[#d4b06a]"><Globe2 size={24}/></div><h3 className="mt-6 font-display text-2xl font-semibold text-white">Care Beyond Distance</h3><p className="mt-3 text-sm leading-6 text-white/65">Regular communication helps families remain part of the care journey even when they cannot be physically present.</p><div className="mt-7 space-y-3"><MiniLine icon={MessageCircle} text="WhatsApp health reports"/><MiniLine icon={HeartPulse} text="Video updates"/><MiniLine icon={ShieldCheck} text="Immediate alerts"/></div></div></div></div></section>

        <section className="bg-white py-16"><div className="mx-auto max-w-4xl px-5 lg:px-8"><div className="text-center"><Eyebrow>Common questions</Eyebrow><h2 className="mt-3 font-display text-3xl font-semibold text-[#004c3b]">A few things families ask.</h2></div><div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">{[
          ['Where is the clinic located?','SnehBandhu — Shriniwas Healthcare Clinic is listed at Anuram Apartment, Kathe Galli – Mumbai Naka Link Road, opposite Atal Bihari Vajpayee School, Bankar Chowk, Dwarka, Nashik, Maharashtra 422011.'],
          ['Can children living abroad stay updated?','Yes. The supplied SnehBandhu material describes WhatsApp health reports, video updates and emergency alerts for families living in other cities and countries.'],
          ['What are the mountain-themed plans?','The material names four plans: Vindhyachal, Nilgiri, Sahyadri and Himalaya. Exact pricing and final inclusions should be confirmed with the SnehBandhu office.'],
          ['Is this only medical care?','No. The supplied material combines companionship, home-based clinical support, family connectivity, emergency coordination and post-hospital recovery.']
        ].map(([q,a],i)=><div key={q} className="px-5"><button onClick={()=>setFaq(faq===i?null:i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-slate-800">{q}<ChevronDown className={`shrink-0 transition ${faq===i?'rotate-180':''}`} size={19}/></button>{faq===i&&<p className="pb-5 pr-8 text-sm leading-6 text-slate-600">{a}</p>}</div>)}</div></div></section>
      </main>

      <footer className="px-5 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><div className="font-display text-lg text-[#004c3b]">SnehBandhu</div><div className="text-xs tracking-[.18em] text-slate-600">SENIOR CARE · FAMILY TRUST · NASHIK</div></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm"><a href="tel:+919975558892" className="hover:text-[#006b52]">+91 99755 58892</a><a href="mailto:care@snehbandhu.in" className="hover:text-[#006b52]">care@snehbandhu.in</a><button onClick={()=>scrollTo('contact')} className="hover:text-[#006b52]">Contact</button></div><div className="text-xs text-slate-500"><div>© {new Date().getFullYear()} SnehBandhu. Care with dignity.</div><div className="mt-1 text-[11px] text-slate-400">Website by Aishwarya Koche</div></div></div></footer>
    </div>
  )
}

function CareOrbit() {
  const items = [
    [HeartHandshake, 'Compassion'], [Stethoscope, 'Clinical Care'], [Globe2, 'Family Connect'], [ShieldCheck, 'Safety'], [Activity, 'Recovery']
  ]
  return <div className="orbit"><div className="orbit-core"><div className="font-display text-2xl font-semibold">Sneh</div><div className="text-[10px] uppercase tracking-[.25em] text-[#d4b06a]">Bandhu</div></div><div className="orbit-track">{items.map(([Icon,label],i)=><div key={label} className={`orbit-item orbit-${i}`}><div className="orbit-item-content"><span><Icon size={18}/></span><small>{label}</small></div></div>)}</div></div>
}
function Eyebrow({children, light=false}) { return <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] ${light?'text-[#d4b06a]':'text-[#a17d38]'}`}><span className="h-px w-8 bg-current"/>{children}</div> }
function Stat({number,label}) { return <div><div className="font-display text-2xl font-semibold text-[#006b52]">{number}</div><div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</div></div> }
function InfoCard({icon:Icon,title,text}) { return <div className="info-card rounded-2xl border border-emerald-900/10 bg-[#fbfdfb] p-4 shadow-card"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4b06a]/20 text-[#8b6c31]"><Icon size={19}/></div><h3 className="mt-3 font-display text-lg font-semibold text-[#004c3b]">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div> }
function MiniStat({icon:Icon,title,text,dark=false}) { return <div className={`rounded-2xl border p-4 ${dark?'border-white/10 bg-white/[.06] text-white':'border-emerald-900/10 bg-white'}`}><Icon size={20} className={dark?'text-[#d4b06a]':'text-[#006b52]'}/><div className={`mt-2 font-display text-sm font-semibold ${dark?'text-white':'text-[#004c3b]'}`}>{title}</div><div className={`mt-1 text-[11px] leading-5 ${dark?'text-white/55':'text-slate-500'}`}>{text}</div></div> }
function MiniLine({icon:Icon,text}) { return <div className="flex items-center gap-3 text-sm text-white/75"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#d4b06a]"><Icon size={17}/></span>{text}</div> }
function Field({label,value,onChange,placeholder}) { return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#006b52] focus:ring-4 focus:ring-[#006b52]/10"/></label> }

createRoot(document.getElementById('root')).render(<App />)
