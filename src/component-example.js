import { LitElement, html, css } from 'lit-element';

class Component  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <h1>Example complement</h1>
    `;
  }
}

window.customElements.define('component-example', Component);
