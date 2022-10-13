import { Component, Host, h, Prop, State } from '@stencil/core';
import '@ionic/core';
import { IEditorUpdate } from '../../api/etitor.service';
import axios from 'axios';

const DEFAULT_DISPLAY_TEXT = 'Respectez le nombre de personne autorisé dans cette pièce, please';
const DEFAULT_PERSON_DETECTED = 5;
const DEFAULT_IMAGE_DATA = 'random-image.jpeg';

@Component({
  tag: 'showcase-ui',
  styleUrl: 'showcase-ui.css',
  shadow: true,
})
export class ShowcaseUi {
  @Prop() username: string = 'Administateur';
  @Prop() displaying: string = DEFAULT_DISPLAY_TEXT;
  @Prop() persons: number = DEFAULT_PERSON_DETECTED;
  @Prop() imageData: string = DEFAULT_IMAGE_DATA;
  @Prop({ reflect: true }) newMessage: string;

  @State() modeStatus: boolean;
  @State() toggleStatus: boolean;

  render() {
    return (
      <Host>
        <div class="header">
          <div class="title-wrapper">
            <ion-icon class="icon" name="logo-ionic"></ion-icon>
            Radio France Surveillance
          </div>

          {/* Username login */}
          <div class="username-wrapper">
            {this.username}
            <ion-icon class="icon-user" name="person-outline"></ion-icon>
          </div>
        </div>

        <div class="showcase-wrapper">
          <div class="camera-panel">
            <div class="image-infos">
              <div class="image-detail">{this.imageData}</div>
              <ion-icon class="icon-user" name="alert-circle-outline"></ion-icon>
              <ion-icon class="icon-user" name="videocam-outline"></ion-icon>
            </div>
            <div class="image-insert"></div>
            <div class="camera-actions">
              <ion-icon class="arrow-left" name="arrow-back"></ion-icon>
              <ion-icon class="arrow-right" name="arrow-forward"></ion-icon>

              <div class="numer-wrapper">{this.persons}</div>
            </div>

            {/* display text */}
            <div class="sliding-message">
              <ion-icon class="volum-icon" name="volume-medium"></ion-icon>
              {this.displaying}
            </div>
          </div>

          <div class="panel-infos">
            <div class="studio-title">
              Upload studio img
              <ion-icon class="icon-up" name="cloud-upload-outline"></ion-icon>
            </div>
            <headline-system headline="Editeur" />
            <item-system active attribute="Selecteur" value="Nombre de personne autorisé">
              <ion-input class="input-number" type="number" value="0" max="20" min="0"></ion-input>
            </item-system>
            <headline-system headline="Modes Editeur" />
            <item-system active={this.toggleStatus} attribute="Mode par default" value="Envoie un messsage par default"></item-system>
            <item-system
              active={!this.toggleStatus}
              attribute="Mode"
              value="Envoie un nouveau message"
              toggle
              checked={!this.toggleStatus}
              onItemToggle={() => (this.toggleStatus = !this.toggleStatus)}
            ></item-system>

            <ion-item class="message-item" disabled={this.toggleStatus}>
              <ion-label position="stacked">Message</ion-label>
              <ion-input value={this.newMessage}></ion-input>
            </ion-item>
            <br />
            <headline-system headline="Langue Spécifique" />
            <br />

            <ion-list class="language-choices" color="dark">
              <ion-radio-group>
                <ion-item>
                  <ion-label class="label-lg">anglais - francais</ion-label>
                  <ion-radio slot="end"></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label class="label-lg">francais - anglais</ion-label>
                  <ion-radio slot="end"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>
            <br />
            <ion-item class="message-item">
              <ion-label position="stacked">Message</ion-label>
              <ion-input value={this.newMessage}></ion-input>
            </ion-item>

            <ion-button class="btn-confirm" onClick={() => this._handleConfirmation()}>
              Valide
            </ion-button>
          </div>
        </div>
      </Host>
    );
  }

  //update text & maxPerson here
  private async _handleConfirmation() {
    const body: IEditorUpdate = {
      text: this.newMessage,
      maxPersons: this.persons,
    };
    this.newMessage = (await axios.post('http://localhost:8080/api', { body: body })).data;
    this.displaying = this.newMessage;
  }
}
