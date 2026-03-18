# Neha Rao - Bioinformatics Portfolio

A professional, high-performance, responsive portfolio website built to showcase my academic background, professional experience, research projects, and skills as a Bioinformatics Specialist. This portfolio highlights the fusion of data science, machine learning, and biological research.

## Features

- **Dynamic Interactive Background:** A custom-built HTML5 canvas animation (`canvas-bg.js`) generating a vibrant, glowing, multi-colored tree-like molecular network that reacts to mouse interaction and dynamically fills the screen.
- **Scenic Day/Night Theme Toggle:** A custom interactive day and night scenery switch featuring sliding sun and moon elements with custom high-resolution scenery backgrounds changing between light and dark modes.
- **Dark Mode by Default:** Designed natively with a cohesive dark-themed aesthetic specifically chosen to make bioinformatics visualizations and code snippets pop, seamlessly integrated with a toggleable light mode.
- **Publications Section:** Dedicated list of published research highlighting context-specific trans-regulatory programs, utilizing glassmorphism aesthetics and quick-copy citation functions.
- **Interactive Experience & Education Sections:** Expandable card details for professional roles and clickable academic program links integrating seamlessly into the UI.
- **Custom Project Artwork:** Abstract, bioinformatics-themed visualizations generated specifically for each project card (e.g., RNA-seq dashboards, scRNA-seq replications).
- **Modular Component Design:** Content is cleanly separated across individual pages (`index.html`, `projects.html`, `experience.html`, and `education.html`) for fast loading times and easy scalability without the overhead of heavy JavaScript frameworks.
- **100% Responsive Grid Layouts:** Mobile-first approach using native CSS flexbox and grid layouts, ensuring perfect legibility and card layouts up to 8K resolution.
- **No Third-Party Frameworks:** Built purely with semantic HTML5, Vanilla JavaScript, and raw CSS for maximal flexibility, fine-grained control over micro-animations, and blistering fast load speeds.

## Tech Stack

- **HTML5:** Semantic architecture for accessible and structurally sound pages.
- **CSS3:** Heavy use of modern CSS conventions including Custom Properties (variables), `grid`, `flex`, pseudo-elements (`::before`), backdrop-filters (glassmorphism), and keyframe animations.
- **Vanilla JavaScript Setup:** Pure ES6+ scripting handles the theme switching logic, dynamic copyright years, mobile hamburger navigation, and advanced high-framerate HTML Canvas particle animations.

## Directory Structure

```text
Neha-portfolio/
│
├── src/                        # Main source code
│   ├── index.html              # Home page (Hero section, objective)
│   ├── projects.html           # Project portfolio
│   ├── experience.html         # Professional roles & internships
│   ├── education.html          # Degree descriptions, coursework details
│   │
│   ├── css/
│   │   ├── style.css           # Core base styling, typography, and page structure
│   │   └── utilities.css       # Granular styling for cards, layout tweaks, and component overrides
│   │
│   ├── js/
│   │   ├── script.js           # Generic site functions (Navigation, Theme toggle)
│   │   └── canvas-bg.js        # Logic for molecular/phylogenetic interactive network
│   │
│   └── assets/                 # SVGs, high-res webp/png imagery and logos
│
└── README.md
```

## Setup and Development

Since this project avoids compiling stages (like Webpack or Vite) and runs on pure frontend technologies, it is incredibly simple to set up and run. 

1. **Clone the repository:**
   ```bash
   git clone <repo-link-here>
   cd Neha-portfolio
   ```
2. **Launch locally:**
   Open the `/src/index.html` file directly in your web browser of choice.

    Alternatively, if you prefer using a local web server (such as the VS Code Live Server extension, or Python's built-in module), run the following from within the `src/` directory to avoid CORS warnings when loading external assets:
    ```bash
    cd src
    python -m http.server 8000
    ```
    And navigate to `http://localhost:8000/index.html`. 

## License
Copyright © Neha Rao. All rights reserved.
