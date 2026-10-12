'use strict';

const projectStories = {
  "reasoning": {
    "category": "AI / UNDERGRADUATE RESEARCH",
    "kicker": "SUMMER 2026 · GEORGE WASHINGTON UNIVERSITY",
    "title": "LLM reasoning research.",
    "summary": "I spent the summer working on a question I find interesting: what does an AI model do when a problem is missing information, is ambiguous, or contradicts itself?",
    "sections": [
      [
        "The question",
        "A model can give a confident answer even when a problem doesn't support one. We wanted to look more closely at how it deals with those situations."
      ],
      [
        "What I worked on",
        "I built and validated 500+ quantitative reasoning problems using Python, with K=3 and K=4 branching structures. The problems included multiple possible paths, conflicting conditions, and hidden constraints. I checked the math to make sure the branches made sense."
      ],
      [
        "Testing the answers",
        "I reviewed model responses for reasoning errors, inconsistent branches, and conclusions that weren't supported by the question. I used the recurring issues to refine the dataset and its validation process."
      ],
      [
        "What stuck with me",
        "Before judging an answer, you have to check whether the question gives you enough information. A small change to an assumption can change the whole problem."
      ],
      [
        "The team",
        "Prof. Tian Lan's research group at GW, with mentorship from Sizhe Tang. June–August 2026."
      ]
    ],
    "tags": [
      "Python",
      "LLM reasoning",
      "Prompt evaluation",
      "Dataset validation"
    ]
  },
  "audio": {
  "category": "HARDWARE / ANALOG ELECTRONICS",
  "kicker": "ECE 2115 · SPRING 2026",
  "title": "Designing and testing a Class AB audio amplifier.",
  "summary": "I worked on a multi-stage transistor amplifier that combines voltage amplification and a current-driving output stage for an 8-ohm speaker. The project connected circuit analysis, Multisim simulation, and physical testing.",
  "sections": [
    [
      "Circuit architecture",
      "The system integrates a regulated ±12 V supply, a 2N3904 common-emitter voltage stage, and a complementary Darlington push-pull output stage. Diode biasing reduces crossover distortion near the signal’s zero crossing."
    ],
    [
      "Analysis and simulation",
      "The design process included DC operating-point calculations, small-signal gain analysis, and input and output resistance estimates. Multisim simulations provided a comparison before evaluating the breadboard circuit."
    ],
    [
      "Bench validation",
      "Testing used an oscilloscope, function generator, and multimeter to compare measured behavior with calculations and simulations. The report documents checks at 440 Hz, 1 kHz, and 10 kHz, including voltage gain and output amplitude."
    ],
    [
      "Engineering takeaways",
      "The project highlighted how transistor parameter variation, interstage loading, and bias conditions affect amplifier performance. Investigating differences between predicted and measured results strengthened my understanding of analog circuit troubleshooting."
    ]
  ],
  "tags": [
    "Class AB",
    "Transistor biasing",
    "Small-signal analysis",
    "Multisim",
    "Bench validation"
  ]
},
  "agent": {
    "category": "AI / SOFTWARE SYSTEMS",
    "kicker": "ECE 1020 · APRIL 2025 · COURSE PROJECT",
    "title": "Building an AI agent.",
    "summary": "I built an interactive AI agent using the OpenAI API and n8n, with a web interface hosted on GitHub Pages.",
    "sections": [
      [
        "Putting it together",
        "I connected user input to an n8n workflow and the OpenAI API, then integrated tool-based memory and real-time responses."
      ],
      [
        "Getting it to work",
        "I tested and debugged the workflow to improve response handling and reliability, and to make the experience easier to use."
      ],
      [
        "What I learned",
        "There are a lot of pieces around the model. The interface, the workflow, and the way information moves between them all affect whether the agent works well."
      ],
      [
        "Why I enjoyed it",
        "I like seeing how the different parts of a system connect. This project gave me a chance to work on that from the software side."
      ]
    ],
    "tags": [
      "n8n",
      "OpenAI API",
      "GitHub Pages",
      "Tool-based memory",
      "AI workflows"
    ]
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
    document.querySelector('.project-grid').dataset.filter = selected;
    document.querySelector('.work-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'PROJECT' : 'PROJECTS'}`;
  });
});

const dialog = document.querySelector('#project-dialog');
let dialogTrigger = null;
function openProject(key, trigger) {
  const project = projectStories[key];
  if (!project) return;
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

// A small amount of pointer tilt gives the decorative chip depth.
const processorScene = document.querySelector('.advanced-hero');
if (processorScene && typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  processorScene.addEventListener('pointermove', event => {
    const bounds = processorScene.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    processorScene.style.setProperty('--scene-tilt-y', `${horizontal * 7}deg`);
    processorScene.style.setProperty('--scene-tilt-x', `${vertical * -5}deg`);
  });
  processorScene.addEventListener('pointerleave', () => {
    processorScene.style.setProperty('--scene-tilt-y', '0deg');
    processorScene.style.setProperty('--scene-tilt-x', '0deg');
  });
}
