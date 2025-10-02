let currentPageIndex = 0;

const journalContent = [
    { id: 'cover', title: "Journal Entry Log", category: "Task #1: Loving Yourself", content: `
        <div class="space-y-4 pt-4 text-center">
            <h2 class="text-4xl font-extrabold tracking-tight text-primary-text">The Self-Reflection Journal</h2>
            <p class="max-w-sm mx-auto text-secondary-text">Document your inner monologue, review life chapters, and define your character. (Author: Cyrus Dominic Manalili, Born: March 9, 2006)</p>
            <div class="text-sm pt-4 font-medium tracking-wider text-secondary-text">
                STATUS: ENTRY 1 INITIATED
            </div>
        </div>
    ` },
    { id: 'describe', title: "a. Describe Yourself", category: "Character Profile", content: `
        <p class="text-sm italic mb-4 text-secondary-text">My nature and energy:</p>
        <p class="text-base leading-relaxed tracking-wide text-primary-text">I am an **energetic person** especially when it comes to parties or spending time with people. I enjoy being with others rather than being alone since I believe that shared moments are more fun and meaningful. I usually try not to overthink unless it is really necessary. I manage to balance my school responsibilities with my tendency to spend time on lighter things, keeping a sense of fun. I enjoy lighthearted situations more than tense or overly serious ones, and prefer to keep conversations **easygoing** and funny.</p>
        ` },
    { id: 'quote', title: "c. My Favorite Quote", category: "Inspiration", content: `
        <p class="text-sm italic mb-4 text-secondary-text">My simple truth:</p>
        <p class="text-2xl leading-relaxed tracking-wide text-center pt-8 text-primary-text" style="font-style: italic;">“Life is better when you are laughing.”</p>
        <p class="text-sm leading-relaxed tracking-wide mt-8 text-secondary-text">Laughter makes almost anything lighter, whether it's a serious situation, a small problem, or just an ordinary day. I am the type of person who enjoys keeping things fun and easy, and I believe even the hardest days can become easier if you find a reason to laugh.</p>
        ` },
    { id: 'likes', title: "d. Things I Like About Myself", category: "Core Strengths", content: [
        "I am energetic and outgoing.",
        "I enjoy being around people more than being alone.",
        "I can make others laugh and lighten the mood.",
        "I balance responsibilities with having fun.",
        "I try not to overthink unless it is needed.",
        "I do not dwell too much on problems.",
        "I prefer to keep things positive and easygoing.",
        "I bring good energy when I am with others."
    ]},
    { id: 'dislikes', title: "e. Things I Don’t Like About Myself", category: "Bugs & Features", content: [
        "I get distracted easily.",
        "I sometimes spend too much time on unimportant things.",
        "I struggle to stay serious in conversations.",
        "I avoid heavy or tense situations.",
        "I procrastinate when I should focus.",
        "I overthink at times even when I try not to.",
        "I find it hard to handle serious topics without turning them into jokes."
    ]},
    { id: 'talents', title: "f. Special Talents", category: "Skill Tree", content: [
        "Playing some basics in piano, i guess.",
        "Lowkey multitask."
    ]},
    { id: 'poem', title: "g. Poem (In 3rd Person)", category: "Monologue", content: `
        <p class="whitespace-pre-line leading-relaxed text-center italic mt-4 text-primary-text">
            Cards on the table, the night’s just begun,
            Chips start to stack while others are done, 
            Luck on my side, I play it for fun,
            In house gambling, I alone am the honored one.
        </p>
        ` },
    { id: 'conscious', title: "h. Things I’m Self-Conscious About", category: "Known Flaws", content: [
        "How I sound when I speak.",
        "Making mistakes in front of others.",
        "Not always being confident enough."
    ]},
    { id: 'respect', title: "i. If I Upgraded My Character...", category: "Commitment", content: `
        <p class="text-sm italic mt-4 text-secondary-text">My goal for growth:</p>
        <p class="text-base font-semibold leading-relaxed text-primary-text">
            If I stop trying to force my ideals on others and instead learn to **listen and respect their own perspectives**, I would love myself more because I know I am growing into someone who values understanding over control.
        </p>
        ` },
    { id: 'forgiveness', title: "j. Forgiveness Dialogue", category: "Post-Production", content: `
        <p class="text-sm italic mt-4 text-secondary-text">My condition for forgiveness:</p>
        <p class="text-base leading-relaxed text-primary-text">I would forgive if someone’s **pride is set in the right place**, because it shows that their actions come from **honesty** and not from arrogance, and that makes it easier for me to understand and let go.</p>
        ` },
    { id: 'feelings', title: "k. Feelings That Are Hard to Accept", category: "Emotional Check", content: [
        "Regret over past decisions.",
        "Failure after trying hard.",
        "Disappointment in myself."
    ]},
    { id: 'difficult', title: "l. Runtime Complications", category: "Growth Areas", content: [
        "Balancing fun and responsibilities.",
        "Admitting when I am wrong."
    ]},
    { id: 'grateful', title: "m. Grateful Credits", category: "Acknowledgements", content: [
        "God for giving all of us good health.",
        "My family.",
        "Opportunities that help me grow.",
        "Everyday routine.",
        "Having good source of entertainment."
    ]},
];

const getThemeIcon = (isDark) => {
    document.getElementById('moonIcon').style.display = isDark ? 'inline-block' : 'none';
    document.getElementById('sunIcon').style.display = isDark ? 'none' : 'inline-block';
};

const applyTheme = (themeName) => {
    const isDark = themeName === 'dark-theme';
    const body = document.getElementById('app-body');
    
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(themeName);
    
    getThemeIcon(isDark);
    
    localStorage.setItem('journalTheme', themeName);
};

const toggleTheme = () => {
    const body = document.getElementById('app-body');
    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    applyTheme(newTheme);
};

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('journalTheme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark-theme');
    } else {
        applyTheme('light-theme'); 
    }
};

const formatContent = (content) => {
    if (Array.isArray(content)) {
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 dot-icon flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>`;
        return `<ul class="list-ruled mt-0 text-base" >${content.map(item => `<li class="flex items-start ruled-list-item">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
    }
    return content;
};

const renderContentToFace = (index, faceElement) => {
    const page = journalContent[index];
    if (!page) return;

    faceElement.querySelector('.pageTitle').innerHTML = page.title;
    faceElement.querySelector('.pageCategory').innerHTML = page.category;
    faceElement.querySelector('.pageContent').innerHTML = formatContent(page.content);
    faceElement.querySelector('.pageNumber').innerHTML = `Page ${index + 1} / ${journalContent.length}`;
};

const renderPage = (index) => {
    const pageElement = document.getElementById('journal-page');
    const contentElement = pageElement.querySelector('.pageContent');
    
    contentElement.classList.remove('fade-in');
    contentElement.classList.add('fade-out');
    
    setTimeout(() => {
        renderContentToFace(index, pageElement);
        
        contentElement.classList.remove('fade-out'); 
        contentElement.classList.add('fade-in');
        
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').disabled = index === journalContent.length - 1;
        
        setTimeout(() => {
            contentElement.classList.remove('fade-in');
        }, 400);

    }, 400);

    currentPageIndex = index;
};


const navigate = (direction) => {
    const newIndex = currentPageIndex + direction;

    if (newIndex >= 0 && newIndex < journalContent.length) {
        renderPage(newIndex);
    }
};

window.onload = () => {
    initializeTheme();
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

    const pageElement = document.getElementById('journal-page');
    renderContentToFace(currentPageIndex, pageElement);
    
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').disabled = journalContent.length === 1;

    document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
};
