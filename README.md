# 🌿 GreenQuest AI

> **Turn AI time into outside time.**

GreenQuest AI is an **open-source AI-powered outdoor quest generator** built for the **Hacktoberfest Open-Source AI Challenge — Touch Grass**.

Instead of using AI to keep people on their screens, GreenQuest AI uses AI to give people a reason to **close the screen and go outside**.

The user chooses their available time, mood, and outdoor environment. GreenQuest AI then creates a personalized outdoor mission with simple activities that can be completed in the real world.

---

## 🌎 The Problem

People spend a huge amount of time looking at screens.

AI assistants can make this even easier because users can continuously ask questions, generate content, and interact with AI without leaving their devices.

But what if AI did the opposite?

What if AI's job was to create something useful **and then encourage the user to stop using the device?**

That is the idea behind GreenQuest AI.

---

## 💡 The Solution

GreenQuest AI creates short, practical outdoor quests.

For example, a user might choose:

```text
Time:       30 minutes
Mood:       Relaxing
Location:   Park
```

GreenQuest AI could generate:

### 🌳 Five Senses Adventure

* 👀 Notice three different shades of green.
* 👂 Identify three different sounds.
* 🍃 Find an interesting natural texture.
* ☁️ Observe the sky for a few minutes.
* 🧘 Sit quietly and notice your surroundings.

The user reads the mission and then **puts the device away**.

That's the core philosophy:

> **The screen should be the shortest part of the experience.**

---

# ✨ Features

## 🤖 AI Quest Generation

GreenQuest AI uses an open-weight AI model through **Ollama** to generate personalized outdoor missions.

The AI considers:

* Available time
* User mood
* Outdoor location
* Safety
* Nature-friendly behavior

---

## ⏱️ Time-Based Quests

Users can choose:

* 15 minutes
* 30 minutes
* 1 hour
* 2 hours

The generated activities are designed around the selected time.

---

## 🧘 Mood Selection

Users can choose what kind of experience they want:

* Relax
* Adventure
* Fitness
* Explore

The AI changes the quest based on the selected mood.

---

## 🌳 Location Selection

Users can select:

* Park
* Garden
* Neighborhood
* Anywhere outdoors

This helps the AI create more suitable activities.

---

## 🎲 Surprise Me

Don't know what to choose?

The **Surprise Me** button randomly selects:

* Time
* Mood
* Location

and automatically creates a quest.

---

## ✅ Interactive Quest Checklist

Every generated quest contains five tasks.

Users can check them off as they complete them.

Example:

```text
☑ Find three shades of green
☑ Listen for three different sounds
☑ Find something with an unusual texture
☐ Observe the sky
☐ Sit quietly for two minutes
```

---

## 🏆 Outdoor Progress

GreenQuest AI tracks:

* Quests completed
* Minutes spent outside
* Current outdoor streak

The data is stored locally in the browser using:

```text
localStorage
```

No account is required.

---

## 🔐 Privacy First

GreenQuest AI is designed around local-first AI.

When Ollama is available:

```text
User
 ↓
GreenQuest AI
 ↓
Ollama
 ↓
Open-weight model
 ↓
Quest
```

The AI request can be processed on the user's own computer instead of sending the user's preferences to a third-party cloud AI provider.

---

# 🔓 Why Open-Source AI?

Open innovation is an important part of GreenQuest AI.

The project is designed to work with **Ollama and open-weight models** instead of requiring a proprietary cloud AI API.

This provides several advantages.

### 🔐 Privacy

The AI can run locally on the user's computer.

Personal preferences don't have to be sent to a remote AI service.

### 🧠 Model Freedom

Users can change the model they use.

For example, the project currently uses:

```text
llama3.2
```

but the model can be changed in `script.js`.

### 💰 No Per-Request API Cost

There is no requirement for a paid cloud AI API.

The user runs the model locally.

### 🛠️ Customization

Developers can modify:

* AI prompts
* Quest rules
* Safety instructions
* User preferences
* Quest generation logic

### 🌐 Open Innovation

Because the AI stack is based on open technology, developers can experiment with different models and approaches without being locked into a single AI provider.

---

# 🏗️ Architecture

