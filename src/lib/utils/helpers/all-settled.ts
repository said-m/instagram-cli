
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
  }
>;

export const allSettled = async <T>(
  promises: Array<
    Promise<T>
  >,
): Promise<
  allSEttledOutputInterface<T>
> => new Promise(resolve => {
  let fulfilledCount = 0;
  const result: allSEttledOutputInterface<T> = Array(promises.length).fill(null);

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
        }
      }),
  );
});
