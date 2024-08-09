import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { preferredTheme } from "../services/theme/theme-manager.service";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class Utils {
  destroyed = new Subject<void>();

  static readonly horizontalPos: MatSnackBarHorizontalPosition = 'end';
  static readonly verticalPos: MatSnackBarVerticalPosition = 'bottom';

  private _screenState!: Observable<string> | undefined;

  get screenState(): Observable<string> | undefined {
    return this._screenState;
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.observeScreenSizeChange();
  }

  parseAndFormatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "2-digit"}, {day: "2-digit"}];

    return options.map((option) => {
      const formatter = new Intl.DateTimeFormat('en', option);
      return formatter.format(new Date(date));
    }).join('-');
  }

  formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "numeric"}, {day: "numeric"}];

    return options.map((option) => {
      const formatter = new Intl.DateTimeFormat('en', option);
      return formatter.format(date);
    }).join(' ');
  }

  showSnackBar(message: string, snackbar: MatSnackBar) {
    snackbar.open(message, 'Ok',
      {
        horizontalPosition: Utils.horizontalPos,
        verticalPosition: Utils.verticalPos,
        duration: 5000
      }
    );
  }

  /**
   * Changes the first letter to uppercase
   */
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getPreferredTheme() {
    return preferredTheme();
  }

  observeScreenSizeChange() {
    this._screenState = new Observable(subscriber => {
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).pipe(takeUntil(this.destroyed)).forEach(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            subscriber.next(query);
          }
        }
      });
    })
  }

  unsubscribe() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
