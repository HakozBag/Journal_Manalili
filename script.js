let currentPageIndex = 0;
let totalRotation = 0;
const FLIP_DURATION_MS = 600;

const journalContent = [
    { id: 'cover', title: "Welcome, User", category: "Your Personal Dashboard", content: `
        <div class="space-y-4 pt-12 text-center">
            <h2 class="text-4xl font-extrabold tracking-tight text-white">The Reflection Catalog</h2>
            <p class="text-gray-400 max-w-sm mx-auto">Track your emotional series, personal documentaries, and key episode reviews.</p>
            <div class="text-sm pt-8 text-cyan-400 font-medium tracking-wider">
                STATUS: EPISODE 1 IN PROGRESS
            </div>
        </div>
    ` },
    { id: 'describe', title: "Episode A. Describe Myself (Official)", category: "Character Profile", content: `
        <p class="text-sm italic mb-4 text-gray-500">Your official character description:</p>
        <p>I’m someone who is curious, creative, and always looking for ways to improve. I enjoy learning new things, even when it’s challenging. Sometimes I overthink, but it just shows I care deeply about what I do.</p>
        ` },
    { id: 'describe_gang', title: "Episode A. Describe Myself (Inner Voice)", category: "Raw Footage", content: `
        <p class="text-sm italic mb-4 text-gray-500">The director's cut narration:</p>
        <p class="text-base leading-relaxed tracking-wide">They’re the type of person who’s always tryna level up. They get curious about a ton of stuff and stay learning new knowledge especially when it switches up how they think. They can definitely get creative like flipping small random ideas into something that hits deep. But real talk coming up with brand new ideas is tough for them. They also tend to overthink everything and doubt if their ideas even got the juice. Still that just proves they care about the work and the outcome they’re chasing. They mess with writing solving problems and creating stuff so you could call them a hands on type of person no doubt. They’re patient most of the time but when they get stuck they’ll get tight. Even then they usually push past it because they’re stubborn and they hate to fold. They really respect people who are genuine and honest and they keep that same energy. They know they ain’t flawless. They procrastinate and sometimes lose confidence in their own voice and they can be way too hard on themselves. But they’re learning to accept those flaws while still being grateful for who they already am.</p>
        ` },
    { id: 'quotes', title: "Episode B. Favorite Dialogue", category: "Inspiration", content: [
        "“Growth is growth, no matter how small.”",
        "“The only person you should try to be better than is the person you were yesterday.”"
    ]},
    { id: 'likes', title: "Episode C. Core Strengths", category: "Power-Ups", content: [
        "I’m creative and resourceful.",
        "I have a good sense of humor.",
        "I care for the people close to me.",
        "I can adapt to different situations.",
        "I don’t easily give up when things get hard."
    ]},
    { id: 'dislikes', title: "Episode D. Vulnerability Patches", category: "Bugs & Features", content: [
        "I sometimes procrastinate.",
        "I get insecure about how I express myself.",
        "I can be too hard on myself."
    ]},
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
    { id: 'conscious', title: "Episode G. Conscious Weaknesses", category: "Known Flaws", content: [
        "How I sound when I speak.",
        "Making mistakes in front of others.",
        "Not always being confident enough."
    ]},
    { id: 'respect', title: "Episode H. If I Upgraded My Character...", category: "Commitment", content: `
        <p class="text-sm font-semibold italic mt-4 text-cyan-400">
            …I trusted myself more and stopped comparing myself to others.
        </p>
        ` },
    { id: 'forgiveness', title: "Episode I. Healing Dialogue", category: "Post-Production", content: `
        <ul class="space-y-4 text-sm text-gray-300">
            <li><span class="font-semibold text-white">Target for Forgiveness:</span> myself, for being too harsh sometimes.</li>
            <li><span class="font-semibold text-white">Who should forgive me:</span> people I may have unintentionally hurt.</li>
            <li><span class="font-semibold text-white">Self-Forgiveness Subject:</span> not always believing in my own worth.</li>
        </ul>
        ` },
    { id: 'feelings', title: "Episode J. Hard-to-Accept Feelings", category: "Emotional Check", content: [
        "Feeling insecure.",
        "Feeling lonely.",
        "Feeling like I’m not enough."
    ]},
    { id: 'difficult', title: "Episode K. Runtime Complications", category: "Growth Areas", content: [
        "Speaking confidently in public.",
        "Managing pressure and overthinking.",
        "Showing my real feelings sometimes."
    ]},
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
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>`;
        return `<ul class="space-y-3 mt-4 text-gray-300 text-base">${content.map(item => `<li class="flex items-start">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
    }
    return content;
};

const renderContentToFace = (index, faceElement) => {
    const page = journalContent[index];
    if (!page) return;

    faceElement.querySelector('.pageTitle').innerHTML = page.title;
    faceElement.querySelector('.pageCategory').innerHTML = page.category;
    faceElement.querySelector('.pageContent').innerHTML = formatContent(page.content);
    faceElement.querySelector('.pageNumber').innerHTML = `Category ${index + 1} / ${journalContent.length}`;
};

const renderPage = (index) => {
    const flipContainer = document.getElementById('page-flip-container');
    
    const isBackFaceActive = (Math.abs(totalRotation / 180) % 2) !== 0;

    const activeFace = isBackFaceActive 
        ? document.getElementById('back-face') 
        : document.getElementById('front-face');

    if (activeFace) {
        renderContentToFace(index, activeFace);
    }
    
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === journalContent.length - 1;
};

const navigate = (direction) => {
    const newIndex = currentPageIndex + direction;

    if (newIndex >= 0 && newIndex < journalContent.length) {
        const flipContainer = document.getElementById('page-flip-container');
        const frontFace = document.getElementById('front-face');
        const backFace = document.getElementById('back-face');

        const willBeRotated = totalRotation + (direction * 180);
        const isBackFaceWillBeVisible = (Math.abs(willBeRotated / 180) % 2) !== 0;
        const nextFace = isBackFaceWillBeVisible ? backFace : frontFace;
        
        renderContentToFace(newIndex, nextFace);

        if (direction > 0) {
            totalRotation -= 180;
        } else {
            totalRotation += 180;
        }
        
        flipContainer.style.transform = `rotateY(${totalRotation}deg)`;

        setTimeout(() => {
            currentPageIndex = newIndex;
            
            renderPage(currentPageIndex); 
        }, FLIP_DURATION_MS);
    }
};


window.onload = () => {
    renderPage(currentPageIndex);

    document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
};
