export type DecoratorEnvironment = "dev";

export const decoratorEnvironment: DecoratorEnvironment =
  process.env.DECORATOR_ENV === "dev" ? "dev" : "dev";

export const directDecoratorOrigin = "https://dekoratoren.ekstern.dev.nav.no";
export const ssrUtenModulerUrl = "http://nav-dekoratoren.personbruker/ssr";

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
