import { Component, Host, h, Prop } from '@stencil/core';
import '@ionic/core';

@Component({
  tag: 'showcase-ui',
  styleUrl: 'showcase-ui.css',
  shadow: true,
})
export class ShowcaseUi {

  @Prop() username: string = "default-name";

  render() {
    return (
      <Host>
        <div class="header">
          <div class="title-wrapper">
          <ion-icon class="icon" name="logo-ionic"></ion-icon>
          Radio France Surveillance
          </div>

          <div class="username-wrapper">
            {this.username}
            <ion-icon class="icon-user" name="person-outline"></ion-icon>
          </div>   
        </div>
      
        <div class="showcase-wrapper">
          <div class="camera-panel">
            <div class="image-infos">
            <div class="image-detail"></div>
            <ion-icon class="icon-user" name="alert-circle-outline"></ion-icon>
            <ion-icon class="icon-user" name="videocam-outline"></ion-icon>
            </div>
            <div class="image-insert">
            </div>
            <div class="camera-actions">
            <ion-icon class="icon-up" name="cloud-upload-outline"></ion-icon>
            <ion-list>
              <ion-item>
                <ion-select 
                interface="popover" 
                placeholder="personne(s)">
                  <ion-select-option value="apples">Apples</ion-select-option>
                  <ion-select-option value="oranges">Oranges</ion-select-option>
                  <ion-select-option value="bananas">Bananas</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>

            <ion-icon class="arrow-left" name="arrow-back"></ion-icon>
            <ion-icon class="arrow-right" name="arrow-forward"></ion-icon>

            <div class="numer-wrapper">
              1
            </div>



            </div>
            <div class="sliding-message">
             <ion-icon class="volum-icon" name="volume-medium"></ion-icon>
            </div>
          </div>

          <div class="panel-infos">
            <ion-button>click</ion-button>
       
          </div>
        </div>
      </Host>
    );
  }
}
