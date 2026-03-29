type UpdaterFn<T> = (current: T) => T;

export function getData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setData<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function updateData<T>(key: string, fallback: T, updaterFn: UpdaterFn<T>): T {
  const current = getData<T>(key, fallback);
  const updated = updaterFn(current);
  setData(key, updated);
  return updated;
}