const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        // UNCCOMENT THE BELOW TO REPEAT THE ANIMATIONS
        else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('[data-reveal]');
hiddenElements.forEach((element) => {
    element.classList.add('hidden');
    observer.observe(element);
});

if (window.location.protocol === 'file:') {
    console.warn('The external SVG globe mask requires HTTP in Chrome. Using the preserved local-file fallback.');
    document.documentElement.classList.add('project-globe-file-fallback');
}

const projectConfigurations = Object.freeze({
    cornerPocket: Object.freeze({
        id: 'corner-pocket',
        name: 'Corner Pocket',
        logo: 'images/corner-pocket/CP - logo.svg',
        description: 'An Android app for pool enthusiasts, designed to track real-life games and generate detailed player statistics. The app offers a seamless experience for recording match data and viewing performance analytics.',
        screenshots: Object.freeze([
            { src: 'images/corner-pocket/cp-1.png', caption: 'Corner Pocket match setup screen' },
            { src: 'images/corner-pocket/cp-2.png', caption: 'Corner Pocket player selection screen' },
            { src: 'images/corner-pocket/cp-3.png', caption: 'Corner Pocket match tracking screen' },
            { src: 'images/corner-pocket/cp-4.png', caption: 'Corner Pocket game details screen' },
            { src: 'images/corner-pocket/cp-5.png', caption: 'Corner Pocket player statistics screen' },
            { src: 'images/corner-pocket/cp-6.png', caption: 'Corner Pocket performance chart' },
            { src: 'images/corner-pocket/cp-7.png', caption: 'Corner Pocket match history screen' },
        ]),
        technologies: Object.freeze(['ANDROID APP', 'KOTLIN', 'REALM DATABASE']),
        caseStudyUrl: 'CP-CS.pdf',
        globeGradient: Object.freeze({ start: '#28E8C5', end: '#C24AC9' }),
        accentColor: '#28E8C5',
    }),
    escapeTheDarkCastle: Object.freeze({
        id: 'escape-the-dark-castle',
        name: 'Escape the Dark Castle',
        logo: 'images/ETDC/logo.png',
        description: 'A mobile adaptation of a popular board game developed using Unity and C#. This project focuses on translating physical game play mechanics into a digital format while maintaining an engaging user experience.',
        screenshots: Object.freeze([
            { src: 'images/ETDC/ETDC-1.png', caption: 'Escape the Dark Castle screenshot 1' },
            { src: 'images/ETDC/ETDC-2.png', caption: 'Escape the Dark Castle screenshot 2' },
            { src: 'images/ETDC/ETDC-3.png', caption: 'Escape the Dark Castle screenshot 3' },
            { src: 'images/ETDC/ETDC-4.png', caption: 'Escape the Dark Castle screenshot 4' },
            { src: 'images/ETDC/ETDC-5.png', caption: 'Escape the Dark Castle screenshot 5' },
            { src: 'images/ETDC/ETDC-6.png', caption: 'Escape the Dark Castle screenshot 6' },
            { src: 'images/ETDC/ETDC-7.png', caption: 'Escape the Dark Castle screenshot 7' },
        ]),
        technologies: Object.freeze(['MOBILE GAME', 'UNITY', 'C#']),
        caseStudyUrl: 'ETDC-CS.pdf',
        globeGradient: Object.freeze({ start: '#FFFFFF', end: '#AEB6C2' }),
        accentColor: '#D8DDE3',
    }),
});

