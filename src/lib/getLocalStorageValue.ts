export function getLocalStorageValue<T = string>(key: string, fallback?: T): T | null {
    if (typeof window === 'undefined') return fallback ?? null;
  
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return fallback ?? null;
  
      try {
        return JSON.parse(stored);
      } catch {
        return stored as unknown as T;
      }
    } catch (error) {
      console.error(`Erro ao ler localStorage[${key}]`, error);
      return fallback ?? null;
    }
  }
  