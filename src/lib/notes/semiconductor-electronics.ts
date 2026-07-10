import type { ChapterNotes } from "./kinematics";

export const semiconductorElectronicsNotes: ChapterNotes = {
  chapterName: "Semiconductor Electronics",
  className: "12",
  intro:
    "Every modern electronic device — phones, computers, solar panels, LED bulbs — is built on the behaviour of semiconductors, materials whose ability to conduct sits deliberately between a metal and an insulator. This chapter builds from the quantum-mechanical picture of energy bands, through how doping creates controllable n-type and p-type material, to the p-n junction diode and its use as a rectifier, and finally to the transistor as an amplifier and switch — the device that made all of modern electronics possible. The chapter closes with logic gates, the basic building blocks of digital circuits.",
  sections: [
    {
      heading: "1. Energy Bands in Solids",
      body:
        "In an isolated atom, electrons occupy sharp, discrete energy levels. When atoms are packed together into a solid, these levels split and merge into continuous ranges called energy bands, separated by forbidden gaps where no electron states exist.",
      bullets: [
        "Valence band: the range of energies occupied by the outermost (valence) electrons, largely responsible for chemical bonding.",
        "Conduction band: the range of energies available to electrons that are free to move through the solid and carry current.",
        "Forbidden energy gap (E(g)): the energy range between the top of the valence band and the bottom of the conduction band, where no electron can exist — its SIZE is what determines whether a solid behaves as a conductor, insulator, or semiconductor.",
        "Electrons can only contribute to conduction once they are excited from the valence band, across the gap, into the conduction band.",
      ],
    },
    {
      heading: "2. Classification: Metals, Insulators and Semiconductors",
      body:
        "The size of the forbidden energy gap — and whether the valence and conduction bands overlap at all — is the single feature that separates the three classes of solids.",
      bullets: [
        "Metals (conductors): the valence and conduction bands OVERLAP, or the conduction band is already partially filled — electrons need essentially zero extra energy to conduct, which is why metals conduct well even at very low temperatures.",
        "Insulators: a very LARGE forbidden gap (E(g) > 3 eV typically) — thermal energy at room temperature is far too small to excite any appreciable number of electrons across it, so almost no free carriers exist.",
        "Semiconductors: a SMALL forbidden gap (E(g) ~ 1 eV; silicon ≈ 1.1 eV, germanium ≈ 0.7 eV) — some electrons are thermally excited across the gap even at room temperature, giving a small but temperature-sensitive conductivity.",
        "Common mistake: don't confuse a small gap with 'no gap' — a semiconductor still has zero conductivity at absolute zero, exactly like an insulator; it is only the small gap size that lets modest thermal energy bridge it at ordinary temperatures.",
      ],
    },
    {
      heading: "3. Intrinsic Semiconductors",
      body:
        "A pure semiconductor crystal (no deliberate impurities), such as pure silicon or pure germanium, is called an intrinsic semiconductor. Its conduction relies entirely on thermally generated carriers.",
      bullets: [
        "Each atom forms four covalent bonds with its neighbours (silicon and germanium are both tetravalent). At absolute zero, all valence electrons are locked into these bonds and the crystal behaves as a perfect insulator.",
        "At room temperature, thermal energy occasionally breaks a covalent bond, freeing an electron into the conduction band and leaving behind a 'hole' — a vacant bonding site that behaves exactly like a mobile POSITIVE charge carrier as neighbouring electrons hop into it.",
        "Electron-hole pairs are always generated in EQUAL numbers in an intrinsic semiconductor — for every free electron created, exactly one hole is left behind.",
        "Intrinsic carrier concentration n(i) is a strong function of temperature — it roughly DOUBLES for every 8°C rise for silicon, which is why semiconductor device behaviour is so temperature-sensitive compared to metals.",
      ],
    },
    {
      heading: "4. Extrinsic Semiconductors — Doping, n-type and p-type",
      body:
        "Deliberately adding a small, controlled amount of impurity atoms — doping — dramatically increases a semiconductor's conductivity and lets engineers choose whether electrons or holes dominate as the majority carrier.",
      bullets: [
        "n-type semiconductor: doping with a PENTAVALENT impurity (e.g. phosphorus, arsenic — 5 valence electrons) in a tetravalent host. Four of the five electrons form covalent bonds; the fifth is only loosely bound and becomes a free (majority) electron at room temperature. Electrons are the majority carriers, holes the minority.",
        "p-type semiconductor: doping with a TRIVALENT impurity (e.g. boron, aluminium, indium — 3 valence electrons) in a tetravalent host. Only three covalent bonds can form, leaving one bond incomplete — a hole. Holes are the majority carriers, electrons the minority.",
        "Donor atoms (pentavalent) 'donate' a free electron without creating an equal hole; acceptor atoms (trivalent) 'accept' an electron from a neighbouring bond, creating a hole without a corresponding free electron.",
        "Doped material remains ELECTRICALLY NEUTRAL overall — the impurity atom itself carries a fixed, immobile charge that exactly balances the mobile carrier it donates or accepts; only the CONCENTRATION of free carriers changes, not the crystal's net charge.",
      ],
    },
    {
      heading: "5. Law of Mass Action and Charge Carrier Concentrations",
      body:
        "Even after doping heavily favours one carrier type, a fixed mathematical relationship still connects the electron and hole concentrations at thermal equilibrium.",
      formula: [
        { label: "Law of mass action", expression: "n · p = n(i)²" },
      ],
      bullets: [
        "This product depends ONLY on the material and temperature, never on the doping level — doping increases one carrier type while proportionally suppressing the other, so their product stays fixed.",
        "In an n-type semiconductor, n ≫ p (electrons are majority, holes are minority); in a p-type semiconductor, p ≫ n (holes are majority, electrons are minority) — but n·p = n(i)² holds true in both cases.",
        "This law is the basis for calculating minority carrier concentration once the majority carrier concentration (essentially fixed by the doping density) is known.",
      ],
    },
    {
      heading: "6. Formation of a p-n Junction — the Depletion Region",
      body:
        "A p-n junction is formed when a p-type and n-type semiconductor are joined (typically grown as a single continuous crystal, not simply glued together). The moment they're joined, diffusion begins — and it is self-limiting in a very specific way.",
      bullets: [
        "Diffusion: because of the sharp concentration difference at the junction, electrons from the n-side diffuse across into the p-side, and holes from the p-side diffuse across into the n-side, just as any concentration gradient drives diffusion.",
        "As electrons and holes cross and recombine near the junction, they leave behind FIXED, immobile ions — positive donor ions on the n-side, negative acceptor ions on the p-side — since the impurity atoms themselves cannot move.",
        "This thin region around the junction, stripped of mobile charge carriers and containing only fixed ions, is called the depletion region (or depletion layer).",
        "The exposed fixed charges create an internal electric field pointing from the n-side toward the p-side, which opposes further diffusion — diffusion and this opposing drift current reach equilibrium, and the depletion region stops growing.",
      ],
    },
    {
      heading: "7. Potential Barrier and Built-in Field",
      body:
        "The internal electric field across the depletion region corresponds to a potential difference — the barrier potential — that any external charge carrier must overcome to cross the junction.",
      bullets: [
        "Barrier potential is typically about 0.7 V for silicon junctions and about 0.3 V for germanium junctions at room temperature — values worth memorising directly, since they appear constantly in diode-circuit numerical problems.",
        "At equilibrium (no external voltage applied), diffusion current and drift current exactly balance, so the NET current across the junction is zero.",
        "The width of the depletion region and the size of the barrier potential both depend on the doping concentration — more heavily doped material creates a narrower depletion region with a comparable barrier height.",
      ],
    },
    {
      heading: "8. p-n Junction Diode Under Forward Bias",
      body:
        "Connecting the p-side to the positive terminal of a battery (and the n-side to the negative terminal) is called forward bias — it drives the diode toward easy conduction.",
      bullets: [
        "The external field opposes the internal built-in field, which narrows the depletion region and lowers the potential barrier.",
        "Once the applied voltage exceeds the barrier potential (~0.7 V for silicon), majority carriers flow easily across the junction and current rises steeply — a small further increase in voltage produces a large increase in current.",
        "Below this threshold ('knee' voltage), current is negligibly small — the diode behaves almost like an open circuit until the barrier is overcome.",
      ],
    },
    {
      heading: "9. p-n Junction Diode Under Reverse Bias",
      body:
        "Connecting the p-side to the negative terminal (and the n-side to the positive terminal) is called reverse bias — it drives the diode toward blocking conduction.",
      bullets: [
        "The external field reinforces the internal built-in field, WIDENING the depletion region and increasing the effective barrier — majority carriers are pushed further away from the junction, and majority-carrier current is essentially cut off.",
        "A very small reverse current does still flow, carried entirely by MINORITY carriers (thermally generated electron-hole pairs) — this reverse saturation current is small and, over a wide range, nearly independent of the reverse voltage magnitude.",
        "If the reverse voltage is increased far enough, breakdown occurs and current rises sharply — this is either Zener breakdown (very high field pulling electrons directly out of covalent bonds, dominant at low breakdown voltages, sharply doped junctions) or avalanche breakdown (high-energy carriers colliding with and ionising other atoms in a multiplying chain, dominant at higher breakdown voltages).",
      ],
    },
    {
      heading: "10. Diode Characteristics and the Ideal Diode Equation",
      body:
        "Plotting current against voltage for a real diode gives its characteristic curve — sharply asymmetric between forward and reverse bias, and captured mathematically by a single exponential relation.",
      formula: [
        { label: "Ideal diode equation", expression: "I = I₀(e^(eV/kT) − 1)" },
      ],
      bullets: [
        "In forward bias (V > 0, and eV ≫ kT), the exponential term dominates and current grows extremely rapidly with voltage.",
        "In reverse bias (V < 0, with |eV| ≫ kT), the exponential term vanishes and I approaches −I₀ — the small, nearly constant reverse saturation current.",
        "Dynamic (AC) resistance of a diode, defined as dV/dI at a given operating point, is very different from its DC resistance V/I — a subtlety often tested in numerical problems involving diode circuits with both AC and DC components.",
        "A real diode's forward characteristic has a distinct 'knee' near the barrier potential — below it, current is nearly zero; above it, current rises almost vertically on a typical I-V graph.",
      ],
    },
    {
      heading: "11. Half-Wave Rectifier",
      body:
        "A single diode can convert AC into pulsating DC by simply blocking one half of every cycle — this is the simplest possible rectifier circuit.",
      formula: [
        { label: "Maximum theoretical efficiency", expression: "η(max) ≈ 40.6%" },
      ],
      bullets: [
        "During the half-cycle that forward-biases the diode, current flows through the load exactly following the input waveform (minus the diode's small forward drop); during the other half-cycle, the diode is reverse-biased and blocks current entirely.",
        "Output is unidirectional (always the same sign) but strongly pulsating — far from smooth DC — since only one half of each input cycle is actually used.",
        "Because half of every input cycle is completely wasted, the maximum possible efficiency is capped well below 100%.",
      ],
    },
    {
      heading: "12. Full-Wave Rectifier",
      body:
        "Using two diodes (with a centre-tapped transformer) or four diodes (in a bridge configuration), a full-wave rectifier makes use of BOTH halves of the input cycle, doubling the output frequency of the pulsating DC and roughly doubling the theoretical efficiency.",
      formula: [
        { label: "Maximum theoretical efficiency", expression: "η(max) ≈ 81.2%" },
      ],
      bullets: [
        "Centre-tap design: two diodes conduct on alternate half-cycles, each using one half of a centre-tapped secondary winding, so the load always receives current in the same direction.",
        "Bridge design: four diodes arranged so that, regardless of which half-cycle is present, current is always routed through the load in the same direction — this avoids needing a centre-tapped transformer at all.",
        "Full-wave rectifier output has a ripple frequency TWICE the input AC frequency (since both half-cycles now contribute one pulse each per input cycle), which makes it considerably easier to smooth into steady DC compared to a half-wave rectifier's output.",
      ],
    },
    {
      heading: "13. Filters and Ripple",
      body:
        "A rectifier alone only produces pulsating DC, with large variations (ripple) between pulses — a filter circuit, typically a capacitor placed across the load, smooths this into something closer to steady DC.",
      bullets: [
        "A shunt capacitor charges up near the peak of each pulse and then discharges slowly through the load resistance as the rectified voltage dips, filling in the gaps and reducing the ripple's amplitude.",
        "A larger capacitor, or a larger load resistance (slower discharge), both reduce ripple further, at the cost of a larger, more expensive capacitor.",
        "Real DC power supplies (phone chargers, laptop adapters) always combine a rectifier stage with a filter stage, and usually a voltage regulator stage afterward, to deliver clean, steady DC from mains AC.",
      ],
    },
    {
      heading: "14. Zener Diode and Voltage Regulation",
      body:
        "A Zener diode is a specially designed p-n junction diode, heavily doped so that it has a sharp, well-defined, and REPEATABLE breakdown voltage when reverse biased — making it ideal for holding a voltage constant.",
      bullets: [
        "Unlike an ordinary diode (which is damaged by reverse breakdown), a Zener diode is designed to operate continuously in reverse breakdown without damage, as long as the current through it stays within its rated limits.",
        "Once breakdown begins, the voltage across the Zener diode stays almost exactly constant (at its rated Zener voltage) over a wide range of currents through it — this is the property exploited for voltage regulation.",
        "In a simple voltage regulator circuit, a series resistor limits current, and the Zener diode (in reverse bias) is placed in parallel with the load — any excess input voltage variation is absorbed by the series resistor, while the Zener diode holds the load voltage essentially fixed.",
      ],
    },
    {
      heading: "15. Special Purpose Diodes: LED, Photodiode and Solar Cell",
      body:
        "Beyond rectification and voltage regulation, several specialised p-n junction devices exploit the interaction between light and semiconductors in opposite directions — converting electrical energy to light, or light to electrical energy.",
      bullets: [
        "LED (Light Emitting Diode): a forward-biased p-n junction made from a suitable compound semiconductor (not silicon) in which electron-hole recombination releases energy directly as light (rather than only as heat); the emitted photon's energy — and hence colour — depends on the semiconductor's band gap.",
        "Photodiode: operated in REVERSE bias; incident light generates extra electron-hole pairs in the depletion region, increasing the (otherwise tiny and roughly constant) reverse saturation current in proportion to the light intensity — used for light detection and measurement.",
        "Solar cell: essentially an unbiased (or self-biased) p-n junction optimised to directly convert light energy into electrical energy; photon-generated electron-hole pairs are swept apart by the junction's built-in field, without needing an external battery at all — the junction itself becomes a source of EMF.",
        "Common mistake: an LED and a photodiode are almost opposite devices doing the SAME underlying physics in reverse — one converts electrical energy to light (forward bias), the other converts light to a measurable electrical signal (reverse bias).",
      ],
    },
    {
      heading: "16. Transistor — Structure and Biasing",
      body:
        "A bipolar junction transistor (BJT) is formed from three alternating doped regions — either n-p-n or p-n-p — creating two back-to-back p-n junctions that share a common, very thin middle region.",
      bullets: [
        "Three terminals: emitter (heavily doped, injects the majority carriers), base (very thin and lightly doped, in the middle), and collector (moderately doped, collects the carriers that cross the base).",
        "Correct biasing for normal (active) operation: the emitter-base junction is FORWARD biased (to inject carriers easily), while the base-collector junction is REVERSE biased (to sweep those carriers across to the collector once they arrive).",
        "The base region must be extremely thin and lightly doped — this is what allows most of the carriers injected by the emitter to cross the base and reach the collector, rather than recombining within the base itself.",
      ],
    },
    {
      heading: "17. Transistor Action and Current Relations",
      body:
        "Transistor 'action' describes how a large current can flow between emitter and collector, controlled by a much smaller current at the base — the basis of all transistor amplification.",
      formula: [
        { label: "Terminal current relation", expression: "I(E) = I(B) + I(C)" },
        { label: "Common-base current gain", expression: "α = I(C)/I(E)" },
        { label: "Common-emitter current gain", expression: "β = I(C)/I(B)" },
        { label: "Relation between α and β", expression: "β = α/(1−α)" },
      ],
      bullets: [
        "Because the base is thin and lightly doped, only a small fraction of the emitter current recombines there and leaves as base current — the vast majority passes straight through to the collector, which is why I(C) is close to (but always slightly less than) I(E).",
        "α is therefore always slightly LESS than 1, while β is typically LARGE (tens to hundreds) — a small change in α near 1 corresponds to a large change in β, which is why individual transistors of the same type can have noticeably different β values.",
        "β is the key figure of merit for a transistor used as an amplifier in the common-emitter configuration — the standard configuration for most amplifier circuits.",
      ],
    },
    {
      heading: "18. Transistor Characteristics and Configurations",
      body:
        "A transistor can be connected in three different configurations depending on which terminal is common to both the input and output circuits — each with different gain and impedance properties.",
      bullets: [
        "Common-base (CB): base is common to input and output; current gain α < 1, but voltage gain can be high — rarely used alone for amplification, but useful for high-frequency applications.",
        "Common-emitter (CE): emitter is common to input and output; current gain β ≫ 1, and BOTH current and voltage gain are appreciable, making this the standard configuration for amplifier circuits.",
        "Common-collector (CC): collector is common to input and output; current gain is high but voltage gain is just under 1 — used mainly as a buffer/impedance matcher (emitter follower), not for voltage amplification.",
        "Input and output characteristic curves (plotting I(B) vs V(BE), and I(C) vs V(CE) for various I(B)) are standard experimental graphs used to extract a transistor's α, β, and input/output resistance.",
      ],
    },
    {
      heading: "19. Transistor as an Amplifier (CE Configuration)",
      body:
        "In the common-emitter configuration, a small change in base current produces a proportionally much larger change in collector current — and by passing that collector current through a suitable resistor, a small input voltage signal becomes a much larger output voltage signal.",
      formula: [
        { label: "Voltage gain", expression: "A(v) = β (R(C)/R(in))" },
        { label: "Power gain", expression: "A(p) = A(v) × A(i) = β² (R(C)/R(in))" },
      ],
      bullets: [
        "The transistor must be biased into its ACTIVE region (using a bias resistor network) before an AC signal is applied — otherwise the amplifier distorts or clips the signal instead of faithfully reproducing an amplified version of it.",
        "A defining feature of the common-emitter amplifier: the output voltage is 180° OUT OF PHASE with the input voltage — as input voltage rises, base current rises, collector current rises, and the voltage DROP across R(C) increases, which means the collector (output) voltage actually falls.",
        "Power gain is the PRODUCT of voltage gain and current gain, not their sum — a very commonly tested numerical relationship.",
      ],
    },
    {
      heading: "20. Transistor as a Switch",
      body:
        "Away from its active (linear amplifying) region, a transistor can instead be operated purely between two extreme states — fully OFF or fully ON — making it function as an electronic switch, the foundation of all digital logic circuits.",
      bullets: [
        "Cut-off region: base current is essentially zero (emitter-base junction not forward biased enough), so collector current is also essentially zero — the transistor behaves like an OPEN switch.",
        "Saturation region: base current is large enough that collector current reaches its maximum possible value (limited only by R(C) and the supply voltage) — the transistor behaves like a CLOSED switch, with a very small voltage drop across it.",
        "Switching a transistor rapidly between cut-off and saturation (rather than operating it in the linear active region) is exactly how digital logic gates are built from transistors.",
      ],
    },
    {
      heading: "21. Digital Electronics — Logic Gates (OR, AND, NOT, NAND, NOR)",
      body:
        "Digital electronics represents information using only two discrete voltage levels (logic 0 and logic 1), and logic gates are circuits — built from transistors operating as switches — that combine these binary inputs according to fixed rules.",
      bullets: [
        "NOT gate (inverter): a single input, single output; output is the logical opposite of the input (1 becomes 0, 0 becomes 1) — the simplest possible gate, built from one transistor.",
        "OR gate: output is 1 if ANY input is 1; output is 0 only when ALL inputs are 0.",
        "AND gate: output is 1 only if ALL inputs are 1; output is 0 if ANY input is 0.",
        "NAND gate (NOT-AND) and NOR gate (NOT-OR): the outputs of AND and OR gates respectively, each followed by a NOT gate — these two gates are called 'universal gates' because either one, used repeatedly on its own, can be combined to build every other logic gate (including OR, AND, and NOT themselves).",
        "Truth tables (a table listing the output for every possible combination of inputs) are the standard way to fully define and test any logic gate's behaviour — a frequently drawn diagram in board exams alongside the standard gate symbols.",
      ],
    },
  ],
};
