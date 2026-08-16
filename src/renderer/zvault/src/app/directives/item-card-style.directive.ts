import { computed, Directive, input } from '@angular/core';

export interface CardStyleClasses {
  borderColorClass: string;
  logoBgColorClass: string;
  badgeBgColorClass: string;
  badgeTextColorClass: string;
}

@Directive({
  selector: '[appItemCardStyleDirective]',
  exportAs: 'itemCardStyle'
})
export class ItemCardStyleDirective {
  category = input.required<string>({ alias: 'appItemCardStyleDirective' });
  // style automatically updates if category changes
  styles = computed<CardStyleClasses>(() => {
    const cat = this.category()?.toLowerCase();

    switch (cat) {
      case 'personal':
        return {
          borderColorClass: 'border-t-purple-400 dark:border-t-purple-400',
          logoBgColorClass: 'bg-violet-600 dark:bg-violet-600',
          badgeBgColorClass: 'bg-violet-100 dark:bg-violet-900/40',
          badgeTextColorClass: 'text-violet-700 dark:text-violet-200'
        };
      case 'work':
        return {
          borderColorClass: 'border-t-blue-400 dark:border-t-blue-400',
          logoBgColorClass: 'bg-sky-600 dark:bg-sky-600',
          badgeBgColorClass: 'bg-sky-100 dark:bg-sky-900/40',
          badgeTextColorClass: 'text-sky-700 dark:text-sky-200'
        };
      case 'financial':
      case 'finance':
        return {
          borderColorClass: 'border-t-emerald-400 dark:border-t-emerald-400',
          logoBgColorClass: 'bg-emerald-600 dark:bg-emerald-600',
          badgeBgColorClass: 'bg-emerald-100 dark:bg-emerald-900/40',
          badgeTextColorClass: 'text-emerald-700 dark:text-emerald-200'
        };
      default:
        return {
          borderColorClass: 'border-t-slate-400 dark:border-t-slate-400',
          logoBgColorClass: 'bg-slate-600 dark:bg-slate-600',
          badgeBgColorClass: 'bg-slate-100 dark:bg-slate-800',
          badgeTextColorClass: 'text-slate-700 dark:text-slate-200'
        };
    }
  });
}
