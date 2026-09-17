const naisAppName = process.env.NAIS_APP_NAME ?? "Klarer ikke hente";
const naisNamespace = process.env.NAIS_NAMESPACE ?? "Klarer ikke hente";

export const decoratorParams = {
  context: "privatperson" as const,
  language: "nb" as const,
  origin: "nav-dekoratoren-testapp",
  teamName: `${naisAppName}.${naisNamespace}`,
};

export const directDecoratorParams = {
  ...decoratorParams,
  teamName: "navno.navno",
};
