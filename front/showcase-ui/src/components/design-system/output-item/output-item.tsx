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
          <ion-icon class="icon-user" name="alert-circle-outline"></ion-icon>
          <ion-icon class="icon-user" name="videocam-outline"></ion-icon>
        </div>
        <img class="image-insert" src={this.output.image.path} />
        {this.isShowAudios() && (
          <div>
            <div class="sliding-message">
              <ion-icon class="volum-icon" name="volume-medium"></ion-icon>
              {this.output.trads.trad_en}
            </div>
            <div class="sliding-message">
              <ion-icon class="volum-icon" name="volume-medium"></ion-icon>
              {this.output.trads.trad_fr}
            </div>
          </div>
        )}

        <slot></slot>
      </Host>
    );
  }
  isShowAudios(): boolean {
    return this.output.image.detect > this.output.max_pers;
  }
}
