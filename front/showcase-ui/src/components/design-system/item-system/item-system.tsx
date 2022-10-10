import { Component, Host, h, Prop, EventEmitter, Event, State } from '@stencil/core';

const DEFAULT_ITEM_ATTR = 'Attribute';
const DEFAULT_ITEM_VALUE = 'Value';

@Component({
  tag: 'item-system',
  styleUrl: 'item-system.css',
  shadow: true,
})
export class ItemSystem {
  @Prop({ reflect: true }) attribute: string | boolean;
  @Prop() value: string = DEFAULT_ITEM_VALUE;

  @Prop({ reflect: true }) active: boolean;
  @Prop({ reflect: true }) invalide: boolean;

  @Prop({ reflect: true, mutable: true }) checked: boolean;
  @Prop({ reflect: true }) toggle: boolean;

  @Event() itemClick: EventEmitter<MouseEvent>;
  clickHandler = (event: MouseEvent) => {
    this.itemClick.emit(event);
  };
  @Event() itemToggle: EventEmitter<boolean>;
  toggleHandler(event: CustomEvent) {
    if (this.checked === undefined) {
      this.checked = false;
    }
    if (this.checked !== event.detail.value) {
      this.itemToggle.emit(event.detail.value);
      this.checked = event.detail.value;
    }
  }

  private _attribute: string;
  @State() _action: boolean;

  componentWillRender() {
    this._attribute = this.attribute && typeof this.attribute == 'boolean' ? DEFAULT_ITEM_ATTR : `${this.attribute}`;
  }

  render() {
    return (
      <Host style={{ height: this.attribute ? '60px' : '30px' }}>
        <div class="info-placeholder" onClick={this.clickHandler}>
          <div class="status"></div>
          <div class="item-placeholder">
            {this.attribute && <div class="attribute">{this._attribute}</div>}
            <div class="value">{this.value}</div>
          </div>
        </div>

        <div class="action-placeholder">{this.toggle && <ion-toggle checked={this.checked} onIonChange={e => this.toggleHandler(e)}></ion-toggle>}</div>
        <slot></slot>
      </Host>
    );
  }
}
