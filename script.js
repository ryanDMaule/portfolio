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
