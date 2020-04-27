import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function dateRangeCustomValidator(formControl: AbstractControl) {
    const dateValue: string = formControl.value;
    const  date: moment.Moment = moment(formControl.value, "YYYY-MM-DD");
    if (
        dateValue === '' ||
        date.isBefore(moment("19450102", "YYYYMMDD")) ||
        date.isAfter(moment().format("YYYYMMDD"))
    ) {
        return { invalidDateRange: true}
    }
    return null;
}