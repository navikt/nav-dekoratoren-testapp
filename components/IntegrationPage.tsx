import type { ReactNode } from "react";
import { IntegrationStatus, type IntegrationStatusValue } from "./IntegrationStatus";

type Props = {
  title: string;
  description: string;
  integrationVariant: string;
  rendering: string;
  transport: string;
  children?: ReactNode;
  initialStatus?: IntegrationStatusValue;
  errorMessage?: string;
  observe?: () => Promise<void>;
};

export function IntegrationPage(props: Props) {
  return (
    <main>
      <p>
        <a href="/">Til forsiden</a>
      </p>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <IntegrationStatus {...props} />
      {props.children}
    </main>
  );
}
