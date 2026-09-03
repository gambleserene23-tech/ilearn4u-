import { Card, CardBody } from "@/components/ui/Card";
import type { MessageThread } from "@/data/types";

export function ThreadList({
  threads,
  getCounterpartName,
}: {
  threads: MessageThread[];
  getCounterpartName: (thread: MessageThread) => string;
}) {
  if (threads.length === 0) {
    return <p className="mt-6 text-sm text-ink-soft">No conversations yet.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {threads.map((thread) => {
        const last = thread.messages[thread.messages.length - 1];
        return (
          <Card key={thread.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{thread.subject}</p>
                  <p className="text-xs text-ink-soft">with {getCounterpartName(thread)}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 border-t border-black/5 pt-3">
                {thread.messages.map((m) => (
                  <div key={m.id} className="text-sm">
                    <span className="font-medium text-ink">{m.senderName}: </span>
                    <span className="text-ink-soft">{m.body}</span>
                  </div>
                ))}
              </div>
              {last && <p className="mt-2 text-xs text-ink-soft">Last updated {new Date(last.sentAt).toLocaleDateString("en-AU")}</p>}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
