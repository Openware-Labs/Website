class XylumFooter extends HTMLElement {
  connectedCallback() {
    const dateStr = "Oct 30, 2026";

    this.innerHTML = `
      <footer>
        <p>Last modified: ${dateStr}</p>
      </footer>
    `;
  }
}
customElements.define('xylum-footer', XylumFooter);