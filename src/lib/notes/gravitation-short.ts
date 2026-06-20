export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const gravitationShortNotes: ChapterShortNotes = {
  chapterName: "Gravitation",
  className: "11",
  groups: [
    {
      heading: "Newton's Law of Gravitation",
      points: [
        "F = Gm₁m₂/r² — always attractive, acts along the line joining the masses.",
        "G = 6.67 × 10⁻¹¹ N·m²/kg² — universal, same everywhere, independent of medium.",
        "Valid exactly only for point masses or spherically symmetric bodies.",
        "Conservative force: work done is path-independent; zero net work over a closed loop.",
        "Obeys superposition — net force from multiple masses is the vector sum of individual forces.",
      ],
    },
    {
      heading: "Gravitational Field Intensity",
      points: [
        "I = F/m (force per unit mass), unit N/kg, same dimensions as acceleration.",
        "Point mass / outside a sphere (r > R): I = GM/r²",
        "On the surface (r = R): I = GM/R²",
        "Inside a solid sphere (r < R): I = GMr/R³ — grows linearly, zero at the centre.",
        "Inside a hollow shell: I = 0 everywhere — no net field inside a shell.",
      ],
    },
    {
      heading: "Acceleration Due to Gravity (g) & Its Variation",
      points: [
        "g = GM/R² = (4/3)πGRρ ≈ 9.8 m/s² at Earth's surface.",
        "With height (h << R): gₕ = g(1 − 2h/R) — decreases as 1/r² overall.",
        "With depth d: g_d = g(1 − d/R) — decreases linearly, zero at the centre.",
        "g is maximum at the surface; falls off whether you go up or down from it.",
        "With rotation, at latitude λ: g' = g − Rω²cos²λ — max at poles, min at equator.",
        "ω for zero apparent weight at equator: ω = √(g/R).",
      ],
    },
    {
      heading: "Gravitational PE & Potential",
      points: [
        "PE: U = −GMm/r (zero at infinity, negative everywhere else — system is bound).",
        "Work to raise mass by height h: W = GMmh/[R(R+h)] = mgh/(1 + h/R); → mgh when h << R.",
        "Potential: V = −GM/r (PE per unit mass). Field-potential link: I = −dV/dr.",
        "Solid sphere, inside (r < R): V = −(GM/2R³)(3R² − r²); centre value = (3/2) × surface value.",
        "Hollow shell, inside: V is constant, equal to surface value −GM/R (even though field = 0 there).",
        "For multi-particle systems, total PE = sum of PE of every pair, no shortcuts.",
      ],
    },
    {
      heading: "Escape Velocity & Escape Energy",
      points: [
        "v_e = √(2GM/R) = √(2gR) — minimum speed to escape a planet's gravity completely.",
        "Depends only on the planet (M, R or g, R, or density+R) and launch height — NOT on the object's mass or launch angle.",
        "Escape energy = GMm/R = (1/2)mv_e² (kinetic energy needed to just reach infinity).",
        "Earth: v_e ≈ 11.2 km/s. Moon: v_e ≈ 2.3 km/s — too low to retain an atmosphere.",
      ],
    },
    {
      heading: "Kepler's Three Laws",
      points: [
        "1st (Orbits): elliptical orbit, Sun at one focus — not the centre.",
        "2nd (Areas): equal areas swept in equal time → fastest at perihelion, slowest at aphelion.",
        "2nd law ⇔ conservation of angular momentum (gravity is a central force, zero torque about the Sun).",
        "3rd (Periods): T² ∝ a³ (semi-major axis); for circular orbit, T² ∝ R³.",
      ],
    },
    {
      heading: "Satellite Motion — Velocity, Period & Energy",
      points: [
        "Orbital velocity: v₀ = √(GM/r) — depends on central mass & radius only, never on satellite's own mass.",
        "Close to Earth's surface: v₀ = √(gR) ≈ 7.9 km/s.",
        "Time period: T = 2π√(r³/GM); near surface, T₀ ≈ 84.6 minutes.",
        "Larger orbital radius → smaller orbital velocity, longer time period.",
        "K.E. = GMm/2r, P.E. = −GMm/r, Total energy = −GMm/2r — note |P.E.| = 2 × K.E. always.",
        "Binding energy = −(Total energy) = GMm/2r = K.E.",
        "Speed boost to √2 × v₀ (≈ 41.4% increase) → K.E. doubles → satellite escapes.",
      ],
    },
    {
      heading: "Geostationary, Polar Satellites & Weightlessness",
      points: [
        "Geostationary: equatorial orbit, T = 24 h, height ≈ 36,000 km, v₀ ≈ 3.1 km/s; needs ≥3 satellites for global coverage.",
        "Polar satellite: ~90° inclination, T ≈ 100 min, height 500–800 km; used for weather/mapping.",
        "Weightlessness in orbit = continuous free fall, NOT absence of gravity — true weight is still nearly full strength.",
        "Apparent weight (the part felt as a support force) drops to zero; true weight does not.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "g decreasing with height follows 1/r²; g decreasing with depth follows r — different laws, easy to mix up.",
        "Escape velocity formula has NO dependence on the projected mass — many options try to sneak 'm' into the answer.",
        "Inside a shell: field = 0, but potential is NOT zero — it equals the surface value.",
        "Orbital velocity and time period both depend only on orbital radius and central mass — never on the orbiting satellite's mass.",
      ],
    },
  ],
};
