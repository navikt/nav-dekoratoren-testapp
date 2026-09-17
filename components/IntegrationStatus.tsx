"use client";

import { useEffect, useRef, useState } from "react";

export type IntegrationStatusValue = "initializing" | "success" | "error";

type Props = {
  integrationVariant: string;
  rendering: string;
  transport: string;
  initialStatus?: IntegrationStatusValue;
  errorMessage?: string;
  observe?: () => Promise<void>;
};

const labels: Record<IntegrationStatusValue, string> = {
  initializing: "initialiserer",
  success: "rendret/lastet",
  error: "feilet",
};

export function IntegrationStatus({
  integrationVariant,
  rendering,
  transport,
  initialStatus = "success",
  errorMessage,
  observe,
}: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState(errorMessage);
  const observationStarted = useRef(false);

  useEffect(() => {
    if (!observe || observationStarted.current) return;
    observationStarted.current = true;
    void observe().then(
      () => setStatus("success"),
      () => {
        setStatus("error");
        setMessage("Dekoratøren kunne ikke lastes");
      },
    );
  }, [observe]);

  return (
    <section className="status" data-status={status} data-testid="integration-status" aria-live="polite">
      <dl>
        <div>
          <dt>Integrasjon</dt>
          <dd data-testid="integration-variant">{integrationVariant}</dd>
        </div>
        <div>
          <dt>Rendering</dt>
          <dd>{rendering}</dd>
        </div>
        <div>
          <dt>Transport</dt>
          <dd>{transport}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd data-testid="integration-state">{labels[status]}</dd>
        </div>
        {message ? (
          <div>
            <dt>Teknisk melding</dt>
            <dd>{message}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