const projectCardConfigurations = Object.freeze([
    Object.freeze({
        id: 'corner-pocket',
        number: '01',
        name: 'Corner Pocket',
        description: 'A native Android app for tracking pool matches and analysing player performance.',
        technologies: Object.freeze(['Kotlin', 'Android', 'Realm']),
        accentColor: '#28E8C5',
        selected: true,
    }),
    Object.freeze({
        id: 'diurnus',
        number: '02',
        name: 'Diurnus',
        description: 'A word-of-the-day app designed to make discovering remarkable language a daily ritual.',
        technologies: Object.freeze(['Flutter', 'Dart', 'UX Design']),
        accentColor: '#A56BE8',
        selected: false,
    }),
    Object.freeze({
        id: 'ever-after',
        number: '03',
        name: 'Ever After',
        description: 'A personal audiobook gift app for creating meaningful, recorded stories.',
        technologies: Object.freeze(['Flutter', 'Dart', 'Audio']),
        accentColor: '#E7A1AC',
        selected: false,
    }),
    Object.freeze({
        id: 'escape-the-dark-castle',
        number: '04',
        name: 'Escape the Dark Castle',
        description: 'A mobile adaptation of a popular board game developed using Unity and C#.',
        technologies: Object.freeze(['Mobile Game', 'Unity', 'C#']),
        accentColor: '#D8DDE3',
        selected: false,
    }),
]);

const selectableProjectIds = new Set(['corner-pocket', 'escape-the-dark-castle']);

function createProjectSelectionCard(project, instance) {
    const card = document.createElement('article');
    card.className = 'project-selection-card';
    card.dataset.projectId = project.id;
    card.dataset.selected = String(project.selected);
    card.style.setProperty('--card-accent', project.accentColor);
    card.setAttribute('role', 'listitem');

    const headingId = `project-card-${project.id}-${instance}`;
    card.setAttribute('aria-labelledby', headingId);

    const topRow = document.createElement('div');
    topRow.className = 'project-selection-card__top';

    const number = document.createElement('span');
    number.className = 'project-selection-card__number';
    number.textContent = project.number;

    const indicator = document.createElement('span');
    indicator.className = 'project-selection-card__indicator';
    indicator.setAttribute('aria-hidden', 'true');
    indicator.textContent = '↗';

    topRow.append(number, indicator);

    const name = document.createElement('h2');
    name.id = headingId;
    name.textContent = project.name;

    const description = document.createElement('p');
    description.className = 'project-selection-card__description';
    description.textContent = project.description;

    const divider = document.createElement('div');
    divider.className = 'project-selection-card__divider';
    divider.setAttribute('aria-hidden', 'true');

    const technologies = document.createElement('ul');
    technologies.className = 'project-selection-card__technologies';
    project.technologies.forEach((technology) => {
        const item = document.createElement('li');
        item.textContent = technology;
        technologies.appendChild(item);
    });

    card.append(topRow, name, description, divider, technologies);

    if (selectableProjectIds.has(project.id)) {
        const action = document.createElement('button');
        action.className = 'project-selection-card__action';
        action.type = 'button';
        action.setAttribute('aria-labelledby', headingId);
        action.setAttribute('aria-pressed', String(project.selected));
        action.dataset.projectSelection = project.id;
        card.appendChild(action);
    }

    return card;
}

document.querySelectorAll('[data-project-selection-grid]').forEach((grid, gridIndex) => {
    grid.setAttribute('role', 'list');
    grid.replaceChildren(...projectCardConfigurations.map((project) => createProjectSelectionCard(project, gridIndex)));
});

function createScreenshotSlide(screenshots, isDuplicate = false) {
    const slide = document.createElement('div');
    slide.className = 'logos-slide';

    if (isDuplicate) {
        slide.setAttribute('aria-hidden', 'true');
    }

    screenshots.forEach(({ src, caption }) => {
        const image = document.createElement('img');
        image.src = src;
        image.alt = isDuplicate ? '' : caption;
        slide.appendChild(image);
    });

    return slide;
}

function updateGlobeGradient(showcase, gradient, shouldTransition) {
    const layers = [...showcase.querySelectorAll('.project-globe-layer')];

    if (!shouldTransition) {
        layers.forEach((layer, index) => {
            layer.style.setProperty('--globe-layer-start', gradient.start);
            layer.style.setProperty('--globe-layer-end', gradient.end);
            layer.classList.toggle('is-active', index === 0);
        });
        return;
    }

    const activeLayer = layers.find((layer) => layer.classList.contains('is-active')) || layers[0];
    const nextLayer = layers.find((layer) => layer !== activeLayer);
    nextLayer.style.setProperty('--globe-layer-start', gradient.start);
    nextLayer.style.setProperty('--globe-layer-end', gradient.end);

    requestAnimationFrame(() => {
        activeLayer.classList.remove('is-active');
        nextLayer.classList.add('is-active');
    });
}

