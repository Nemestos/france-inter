import { newSpecPage } from '@stencil/core/testing';
import { OutputItem } from '../output-item';

describe('output-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OutputItem],
      html: `<output-item></output-item>`,
    });
    expect(page.root).toEqualHtml(`
      <output-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </output-item>
    `);
  });
});
