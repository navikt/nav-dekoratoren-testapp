import { directDecoratorParams } from "./decorator-params";
import { directSsrUrl } from "./decorator-config";

export { directSsrUrl };

export type DirectSsrFragments = {
  DECORATOR_HEAD_ASSETS: string;
  DECORATOR_HEADER: string;
  DECORATOR_FOOTER: string;
  DECORATOR_SCRIPTS: string;
};

function isFragments(value: unknown): value is DirectSsrFragments {
  if (!value || typeof value !== "object") return false;
  return ["DECORATOR_HEAD_ASSETS", "DECORATOR_HEADER", "DECORATOR_FOOTER", "DECORATOR_SCRIPTS"].every(
    (key) => typeof (value as Record<string, unknown>)[key] === "string",
  );
}

export async function fetchDirectSsrFragments(): Promise<DirectSsrFragments> {
  const url = new URL(directSsrUrl);
  Object.entries(directDecoratorParams).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`DIRECT_SSR_HTTP_${response.status}`);
  const payload: unknown = await response.json();
  if (!isFragments(payload)) throw new Error("DIRECT_SSR_INVALID_RESPONSE");
  return payload;
}
