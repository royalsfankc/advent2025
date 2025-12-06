// Main JavaScript file for Advent of Code 2025

const MAX_DAYS = 25;

/**
 * Checks if a day has a solution file available
 * @param {number} day - The day number
 * @returns {Promise<boolean>} True if solution exists
 */
export async function checkDaySolutionExists(day) {
    try {
        await import(`../day${day}/solution.js`);
        return true;
    } catch {
        return false;
    }
}

/**
 * Formats the solution result into HTML
 * @param {Object} result - The solution result object
 * @returns {string} HTML string to display
 */
export function formatSolutionResult(result) {
    if (!result) {
        return '<p>No solution available yet.</p>';
    }

    let html = '';
    
    if (result.part1 !== undefined) {
        html += `<p><strong>Part 1:</strong> ${result.part1}</p>`;
    }
    
    if (result.part2 !== undefined) {
        html += `<p><strong>Part 2:</strong> ${result.part2}</p>`;
    }
    
    if (result.error) {
        html += `<p class="error">Error: ${result.error}</p>`;
    }
    
    return html || '<p>No solution available yet.</p>';
}

/**
 * Formats an error message into HTML
 * @param {number} day - The day number
 * @param {Error} error - The error object
 * @returns {string} HTML string for the error
 */
export function formatErrorMessage(day, error) {
    return `<p class="error">Error loading day ${day}: ${error.message}</p>`;
}

/**
 * Loads and executes a day's solution
 * @param {number} day - The day number
 * @returns {Promise<Object>} The solution result
 */
export async function loadDaySolution(day) {
    try {
        const dayModule = await import(`../day${day}/solution.js`);
        return await dayModule.solve();
    } catch (error) {
        throw new Error(`Failed to load day ${day}: ${error.message}`);
    }
}

/**
 * Scrolls to the answer container smoothly
 */
function scrollToAnswer() {
    const answerContainer = document.getElementById('answerContainer');
    if (answerContainer) {
        answerContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

/**
 * Generates day buttons and adds them to the DOM
 * @param {HTMLElement} container - The container element to add buttons to
 * @param {Function} onClickHandler - Function to call when a button is clicked
 */
export async function generateDayButtons(container, onClickHandler) {
    for (let day = 1; day <= MAX_DAYS; day++) {
        const button = document.createElement('button');
        button.className = 'day-button';
        button.textContent = `Day ${day}`;
        
        // Check if solution exists
        const hasSolution = await checkDaySolutionExists(day);
        if (!hasSolution) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.addEventListener('click', () => onClickHandler(day));
        }
        
        container.appendChild(button);
    }
}

/**
 * Shows the answer for a specific day
 * @param {number} day - The day number
 */
async function showAnswer(day) {
    const answerContainer = document.getElementById('answerContainer');
    const answerTitle = document.getElementById('answerTitle');
    const answerContent = document.getElementById('answerContent');
    
    // Show container
    answerContainer.style.display = 'block';
    answerTitle.textContent = `Day ${day} Answers`;
    answerContent.innerHTML = '<span class="loading">Loading...</span>';
    
    // Scroll to answer container (especially useful on mobile)
    scrollToAnswer();
    
    try {
        const result = await loadDaySolution(day);
        answerContent.innerHTML = formatSolutionResult(result);
    } catch (error) {
        answerContent.innerHTML = formatErrorMessage(day, error);
        console.error(`Error loading day ${day}:`, error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const daysGrid = document.getElementById('daysGrid');
    generateDayButtons(daysGrid, showAnswer);
});
