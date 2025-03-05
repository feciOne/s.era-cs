import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class VillainsComponent implements CanComponentDeactivate { ...
//
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const YouWillLostYourProgressGuard: CanDeactivateFn<CanComponentDeactivate> = (
    component: CanComponentDeactivate
) => {
        if (component.canDeactivate()) {
            console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - allowed`);
            return true;
        } else {
            console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - not allowed`);
            return false;
    }
}