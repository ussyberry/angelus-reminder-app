import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Notification identifiers
const NOTIFICATION_IDS = {
  SIX_AM: 'angelus-6am',
  NOON: 'angelus-noon',
  SIX_PM: 'angelus-6pm',
  MIDNIGHT: 'angelus-midnight',
};

/**
 * Schedule all daily Angelus reminders
 */
export async function scheduleNotifications() {
  try {
    // Cancel existing notifications first
    await cancelAllNotifications();

    // Get current date
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Schedule 6:00 AM
    await scheduleDailyNotification(
      NOTIFICATION_IDS.SIX_AM,
      'Time for The Angelus',
      'It\'s 6:00 AM. Would you like to recite The Angelus prayer?',
      6,
      0
    );

    // Schedule 12:00 PM (Noon)
    await scheduleDailyNotification(
      NOTIFICATION_IDS.NOON,
      'Time for The Angelus',
      'It\'s 12:00 PM. Would you like to recite The Angelus prayer?',
      12,
      0
    );

    // Schedule 6:00 PM
    await scheduleDailyNotification(
      NOTIFICATION_IDS.SIX_PM,
      'Time for The Angelus',
      'It\'s 6:00 PM. Would you like to recite The Angelus prayer?',
      18,
      0
    );

    // Schedule 12:00 AM (Midnight)
    await scheduleDailyNotification(
      NOTIFICATION_IDS.MIDNIGHT,
      'Time for The Angelus',
      'It\'s 12:00 AM. Would you like to recite The Angelus prayer?',
      0,
      0
    );

    console.log('All notifications scheduled successfully');
  } catch (error) {
    console.error('Error scheduling notifications:', error);
  }
}

/**
 * Schedule a daily notification at a specific time
 */
async function scheduleDailyNotification(identifier, title, body, hour, minute) {
  try {
    // Create trigger for daily notification
    const trigger = {
      hour,
      minute,
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      identifier,
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        categoryIdentifier: 'ANGELUS_REMINDER',
        data: { prayerTime: identifier },
      },
      trigger,
    });

    console.log(`Scheduled notification: ${identifier} at ${hour}:${minute.toString().padStart(2, '0')}`);
  } catch (error) {
    console.error(`Error scheduling notification ${identifier}:`, error);
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling notifications:', error);
  }
}

/**
 * Get all scheduled notifications (for debugging)
 */
export async function getAllScheduledNotifications() {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

