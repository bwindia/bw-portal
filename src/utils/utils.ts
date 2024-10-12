import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success" | "message",
  path: string,
  message: string,
  searchParamsUrl?: string | null
) {
  let url = `${path}?${type}=${encodeURIComponent(message)}`;

  // If searchParams is provided, add them to the URL
  if (searchParamsUrl) {
    const searchParams = new URL(searchParamsUrl).searchParams;
    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (key === "message") url += `&${key}=${encodeURIComponent(value)}`;
      });
    }
  }
  return redirect(url)
}
