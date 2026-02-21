import { fetchAlgorithms } from './api.js';

async function loadAlgorithms() {
    const grid = document.getElementById('algorithmGrid');
    try {
        const algorithms = await fetchAlgorithms();
        grid.innerHTML = algorithms.map(algo => `
            <div class="algorithm-card">
                <div class="difficulty-badge ${algo.difficulty}">${algo.difficulty}</div>
                <h3>${algo.name}</h3>
                <p class="description">${algo.description}</p>
                <div class="complexity-info">
                    <span>⏱️ ${algo.timeComplexity.average}</span>
                </div>
                <a href="visualizer.html?id=${algo._id}" class="btn-primary">
                    Visualize ✨
                </a>
            </div>
        `).join('');
    } catch (error) {
        grid.innerHTML = '<div class="error">Failed to load algorithms 💔</div>';
    }
}

loadAlgorithms();