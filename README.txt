Upload audio-amplifier.png and audio-schematic.png beside index.html on GitHub.
In index.html replace the entire button with class="project-visual audio-visual" (through its closing </button>) with project-visual.html. Keep the project-info div that follows it.
Append photo-styles.css to your existing styles.css.

Replace the audio project description paragraph with:
As part of a three-person team, I built and tested a Class AB audio amplifier with a common-emitter voltage stage and a push-pull output stage to drive an 8-ohm speaker. We compared hand calculations, Multisim simulations, and lab measurements.

Replace its tech-list text with:
Analog circuits · Multisim · Bench testing

Your app.js audio story also needs updating: remove LM386 and bass/treble filter claims and use the Class AB description above. Keep the existing JavaScript syntax and property names.
Optional schematic HTML for that story (if it supports HTML):
<figure><img src="audio-schematic.png" alt="Full amplifier schematic in Multisim" style="display:block;width:100%;height:auto" loading="lazy"><figcaption>Full amplifier schematic — ECE 2115 team project.</figcaption></figure>

Figures extracted directly from your report, without generative edits. Changes are not deployed; commit your edits on GitHub.
