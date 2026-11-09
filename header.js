const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        font-family: 'Antic Slab', serif;
        background: #020016;
    }
    .site-header {
        display:flex;
        align-items: center;
        height: 56px;
        padding: 0 1rem;
        border-bottom: 2px solid black;
        background: white;
    }
    .home-btn { display: inline-flex; border-radius: 6px;}
    .home-btn img { height: 36px; width: auto; display: block; }
    .home-btn:hover { background: rgba(0,0,0,0.08); }
    .home-btn:focus-visible { outline: 3px solid steelblue; }
`
document.head.appendChild(style);

const header = document.createElement('header');
header.className = 'site-header';
header.innerHTML = '<a href="index.html" class="home-btn"><img src="BROOKEJAMS_HOME.png" alt="Home"></a>';
document.body.prepend(header);