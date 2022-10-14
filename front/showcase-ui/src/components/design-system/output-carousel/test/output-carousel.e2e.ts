import { newE2EPage } from '@stencil/core/testing';

describe('output-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<output-carousel></output-carousel>');

    const element = await page.find('output-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
