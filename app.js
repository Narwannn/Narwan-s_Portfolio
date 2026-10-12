'use strict';

const projectStories = {
  reasoning: {
    category: 'AI / UNDERGRADUATE RESEARCH',
    kicker: 'SUMMER 2026 · GEORGE WASHINGTON UNIVERSITY',
    title: "When the problem isn't clear.",
    summary: 'A research project examining how large language models reason about quantitative questions with missing, ambiguous, or contradictory information.',
    sections: [
      ['The question', 'A model can produce a confident answer even when the question does not support a single answer. This work looked at the structure of ill-posed problems and the assumptions needed to reason about them.'],
      ['My contribution', 'I built and validated a dataset of 500+ ill-posed quantitative reasoning problems using Python-based generation logic and K = 3 and K = 4 branch structures. I created multiple resolution paths, conflicting conditions, and hidden constraints while checking mathematical consistency.'],
      ['How I approached it', 'I evaluated model responses for reasoning errors, branch inconsistencies, and unsupported conclusions. Identifying recurring failure patterns helped me refine the dataset validation process and flag problems that needed another look.'],
      ['What I learned', 'Dataset quality takes careful review. A small change to an assumption can change whether a problem is solvable or whether its branches agree. This project made me pay closer attention to how a question is framed before judging the answer.'],
      ['Research team', "Prof. Tian Lan's research group at GW, with mentorship from Sizhe Tang. Summer 2026."]
    ],
    tags: ['Python', 'LLM reasoning', 'Prompt evaluation', 'Dataset verification']
  },
  fpga: {
    category: 'HARDWARE / DIGITAL LOGIC',
    kicker: 'COURSE PROJECT',
    title: 'A little logic. Eight states.',
    summary: 'A counter project using Verilog and an FPGA to connect a digital design with visible hardware outputs.',
    sections: [
      ['The idea', 'A counter is a small, useful way to see how sequential logic works. Each clock event advances the state, and the outputs represent that state in binary.'],
      ['The work', 'I worked with Verilog and an FPGA as part of my digital logic coursework, building a counter and checking its output sequence. The project connected concepts from logic design to the behavior of actual hardware.'],
      ['Try the concept', 'The browser demonstration on the project card shows a 3-bit counter. Step +1 advances through 000 to 111, then wraps back to 000. Auto runs the sequence at a slow pace, and Reset returns it to zero. The three lights show the individual binary bits.'],
      ['What I learned', 'Hardware description languages require thinking about signals and state over time. It helped me connect the written design to clocked behavior and observable outputs.']
    ],
    tags: ['Verilog', 'FPGA', 'Binary states', 'Sequential logic']
  },
  audio: {
    category: 'HARDWARE / ANALOG ELECTRONICS',
    kicker: 'ECE 2115 · MAY 2026 · COURSE PROJECT',
    title: 'Making sound tangible.',
    summary: 'An LM386 audio amplifier with bass and treble filters, built and tested as part of my electronics coursework.',
    sections: [
      ['The goal', 'Build an audio amplifier and explore how filtering changes a signal. The circuit used an LM386 amplifier with bass and treble filter stages.'],
      ['The work', 'I designed and assembled the amplifier, integrating discrete components and signal-conditioning circuitry into a functional prototype. I characterized frequency response, voltage gain, and output behavior using an oscilloscope and function generator, then troubleshot the circuit to reduce distortion and improve audio quality.'],
      ['What I learned', 'Working at the bench makes circuit concepts concrete. Measurements provide a way to check the behavior of a design and understand the effects of its filter stages.'],
      ['About the visual', 'The waveforms on the project card are a stylized illustration of audio amplification. Project measurements are described here; the illustration does not display measured data.']
    ],
    tags: ['LM386', 'Analog electronics', 'Bass & treble filters', 'Oscilloscope', 'Signal generator']
  },
  agent: {
    category: 'AI / SOFTWARE SYSTEMS',
    kicker: 'ECE 1020 · APRIL 2025 · COURSE PROJECT',
    title: 'From a prompt to a workflow.',
    summary: 'An AI agent project combining n8n, the OpenAI API, and a web interface hosted on GitHub Pages.',
    sections: [
      ['The idea', 'Connect a language model to a usable workflow and make that workflow accessible through a web interface.'],
      ['The work', 'I built and deployed an interactive agent using the OpenAI API, n8n, and GitHub Pages. The workflow integrated user-input processing, tool-based memory, and real-time responses. I tested and debugged the application to improve response handling, reliability, and the user experience.'],
      ['What I learned', 'Making an AI system work involves the surrounding pieces as well as the model: how information moves through the workflow, how the interface communicates with it, and how to evaluate the responses.'],
      ['Why it matters to my interests', 'This project complements my hardware work. I enjoy understanding the different layers of a system and how they connect to produce something people can use.']
    ],
    tags: ['n8n', 'OpenAI API', 'GitHub Pages', 'AI workflows']
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !open;
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

let counter = 0;
let counterTimer = null;
const counterOutput = document.querySelector('#counter-value');
const counterRun = document.querySelector('#counter-run');
const counterMode = document.querySelector('#counter-mode');
function renderCounter() {
  counterOutput.textContent = String(counter);
  counterOutput.setAttribute('aria-label', `Counter value ${counter}, binary ${counter.toString(2).padStart(3, '0')}`);
  [0, 1, 2].forEach(bit => document.querySelector(`#led-${bit}`).classList.toggle('on', Boolean(counter & (1 << bit))));
}
function stopCounter() {
  if (counterTimer !== null) window.clearInterval(counterTimer);
  counterTimer = null;
  counterRun.setAttribute('aria-pressed', 'false');
  counterRun.textContent = 'Auto ↻';
  counterMode.textContent = 'MANUAL';
  counterOutput.setAttribute('aria-live', 'polite');
}
function advanceCounter() {
  counter = (counter + 1) % 8;
  renderCounter();
}
document.querySelector('#counter-step').addEventListener('click', () => {
  stopCounter();
  advanceCounter();
});
counterRun.addEventListener('click', () => {
  if (counterTimer !== null) {
    stopCounter();
    return;
  }
  counterOutput.setAttribute('aria-live', 'off');
  counterRun.textContent = 'Pause Ⅱ';
  counterRun.setAttribute('aria-pressed', 'true');
  counterMode.textContent = 'RUNNING';
  advanceCounter();
  counterTimer = window.setInterval(advanceCounter, 800);
});
document.querySelector('#counter-reset').addEventListener('click', () => {
  stopCounter();
  counter = 0;
  renderCounter();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopCounter();
});
if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) stopCounter();
  });
  counterObserver.observe(document.querySelector('.counter-demo'));
}
renderCounter();

