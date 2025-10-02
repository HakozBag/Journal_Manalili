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
    { id: 'describe', title: "a. Describe Yourself (Official)", category: "Character Profile", content: `
        <p class="text-sm italic mb-4" style="color: var(--secondary-text);">My official character description:</p>
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--primary-text);">I’m someone who is curious, creative, and always looking for ways to improve. I enjoy learning new things, even when it’s challenging. Sometimes I overthink, but it just shows I care deeply about what I do.</p>
        ` },
    { id: 'describe_gang', title: "a. Describe Myself (Inner Voice)", category: "Raw Footage", content: `
        <p class="text-sm italic mb-4" style="color: var(--secondary-text);">The director's cut narration:</p>
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--primary-text);">They’re the type of person who’s always tryna level up. They get curious about a ton of stuff and stay learning new knowledge especially when it switches up how they think. They can definitely get creative like flipping small random ideas into something that hits deep. But real talk coming up with brand new ideas is tough for them. They also tend to overthink everything and doubt if their ideas even got the juice. Still that just proves they care about the work and the outcome they’re chasing. They mess with writing solving problems and creating stuff so you could call them a hands on type of person no doubt. They’re patient most of the time but when they get stuck they’ll get tight. Even then they usually push past it because they’re stubborn and they hate to fold. They really respect people who are genuine and honest and they keep that same energy. They know they ain’t flawless. They procrastinate and sometimes lose confidence in their own voice and they can be way too hard on themselves. But they’re learning to accept those flaws while still being grateful for who they already am.</p>
        ` },
    { id: 'quotes', title: "b. Favorite Dialogue", category: "Inspiration", content: [
        "“Growth is growth, no matter how small.”",
        "“The only person you should try to be better than is the person you were yesterday.”"
    ]},
    { id: 'likes', title: "c. Core Strengths", category: "Power-Ups", content: [
        "I’m creative and resourceful.",
        "I have a good sense of humor.",
        "I care for the people close to me.",
        "I can adapt to different situations.",
        "I don’t easily give up when things get hard."
    ]},
    { id: 'dislikes', title: "d. Vulnerability Patches", category: "Bugs & Features", content: [
        "I sometimes procrastinate.",
        "I get insecure about how I express myself.",
        "I can be too hard on myself."
    ]},
    { id: 'talents', title: "e. Special Talents", category: "Skill Tree", content: [
        "Writing and expressing ideas.",
        "Problem-solving in unique ways.",
        "Creativity in both practical and artistic things."
    ]},
    { id: 'poem', title: "f. Self-Reflection Poem", category: "Monologue", content: `
        <p class="whitespace-pre-line leading-relaxed text-center italic mt-4" style="color: var(--primary-text);">
            He walked through days of questions and doubts,
            Carrying dreams that whispered loud.
            Behind the struggles, a fire still burned,
            A reminder of lessons he’s slowly learned.
            Though shadows came, light never left,
            He kept moving forward, step by step.
        </p>
        ` },
    { id: 'conscious', title: "g. Conscious Weaknesses", category: "Known Flaws", content: [
        "How I sound when I speak.",
        "Making mistakes in front of others.",
        "Not always being confident enough."
    ]},
    { id: 'respect', title: "h. If I Upgraded My Character...", category: "Commitment", content: `
        <p class="text-sm font-semibold italic mt-4" style="color: var(--primary-text);">
            …I trusted myself more and stopped comparing myself to others.
        </p>
        ` },
    { id: 'forgiveness', title: "i. Healing Dialogue", category: "Post-Production", content: `
        <ul class="list-ruled mt-0 text-sm" style="color: var(--primary-text);">
            <li class="ruled-list-item"><span class="font-semibold" style="color: var(--primary-text);">Target for Forgiveness:</span> myself, for being too harsh sometimes.</li>
            <li class="ruled-list-item"><span class="font-semibold" style="color: var(--primary-text);">Who should forgive me:</span> people I may have unintentionally hurt.</li>
            <li class="ruled-list-item"><span class="font-semibold" style="color: var(--primary-text);">Self-Forgiveness Subject:</span> not always believing in my own worth.</li>
        </ul>
        ` },
    { id: 'feelings', title: "j. Hard-to-Accept Feelings", category: "Emotional Check", content: [
        "Feeling insecure.",
        "Feeling lonely.",
        "Feeling like I’m not enough."
    ]},
    { id: 'difficult', title: "k. Runtime Complications", category: "Growth Areas", content: [
        "Speaking confidently in public.",
        "Managing pressure and overthinking.",
        "Showing my real feelings sometimes."
    ]},
    { id: 'grateful', title: "l. Grateful Credits", category: "Acknowledgements", content: [
        "My family.",
        "My friends.",
        "LThe opportunities I get to learn and grow.",
        "My resilience when things gets tough.",
        "The small joys in life, like music, games, and laughter."
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
    const contentArea = pageElement.querySelector('.pageContent');
    
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
    document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
};
