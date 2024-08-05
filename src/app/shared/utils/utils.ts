import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable()
export class Utils {

  static readonly horizontalPos: MatSnackBarHorizontalPosition = 'end';
  static readonly verticalPos: MatSnackBarVerticalPosition = 'bottom';

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
}
