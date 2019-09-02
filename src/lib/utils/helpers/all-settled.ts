
export enum allSettledStatusEnum {
  f = 'fulfilled',
  o = 'overdue',
  r = 'rejected',
}

export type allSEttledOutputInterface<Value> = Array<
  {
    status: allSettledStatusEnum.f,
    value: Value,
  } |
  {
    status: allSettledStatusEnum.r,
    reason: Error,
  } |
  {
    status: allSettledStatusEnum.o,
  }
>;

export const allSettled = async <T>(
  promises: Array<
    Promise<T>
  >,
  timeout = 15000,
): Promise<
  allSEttledOutputInterface<T>
> => new Promise(resolve => {
  let fulfilledCount = 0;
  const result: allSEttledOutputInterface<T> = Array(promises.length).fill(null)
  .map<allSEttledOutputInterface<T>[0]>(
    () => ({
      status: allSettledStatusEnum.o,
    }),
  );

  const timeoutId = setTimeout(
    () => resolve(result),
    timeout,
  );

  promises.forEach(
    async (thisPromise, thisPromiseIndex) => thisPromise
      .then(data => {
        result[thisPromiseIndex] = {
          status: allSettledStatusEnum.f,
          value: data,
        };
      })
      .catch(error => {
        console.error(
          allSettled.name.toUpperCase(),
          error,
        );

        result[thisPromiseIndex] = {
          status: allSettledStatusEnum.r,
          reason: error,
        };
      })
      .finally(() => {
        if (++fulfilledCount === promises.length) {
          resolve(result);

          clearTimeout(timeoutId);
        }
      }),
  );
});
