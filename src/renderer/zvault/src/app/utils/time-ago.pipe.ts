import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    // Convert the string ISO timestamp into a JavaScript Date object
    const date = typeof value === 'string' ? new Date(value) : value;
    const now = new Date();
    
    // Calculate the difference in seconds
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Handle future dates or system clock mismatch edge cases
    if (seconds < 0) return 'Just now'; 

    // Time intervals defined in seconds
    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    // Calculate elapsed intervals
    for (const key in intervals) {
      const counter = Math.floor(seconds / intervals[key]);
      if (counter > 0) {
        if (counter === 1) {
          return `1 ${key} ago`; // Singular (e.g., "1 day ago")
        } else {
          return `${counter} ${key}s ago`; // Plural (e.g., "3 days ago")
        }
      }
    }

    return 'Just now';
  }
}
