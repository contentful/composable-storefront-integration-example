export type DeepPartial<T, Depth extends number = 15> = Depth extends 0
  ? T
  : T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P], Prev[Depth]>;
      }
    : T;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
