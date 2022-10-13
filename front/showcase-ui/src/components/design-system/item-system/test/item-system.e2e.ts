import { newE2EPage } from '@stencil/core/testing';

describe('item-system', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<item-system></item-system>');

    const element = await page.find('item-system');
    expect(element).toHaveClass('hydrated');
  });
});
