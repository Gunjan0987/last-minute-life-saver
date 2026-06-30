# 🆘 Last Minute Life Saver (LMLS)
> A World-Class AI-First Productivity Companion & Emergency Rescue Assistant.

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://dist-ecru-two-97.vercel.app)
[![Expo](https://img.shields.io/badge/Expo-v56.0.0-00020d?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)

**Last Minute Life Saver** is a premium, dark-mode glassmorphic mobile application designed to prevent burnout, manage workload overhead, and deliver emergency assistance when things fall apart. Built with React Native, Expo, and Zustand, the product combines the design aesthetics of **Apple Intelligence, Motion, Linear, and Notion**.

🔗 **Live Web Demo:** https://last-minute-life-saver-273dc.web.app

---

## 🎨 Visual Showcase & Design System
LMLS follows a state-of-the-art **Dark Mode Glassmorphism** design:
* **Core Palette:** `#0A0E1A` deep space dark background, `#131729` elevated cards with glass fills and thin border highlights.
* **Apple Intelligence Gradients:** Custom gradient meshes (`gradientAI`, `gradientApple`) for glowing, animated, and pulsing elements.
* **AI Orb Avatar:** Reusable, pulsing, and rotating floating orb component acting as the AI presence across all screens.

---

## 🧠 Core Feature Modules

### 1. AI Mission Control (Dashboard)
Redesigned dashboard presenting an **AI Daily Brief** summarizing Gmail, Slack, and WhatsApp scanning diagnostics:
* Overdue metrics and active task checklists.
* Success Decay indicators (e.g. Success probability drops from **79% → 48%** if ignored).
* **"What should I do RIGHT NOW?"** pulsing prompt that triggers the step-by-step Live Reasoning panel.

### 2. Intelligent Tasks Queue
Each task card is augmented with predictive AI metadata:
* **Completion Probability %** and **Deadline Risk Level** alerts.
* Estimated duration and **Best Focus Time slots**.
* **AI-generated Checklist & Timeline:** Expandable drawers detailing execution roadmaps and subtasks.
* One-tap shortcuts to launch Pomodoro blocks or active triage.

### 3. Proactive AI Assistant
* Initiates conversation proactively based on workload analysis (e.g., "I found 3 scheduling conflicts, 2 hidden deadlines, and 1 burnout warning. Would you like me to optimize your day?").
* Suggests workflow chips (Plan My Day, Optimize Schedule, Deep Work).
* Glowing orb avatar that reacts to conversational updates.

### 4. Emergency Rescue Takeover (Hero Feature)
* **Red Takeover Theme:** Hearts-pulsing red overlay with ticking tactile vibration feedback.
* **Emergency Pomodoro:** Play/pause/reset focus block to lock into critical tasks.
* **Apology & Delays Templates:** Copy and send delay explanations to managers or clients with one-tap.
* **Triage buckets:** Quickly MUST DO, DEFER, DELEGATE, or DROP tasks.

### 5. Analytics Hub
* **Productivity DNA Graph:** Visual bars showing completion intensity across weekdays.
* **Completion Forecasts:** Dynamic predictions of goal milestones.
* **7×24 Heatmap:** Productivity density cells by hour/day.

---

## 🛠️ Technology Stack
* **Framework:** React Native + **Expo (SDK 56)**
* **Routing:** **Expo Router** (file-based router)
* **State Management:** **Zustand** (Tasks, User Profile, Analytics, Settings, Chat, AI Reasoning)
* **Gradients:** `expo-linear-gradient`
* **Glassmorphism Blur:** `expo-blur`
* **Haptics:** `expo-haptics`
* **Vibration:** React Native Vibration API
* **Icons:** `@expo/vector-icons` (Ionicons)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/last-minute-life-saver.git
   cd last-minute-life-saver
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
* **Start Development Server:**
  ```bash
  npm run start
  ```
  Scan the QR code printed in the terminal using the **Expo Go** app on your phone.

* **Run on Web Browser:**
  ```bash
  npm run web
  ```

* **Export Static Web Build:**
  ```bash
  npx expo export --platform web
  ```
  This generates static build files in the `dist/` directory.

### Deployment
To deploy the exported static folder to Vercel:
```bash
npx expo export --platform web
npx vercel deploy ./dist --prod --yes
```
