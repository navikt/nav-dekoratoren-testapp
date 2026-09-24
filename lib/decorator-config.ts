export type DecoratorEnvironment = "dev" | "prod";

export const decoratorEnvironment: DecoratorEnvironment =
  process.env.DECORATOR_ENV === "prod" ? "prod" : "dev";

export function getDecoratorEnvironment(
  hostname = typeof window === "undefined"
    ? undefined
    : window.location.hostname,
): DecoratorEnvironment {
  if (!hostname) {
    return decoratorEnvironment;
  }

  return hostname.endsWith(".ansatt.nav.no") ? "prod" : "dev";
}

export function getDirectDecoratorOrigin() {
  return getDecoratorEnvironment() === "prod"
    ? "https://www.nav.no/dekoratoren"
    : "https://dekoratoren.ekstern.dev.nav.no";
}

export const directDecoratorOrigin = getDirectDecoratorOrigin();

const kjorerINais =
  process.env.NAIS_CLUSTER_NAME === `${decoratorEnvironment}-gcp`;

export const ssrUtenModulerUrl = kjorerINais
  ? "http://nav-dekoratoren.personbruker/ssr"
  : `${directDecoratorOrigin}/ssr`;

export function buildPublicDecoratorUrl(
  path: string,
  params: Record<string, string>,
) {
  const url = new URL(path.replace(/^\//, ""), `${directDecoratorOrigin}/`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );
  return url.toString();
}
