const naisAppName = process.env.NAIS_APP_NAME ?? "nav-dekoratoren-testapp";
const naisNamespace = process.env.NAIS_NAMESPACE ?? "personbruker";

export const teamName = `${naisAppName}.${naisNamespace}`;

export const decoratorParams = {
  context: "privatperson" as const,
  language: "nb" as const,
  origin: "nav-dekoratoren-testapp",
};
