import { newSpecPage } from '@stencil/core/testing';
import { OutputCarousel } from '../output-carousel';

describe('output-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OutputCarousel],
      html: `<output-carousel></output-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <output-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </output-carousel>
    `);
  });
});
