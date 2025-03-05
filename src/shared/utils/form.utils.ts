import { DestroyRef, OutputEmitterRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function listenToFormChanges(
  form: FormGroup,
  isValidOutputEmitter: OutputEmitterRef<boolean>,
  destroyRef: DestroyRef
): void {
    isValidOutputEmitter.emit(form.valid);
  form.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {
    isValidOutputEmitter.emit(form.valid);
  });
}
