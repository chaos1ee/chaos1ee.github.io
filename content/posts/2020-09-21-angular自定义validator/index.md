---
title: Angular自定义Validator
author: Li Hao
date: '2020-09-21'
excerpt: 在Angular中以指令的方式自定义同步和异步Validators
hero: images/potter-4682257_1280.jpg
---
```typescript
import { K8sApiService, matchLabelsToString } from '@alauda/common-snippet';
import { Directive, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

import { RESOURCE_TYPES } from 'app/typings';

import { TdsqlAccount } from '../../types';

@Directive({
  selector: '[rcAccountPattern][formControlName],[rcAccountPattern][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TdsqlAccountPatternDirective),
      multi: true,
    },
  ],
})
export class TdsqlAccountPatternDirective implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (
      !/^[A-Za-z][\w-]*$/.test(value) ||
      ['tdsql', 'tdsqlsys_*'].includes(value)
    ) {
      return { accountPattern: true };
    }

    return null;
  }
}

@Directive({
  selector:
    '[rcAccountDuplicate][formControlName],[rcAccountDuplicate][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => TdsqlAccountDuplicateDirective),
      multi: true,
    },
  ],
})
export class TdsqlAccountDuplicateDirective implements AsyncValidator {
  @Input('rcAccountDuplicate') instanceName: string;

  constructor(private readonly k8sApi: K8sApiService) {}

  validate(c: AbstractControl): Observable<ValidationErrors | null> {
    return timer(400).pipe(
      first(),
      switchMap(_ =>
        this.k8sApi.getGlobalResourceList<TdsqlAccount>({
          type: RESOURCE_TYPES.TDSQL_ACCOUNTS,
          queryParams: {
            fieldSelector: matchLabelsToString({
              'metadata.name': `${this.instanceName}.${c.value as string}`,
            }),
          },
        }),
      ),
      map(({ items }) => {
        return !!items && items.length > 0
          ? { accountDuplicate: 'Username exists already' }
          : null;
      }),
      catchError(() => of(null)),
    );
  }
}
```

参考：

1. https://angular.io/api/forms/AsyncValidator

2. https://medium.com/grano/using-custom-async-validators-with-angular-b85a9fe9e298
