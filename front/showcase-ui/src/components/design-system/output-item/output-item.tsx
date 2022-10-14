import { Component, Host, h, Prop } from '@stencil/core';
import { Output } from '../output-carousel/output.type';

@Component({
  tag: 'output-item',
  styleUrl: 'output-item.css',
  shadow: true,
})
export class OutputItem {
  @Prop() output: Output;

  render() {
    return (
      <Host>
        <div class="image-infos">
          <div class="image-detail">{this.output.image_name}</div>
          <div class={`image-persons ${!this.isCorrect() ? 'correct' : 'error'}`}>
            <p>
              {this.output.id_image.detected}/{this.output.max_pers}
            </p>
            <ion-icon name="people"></ion-icon>
          </div>
        </div>
        <img class="image-insert" src={`http://localhost:9000/api-files/${this.output.id_image.path}`} />
        {this.isCorrect() && (
          <div>
            <div class="sliding-message">
              <ion-icon class="volum-icon" name="volume-medium"></ion-icon>
              {this.output.id_trads.Trad_en[0]}
            </div>
            <div class="sliding-message">
              <ion-icon class="volum-icon" name="volume-medium"></ion-icon>
              {this.output.id_trads.Trad_fr[0]}
            </div>
          </div>
        )}

        <slot></slot>
      </Host>
    );
  }
  isCorrect(): boolean {
    return this.output.id_image.detected > this.output.max_pers;
  }
}
