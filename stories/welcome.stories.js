import { html } from 'lit-html';
import { withLinks } from '@storybook/addon-links';
import '../src/component-example';

export default {
  title: 'Welcome',
  decorators: [withLinks],
};

export const Welcome = () => html`
  <component-example></component-example>
`;
