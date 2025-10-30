# Git Repository Visualizer

A simple web app that visualizes Git repositories as connected nodes on a graph, with arrows indicating parent relationships between commits.

## Features

- **Interactive Visualization**: View Git commits as connected dots/nodes with parent relationship arrows
- **Multiple Scenarios**: Explore different Git workflows and use cases:
  - **Free Explore**: Basic Git workflow with multiple branches
  - **Free Explore with Remote**: Local and remote branch tracking
  - **Upstream Changes**: Fetching and merging from upstream
  - **Rewritten Remote History**: Force push scenarios
  - **Revert**: Using git revert to undo changes
  - **Cherry Pick**: Copying commits between branches

## How to Use

1. Open `index.html` in a web browser, or serve it with a local web server:
   ```bash
   python3 -m http.server 8080
   ```
   Then navigate to `http://localhost:8080`

2. Select a scenario from the dropdown menu to see different Git workflows

3. Hover over commit nodes to see commit messages

4. Branch labels are color-coded:
   - Green: Local branches
   - Red: Remote branches

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and visual design
- `app.js` - Visualization logic and scenario definitions

## Technology

Built with vanilla HTML, CSS, and JavaScript using SVG for graph rendering.