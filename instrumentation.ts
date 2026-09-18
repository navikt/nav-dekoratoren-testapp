export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { registrerVersjonslytter } = await import("./instrumentation-node");
    await registrerVersjonslytter();
  } catch (error) {
    const detalj = error instanceof Error ? error.message : "Ukjent feil";
    console.info(
      JSON.stringify({ event: "instrumentation_register_failed", detalj }),
    );
  }
}
