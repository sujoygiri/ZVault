import React from 'react';

/**
 * Individual functions for each notification type
 * These handle the specific styling/logic for Info, Warning, and Error
 */
type NotificationType = "info" | "warning" | "error";
type NotificationView = "banner" | "toast"

const InfoNotification = (view: NotificationView, message: string) => {
  const styles = view === 'banner' 
    ? 'bg-blue-100 border-blue-500 text-blue-700 p-4 w-full' 
    : 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg animate-bounce';

  return <div className={styles}><strong>Info:</strong> {message}</div>;
};

const WarningNotification = (view: NotificationView, message: string) => {
  const styles = view === 'banner' 
    ? 'bg-yellow-100 border-yellow-500 text-yellow-700 p-4 w-full' 
    : 'fixed bottom-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-lg';

  return <div className={styles}><strong>Warning:</strong> {message}</div>;
};

const ErrorNotification = (view: NotificationView, message: string) => {
  const styles = view === 'banner' 
    ? 'bg-red-100 border-red-500 text-red-700 p-4 w-full' 
    : 'fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg border-2 border-red-800';

  return <div className={styles}><strong>Error:</strong> {message}</div>;
};

/**
 * Main Exported Component
 * @param {string} message - The text to display
 * @param {string} type - info | warning | error
 * @param {string} view - banner | toast
 */
export const Notification = ({ message, type, view }: {message: string, type: NotificationType, view: NotificationView}) => {
  if (!message) return null;

  switch (type) {
    case 'info':
      return InfoNotification(view, message);
    case 'warning':
      return WarningNotification(view, message);
    case 'error':
      return ErrorNotification(view, message);
    default:
      return null;
  }
};