GreenQuest AI is intentionally simple.

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   GreenQuest    │
                    │       AI        │
                    └────────┬────────┘
                             │
                     Preferences
                  Time / Mood / Place
                             │
                             ▼
                    ┌─────────────────┐
                    │    JavaScript   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Ollama      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Open-Weight AI  │
                    │      Model      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Outdoor Quest   │
                    └────────┬────────┘
                             │
                             ▼
                         🌳 OUTSIDE
```

---

# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript

## AI

* Ollama
* Open-weight language model
* Local inference

## Browser Storage

* LocalStorage

## External Services

No cloud backend is required.

---

# 📁 Project Structure

```text
GreenQuest-AI/
│
├── index.html
├── style.css
└── script.js
```

### `index.html`

Contains the structure of the application:

* Navigation
* Hero section
* Quest builder
* Time selection
* Mood selection
* Location selection
* Quest result area
* Progress statistics
* Open-source AI section

---

### `style.css`

Contains the complete visual design:

* Responsive layout
* Dark nature-inspired theme
* Green visual system
* Cards
* Buttons
* Animations
* Mobile layout
* Quest interface

---

### `script.js`

Contains the application logic:

* User preference management
* Ollama API communication
* AI prompt generation
* Quest rendering
* Task completion
* LocalStorage
* Streak calculation
* Offline fallback
* Surprise Quest functionality

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/greenquest-ai.git
```

Go into the project:

```bash
cd greenquest-ai
```

---

# 🤖 Setting Up Ollama

GreenQuest AI can use Ollama for local AI inference.

Install Ollama on your computer and make sure it is running.

Then download the model used by the project:

```bash
ollama pull llama3.2
```

Start Ollama if necessary.

The application expects Ollama at:

```text
http://localhost:11434
```

The JavaScript application sends requests to:

```text
http://localhost:11434/api/generate
```

---

# ▶️ Running the Project

Because this is a frontend project, you can open:

```text
index.html
```

directly in a browser.

However, for the best experience, use a local development server such as the **VS Code Live Server extension**.

### Using VS Code

1. Open the project folder in VS Code.
2. Install **Live Server** if you don't already have it.
3. Right-click `index.html`.
4. Select:

```text
Open with Live Server
```

5. The project will open in your browser.

---

# ⚙️ Changing the AI Model

Open:

```text
script.js
```

Find:

```javascript
const OLLAMA_MODEL = "llama3.2";
```

Change it to another Ollama model that you have installed.

For example:

```javascript
const OLLAMA_MODEL = "your-model-name";
```

Then make sure that model is available in Ollama.

---

# 📴 Offline Fallback

GreenQuest AI also includes a built-in fallback system.

If Ollama is unavailable:

```text
Ollama unavailable
        ↓
Offline fallback
        ↓
Predefined outdoor quest
        ↓
User can still complete the mission
```

This means the application doesn't completely stop working when local AI is unavailable.

---

# 🧠 AI Prompt Design

The AI is instructed to create:

* Exactly five tasks
* Safe activities
* Free activities
* Realistic outdoor activities
* Nature-friendly behavior
* Activities based on available time
* Activities based on mood
* Activities based on location

The AI is also instructed not to create dangerous activities or activities that damage nature.

---

# 🌱 Example User Journey

```text
1. User opens GreenQuest AI
             ↓
2. Selects "30 minutes"
             ↓
3. Selects "Adventure"
             ↓
4. Selects "Park"
             ↓
5. Clicks "Generate my quest"
             ↓
6. Ollama generates the mission
             ↓
7. User reads the five tasks
             ↓
8. User goes outside
             ↓
9. User completes the tasks
             ↓
10. User checks all five tasks
             ↓
11. Quest is completed
             ↓
12. Outdoor stats update
```

---

# 🎯 Hacktoberfest: Touch Grass

GreenQuest AI was designed specifically around the **Touch Grass** theme.

The challenge asks developers to build something using open-source AI that gets people away from screens and into the real world.

GreenQuest AI follows that idea directly.

### Traditional AI

```text
User
 ↓
AI
 ↓
More screen time
 ↓
More AI
```

### GreenQuest AI

