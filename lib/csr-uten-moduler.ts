import { decoratorParams } from "./decorator-params";
import { buildPublicDecoratorUrl, directDecoratorOrigin } from "./decorator-config";

export function buildDirectCsrEnvironmentUrl() {
  return buildPublicDecoratorUrl("/env", decoratorParams);
}

export function csrUtenModulerClientUrl() {
  return `${directDecoratorOrigin}/client.js`;
}
