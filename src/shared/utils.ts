export function useGenerateRandomString() {
  return (Date.now() * Math.random() * 1e5).toString(36);
}
