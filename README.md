# france-inter
un magnifique programme de détection de distanciation social avec azure


# Les arguments du script

- max_persons : le nombre de personnes maximum autorisé

  **ex** : 5
- text : le texte à generer avec azure si jamais le nombre maximum de personnes est atteint

  **ex** : degager tous !
- image : le path de l'image(le path complet minio)

  **ex** : minio:9000/api-files/6d154bf93ee7e9ac771c6b73733bbc42.png

# Les ressources API
## **Create a task**:

text : string

maxPersons : number

## **Image**:

hash:string

path:string

detect:number


## **Image**:

trad_fr:string

trad_en:string

file_fr:string

file_en:string


## **Output from script**:

image_name: string

max_pers: number

image: Image

trads: Audio


# Les routes API
**GET**
/tasks

-> Output[]

**POST**
/tasks(Create a task)

-> string

**DELETE**
/tasks/:id

->string

# CLI
<p>Vous pouvez lancer le script azure directement dans le dossier ```backend``` sans avoir besoin de passer par l'api et le front. Il faudra juste upload une image dans minio</p>

## Usage
**-f** : le path vers minio

**-t** : le texte à afficher

**-m** : le maximum de personnes autorisé

**-i** : reset la db

**-d** : activer le mode debug


