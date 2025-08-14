import { Panel } from "primereact/panel";

export function LoadingPanel({ message = "Loading..." }: { message?: string }) {
  return (
    <Panel
      header={message}
      className="mx-auto mt-5 w-full sm:w-8 md:w-6 lg:w-4"
    />
  );
}

export function ErrorPanel({ error }: { error: string }) {
  return (
    <Panel
      header="Error"
      className="mx-auto mt-5 w-full sm:w-8 md:w-6 lg:w-4 text-red-600"
    >
      {error}
    </Panel>
  );
}

export function EmptyPanel({
  message = "No user found",
}: {
  message?: string;
}) {
  return (
    <Panel
      header={message}
      className="mx-auto mt-5 w-full sm:w-8 md:w-6 lg:w-4"
    />
  );
}
