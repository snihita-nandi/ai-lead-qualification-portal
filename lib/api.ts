// Placeholder API client module
// Replace with actual fetch/axios implementation

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  throw new Error(`fetchApi: not implemented — endpoint: ${endpoint}, options: ${JSON.stringify(options)}`);
}
