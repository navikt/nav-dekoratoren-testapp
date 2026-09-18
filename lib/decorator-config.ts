export type DecoratorEnvironment = "dev";

export const decoratorEnvironment: DecoratorEnvironment =
  process.env.DECORATOR_ENV === "dev" ? "dev" : "dev";

export const directDecoratorOrigin = "https://dekoratoren.ekstern.dev.nav.no";

const kjorerINais = process.env.NAIS_CLUSTER_NAME === "dev-gcp";

export const ssrUtenModulerUrl = kjorerINais
  ? "http://nav-dekoratoren.personbruker/ssr"
  : `${directDecoratorOrigin}/ssr`;

export function buildPublicDecoratorUrl(
  path: string,
  params: Record<string, string>,
) {
  const url = new URL(path, `${directDecoratorOrigin}/`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );
  return url.toString();
}
