import { Component, h, Host, Element, Prop} from '@stencil/core';

const DEFAULT_HEADLINE = "Headline";

@Component({
  tag: 'headline-system',
  styleUrl: 'headline-system.css',
  shadow: true,
})
export class HeadlineSystem {

  @Element() el: HTMLElement;

  @Prop({ reflect: true }) headline: string = DEFAULT_HEADLINE;

  render() {
    return (
      <Host>
        <div class="headline-wrapper">
          <div class="headline">
            {this.headline}
          </div>
        </div>
      </Host>
    );
  }
}
