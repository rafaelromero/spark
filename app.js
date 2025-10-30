// Git Repository Visualizer

// Define scenarios with their commit graphs
const scenarios = {
    'free-explore': {
        name: 'Free Explore',
        description: 'Basic Git workflow with multiple branches. Shows how commits form a graph structure with branches diverging and merging.',
        commits: [
            { id: 'c1', message: 'Initial commit', x: 200, y: 100, parents: [] },
            { id: 'c2', message: 'Add feature A', x: 200, y: 180, parents: ['c1'] },
            { id: 'c3', message: 'Add feature B', x: 200, y: 260, parents: ['c2'] },
            { id: 'c4', message: 'Start new feature', x: 350, y: 260, parents: ['c2'] },
            { id: 'c5', message: 'Continue feature', x: 350, y: 340, parents: ['c4'] },
            { id: 'c6', message: 'Merge feature branch', x: 200, y: 420, parents: ['c3', 'c5'] }
        ],
        branches: [
            { name: 'main', commitId: 'c6', type: 'local' },
            { name: 'feature', commitId: 'c5', type: 'local' }
        ]
    },
    
    'free-explore-remote': {
        name: 'Free Explore with Remote',
        description: 'Shows local and remote branches. Local branches track remote branches, illustrating the relationship between your local repository and the remote server.',
        commits: [
            { id: 'c1', message: 'Initial commit', x: 200, y: 100, parents: [] },
            { id: 'c2', message: 'Add README', x: 200, y: 180, parents: ['c1'] },
            { id: 'c3', message: 'Update docs', x: 200, y: 260, parents: ['c2'] },
            { id: 'c4', message: 'Local commit', x: 200, y: 340, parents: ['c3'] },
            { id: 'c5', message: 'Feature work', x: 400, y: 260, parents: ['c2'] },
            { id: 'c6', message: 'Feature complete', x: 400, y: 340, parents: ['c5'] }
        ],
        branches: [
            { name: 'main', commitId: 'c4', type: 'local' },
            { name: 'origin/main', commitId: 'c3', type: 'remote' },
            { name: 'feature', commitId: 'c6', type: 'local' },
            { name: 'origin/feature', commitId: 'c5', type: 'remote' }
        ]
    },
    
    'upstream-changes': {
        name: 'Upstream Changes',
        description: 'Demonstrates fetching and integrating changes from a remote repository. The remote branch has moved ahead, and local changes need to be merged with upstream.',
        commits: [
            { id: 'c1', message: 'Initial commit', x: 200, y: 100, parents: [] },
            { id: 'c2', message: 'Shared commit', x: 200, y: 180, parents: ['c1'] },
            { id: 'c3', message: 'Local work', x: 150, y: 260, parents: ['c2'] },
            { id: 'c4', message: 'More local work', x: 150, y: 340, parents: ['c3'] },
            { id: 'c5', message: 'Upstream change', x: 250, y: 260, parents: ['c2'] },
            { id: 'c6', message: 'Another upstream', x: 250, y: 340, parents: ['c5'] },
            { id: 'c7', message: 'Merge upstream', x: 200, y: 420, parents: ['c4', 'c6'] }
        ],
        branches: [
            { name: 'main', commitId: 'c7', type: 'local' },
            { name: 'origin/main', commitId: 'c6', type: 'remote' }
        ]
    },
    
    'rewritten-history': {
        name: 'Rewritten Remote History',
        description: 'Shows a force push scenario where remote history has been rewritten. The remote branch now points to a different commit, creating a divergent history.',
        commits: [
            { id: 'c1', message: 'Initial commit', x: 200, y: 100, parents: [] },
            { id: 'c2', message: 'Feature A', x: 200, y: 180, parents: ['c1'] },
            { id: 'c3', message: 'Feature B (old)', x: 150, y: 260, parents: ['c2'] },
            { id: 'c4', message: 'Feature C (old)', x: 150, y: 340, parents: ['c3'] },
            { id: 'c5', message: 'Feature B (rewritten)', x: 250, y: 260, parents: ['c2'] },
            { id: 'c6', message: 'Feature C (rewritten)', x: 250, y: 340, parents: ['c5'] },
            { id: 'c7', message: 'Feature D', x: 250, y: 420, parents: ['c6'] }
        ],
        branches: [
            { name: 'main', commitId: 'c4', type: 'local' },
            { name: 'origin/main', commitId: 'c7', type: 'remote' }
        ]
    },
    
    'revert': {
        name: 'Revert',
        description: 'Demonstrates using git revert to undo changes. Instead of removing commits, a new commit is created that reverses the changes of a previous commit.',
        commits: [
            { id: 'c1', message: 'Initial commit', x: 200, y: 100, parents: [] },
            { id: 'c2', message: 'Add feature', x: 200, y: 180, parents: ['c1'] },
            { id: 'c3', message: 'Bug introduced', x: 200, y: 260, parents: ['c2'] },
            { id: 'c4', message: 'More changes', x: 200, y: 340, parents: ['c3'] },
            { id: 'c5', message: 'Revert "Bug introduced"', x: 200, y: 420, parents: ['c4'] },
            { id: 'c6', message: 'Continue work', x: 200, y: 500, parents: ['c5'] }
        ],
        branches: [
            { name: 'main', commitId: 'c6', type: 'local' }
        ]
    },
    
    'cherry-pick': {
        name: 'Cherry Pick',
        description: 'Shows cherry-picking commits from one branch to another. A specific commit from a feature branch is copied to the main branch without merging the entire branch.',
        commits: [
            { id: 'c1', message: 'Initial commit', x: 200, y: 100, parents: [] },
            { id: 'c2', message: 'Main work', x: 200, y: 180, parents: ['c1'] },
            { id: 'c3', message: 'Feature start', x: 350, y: 180, parents: ['c1'] },
            { id: 'c4', message: 'Important fix', x: 350, y: 260, parents: ['c3'] },
            { id: 'c5', message: 'Feature work', x: 350, y: 340, parents: ['c4'] },
            { id: 'c6', message: 'Cherry-pick: Important fix', x: 200, y: 260, parents: ['c2'] },
            { id: 'c7', message: 'Continue main', x: 200, y: 340, parents: ['c6'] }
        ],
        branches: [
            { name: 'main', commitId: 'c7', type: 'local' },
            { name: 'feature', commitId: 'c5', type: 'local' }
        ]
    }
};

