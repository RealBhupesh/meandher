# 🌷 Gayu & B - Our Love Story

**The Ultimate Couples Companion App - Where Love Meets Productivity**

## 💕 About

Gayu & B is a beautiful couples app that combines romance, productivity, and shared dreams in one place. Featuring tulip-themed design, playful Batman easter eggs, Firebase backend, and everything you need to build your dream life together.

## ✨ Features

### Fully Implemented Features ✅

#### 🌷 **Splash Screen** - Beautiful Tulip Blooming Animation
- Animated tulip growing from seed to full flower
- Smooth spring physics animations
- Batman swoops in with welcome message
- Sets the perfect romantic mood

#### 🔐 **Authentication System** - Secure & Beautiful
- Email & password authentication
- Google Sign-In integration
- Beautiful login and signup screens with tulip theme
- Password reset functionality
- User profile creation and management
- Session persistence
- Firebase Authentication backend

####
 🏠 **Home Dashboard** - Our Universe
- Together counter showing months and days in real-time
- Tulip garden visualization preview (247 tulips planted!)
- Quick access cards to all features
- Today's magic section
- Calendar preview with upcoming events
- Batman easter eggs and wisdom
- Batcave secret feature card
- Navigation to all app sections

#### ✅ **To-Do List** - Productivity, Together
- Full CRUD operations (Create, Read, Update, Delete)
- Assign tasks to Gayu, B, or both (👧👦👫)
- Priority levels with emoji indicators: Low (💚), Medium (💛), High (🧡), Urgent (❤️)
- Due dates and rich descriptions
- Subtasks support (in data model)
- Progress tracking with visual bar
- Tulip rewards (+2 tulips) for completed tasks
- Filter by all/pending/completed tabs
- Task completion animations
- Firebase Firestore ready for real-time sync

#### 🎯 **Bucket List** - Dream Big, Achieve Bigger
- Track dreams and goals together
- Progress tracking with percentage indicators (0-100%)
- Status management:
  - Someday (planning stage)
  - Upcoming (scheduled soon)
  - In Progress (actively working on)
  - Completed (achieved!)
- Category organization (travel, adventure, romance, food, learning, experience)
- Stats dashboard showing total, completed, and in-progress
- Visual progress bars for each dream
- Tulip rewards (4 tulips) for completed dreams
- Action plans and budget tracking (in data model)

#### 🎬 **Watch List** - Movie Nights, Planned
- Add movies, TV series, and documentaries
- Full CRUD with beautiful bottom-sheet modals
- Mark items as watched with couple rating system
- Individual star ratings (1-5 stars) for both Gayu & B
- Calculate average ratings and compatibility
- Filter by to-watch and watched
- "Up Next" section (top 3 unwatched)
- Stats: total items, watched count, average rating
- Genre and type categorization
- Perfect match indicator

#### 💝 **Memories** - Our Love Story Timeline
- Create photo memories with multiple images (up to 10)
- Photo picker with device gallery integration
- Captions and rich descriptions
- Mood selector with emoji:
  - 😍 Loved it
  - 😊 Happy
  - 🥹 Emotional
  - 😂 Hilarious
  - 🤗 Grateful
- Favorite/heart system with like counter
- Filter by all or favorites
- Beautiful photo grid layout (3 photos per row)
- Stats tracking (total memories, favorites, total hearts)
- Timeline view sorted by date (newest first)
- Link memories to bucket list items or tasks

#### 📅 **Calendar** - Our Life, Synchronized
- Create and manage events
- Assign events to Gayu, B, or both
- Upcoming and past events sections
- Smart event icons based on keywords:
  - 🍝 Date nights
  - 🎬 Movie marathons
  - 🎉 Anniversaries
  - 🏃 Workouts
  - 📅 General events
- Full CRUD with beautiful modals
- Date and time tracking
- Event descriptions and locations
- Stats dashboard (upcoming, past, total)
- Ready for Google Calendar sync

#### 💕 **Love Center** - The Heart of the App
- Send and receive love notes
- Relationship compatibility score (94%!)
- Random acts of love suggestions:
  - Send voice messages
  - Order surprise desserts
  - Share memories from a year ago
  - Create playlists
- Love language insights:
  - Gayu: Quality Time ⭐⭐⭐⭐⭐, Words of Affirmation ⭐⭐⭐⭐
  - B: Physical Touch ⭐⭐⭐⭐⭐, Quality Time ⭐⭐⭐⭐
- Relationship stats (messages, dates, inside jokes)
- Batman wisdom and relationship tips
- Love notes archive

#### 👤 **Profile & Settings** - Your Personal Space
- User profile with avatar
- Level and XP progression system (Level 12 - "Love Architect")
- Progress bar to next level
- Achievement badges system (24/50 unlocked)
- Detailed statistics:
  - Tasks Completed: 127
  - Dreams Achieved: 4
  - Memories Created: 98
  - Love Notes Sent: 134
  - Tulips Earned: 428 🌷
- Settings:
  - Theme (Light/Dark/Auto)
  - Notifications toggle
  - Batman frequency (Rare/Occasional/Often)
  - Tulip density (Low/Medium/High)
- Connected accounts management
- App version and info

### Design System

