import { Component, Host, h, State } from '@stencil/core';
import { getAllOutputs, getAllOutputsFake } from './output.service';
import { Output } from './output.type';

@Component({
  tag: 'output-carousel',
  styleUrl: 'output-carousel.css',
  shadow: true,
})
export class OutputCarousel {
  @State() outputs: Output[];
  @State() currentIndex: number = 0;
  render() {
    console.log(this.outputs);
    return (
      <Host>
        <div class="carousel-panel">{this.outputs.length == 0 ? <div>No outputs</div> : <output-item output={this.outputs[this.currentIndex]} />}</div>
        <div class="camera-actions">
          <button onClick={() => this.addIndex(-1)} class="button-col">
            <ion-icon class="arrow-left" name="arrow-back"></ion-icon>
          </button>

          <button onClick={() => this.addIndex(1)} class="button-col">
            <ion-icon class="arrow-right" name="arrow-forward"></ion-icon>
          </button>

          <div class="numer-wrapper">
            {this.currentIndex + 1}/{this.outputs.length}
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
  addIndex(n: number) {
    this.currentIndex = (this.currentIndex + n) % this.outputs.length;
    if (this.currentIndex < 0) {
      this.currentIndex = this.outputs.length - 1;
    }
  }
  async componentWillRender() {
    console.log('will render');
    this.outputs = await getAllOutputs();
  }
  async onReload() {
    const outputs = await getAllOutputs();
  }
}