```text
User
 ↓
AI
 ↓
Outdoor mission
 ↓
📱 Screen OFF
 ↓
🌳 Real world
```

The AI is not the destination.

**The real world is the destination.**

---

# 🏆 What Makes GreenQuest Different?

There are thousands of AI chatbots.

GreenQuest AI isn't trying to become another chatbot.

Its purpose is intentionally different:

> **Generate the mission, then get out of the way.**

The application is designed so that the user doesn't need to keep interacting with AI.

The best possible outcome is:

```text
GreenQuest generates a quest
              ↓
User closes the website
              ↓
User goes outside
              ↓
User experiences something new
```

---

# 🔮 Future Improvements

GreenQuest AI can be expanded with additional open-source AI capabilities.

### 🐦 Bird Identification

Allow users to identify birds from photos or sounds.

### 🌿 Plant Identification

Use a local/open vision model to identify plants.

### 🗺️ Outdoor Discovery

Integrate OpenStreetMap to discover nearby:

* Parks
* Trails
* Gardens
* Lakes
* Nature areas

### 🌦️ Weather-Aware Quests

Generate different missions depending on:

* Temperature
* Rain
* Wind
* Time of day

### 📸 Nature Journal

Allow users to record:

* Photos
* Discoveries
* Notes
* Favorite locations

### 🏅 Gamification

Add:

* XP
* Levels
* Badges
* Achievements
* Weekly challenges

### 👥 Group Quests

Allow friends to complete the same outdoor mission together.

### 📱 Progressive Web App

Turn GreenQuest into an installable PWA for phones.

---

# 🔒 Safety & Nature Guidelines

GreenQuest quests should encourage safe and responsible outdoor behavior.

Users should:

* Stay in safe areas.
* Follow local rules.
* Avoid dangerous roads or locations.
* Respect wildlife.
* Avoid touching unknown plants or animals.
* Avoid damaging plants.
* Avoid littering.
* Tell someone where they are going when appropriate.
* Carry water when needed.
* Stop an activity if conditions become unsafe.

GreenQuest is an activity generator, not a substitute for local safety information or professional outdoor guidance.

---

# 🤝 Contributing

Contributions are welcome!

If you have an idea that can make GreenQuest better at getting people outside, feel free to contribute.

## Contribution Steps

### 1. Fork the repository

Create your own fork of the project.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR-USERNAME/greenquest-ai.git
```

### 3. Create a branch

```bash
git checkout -b feature/my-feature
```

### 4. Make your changes

Improve the project and test your changes.

### 5. Commit

```bash
git add .
git commit -m "Add my outdoor quest feature"
```

### 6. Push

```bash
git push origin feature/my-feature
```

### 7. Open a Pull Request

Explain:

* What you changed
* Why you changed it
* How you tested it

---

# 💡 Contribution Ideas

You can contribute by adding:

* New quest types
* Better AI prompts
* New open-weight models
* Nature challenges
* Accessibility improvements
* UI improvements
* Offline features
* PWA support
* Localized languages
* Better safety rules
* New gamification features
* Nature identification
* Map integrations

---

# 📜 License

This project is intended to be open source.

Add your preferred license to the repository, such as the MIT License, before publishing if you want others to freely reuse and modify the project.

---

# 🌿 Philosophy

GreenQuest AI is built around one simple idea:

> **Technology should sometimes help us use technology less.**

AI doesn't always have to produce another screen, another feed, or another conversation.

Sometimes the best AI response is a reason to close the laptop, step outside, and experience something real.

---

# 🚀 Project Summary

| Category       | GreenQuest AI              |
| -------------- | -------------------------- |
| Theme          | 🌳 Touch Grass             |
| Type           | Outdoor AI Quest Generator |
| AI             | Open-weight AI             |
| Local AI       | Ollama                     |
| Frontend       | HTML, CSS, JavaScript      |
| Database       | None                       |
| Storage        | Browser LocalStorage       |
| Cloud API      | Not required               |
| Authentication | Not required               |
| Main Goal      | Get people outside         |
| Privacy        | Local-first                |
| Cost           | No cloud API cost          |

---

## 🌿 GreenQuest AI

**AI plans it.
You experience it.**

**Less screen. More world.**
