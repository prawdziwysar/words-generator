export default function forceNonNullable<T>(value: T | null | undefined): T {
  if (value === undefined || value === null)
    throw Error(`Expected nonnulllable but recieved ${value}`);

  return value;
}
