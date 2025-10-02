let currentPageIndex = 0;
const ANIMATION_DURATION_MS = 300;
let totalRotation = 0;
const FLIP_DURATION_MS = 600;

const journalContent = [
    { id: 'cover', title: "Journal Entry Log", category: "Task #1: Loving Yourself", content: `
        <div class="space-y-4 pt-4 text-center">
            <h2 class="text-4xl font-extrabold tracking-tight" style="color: var(--text-ink);">The Self-Reflection Journal</h2>
            <p class="max-w-sm mx-auto" style="color: #666;">Document your inner monologue, review life chapters, and define your character.</p>
            <div class="text-sm pt-4 font-medium tracking-wider" style="color: #888;">
                STATUS: ENTRY 1 INITIATED
    { id: 'cover', title: "Welcome, User", category: "Your Personal Dashboard", content: `
        <div class="space-y-4 pt-12 text-center">
            <h2 class="text-4xl font-extrabold tracking-tight text-white">The Reflection Catalog</h2>
            <p class="text-gray-400 max-w-sm mx-auto">Track your emotional series, personal documentaries, and key episode reviews.</p>
            <div class="text-sm pt-8 text-cyan-400 font-medium tracking-wider">
                STATUS: EPISODE 1 IN PROGRESS
           </div>
       </div>
   ` },
    { id: 'describe', title: "a. Describe yourself", category: "Character Profile", content: `
        <p class="text-base leading-relaxed ruled-paragraph" style="color: var(--text-ink);">I am Cyrus Dominic Manalili, born on March 9, 2006, and I would describe myself as an energetic person especially when it comes to parties or spending time with people. I enjoy being with others rather than being alone since I believe that shared moments are more fun and meaningful. I usually try not to overthink unless it is really necessary although I admit that I sometimes get caught up in distractions or unimportant activities. Even with that habit I still manage to balance my school responsibilities with my tendency to spend time on lighter things which shows that I can handle both while still keeping a sense of fun.
        I enjoy lighthearted situations more than tense or overly serious ones. When conversations become too heavy I often try to shift them into something more playful or funny not because I avoid seriousness but because I naturally prefer to keep things easy. For me life feels better when there is laughter and connection which is why I do my best to bring positive energy wherever I go</p>
    { id: 'describe', title: "Episode A. Describe Myself (Official)", category: "Character Profile", content: `
        <p class="text-sm italic mb-4 text-gray-500">Your official character description:</p>
        <p>I’m someone who is curious, creative, and always looking for ways to improve. I enjoy learning new things, even when it’s challenging. Sometimes I overthink, but it just shows I care deeply about what I do.</p>
       ` },
    { id: 'quote', title: "c. My favorite quote(s):", category: "Inspiration", content: `
        <p class="text-base leading-relaxed ruled-paragraph" style="color: var(--text-ink);">My favorite quote is “Life is better when you are laughing.” I like this quote because it feels simple but true. For me laughter makes almost anything lighter whether it is a serious situation a small problem or just an ordinary day. I am the type of person who enjoys keeping things fun and easy so this quote reminds me that even when life gets stressful there is always room to smile or joke around. It also reflects how I like to be around people because laughter is something best shared. Moments feel more alive when there is joy in them and I believe that even the hardest days can become easier if you find a reason to laugh.</p>
    { id: 'describe_gang', title: "Episode A. Describe Myself (Inner Voice)", category: "Raw Footage", content: `
        <p class="text-sm italic mb-4 text-gray-500">The director's cut narration:</p>
        <p class="text-base leading-relaxed tracking-wide">They’re the type of person who’s always tryna level up. They get curious about a ton of stuff and stay learning new knowledge especially when it switches up how they think. They can definitely get creative like flipping small random ideas into something that hits deep. But real talk coming up with brand new ideas is tough for them. They also tend to overthink everything and doubt if their ideas even got the juice. Still that just proves they care about the work and the outcome they’re chasing. They mess with writing solving problems and creating stuff so you could call them a hands on type of person no doubt. They’re patient most of the time but when they get stuck they’ll get tight. Even then they usually push past it because they’re stubborn and they hate to fold. They really respect people who are genuine and honest and they keep that same energy. They know they ain’t flawless. They procrastinate and sometimes lose confidence in their own voice and they can be way too hard on themselves. But they’re learning to accept those flaws while still being grateful for who they already am.</p>
       ` },
    { id: 'likes', title: "d. Things I like about myself", category: "Power-Ups", content: [
        "I am energetic and outgoing",
        "I enjoy being around people more than being alone",
        "I can make others laugh and lighten the mood",
        "I balance responsibilities with having fun",
        "I try not to overthink unless it is needed",
        "I do not dwell too much on problems",
        "I prefer to keep things positive and easygoing",
        "I bring good energy when I am with others"
    { id: 'quotes', title: "Episode B. Favorite Dialogue", category: "Inspiration", content: [
        "“Growth is growth, no matter how small.”",
        "“The only person you should try to be better than is the person you were yesterday.”"
]},
    { id: 'dislikes', title: "e. Things I don’t like about myself", category: "Bugs & Features", content: [
        "I get distracted easily",
        "I sometimes spend too much time on unimportant things",
        "I struggle to stay serious in conversations",
        "I avoid heavy or tense situations",
        "I procrastinate when I should focus",
        "I overthink at times even when I try not to",
        "I find it hard to handle serious topics without turning them into jokes"
    { id: 'likes', title: "Episode C. Core Strengths", category: "Power-Ups", content: [
        "I’m creative and resourceful.",
        "I have a good sense of humor.",
        "I care for the people close to me.",
        "I can adapt to different situations.",
        "I don’t easily give up when things get hard."
]},
    { id: 'talents', title: "f. Special talents", category: "Skill Tree", content: [
        "Playing some basics in piano, i guess",
        "Lowkey multitask"
    { id: 'dislikes', title: "Episode D. Vulnerability Patches", category: "Bugs & Features", content: [
        "I sometimes procrastinate.",
        "I get insecure about how I express myself.",
        "I can be too hard on myself."
]},
    { id: 'poem', title: "g. Poem (in 3rd person)", category: "Monologue", content: `
        <p class="whitespace-pre-line leading-relaxed text-center italic mt-4 ruled-paragraph" style="color: var(--text-ink);">
            Cards on the table, the night’s just begun,
            Chips start to stack while others are done, 
            Luck on my side, I play it for fun,
            In house gambling, I alone am the honored one.
    { id: 'talents', title: "Episode E. Special Talents", category: "Skill Tree", content: [
        "Writing and expressing ideas.",
        "Problem-solving in unique ways.",
        "Creativity in both practical and artistic things."
    ]},
    { id: 'poem', title: "Episode F. Self-Reflection Poem", category: "Monologue", content: `
        <p class="whitespace-pre-line leading-relaxed text-center italic mt-4 text-gray-300">
            He walked through days of questions and doubts,
            Carrying dreams that whispered loud.
            Behind the struggles, a fire still burned,
            A reminder of lessons he’s slowly learned.
            Though shadows came, light never left,
            He kept moving forward, step by step.
       </p>
       ` },
    { id: 'conscious', title: "h. Things I’m self-conscious about", category: "Known Flaws", content: [
    { id: 'conscious', title: "Episode G. Conscious Weaknesses", category: "Known Flaws", content: [
"How I sound when I speak.",
"Making mistakes in front of others.",
"Not always being confident enough."
]},
    { id: 'respect', title: "i. I WOULD LOVE AND RESPECT MYSELF MORE IF…", category: "Commitment", content: `
        <p class="text-base font-semibold italic mt-4 ruled-paragraph" style="color: var(--text-ink);">
            - If I stop trying to force my ideals on others and instead learn to listen and respect their own perspectives, I would love myself more because I know I am growing into someone who values understanding over control.
    { id: 'respect', title: "Episode H. If I Upgraded My Character...", category: "Commitment", content: `
        <p class="text-sm font-semibold italic mt-4 text-cyan-400">
            …I trusted myself more and stopped comparing myself to others.
       </p>
       ` },
    { id: 'forgiveness', title: "j. Forgiveness", category: "Healing Dialogue", content: `
        <p class="text-base font-semibold italic mt-4 ruled-paragraph" style="color: var(--text-ink);">
            I would forgive if someone’s pride is set in the right place, because it shows that their actions come from honesty and not from arrogance, and that makes it easier for me to understand and let go.
        </p>
    { id: 'forgiveness', title: "Episode I. Healing Dialogue", category: "Post-Production", content: `
        <ul class="space-y-4 text-sm text-gray-300">
            <li><span class="font-semibold text-white">Target for Forgiveness:</span> myself, for being too harsh sometimes.</li>
            <li><span class="font-semibold text-white">Who should forgive me:</span> people I may have unintentionally hurt.</li>
            <li><span class="font-semibold text-white">Self-Forgiveness Subject:</span> not always believing in my own worth.</li>
        </ul>
       ` },
    { id: 'feelings', title: "k. Feelings that are hard to accept", category: "Emotional Check", content: [
        "Regret over past decisions",
        "Failure after trying hard",
        "Disappointment in myself"
    { id: 'feelings', title: "Episode J. Hard-to-Accept Feelings", category: "Emotional Check", content: [
        "Feeling insecure.",
        "Feeling lonely.",
        "Feeling like I’m not enough."
]},
    { id: 'difficult', title: "l. Things that are difficult for me", category: "Runtime Complications", content: [
        "Balancing fun and responsibilities",
        "Admitting when I am wrong"
    { id: 'difficult', title: "Episode K. Runtime Complications", category: "Growth Areas", content: [
        "Speaking confidently in public.",
        "Managing pressure and overthinking.",
        "Showing my real feelings sometimes."
]},
    { id: 'grateful', title: "m. Things I’m grateful for", category: "Acknowledgements", content: [
        "God for giving all of us good health",
        "My family",
        "Opportunities that help me grow",
        "Everyday routine",
        "Having good source of entertainment"
    { id: 'grateful', title: "Episode L. Grateful Credits", category: "Acknowledgements", content: [
        "My family.",
        "My friends.",
        "The opportunities I get to learn and grow.",
        "My resilience when things gets tough.",
        "The small joys in life, like music, games, and laughter."
]},
];


const formatContent = (content) => {
if (Array.isArray(content)) {
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 dot-icon flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" cy="12" r="12"/></svg>`;
        return `<ul class="list-ruled mt-4 text-base" style="color: var(--text-ink);">${content.map(item => `<li class="flex items-start ruled-list-item">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>`;
        return `<ul class="space-y-3 mt-4 text-gray-300 text-base">${content.map(item => `<li class="flex items-start">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
}
return content;
};
@@ -96,16 +102,21 @@ const renderContentToFace = (index, faceElement) => {

faceElement.querySelector('.pageTitle').innerHTML = page.title;
faceElement.querySelector('.pageCategory').innerHTML = page.category;
    faceElement.querySelector('.pageNumber').innerHTML = `Page ${index + 1} / ${journalContent.length}`;
    
faceElement.querySelector('.pageContent').innerHTML = formatContent(page.content);
    faceElement.querySelector('.pageNumber').innerHTML = `Category ${index + 1} / ${journalContent.length}`;
};

const renderPage = (index) => {
    const pageElement = document.getElementById('journal-page');
    const flipContainer = document.getElementById('page-flip-container');

    if (pageElement) {
        renderContentToFace(index, pageElement);
    const isBackFaceActive = (Math.abs(totalRotation / 180) % 2) !== 0;

    const activeFace = isBackFaceActive 
        ? document.getElementById('back-face') 
        : document.getElementById('front-face');

    if (activeFace) {
        renderContentToFace(index, activeFace);
}

document.getElementById('prevBtn').disabled = index === 0;
@@ -116,28 +127,29 @@ const navigate = (direction) => {
const newIndex = currentPageIndex + direction;

if (newIndex >= 0 && newIndex < journalContent.length) {
        const flipContainer = document.getElementById('page-flip-container');
        const frontFace = document.getElementById('front-face');
        const backFace = document.getElementById('back-face');

        const willBeRotated = totalRotation + (direction * 180);
        const isBackFaceWillBeVisible = (Math.abs(willBeRotated / 180) % 2) !== 0;
        const nextFace = isBackFaceWillBeVisible ? backFace : frontFace;

        const pageContentElement = document.querySelector('#journal-page .pageContent');
        renderContentToFace(newIndex, nextFace);

        pageContentElement.classList.add('fade-out');
        if (direction > 0) {
            totalRotation -= 180;
        } else {
            totalRotation += 180;
        }
        
        flipContainer.style.transform = `rotateY(${totalRotation}deg)`;

setTimeout(() => {
currentPageIndex = newIndex;

            const pageElement = document.getElementById('journal-page');
            const page = journalContent[currentPageIndex];
            pageElement.querySelector('.pageTitle').innerHTML = page.title;
            pageElement.querySelector('.pageCategory').innerHTML = page.category;
            pageElement.querySelector('.pageNumber').innerHTML = `Page ${currentPageIndex + 1} / ${journalContent.length}`;

            pageContentElement.innerHTML = formatContent(page.content);
            
            pageContentElement.classList.remove('fade-out');

            document.getElementById('prevBtn').disabled = currentPageIndex === 0;
            document.getElementById('nextBtn').disabled = currentPageIndex === journalContent.length - 1;
            
        }, ANIMATION_DURATION_MS);
            renderPage(currentPageIndex); 
        }, FLIP_DURATION_MS);
}
};
