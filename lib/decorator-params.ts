const naisAppName = process.env.NAIS_APP_NAME ?? "Fant ikke appnavn";
const naisNamespace = process.env.NAIS_NAMESPACE ?? "Fant ikke namespace";

export const teamName = `${naisAppName}.${naisNamespace}`;

export const decoratorParams = {
  context: "privatperson" as const,
  language: "nb" as const,
  origin: "nav-dekoratoren-status",
};
