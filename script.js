let currentPageIndex = 0;

// --- Journal Content Data (Updated with your information) ---
const journalContent = [
    { id: 'cover', title: "Journal Entry Log", category: "Task #1: Loving Yourself", content: `
        <div class="space-y-4 pt-4 text-center">
            <h2 class="text-4xl font-extrabold tracking-tight" style="color: var(--text-ink);">The Self-Reflection Journal</h2>
            <p class="max-w-sm mx-auto" style="color: #666;">Document your inner monologue, review life chapters, and define your character. (Author: Cyrus Dominic Manalili, Born: March 9, 2006)</p>
            <div class="text-sm pt-4 font-medium tracking-wider" style="color: #888;">
                STATUS: ENTRY 1 INITIATED
            </div>
        </div>
    ` },
    { id: 'describe', title: "a. Describe Yourself", category: "Character Profile", content: `
        <p class="text-sm italic mb-4" style="color: #666;">My nature and energy:</p>
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--text-ink);">I am an **energetic person** especially when it comes to parties or spending time with people. I enjoy being with others rather than being alone since I believe that shared moments are more fun and meaningful. I usually try not to overthink unless it is really necessary. I manage to balance my school responsibilities with my tendency to spend time on lighter things, keeping a sense of fun. I enjoy lighthearted situations more than tense or overly serious ones, and prefer to keep conversations **easygoing** and funny.</p>
        ` },
    { id: 'quote', title: "c. My Favorite Quote", category: "Inspiration", content: `
        <p class="text-sm italic mb-4" style="color: #666;">My simple truth:</p>
        <p class="text-2xl leading-relaxed tracking-wide text-center pt-8" style="color: var(--text-ink); font-style: italic;">“Life is better when you are laughing.”</p>
        <p class="text-sm leading-relaxed tracking-wide mt-8" style="color: #666;">Laughter makes almost anything lighter, whether it's a serious situation, a small problem, or just an ordinary day. I am the type of person who enjoys keeping things fun and easy, and I believe even the hardest days can become easier if you find a reason to laugh.</p>
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
        <p class="whitespace-pre-line leading-relaxed text-center italic mt-4" style="color: var(--text-ink);">
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
        <p class="text-sm italic mt-4" style="color: #666;">My goal for growth:</p>
        <p class="text-base font-semibold leading-relaxed" style="color: var(--text-ink);">
            If I stop trying to force my ideals on others and instead learn to **listen and respect their own perspectives**, I would love myself more because I know I am growing into someone who values understanding over control.
        </p>
        ` },
    { id: 'forgiveness', title: "j. Forgiveness Dialogue", category: "Post-Production", content: `
        <p class="text-sm italic mt-4" style="color: #666;">My condition for forgiveness:</p>
        <p class="text-base leading-relaxed" style="color: var(--text-ink);">I would forgive if someone’s **pride is set in the right place**, because it shows that their actions come from **honesty** and not from arrogance, and that makes it easier for me to understand and let go.</p>
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

// --- Utility Functions ---
const formatContent = (content) => {
    if (Array.isArray(content)) {
        // The dot-icon uses the custom CSS style set in style.css
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 dot-icon flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>`;
        return `<ul class="list-ruled mt-0 text-base" style="color: var(--text-ink);">${content.map(item => `<li class="flex items-start ruled-list-item">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
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
    
    if (pageElement) {
        renderContentToFace(index, pageElement);
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

// --- Initialization ---
window.onload = () => {
    renderPage(currentPageIndex);

    document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
};