- **Colors**: Tulip-inspired palette
  - Gayu's Pink (#FFB5DA)
  - B's Blue (#4A90E2)
  - Shared Purple (#B794F6)
  - Batman Dark (#1A1A2E)
  - Tulip Red (#FF6B9D)
  - Tulip Yellow (#FFD93D)

- **Typography**: Beautiful, readable fonts
  - Hero, H1, H2, H3 variants
  - Body text styles (Large, Regular, Small)
  - Caption text
  - All with proper line heights

- **Components**: Reusable UI elements
  - Custom Button (4 variants, 3 sizes)
  - Card (4 variants with shadows)
  - Text (typography system)
  - Input (with icons, validation)

- **Animations**:
  - Splash screen tulip blooming
  - Spring physics throughout
  - Smooth page transitions
  - Modal slide-ups
  - Button press feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Firebase account (for backend)

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

3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password & Google)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase config to `src/services/firebase.ts`

4. Configure environment variables:
```bash
# Create .env file with your Firebase credentials
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm start
```

6. Run on your platform:
```bash
npm run ios      # For iOS (Mac only)
npm run android  # For Android
npm run web      # For Web
```

## 📱 Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** (SDK 54) - Development platform
- **TypeScript** - Type-safe development
- **React Navigation** - Stack & Tab navigation
- **Zustand** - State management

### Backend & Services
- **Firebase** - Complete backend solution
  - Firebase Authentication (Email/Password, Google)
  - Firestore Database (NoSQL, real-time)
  - Firebase Storage (image/video storage)
- **Expo Image Picker** - Photo selection
- **Expo Calendar** - Calendar integration

### UI/UX
- **Expo Linear Gradient** - Beautiful gradients
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Vector Icons** (Ionicons) - Icon library

### Future Integrations
- Pinterest API - Board sync
- Google Calendar API - Advanced sync
- Spotify API - Music integration
- Push Notifications - Real-time alerts

## 📂 Project Structure

```
meandher/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Text.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   ├── screens/             # App screens
│   │   ├── auth/            # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── TasksScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   ├── WatchListScreen.tsx
│   │   ├── MemoriesScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── LoveScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── services/            # Backend services
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   └── firestoreService.ts
│   ├── store/              # State management
│   │   └── useStore.ts
│   ├── theme/              # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── assets/             # Images, fonts, animations
├── App.tsx                 # Main app component
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── README.md               # This file
```

## 🎨 Design Philosophy

### Tulip Theme 🌷
- Every achievement earns tulips
- Tulip garden grows with your relationship
- Different colors represent different categories
- Visual representation of your journey together
- 247 tulips planted and counting!

### Batman Easter Eggs 🦇
- Playful Batman appearances throughout the app
- Motivational messages from the Dark Knight
- "Batcave" secret features card on home screen
- Batman wisdom in Love Center
- Splash screen Batman swoosh
- Frequency can be customized in settings

### Love-Centric Design 💕
- Every interaction feels like a love letter
- Beautiful animations and transitions
- Romantic color palette (pink, purple, blue)
- Couple-focused features (assign to both, ratings together)
- Compatibility scores and insights

## 🗺️ Roadmap

### ✅ Phase 1: MVP - COMPLETED!
- [x] Basic app structure with TypeScript
- [x] Complete design system
- [x] Splash screen with animation
- [x] Firebase integration
- [x] Authentication (Email & Google)
- [x] Home dashboard
- [x] To-Do List with full CRUD
- [x] Bucket List with progress tracking
- [x] Watch List with ratings
- [x] Memories with photo upload
- [x] Calendar with events
- [x] Love Center
- [x] Profile & Settings
- [x] Batman easter eggs

### 🚧 Phase 2: Enhancement (In Progress)
- [ ] Real-time sync between partners (Firestore ready)
- [ ] Couple pairing system with invite codes
- [ ] Task/Dream CRUD modals (current: in-line editing)
- [ ] Pinterest board integration
- [ ] Advanced animations and micro-interactions
- [ ] Push notifications for reminders
- [ ] 3D tulip garden visualization
- [ ] Dark mode implementation

### 🎯 Phase 3: Premium Features
- [ ] AI-powered date suggestions
- [ ] Video memories support
- [ ] Auto-generated memory books
- [ ] Advanced relationship analytics
- [ ] Relationship insights and trends
- [ ] Custom app widgets
- [ ] Apple Watch companion app
- [ ] Spotify playlist integration
- [ ] Anniversary auto-celebration
- [ ] Surprise generator with integrations

## 🤝 Contributing

This is a personal project for Gayu & B. However, if you'd like to suggest features or report bugs:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
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
rm -rf node_modules package-lock.json
npm install
```

**Firebase connection issues:**
- Check your Firebase configuration in `src/services/firebase.ts`
- Ensure Firebase project has Authentication and Firestore enabled
- Check Firebase console for any security rules issues

**Image picker not working:**
```bash
expo install expo-image-picker
```

## 📧 Support

For questions or support, please open an issue in the repository.

---

## 📊 Current Stats

- **Total Files**: 36
- **Lines of Code**: ~18,000+
- **Components**: 4 reusable
- **Screens**: 12 (including auth)
- **Features**: 9 major features
- **Navigation Routes**: 10+
- **Type Definitions**: Complete TypeScript coverage

---

**Version:** 2.0.0
**Last Updated:** January 2025
**Status:** Phase 1 Complete ✅ | Phase 2 In Progress 🚧
**Built with**: React Native, Expo, TypeScript, Firebase, Love 💕
