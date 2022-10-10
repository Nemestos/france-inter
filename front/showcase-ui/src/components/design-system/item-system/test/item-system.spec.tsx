import { newSpecPage } from '@stencil/core/testing';
import { ItemSystem } from '../item-system';

describe('item-system', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ItemSystem],
      html: `<item-system></item-system>`,
    });
    expect(page.root).toEqualHtml(`
      <item-system>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </item-system>
    `);
  });
});