// Current scenario
let currentScenario = 'free-explore';

// Initialize the app
function init() {
    const select = document.getElementById('scenario-select');
    select.addEventListener('change', (e) => {
        currentScenario = e.target.value;
        renderScenario();
    });
    
    renderScenario();
}

// Render the current scenario
function renderScenario() {
    const scenario = scenarios[currentScenario];
    
    // Update description
    document.getElementById('description-text').textContent = scenario.description;
    
    // Render graph
    renderGraph(scenario);
}

// Render the commit graph
function renderGraph(scenario) {
    const svg = document.getElementById('graph-svg');
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Add arrow marker definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#666');
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);
    
    // Create a map for quick commit lookup
    const commitMap = {};
    scenario.commits.forEach(commit => {
        commitMap[commit.id] = commit;
    });
    
    // Draw edges (parent relationships)
    scenario.commits.forEach(commit => {
        commit.parents.forEach(parentId => {
            const parent = commitMap[parentId];
            if (parent) {
                drawEdge(svg, commit, parent);
            }
        });
    });
    
    // Draw commit nodes
    scenario.commits.forEach(commit => {
        drawCommitNode(svg, commit);
    });
    
    // Draw branch labels
    scenario.branches.forEach((branch, index) => {
        const commit = commitMap[branch.commitId];
        if (commit) {
            drawBranchLabel(svg, branch, commit, index);
        }
    });
}

// Draw an edge (arrow) from child to parent
function drawEdge(svg, child, parent) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    // Calculate the angle and adjust endpoints to account for node radius
    const dx = parent.x - child.x;
    const dy = parent.y - child.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const nodeRadius = 12;
    
    const offsetX = (dx / distance) * nodeRadius;
    const offsetY = (dy / distance) * nodeRadius;
    
    line.setAttribute('x1', child.x + offsetX);
    line.setAttribute('y1', child.y + offsetY);
    line.setAttribute('x2', parent.x - offsetX);
    line.setAttribute('y2', parent.y - offsetY);
    line.setAttribute('class', 'commit-edge');
    
    svg.appendChild(line);
}

// Draw a commit node
function drawCommitNode(svg, commit) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', commit.x);
    circle.setAttribute('cy', commit.y);
    circle.setAttribute('r', '12');
    circle.setAttribute('class', 'commit-node');
    
    // Add tooltip
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${commit.id}: ${commit.message}`;
    circle.appendChild(title);
    
    g.appendChild(circle);
    
    // Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', commit.x);
    text.setAttribute('y', commit.y + 30);
    text.setAttribute('class', 'commit-label');
    text.textContent = commit.id;
    g.appendChild(text);
    
    svg.appendChild(g);
}

// Draw a branch label
function drawBranchLabel(svg, branch, commit, index) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Position branch labels offset from the commit
    const offsetY = -25 - (index * 22);
    
    // Background rectangle
    const text = branch.name;
    const textWidth = text.length * 7 + 10;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', commit.x - textWidth / 2);
    rect.setAttribute('y', commit.y + offsetY - 12);
    rect.setAttribute('width', textWidth);
    rect.setAttribute('height', '18');
    rect.setAttribute('class', `branch-badge ${branch.type}-branch`);
    g.appendChild(rect);
    
    // Label text
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', commit.x);
    label.setAttribute('y', commit.y + offsetY);
    label.setAttribute('class', `branch-label ${branch.type}-branch`);
    label.setAttribute('fill', 'white');
    label.textContent = branch.name;
    g.appendChild(label);
    
    svg.appendChild(g);
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
