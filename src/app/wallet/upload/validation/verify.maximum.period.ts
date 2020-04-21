import { FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const verifyMaximumPeriod: ValidatorFn = (form: FormControl) => {
    const periodStart: moment.Moment = moment(form.get('periodStart').value, "YYYY-MM-DD");
    const periodEnd: moment.Moment = moment(form.get('periodEnd').value, "YYYY-MM-DD");
    const diff: number = periodEnd.diff(periodStart, 'days');
    return diff > 91 ? { periodExceeded: true } : null;
};