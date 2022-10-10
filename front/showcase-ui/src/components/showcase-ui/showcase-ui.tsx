import { Component, Host, h, Prop } from '@stencil/core';
import '@ionic/core';

const DEFAULT_DISPLAY_TEXT = 'Respectez le nombre de personne autorisé dans cette pièce, please'
const DEFAULT_PERSON_DETECTED = 5;
const DEFAULT_IMAGE_DATA = 'random-image.jpeg';

@Component({
  tag: 'showcase-ui',
  styleUrl: 'showcase-ui.css',
  shadow: true,
})
export class ShowcaseUi {
  @Prop() username: string = 'default-name';
  @Prop() displaying: string = DEFAULT_DISPLAY_TEXT;
  @Prop() persons: number = DEFAULT_PERSON_DETECTED;
  @Prop() imageData: string = DEFAULT_IMAGE_DATA

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
              <ion-icon class="icon-up" name="cloud-upload-outline"></ion-icon>

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
              Studio
            </div>
            <headline-system headline="editeur" />
            <item-system 
              active attribute="Selecteur" 
              value="Nombre de personne autorisé">
              <ion-input class="input-number"
              type="number"
              value="0"></ion-input>
            </item-system>
            <headline-system headline="Modes Editeur" />
            <item-system 
              active attribute="Mode par default" 
              value="Envoie un messsage par default">
            </item-system>
            <item-system 
              active invalide attribute="Mode" 
              value="Envoie un nouveau message"
              toggle onChange={() => this._handleToggle()}>
             
            </item-system>

            <ion-button class="btn-confirm">Valide</ion-button>
          </div>
        </div>
      </Host>
    );
  }
  private _handleToggle(): void {
    throw new Error('Method not implemented.');
  }
}
