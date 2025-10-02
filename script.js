let currentPageIndex = 0;
        
const ANIMATION_DURATION_MS = 600; // Matches the CSS transition duration

const journalContent = [
{ id: 'cover', title: "Journal Entry Log", category: "Task #1: Loving Yourself", content: `
       <div class="space-y-4 pt-4 text-center">
@@ -83,7 +84,7 @@ const journalContent = [

const formatContent = (content) => {
if (Array.isArray(content)) {
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 dot-icon flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>`;
        const dotIcon = `<svg class="w-2.5 h-2.5 mr-3 mt-1 dot-icon flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" cy="12" r="12"/></svg>`;
return `<ul class="list-ruled mt-4 text-base" style="color: var(--text-ink);">${content.map(item => `<li class="flex items-start ruled-list-item">${dotIcon}<span>${item}</span></li>`).join('')}</ul>`;
}
return content;
@@ -114,8 +115,30 @@ const navigate = (direction) => {
const newIndex = currentPageIndex + direction;

if (newIndex >= 0 && newIndex < journalContent.length) {
        currentPageIndex = newIndex;
        renderPage(currentPageIndex);
        
        const pageElement = document.getElementById('journal-page');

        // NEW: Handle animation start based on direction
        if (direction > 0) {
            // Forward: Folding animation (rotateY(-180deg))
            pageElement.classList.add('folding');
        } else {
            // Backward: Reverse folding (rotateY(180deg) for the container, then snap back)
            // We apply folding-back to the page for a smooth transition back to 0
            pageElement.classList.add('folding-back');
        }

        // Wait for the animation to complete
        setTimeout(() => {
            currentPageIndex = newIndex;
            renderPage(currentPageIndex);
            
            // NEW: Reset classes after content update
            pageElement.classList.remove('folding', 'folding-back');
            
            // To ensure the effect is visible when going backward, we might need a small delay here
            // but for a simple single-page fold, resetting immediately works.
        }, ANIMATION_DURATION_MS);
}
};
