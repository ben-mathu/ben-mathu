import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

const horizontalPos: MatSnackBarHorizontalPosition = 'end';
const verticalPos: MatSnackBarVerticalPosition = 'bottom';

export function parseAndFormatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "2-digit"}, {day: "2-digit"}];

  return options.map((option) => {
    const formatter = new Intl.DateTimeFormat('en', option);
    return formatter.format(new Date(date));
  }).join('-');
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "numeric"}, {day: "numeric"}];

  return options.map((option) => {
    const formatter = new Intl.DateTimeFormat('en', option);
    return formatter.format(date);
  }).join(' ');
}

export function showSnackBar(message: string, snackbar: MatSnackBar) {
  snackbar.open(message, 'Ok',
    {
      horizontalPosition: horizontalPos,
      verticalPosition: verticalPos,
      duration: 5000
    }
  );
}
