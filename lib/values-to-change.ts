export function getChangedValues<T extends object>(
  current: T,
  original: T
): Partial<T> {
  const changedEntries = Object.entries(current).reduce((acc, [key, value]) => {
    const originalValue = original[key as keyof T];

    if (Array.isArray(value) && Array.isArray(originalValue)) {
      // Basic array comparison (shallow for objects inside)
      const hasArrayChanged =
        value.length !== originalValue.length ||
        value.some(
          (item, index) =>
            JSON.stringify(item) !== JSON.stringify(originalValue[index])
        );

      if (hasArrayChanged)
        //@ts-ignore
        acc[key] = value;
    } else if (typeof value === "object" && value !== null) {
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        //@ts-ignore
        acc[key] = value;
      }
    } else {
      if (value !== originalValue) {
        //@ts-ignore
        acc[key] = value;
      }
    }

    return acc;
  }, {} as Partial<T>);

  return changedEntries;
}
