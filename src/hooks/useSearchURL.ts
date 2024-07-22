import queryString from "query-string";

export const useSyncSearchParamsURL = () => {
  // You can customize options based on your needs
  const getItem = (key: string): string => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? "";
    return JSON.parse(storedValue);
  };
  const setItem = (key: string, newValue: any): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    location.hash = searchParams.toString();
  };
  const removeItem = (key: string): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();
  };
  return {
    queryString,
    getItem,
    setItem,
    removeItem,
  };
};
