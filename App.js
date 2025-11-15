import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Speech from 'expo-speech';
import { scheduleNotifications, cancelAllNotifications } from './src/services/notificationService';
import { THE_ANGELUS } from './src/data/prayer';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isReciting, setIsReciting] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Request notification permissions
    registerForPushNotificationsAsync().then(setNotificationPermission);

    // Schedule daily notifications
    scheduleNotifications();

    // Listen for notifications received while app is in foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Show alert when notification is received
        Alert.alert(
          'Time for The Angelus',
          'Would you like to recite The Angelus prayer?',
          [
            {
              text: 'No, thanks',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => startReciting(),
            },
          ]
        );
      }
    );

    // Listen for notification responses (when user taps notification)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { actionIdentifier } = response.actionIdentifier;
        if (actionIdentifier === 'YES_ACTION' || actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
          startReciting();
        }
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'Please enable notifications to receive prayer reminders.');
      return false;
    }

    return true;
  };

  const startReciting = () => {
    if (isReciting) {
      Speech.stop();
      setIsReciting(false);
      return;
    }

    setIsReciting(true);
    Speech.speak(THE_ANGELUS, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => {
        setIsReciting(false);
      },
      onStopped: () => {
        setIsReciting(false);
      },
      onError: (error) => {
        console.error('Speech error:', error);
        setIsReciting(false);
        Alert.alert('Error', 'Failed to recite the prayer. Please try again.');
      },
    });
  };

  const stopReciting = () => {
    Speech.stop();
    setIsReciting(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Angelus Reminder</Text>
          <Text style={styles.subtitle}>Daily Prayer Reminders</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              You will receive reminders at:
            </Text>
            <Text style={styles.timeText}>• 6:00 AM</Text>
            <Text style={styles.timeText}>• 12:00 PM (Noon)</Text>
            <Text style={styles.timeText}>• 6:00 PM</Text>
            <Text style={styles.timeText}>• 12:00 AM (Midnight)</Text>
          </View>

          <View style={styles.prayerContainer}>
            <Text style={styles.prayerTitle}>The Angelus</Text>
            <ScrollView style={styles.prayerScrollView}>
              <Text style={styles.prayerText}>{THE_ANGELUS}</Text>
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isReciting && styles.buttonStop]}
              onPress={startReciting}
              disabled={isReciting}
            >
              <Text style={styles.buttonText}>
                {isReciting ? 'Reciting...' : 'Recite Prayer Now'}
              </Text>
            </TouchableOpacity>

            {isReciting && (
              <TouchableOpacity
                style={[styles.button, styles.buttonStop]}
                onPress={stopReciting}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Notifications: {notificationPermission ? '✓ Enabled' : '✗ Disabled'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 15,
    color: '#34495e',
    marginBottom: 8,
    paddingLeft: 8,
  },
  prayerContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 250,
  },
  prayerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  prayerScrollView: {
    maxHeight: 200,
  },
  prayerText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonStop: {
    backgroundColor: '#e74c3c',
  },
  statusContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

