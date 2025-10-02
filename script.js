let currentPageIndex = 0;

const journalContent = [
    { id: 'cover', title: "Journal Entry Log", category: "Task #1: Loving Yourself", content: `
        <div class="space-y-4 pt-4 text-center">
            <h2 class="text-4xl font-extrabold tracking-tight" style="color: var(--primary-text);">The Self-Reflection Journal</h2>
            <p class="max-w-sm mx-auto" style="color: var(--secondary-text);">Document your inner monologue, review life chapters, and define your character.</p>
            <div class="text-sm pt-4 font-medium tracking-wider" style="color: #888;">
                STATUS: ENTRY 1 INITIATED
            </div>
        </div>
    ` },
    { id: 'describe', title: "a. Describe Yourself", category: "Character Profile", content: `
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--primary-text);">I am Cyrus Dominic Manalili, born on March 9, 2006, and I would describe myself as an energetic person especially when it comes to parties or spending time with people. I enjoy being with others rather than being alone since I believe that shared moments are more fun and meaningful. I usually try not to overthink unless it is really necessary although I admit that I sometimes get caught up in distractions or unimportant activities. Even with that habit I still manage to balance my school responsibilities with my tendency to spend time on lighter things which shows that I can handle both while still keeping a sense of fun.
I enjoy lighthearted situations more than tense or overly serious ones. When conversations become too heavy I often try to shift them into something more playful or funny not because I avoid seriousness but because I naturally prefer to keep things easy. For me life feels better when there is laughter and connection which is why I do my best to bring positive energy wherever I go</p>
        ` },
    { id: 'quotes', title: "c. My Favorite Quote(s)", category: "Inspiration", content: `
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--primary-text);">My favorite quote is “Life is better when you are laughing.” I like this quote because it feels simple but true. For me laughter makes almost anything lighter whether it is a serious situation a small problem or just an ordinary day. I am the type of person who enjoys keeping things fun and easy so this quote reminds me that even when life gets stressful there is always room to smile or joke around. It also reflects how I like to be around people because laughter is something best shared. Moments feel more alive when there is joy in them and I believe that even the hardest days can become easier if you find a reason to laugh.</p>
        ` },
    { id: 'likes', title: "d. Things I Like About Myself", category: "Power-Ups", content: [
        "I am energetic and outgoing",
        "I enjoy being around people more than being alone",
        "I can make others laugh and lighten the mood",
        "I balance responsibilities with having fun",
        "I try not to overthink unless it is needed",
        "I do not dwell too much on problems",
        "I prefer to keep things positive and easygoing",
        "I bring good energy when I am with others"
    ]},
    { id: 'dislikes', title: "e. Things I Don’t Like About Myself", category: "Bugs & Features", content: [
        "I get distracted easily",
        "I sometimes spend too much time on unimportant things",
        "I struggle to stay serious in conversations",
        "I avoid heavy or tense situations",
        "I procrastinate when I should focus",
        "I overthink at times even when I try not to",
        "I find it hard to handle serious topics without turning them into jokes"
    ]},
    { id: 'talents', title: "f. Special Talents", category: "Skill Tree", content: [
        "Playing some basics in piano, i guess",
        "Lowkey multitask"
    ]},
    { id: 'poem', title: "g. Poem", category: "Monologue", content: `
        <p class="whitespace-pre-line leading-relaxed text-center italic mt-4" style="color: var(--primary-text);">
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
    { id: 'respect', title: "i. I Would Love and Respect Myself More If…", category: "Commitment", content: `
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--primary-text);">
            If I stop trying to force my ideals on others and instead learn to listen and respect their own perspectives, I would love myself more because I know I am growing into someone who values understanding over control.
        </p>
        ` },
    { id: 'forgiveness', title: "j. Forgiveness", category: "Healing Dialogue", content: `
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--primary-text);">I would forgive if someone’s pride is set in the right place, because it shows that their actions come from honesty and not from arrogance, and that makes it easier for me to understand and let go.</p>
        ` },
    { id: 'feelings', title: "k. Feelings That Are Hard to Accept", category: "Emotional Check", content: [
        "Regret over past decisions",
        "Failure after trying hard",
        "Disappointment in myself"
    ]},
    { id: 'difficult', title: "l. Things That Are Difficult For Me", category: "Growth Areas", content: [
        "Balancing fun and responsibilities",
        "Admitting when I am wrong"
    ]},
    { id: 'grateful', title: "m. Things I’m Grateful For", category: "Acknowledgements", content: [
        "God for giving all of us good health",
        "My family",
        "Opportunities that help me grow",
        "Everyday routine",
        "Having good source of entertainment"
    ]},
];

const getThemeIcon = (isDark) => {
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    if (moonIcon && sunIcon) {
        moonIcon.style.display = isDark ? 'inline-block' : 'none';
        sunIcon.style.display = isDark ? 'none' : 'inline-block';
    }
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
        return `<ul class="list-ruled mt-0 text-base" style="color: var(--primary-text);">${content.map(item => `<li class="flex items-start ruled-list-item">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
    }
    return content;
};

const updatePageElements = (index) => {
    const page = journalContent[index];
    if (!page) return;

    const pageElement = document.getElementById('journal-page');
    pageElement.querySelector('.pageTitle').innerHTML = page.title;
    pageElement.querySelector('.pageCategory').innerHTML = page.category;
    pageElement.querySelector('.pageContent').innerHTML = formatContent(page.content);
    pageElement.querySelector('.pageNumber').innerHTML = `Page ${index + 1} / ${journalContent.length}`;
}

const renderPage = (index) => {
    const pageElement = document.getElementById('journal-page');
    
    if (pageElement) {
      
        pageElement.classList.add('fade-out');

    
        setTimeout(() => {
            updatePageElements(index);
            pageElement.classList.remove('fade-out');
            
         
            pageElement.classList.add('fade-in');
            
          
            setTimeout(() => {
                pageElement.classList.remove('fade-in');
            }, 500);
        }, 300);
    }
    
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === journalContent.length - 1;
};

const navigate = (direction) => {
    const newIndex = currentPageIndex + direction;

    if (newIndex >= 0 && newIndex < journalContent.length) {
        currentPageIndex = newIndex;
        renderPage(currentPageIndex);
    }
};

window.onload = () => {
    initializeTheme();
    updatePageElements(currentPageIndex);

    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigate(