function applyProjectConfiguration(project, { transition = false } = {}) {
    document.querySelectorAll('[data-project-showcase]').forEach((showcase) => {
        showcase.dataset.projectId = project.id;
        showcase.setAttribute('aria-label', project.name);
        showcase.style.setProperty('--project-accent', project.accentColor);
        showcase.style.setProperty('--project-globe-start', project.globeGradient.start);
        showcase.style.setProperty('--project-globe-end', project.globeGradient.end);
        updateGlobeGradient(showcase, project.globeGradient, transition);

        const logo = showcase.querySelector('[data-project-logo]');
        logo.src = project.logo;
        logo.alt = project.name;

        showcase.querySelector('[data-project-description]').textContent = project.description;

        const caseStudyLink = showcase.querySelector('[data-project-case-study]');
        caseStudyLink.href = project.caseStudyUrl;
        caseStudyLink.setAttribute('aria-label', `View the ${project.name} case study`);

        const tags = showcase.querySelector('[data-project-tags]');
        tags.replaceChildren(...project.technologies.map((technology) => {
            const tag = document.createElement('p');
            tag.textContent = technology;
            return tag;
        }));

        const gallery = showcase.querySelector('[data-project-gallery]');
        gallery.replaceChildren(
            createScreenshotSlide(project.screenshots),
            createScreenshotSlide(project.screenshots, true),
        );
    });
}

applyProjectConfiguration(projectConfigurations.cornerPocket);

const selectableProjects = Object.freeze({
    'corner-pocket': projectConfigurations.cornerPocket,
    'escape-the-dark-castle': projectConfigurations.escapeTheDarkCastle,
});

let projectGlobeRotation = 0;

function getVisibleShowcase() {
    return window.getComputedStyle(document.querySelector('.wide')).display === 'none'
        ? document.querySelector('.narrow [data-project-showcase]')
        : document.querySelector('.wide [data-project-showcase]');
}

function isShowcaseVisible() {
    const showcase = getVisibleShowcase();
    const bounds = showcase.getBoundingClientRect();
    return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
}

function selectProject(projectId) {
    const project = selectableProjects[projectId];
    if (!project) return;

    const alreadySelected = document.querySelector(`.project-selection-card[data-project-id="${projectId}"][data-selected="true"]`);
    if (alreadySelected) return;

    applyProjectConfiguration(project, { transition: true });

    projectGlobeRotation += 135;
    document.querySelectorAll('[data-project-showcase]').forEach((showcase) => {
        showcase.style.setProperty('--project-globe-rotation', `${projectGlobeRotation}deg`);
    });

    document.querySelectorAll('.project-selection-card').forEach((card) => {
        const selected = card.dataset.projectId === projectId;
        card.dataset.selected = String(selected);
        const action = card.querySelector('.project-selection-card__action');
        if (action) action.setAttribute('aria-pressed', String(selected));
    });

    if (!isShowcaseVisible()) {
        getVisibleShowcase().scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start',
        });
    }
}

document.querySelectorAll('[data-project-selection]').forEach((action) => {
    action.addEventListener('click', () => selectProject(action.dataset.projectSelection));
});


const sectionNavigationLinks = [...document.querySelectorAll('header nav a[data-section-link]')];
const navigableSections = sectionNavigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateActiveNavigation() {
    const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
    const viewportMarker = window.scrollY + headerHeight + Math.min(window.innerHeight * .2, 160);
    const activeSection = navigableSections.find((section) => {
        const sectionTop = section.offsetTop;
        return viewportMarker >= sectionTop && viewportMarker < sectionTop + section.offsetHeight;
    });

    sectionNavigationLinks.forEach((link) => {
        const isActive = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
        link.classList.toggle('active', Boolean(isActive));

        if (isActive) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
window.addEventListener('hashchange', () => requestAnimationFrame(updateActiveNavigation));
requestAnimationFrame(updateActiveNavigation);
