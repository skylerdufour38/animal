# 🐺 Michigan Nature Sounds

An interactive nature sound explorer featuring Michigan wildlife.

Explore animals by category, view species information, and listen to authentic wildlife sounds.

![Michigan Nature Sounds App Preview](Michigan%20Nature%20Sounds%20Wolf%20App.png)

---

## 🌲 App Overview

```

Ann Arbor Hands-On Museum
↓
Michigan Nature Sounds
↓
Choose Category
↓
┌──────────┬─────────┬──────────┐
│ Mammals  │ Birds   │ Insects  │
└──────────┴─────────┴──────────┘
↓
Select Species
↓
🔊 Play Animal Audio

```

---

# 🐾 Categories

## Mammals

Examples:

- Eastern Chipmunk  
  *Tamias striatus*

- Red Squirrel  
  *Tamiasciurus hudsonicus*

- Eastern Gray Squirrel  
  *Sciurus carolinensis*

- Meadow Vole  
  *Microtus pennsylvanicus*

- Gray Wolf  
  *Canis lupus*

- Coyote  
  *Canis latrans*

- Red Fox  
  *Vulpes vulpes*

- Black Bear  
  *Ursus americanus*

- Northern Raccoon  
  *Procyon lotor*

- Bobcat  
  *Lynx rufus*

- White-tailed Deer  
  *Odocoileus virginianus*

---

# 🐺 Species Example: Gray Wolf

## Gray Wolf

**Scientific Name**

```

Canis lupus

```

**Description**

> The gray wolf is Michigan’s largest native land predator.  
> It typically lives in packs and has a strong, distinctive howl.

---

## 🔊 Audio Controls

```

▶ Play Sound

🔊 Speaker Button

➡ Next Animal

```

---

# 📂 Project Structure

```

Michigan-Nature-Sounds/
│
├── README.md
│
├── index.html
├── style.css
├── app.js
│
├── images/
│   ├── wolf.jpg
│   ├── fox.jpg
│   ├── bear.jpg
│   └── deer.jpg
│
├── audio/
│   ├── wolf-howling.mp3
│   ├── fox.mp3
│   └── bear.mp3
│
└── data/
└── animals.json

````

---

# 🗂 Animal Data Example

`animals.json`

```json
{
  "name": "Gray Wolf",
  "scientificName": "Canis lupus",
  "category": "Mammals",
  "image": "images/wolf.jpg",
  "sound": "audio/wolf-howling.mp3",
  "description": "Michigan's largest native land predator."
}
````

---

# 🚀 Running in GitHub Codespaces

1. Open this repository in GitHub Codespaces

2. Start the development server:

```bash
python3 -m http.server 8000
```

3. Open:

```
http://localhost:8000
```

---

# 📱 App Features

✅ Wildlife categories
✅ Animal images
✅ Scientific names
✅ Audio playback
✅ Touch-friendly interface
✅ iPad-style layout
✅ Michigan ecosystem focus

---

# 🦌 Future Additions

* More Michigan species
* Bird identification section
* Insect sound library
* Offline audio support
* iOS / iPad app version
* Museum kiosk mode

---

## License

Educational nature project.

```

This README layout matches the flow shown in the screenshot:

**Museum → Michigan Nature Sounds → Category → Species → Image + Description → Play Animal Sound**.
```
