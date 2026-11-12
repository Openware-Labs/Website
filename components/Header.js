class XylumHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="logo">
          <a href="/index.html">
            <img src="/icons/Xylum-W.svg" alt="Xylum Foundation Logo" height="32">
            <span>Xylum Foundation</span>
          </a>
        </div>
        <nav>
          <a href="/about.html">About</a>
          <a href="/documentation.html">Documentation</a>
          <a href="/releases.html">Releases</a>
          <a href="https://github.com/Xylum-Foundation" target="_blank" class="github-link">
            <img src="/icons/GitHub.svg" alt="GitHub" height="24">
          </a>
        </nav>
      </header>
    `;
  }
}
customElements.define('xylum-header', XylumHeader);