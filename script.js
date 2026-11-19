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
        id: 'enter-the-dungeon',
        number: '04',
        name: 'Enter the Dungeon',
        description: 'A mobile dungeon crawler built in Unity with procedurally generated encounters.',
        technologies: Object.freeze(['Unity', 'C#', 'Mobile']),
        accentColor: '#D6AD59',
        selected: false,
    }),
]);

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

function applyProjectConfiguration(project) {
    document.querySelectorAll('[data-project-showcase]').forEach((showcase) => {
        showcase.dataset.projectId = project.id;
        showcase.setAttribute('aria-label', project.name);
        showcase.style.setProperty('--project-accent', project.accentColor);
        showcase.style.setProperty('--project-globe-start', project.globeGradient.start);
        showcase.style.setProperty('--project-globe-end', project.globeGradient.end);

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


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};
