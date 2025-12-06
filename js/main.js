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
 * Formats input snippet with expand/collapse functionality
 * @param {string} input - The full input
 * @returns {string} HTML string for input display
 */
function formatInputSnippet(input) {
    if (!input || input.trim().length === 0) {
        return '';
    }
    
    const lines = input.trim().split('\n');
    const snippetLength = 3;
    const hasMore = lines.length > snippetLength;
    
    let html = '<div class="input-section">';
    html += '<h3>📄 Input</h3>';
    html += '<div class="input-snippet">';
    
    // Show first few lines
    for (let i = 0; i < Math.min(snippetLength, lines.length); i++) {
        html += `<div class="input-line">${escapeHtml(lines[i])}</div>`;
    }
    
    if (hasMore) {
        html += `<div class="input-more" style="display: none;">`;
        for (let i = snippetLength; i < lines.length; i++) {
            html += `<div class="input-line">${escapeHtml(lines[i])}</div>`;
        }
        html += `</div>`;
        html += `<button class="toggle-input" onclick="this.previousElementSibling.style.display = this.previousElementSibling.style.display === 'none' ? 'block' : 'none'; this.textContent = this.previousElementSibling.style.display === 'none' ? 'Show all input' : 'Hide input';">Show all input</button>`;
    }
    
    html += '</div></div>';
    return html;
}

/**
 * Escapes HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Formats function explanations
 * @param {Object} functions - Object with function names and descriptions
 * @returns {string} HTML string for function explanations
 */
function formatFunctionExplanations(functions) {
    if (!functions || Object.keys(functions).length === 0) {
        return '';
    }
    
    let html = '<div class="functions-section">';
    html += '<h3>🔧 Solution Functions</h3>';
    html += '<div class="functions-list">';
    
    for (const [funcName, description] of Object.entries(functions)) {
        html += `<div class="function-item">`;
        html += `<code class="function-name">${funcName}()</code>`;
        html += `<p class="function-desc">${escapeHtml(description)}</p>`;
        html += `</div>`;
    }
    
    html += '</div></div>';
    return html;
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
    
    // Puzzle info section
    if (result.puzzleInfo) {
        html += '<div class="puzzle-info-section">';
        html += `<h3>🎯 ${escapeHtml(result.puzzleInfo.title)}</h3>`;
        html += `<p class="puzzle-description">${escapeHtml(result.puzzleInfo.description)}</p>`;
        
        if (result.puzzleInfo.part1Description) {
            html += `<div class="part-explanation">`;
            html += `<strong>Part 1:</strong> ${escapeHtml(result.puzzleInfo.part1Description)}`;
            html += `</div>`;
        }
        
        if (result.puzzleInfo.part2Description) {
            html += `<div class="part-explanation">`;
            html += `<strong>Part 2:</strong> ${escapeHtml(result.puzzleInfo.part2Description)}`;
            html += `</div>`;
        }
        
        if (result.puzzleInfo.approach) {
            html += '<div class="approach-section">';
            html += '<h4>💡 Approach</h4>';
            if (result.puzzleInfo.approach.part1) {
                html += `<p><strong>Part 1:</strong> ${escapeHtml(result.puzzleInfo.approach.part1)}</p>`;
            }
            if (result.puzzleInfo.approach.part2) {
                html += `<p><strong>Part 2:</strong> ${escapeHtml(result.puzzleInfo.approach.part2)}</p>`;
            }
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    // Answers section
    html += '<div class="answers-section">';
    html += '<h3>✅ Answers</h3>';
    
    if (result.part1 !== undefined) {
        html += `<p><strong>Part 1:</strong> <span class="answer-value">${result.part1}</span></p>`;
    }
    
    if (result.part2 !== undefined) {
        html += `<p><strong>Part 2:</strong> <span class="answer-value">${result.part2}</span></p>`;
    }
    
    if (result.error) {
        html += `<p class="error">Error: ${result.error}</p>`;
    }
    
    html += '</div>';
    
    // Input section
    if (result.input) {
        html += formatInputSnippet(result.input);
    }
    
    // Functions section
    if (result.puzzleInfo && result.puzzleInfo.functions) {
        html += formatFunctionExplanations(result.puzzleInfo.functions);
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
