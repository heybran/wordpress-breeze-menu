class BreezeMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const itemsCount = 3;
    // Render menu structure based on setting done by admin
    this.shadowRoot.innerHTML = `
      <div class="wrapper">
        ${
          Array.from({ length: 3 }).map(() => {
            return `
              <breeze-menu-item 
                type="email" 
                text="contact@example.cn"
                horizontal-position="left"
                vertical-position="center"
                >
              </breeze-menu-item>`
          }).join('')
        }
      </div>
    `;
  }
}

customElements.define('breeze-menu', BreezeMenu);

class BreezeMenuItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  get emailSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
  }

  render() {
    const icon = this.getAttribute('type');
    this.shadowRoot.innerHTML = `
      <button>
        ${this[icon + 'SVG']}
      </button>
      <p>${this.getAttribute('text')}</p>
    `;
  }
} 

customElements.define('breeze-menu-item', BreezeMenuItem);