type TechnicalEvent =
  | "decorator_integration_started"
  | "decorator_ssr_rendered"
  | "decorator_csr_loaded"
  | "decorator_integration_failed";

export function logTechnicalEvent(
  event: TechnicalEvent,
  integrationVariant: string,
  transport: string,
  errorCode?: string,
) {
  const entry = {
    event,
    integrationVariant,
    transport,
    ...(errorCode ? { errorCode } : {}),
  };
  console.info(JSON.stringify(entry));
}
