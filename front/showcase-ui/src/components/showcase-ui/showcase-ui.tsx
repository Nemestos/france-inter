import { Component, Host, h, Prop, State } from '@stencil/core';
import '@ionic/core';
import { IEditorUpdate } from '../../api/etitor.service';
import axios from 'axios';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

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

  //form
  @State() text: string = DEFAULT_DISPLAY_TEXT;
  @State() maxPersons: number = DEFAULT_PERSON_DETECTED;
  @State() image: File;

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
            <img class="image-insert" src="http://localhost:9000/api-files/80ea20c2b2807675e31cd6a6994f03da.png" />
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
              <ion-input class="input-number" type="number" value="0" max="20" min="0" name="maxPersons" onIonChange={e => this.handleMaxPersonsChange(e)}></ion-input>
            </item-system>
            <item-system active={this.toggleStatus} attribute="Mode par default" value="Envoie un messsage par default"></item-system>
            <item-system
              active={!this.toggleStatus}
              attribute="Mode"
              value="Envoie un nouveau message"
              toggle
              checked={!this.toggleStatus}
              onItemToggle={e => this.handleToggleStatus(e)}
            ></item-system>

            <ion-item class="message-item" disabled={this.toggleStatus}>
              <ion-label position="stacked">Message</ion-label>
              <ion-input value={this.text} onIonChange={e => this.handleTextChange(e)}></ion-input>
            </ion-item>

            <div class="file-item">
            <item-system 
            class="test"
            active attribute="Selecteur" value="Nombre de personne autorisé">
            </item-system>
            <div class="file-input">
            <input class="file-i" id="file" type="file" onChange={e => this.handleFileUpload(e)} />  
            <label htmlFor="file">Select file</label>
            </div>
            </div>

            <ion-button class="btn-confirm" type="submit" onClick={e => this._handleConfirmation(e)}>
              Valide
            </ion-button>

            <br />
            {/* <headline-system headline="Langue Spécifique" />
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
            </ion-item> */}
          </div>
        </div>
      </Host>
    );
  }
  handleTextChange(event: IonInputCustomEvent<InputChangeEventDetail>) {
    this.text = event.target.value.toString();
  }
  handleMaxPersonsChange(event: IonInputCustomEvent<InputChangeEventDetail>) {
    this.maxPersons = parseInt(event.target.value as string);
  }
  handleFileUpload(event) {
    console.log(event.target.files);
    this.image = event.target.files[0];
  }
  handleToggleStatus(event) {
    this.toggleStatus = !this.toggleStatus;
    if (!this.toggleStatus) {
      this.text = DEFAULT_DISPLAY_TEXT;
    }
  }
  //update text & maxPerson here
  private async _handleConfirmation(event: Event) {
    event.preventDefault();
    console.log(this.text, this.maxPersons, this.image);
    const formData = new FormData();
    formData.set('text', this.text);
    formData.set('maxPersons', this.maxPersons.toString());
    formData.set('image', this.image);
    // const body: IEditorUpdate = {
    //   text: this.newMessage,
    //   maxPersons: this.persons,
    // };
    // // console.log(this.newMessage,this.persons)
    // const formData = new FormData();
    // formData.set('text', 'test');
    // formData.set('maxPersons', '3');
    const resp = await axios.post<IEditorUpdate>('http://localhost:8080/tasks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(resp);
    // console.log(resp);
    // console.log(this.newMessage)
    // this.displaying = this.newMessage;
  }
}
