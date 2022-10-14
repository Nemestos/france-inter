import { newE2EPage } from '@stencil/core/testing';

describe('output-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<output-item></output-item>');

    const element = await page.find('output-item');
    expect(element).toHaveClass('hydrated');
  });
});
