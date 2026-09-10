"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import type { PendingStudent } from "@/lib/services/schools";
import { formatDate } from "@/lib/utils";

export function VerificationQueue({ students }: { students: PendingStudent[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [handled, setHandled] = useState<Set<string>>(new Set());

  async function decide(studentId: string, decision: "verified" | "rejected") {
    setBusyId(studentId);
    const res = await fetch("/api/school/verifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, decision }),
    });
    const result = await res.json();
    setBusyId(null);
    if (result.success) {
      setHandled((prev) => new Set(prev).add(studentId));
      router.refresh();
    }
  }

  const remaining = students.filter((s) => !handled.has(s.id));

  if (remaining.length === 0) {
    return <p className="text-sm text-ink-soft">No students waiting on verification right now.</p>;
  }

  return (
    <div className="space-y-3">
      {remaining.map((student) => (
        <Card key={student.id}>
          <CardBody className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-ink">{student.fullName}</p>
              <p className="text-sm text-ink-soft">
                Age {student.age} · {student.location ?? "No location set"} · Signed up{" "}
                {formatDate(student.createdAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={busyId === student.id}
                onClick={() => decide(student.id, "rejected")}
              >
                Reject
              </Button>
              <Button size="sm" disabled={busyId === student.id} onClick={() => decide(student.id, "verified")}>
                Verify
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
