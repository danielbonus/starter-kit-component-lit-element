import { html, fixture, expect } from '@open-wc/testing';

import '../src/component-example.js';

describe ('ComponentExample', ()=>{
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html`
      <component-example></component-example>
    `);
  });
});