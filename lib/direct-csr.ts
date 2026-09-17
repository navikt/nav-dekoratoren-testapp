import { directDecoratorParams } from "./decorator-params";
import { buildPublicDecoratorUrl, directDecoratorOrigin } from "./decorator-config";

export function buildDirectCsrEnvironmentUrl() {
  return buildPublicDecoratorUrl("/env", directDecoratorParams);
}

export function directCsrClientUrl() {
  return `${directDecoratorOrigin}/client.js`;
}
