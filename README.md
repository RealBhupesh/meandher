# 🌷 Gayu & B - Our Love Story

**The Ultimate Couples Companion App - Where Love Meets Productivity**

## 💕 About

Gayu & B is a beautiful couples app that combines romance, productivity, and shared dreams in one place. Featuring tulip-themed design, playful Batman easter eggs, and everything you need to build your dream life together.

## ✨ Features

### Core Features (MVP - Currently Implemented)

- 🏠 **Home Dashboard** - Beautiful overview of your relationship
  - Together counter showing months and days
  - Tulip garden visualization
  - Quick access to all features
  - Today's magic section

- ✅ **To-Do List** - Productivity, Together
  - Create and manage shared tasks
  - Assign tasks to Gayu, B, or both
  - Priority levels with visual indicators
  - Progress tracking
  - Tulip rewards for completed tasks
  - Filter by pending/completed

- 🎯 **Bucket List** - Dream Big, Achieve Bigger
  - Track dreams and goals together
  - Progress tracking with visual indicators
  - Status management (someday, upcoming, in progress, completed)
  - Category organization
  - Stats and achievement tracking

- 💕 **Love Center** - The Heart of the App
  - Send and receive love notes
  - Relationship stats and compatibility score
  - Random acts of love suggestions
  - Love language insights
  - Batman wisdom

- 👤 **Profile & Settings** - Your Personal Space
  - User profile with avatar
  - Level and XP system
  - Achievement badges
  - Detailed statistics
  - Settings for theme, notifications, and preferences

### Design System

- **Colors**: Tulip-inspired palette
  - Gayu's Pink (#FFB5DA)
  - B's Blue (#4A90E2)
  - Shared Purple (#B794F6)
  - Batman Dark (#1A1A2E)

- **Typography**: Beautiful, readable fonts
  - Hero, H1, H2, H3 variants
  - Body text styles
  - Caption and small text

- **Components**: Reusable UI elements
  - Custom Button component
  - Card component with variants
  - Text component with typography system
  - Input component for forms

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meandher
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your platform:
```bash
npm run ios      # For iOS (Mac only)
npm run android  # For Android
npm run web      # For Web
```

## 📱 Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation system
- **Zustand** - State management

### UI/UX
- **Expo Linear Gradient** - Beautiful gradients
- **React Native Reanimated** - Smooth animations
- **Expo Vector Icons** - Icon library

### Upcoming Integrations
- **Firebase** - Backend and authentication
- **Pinterest API** - Board integration
- **Google Calendar API** - Calendar sync
- **Spotify API** - Music integration

## 📂 Project Structure

```
meandher/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Text.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   ├── screens/          # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── TasksScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   ├── LoveScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── store/           # State management
│   │   └── useStore.ts
│   ├── theme/           # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── services/        # API and services
│   ├── utils/           # Utility functions
│   └── assets/          # Images, fonts, animations
├── App.tsx              # Main app component
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## 🎨 Design Philosophy

### Tulip Theme 🌷
- Every achievement earns tulips
- Tulip garden grows with your relationship
- Different colors represent different categories
- Visual representation of your journey together

### Batman Easter Eggs 🦇
- Playful Batman appearances throughout the app
- Motivational messages from the Dark Knight
- Hidden features and surprises
- Batman frequency can be customized in settings

### Love-Centric Design 💕
- Every interaction feels like a love letter
- Beautiful animations and transitions
- Romantic color palette
- Couple-focused features

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- [x] Basic app structure
- [x] Design system
- [x] Home screen
- [x] To-Do List
- [x] Bucket List
- [x] Love Center
- [x] Profile & Settings
- [ ] Firebase integration
- [ ] Authentication

### Phase 2: Enhancement
- [ ] Watch List feature
- [ ] Memories timeline
- [ ] Calendar integration
- [ ] Pinterest board sync
- [ ] Advanced animations
- [ ] Splash screen animation
- [ ] Batman easter eggs
- [ ] Real-time sync between partners

### Phase 3: Premium Features
- [ ] 3D tulip garden
- [ ] AI-powered suggestions
- [ ] Video memories
- [ ] Memory books
- [ ] Advanced analytics
- [ ] Relationship insights
- [ ] Custom widgets
- [ ] Apple Watch support

## 🤝 Contributing

This is a personal project for Gayu & B. However, if you'd like to suggest features or report bugs:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is private and proprietary. All rights reserved.

## 💖 Made with Love

Built with ❤️ for Gayu & B

**"Together, we can do anything"** - Batman 🦇🌷

---

## 🔧 Development Notes

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# iOS
npm run build:ios

# Android
npm run build:android
```

### Troubleshooting

**Metro bundler issues:**
```bash
npm start -- --reset-cache
```

**Dependency issues:**
```bash
rm -rf node_modules
npm install
```

**iOS specific:**
```bash
cd ios && pod install && cd ..
```

## 📧 Support

For questions or support, please open an issue in the repository.

---

**Version:** 1.0.0
**Last Updated:** January 2025
**Status:** Active Development 🚧
