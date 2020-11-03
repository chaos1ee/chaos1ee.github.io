---
title: 在Angular中自定义Validator
date: '2020-09-21'
category: 'Angular'
draft: false
---

在 angular 中给表单校验的方式有多种：

- 指令的方式，继承 Validator、AsyncValidator 类
- 定义 Validator 的衍生类，为该类定义新的校验方法
- 给 FormBuilder 传递 ValidatorFn 类型的参数

今天我们来介绍一下`指令的方式`实现表单校验。

## 同步的表单校验器

```typescript
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
    const value = c.value

    if (
      !/^[A-Za-z][\w-]*$/.test(value) ||
      ['tdsql', 'tdsqlsys_*'].includes(value)
    ) {
      return { accountPattern: true }
    }

    return null
  }
}
```

## 异步的表单校验器

```typescript
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
  @Input('rcAccountDuplicate') instanceName: string

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
        })
      ),
      map(({ items }) => {
        return !!items && items.length > 0
          ? { accountDuplicate: 'Username exists already' }
          : null
      }),
      catchError(() => of(null))
    )
  }
}
```

参考：

1. https://angular.io/api/forms/AsyncValidator
2. https://medium.com/grano/using-custom-async-validators-with-angular-b85a9fe9e298
