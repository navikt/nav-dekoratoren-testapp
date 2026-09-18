type TechnicalEvent =
  | "decorator_integration_started"
  | "decorator_ssr_rendered"
  | "decorator_csr_loaded"
  | "decorator_integration_failed"
  | "decorator_version_updated";

export function logTechnicalEvent(
  event: TechnicalEvent,
  integrationVariant: string,
  transport: string,
  detalj?: string,
) {
  const entry = {
    event,
    integrationVariant,
    transport,
    ...(detalj ? { detalj } : {}),
  };
  console.info(JSON.stringify(entry));
}
