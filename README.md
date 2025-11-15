# Angelus Reminder App

A mobile app that reminds you to say The Angelus prayer at 6:00 AM, 12:00 PM (Noon), 6:00 PM, and 12:00 AM (Midnight). When you accept the reminder, the app will recite the prayer using text-to-speech.

## Features

- **Daily Reminders**: Automatically scheduled notifications at four times daily
- **Text-to-Speech**: Recites The Angelus prayer when you accept the reminder
- **Manual Recitation**: Option to recite the prayer at any time
- **Cross-Platform**: Works on both iOS and Android

## Installation

1. Navigate to the project directory:
```bash
cd angelus-reminder-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Run on your device:
   - **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Permissions

The app requires the following permissions:
- **Notifications**: To send daily prayer reminders
- **Audio**: To recite the prayer using text-to-speech

## How It Works

1. When you first open the app, it will request notification permissions
2. The app automatically schedules four daily notifications:
   - 6:00 AM
   - 12:00 PM (Noon)
   - 6:00 PM
   - 12:00 AM (Midnight)
3. When a notification appears, you can tap it to open the app
4. The app will show an alert asking if you'd like to recite the prayer
5. If you accept, the app will use text-to-speech to recite The Angelus prayer
6. You can also manually trigger the prayer recitation at any time using the button in the app

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tooling
- **expo-notifications**: For scheduling and displaying notifications
- **expo-speech**: For text-to-speech functionality

## Notes

- Notifications are scheduled daily and will repeat automatically
- The app must have notification permissions enabled to receive reminders
- Text-to-speech requires device audio capabilities
- Asset files (icon.png, splash.png, etc.) referenced in app.json are optional - Expo will use default assets if they're not present

## Project Structure

```
angelus-reminder-app/
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── src/
│   ├── services/
│   │   └── notificationService.js  # Notification scheduling logic
│   └── data/
│       └── prayer.js     # The Angelus prayer text
└── README.md
```