const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach(filter => {
      const isActive = filter === button;
      filter.classList.toggle('active', isActive);
      filter.setAttribute('aria-pressed', String(isActive));
    });
    projectCards.forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
      if (!card.hidden) visibleCount += 1;
    });
    if (selected === 'ai') stopCounter();
    document.querySelector('.work-count').textContent = `${visibleCount} PROJECTS`;
  });
});

const dialog = document.querySelector('#project-dialog');
let dialogTrigger = null;
function openProject(key, trigger) {
  const project = projectStories[key];
  if (!project) return;
  stopCounter();
  dialogTrigger = trigger;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-kicker').textContent = project.kicker;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-summary').textContent = project.summary;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  project.sections.forEach(([title, description]) => {
    const section = document.createElement('section');
    section.className = 'story-section';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = description;
    section.append(heading, paragraph);
    content.append(section);
  });
  const tags = document.querySelector('#dialog-tags');
  tags.replaceChildren();
  project.tags.forEach(tag => {
    const label = document.createElement('span');
    label.textContent = tag;
    tags.append(label);
  });
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  document.querySelector('#dialog-close').focus();
}
function closeProject() {
  dialog.close();
}
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project, button));
});
document.querySelector('#dialog-close').addEventListener('click', closeProject);
document.querySelector('#dialog-done').addEventListener('click', closeProject);
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (dialogTrigger) dialogTrigger.focus();
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
});

document.querySelector('#copy-email').addEventListener('click', async () => {
  const email = 'Na.joyenda@gmail.com';
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    status.textContent = 'EMAIL COPIED. SAY HELLO!';
    document.querySelector('#copy-email').textContent = 'Copied ✓';
  } catch {
    status.textContent = `COPY THIS ADDRESS: ${email}`;
  }
});
