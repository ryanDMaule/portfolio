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

(() => {
    const hero = document.querySelector('#HERO');
    const artworkImage = document.querySelector('.hero-artwork img');
    const personality = document.querySelector('.hero-personality');
    const annotation = document.querySelector('.hero-annotation');
    const annotationLineOne = document.querySelector('[data-annotation-line-one]');
    const annotationLineTwo = document.querySelector('[data-annotation-line-two]');
    const cursorOne = document.querySelector('[data-annotation-cursor-one]');
    const cursorTwo = document.querySelector('[data-annotation-cursor-two]');
    const annotationArrow = document.querySelector('.annotation-arrow');
    const arrowShaft = document.querySelector('.annotation-arrow__shaft');
    const arrowHead = document.querySelector('.annotation-arrow__head');
    const eyesContainer = document.querySelector('.hero-googly-eyes');
    const eyes = [...document.querySelectorAll('.googly-eye')];
    const pupils = [...document.querySelectorAll('.googly-eye__pupil')];

    if (!hero || !artworkImage || !personality || !annotation || !annotationArrow || !arrowShaft || !arrowHead
        || !annotationLineOne || !annotationLineTwo || !cursorOne || !cursorTwo || !eyesContainer
        || eyes.length !== 2 || pupils.length !== 2) return;
    if (!window.matchMedia('(min-width: 901px)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointerTrackingAvailable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const sourceEyePositions = [
        { x: 789, y: 339 },
        { x: 929, y: 326 },
    ];
    const pupilStates = pupils.map((element) => ({
        element,
        centerX: 0,
        centerY: 0,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        maxTravel: 6,
    }));
    let pupilFrame = null;
    let resizeFrame = null;
    let eyesAreVisible = false;

    function positionPersonalityElements() {
        const heroBounds = hero.getBoundingClientRect();
        const imageBounds = artworkImage.getBoundingClientRect();
        const naturalWidth = artworkImage.naturalWidth || 1671;
        const naturalHeight = artworkImage.naturalHeight || 941;
        const scaleX = imageBounds.width / naturalWidth;
        const scaleY = imageBounds.height / naturalHeight;
        const eyeSize = Math.max(39, Math.min(64, 81 * Math.min(scaleX, scaleY)));

        annotationArrow.setAttribute('viewBox', `0 0 ${heroBounds.width} ${heroBounds.height}`);

        sourceEyePositions.forEach((position, index) => {
            const x = imageBounds.left - heroBounds.left + position.x * scaleX;
            const y = imageBounds.top - heroBounds.top + position.y * scaleY;
            const size = index === 0 ? eyeSize : eyeSize * .94;
            const eye = eyes[index];
            const state = pupilStates[index];

            eye.style.setProperty('--eye-x', `${x}px`);
            eye.style.setProperty('--eye-y', `${y}px`);
            eye.style.setProperty('--eye-size', `${eyeSize}px`);

            state.centerX = x + heroBounds.left;
            state.centerY = y + heroBounds.top;
            state.maxTravel = Math.max(6, Math.min(9, size * .18));
        });

        const annotationBounds = annotation.getBoundingClientRect();
        const startX = annotationBounds.left - heroBounds.left + 8;
        const startY = annotationBounds.top - heroBounds.top + annotationBounds.height + 12;
        const endX = (pupilStates[0].centerX + pupilStates[1].centerX) / 2 - heroBounds.left + 8;
        const endY = (pupilStates[0].centerY + pupilStates[1].centerY) / 2 - heroBounds.top - eyeSize * 1.8;
        const controlOneX = startX - Math.max(45, (startX - endX) * .3);
        const controlOneY = startY + 10;
        const controlTwoX = endX + Math.max(55, (startX - endX) * .28);
        const controlTwoY = endY - 24;

        arrowShaft.setAttribute('d', `M ${startX} ${startY} C ${controlOneX} ${controlOneY}, ${controlTwoX} ${controlTwoY}, ${endX} ${endY}`);

        const tangentX = endX - controlTwoX;
        const tangentY = endY - controlTwoY;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const unitX = tangentX / tangentLength;
        const unitY = tangentY / tangentLength;
        const perpendicularX = -unitY;
        const perpendicularY = unitX;
        const arrowLength = 12;
        const arrowWidth = 5;
        const pointOneX = endX - unitX * arrowLength + perpendicularX * arrowWidth;
        const pointOneY = endY - unitY * arrowLength + perpendicularY * arrowWidth;
        const pointTwoX = endX - unitX * arrowLength - perpendicularX * arrowWidth;
        const pointTwoY = endY - unitY * arrowLength - perpendicularY * arrowWidth;
        arrowHead.setAttribute('d', `M ${pointOneX} ${pointOneY} L ${endX} ${endY} L ${pointTwoX} ${pointTwoY}`);
    }

    function schedulePositionUpdate() {
        if (resizeFrame !== null) return;
        resizeFrame = requestAnimationFrame(() => {
            resizeFrame = null;
            positionPersonalityElements();
        });
    }

    function schedulePupilFrame() {
        if (pupilFrame !== null) return;
        pupilFrame = requestAnimationFrame(animatePupils);
    }

    function animatePupils() {
        let stillMoving = false;

        pupilStates.forEach((state) => {
            state.currentX += (state.targetX - state.currentX) * .16;
            state.currentY += (state.targetY - state.currentY) * .16;
            state.element.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;

            if (Math.abs(state.targetX - state.currentX) > .05 || Math.abs(state.targetY - state.currentY) > .05) {
                stillMoving = true;
            }
        });

        pupilFrame = stillMoving ? requestAnimationFrame(animatePupils) : null;
    }

    function updatePupilTargets(event) {
        if (!eyesAreVisible) return;

        pupilStates.forEach((state) => {
            const deltaX = event.clientX - state.centerX;
            const deltaY = event.clientY - state.centerY;
            const distance = Math.hypot(deltaX, deltaY) || 1;
            const travel = Math.min(state.maxTravel, distance / 45);
            state.targetX = deltaX / distance * travel;
            state.targetY = deltaY / distance * travel;
        });

        schedulePupilFrame();
    }

    function centrePupils() {
        pupilStates.forEach((state) => {
            state.targetX = 0;
            state.targetY = 0;
        });
        schedulePupilFrame();
    }

    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

    async function typeSentence(target, cursor, sentence) {
        cursor.classList.add('is-typing');
        for (const character of sentence) {
            target.textContent += character;
            await wait(40);
        }
        cursor.classList.remove('is-typing');
    }

    async function runStageTwo() {
        await wait(4200);
        annotation.classList.add('is-visible');
        await typeSentence(annotationLineOne, cursorOne, "This is me... it's a little pretentious.");
        await wait(500);

        eyesContainer.classList.add('is-visible');
        eyesAreVisible = true;
        await wait(800);

        await typeSentence(annotationLineTwo, cursorTwo, "That's better.");
        cursorTwo.classList.add('is-typing');
        await wait(700);
        cursorTwo.classList.remove('is-typing');
    }

    hero.classList.add('stage-two-enabled');

    if (artworkImage.complete) {
        positionPersonalityElements();
    } else {
        artworkImage.addEventListener('load', positionPersonalityElements, { once: true });
    }

    window.addEventListener('resize', schedulePositionUpdate, { passive: true });

    if (reducedMotion) {
        annotationLineOne.textContent = "This is me... it's a little pretentious.";
        annotationLineTwo.textContent = "That's better.";
        annotation.classList.add('is-visible');
        eyesContainer.classList.add('is-visible');
        return;
    }

    if (pointerTrackingAvailable) {
        hero.addEventListener('mousemove', updatePupilTargets, { passive: true });
        hero.addEventListener('mouseleave', centrePupils, { passive: true });
    }

    runStageTwo();
})();
