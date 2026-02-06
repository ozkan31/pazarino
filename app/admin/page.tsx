"use client";

import { useEffect, useState } from "react";

type LogEntry = {
  id: string;
  timestamp: string;
  severity: string;
  message: string;
  correlationId: string;
  taxonomyCode?: string;
};

type BackupReport = {
  id: string;
  createdAt: string;
  status: string;
  filePath?: string;
};

export default function AdminPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [errors, setErrors] = useState<LogEntry[]>([]);
  const [reports, setReports] = useState<BackupReport[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  const loadData = async () => {
    const [logsRes, errorsRes, backupRes] = await Promise.all([
      fetch("/api/admin/logs"),
      fetch("/api/admin/errors"),
      fetch("/api/admin/reports"),
    ]);

    const logsBody = await logsRes.json();
    const errorsBody = await errorsRes.json();
    const backupBody = await backupRes.json();

    setLogs(logsBody.logs ?? []);
    setErrors(errorsBody.errors ?? []);
    setReports(backupBody.reports ?? []);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const runBackup = async () => {
    const response = await fetch("/api/admin/jobs/backup", { method: "POST" });
    const body = await response.json();
    setStatusMessage(`Backup sonucu: ${body.success ? "başarılı" : "başarısız"}`);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <main className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-semibold">Admin Log/Hata Paneli</h1>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="text-xl font-medium">Operasyon Job&apos;ları</h2>
          <p className="mt-1 text-sm text-zinc-600">Backup işlemini adminden tetikleyin.</p>
          <button
            className="mt-3 rounded bg-black px-4 py-2 text-sm text-white"
            onClick={runBackup}
            type="button"
          >
            Backup Job Çalıştır
          </button>
          {statusMessage ? <p className="mt-2 text-sm">{statusMessage}</p> : null}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-zinc-200 bg-white p-4">
            <h2 className="text-xl font-medium">Structured Logs</h2>
            <ul className="mt-2 space-y-2 text-xs">
              {logs.slice(0, 20).map((item) => (
                <li className="rounded border border-zinc-200 p-2" key={item.id}>
                  [{item.severity}] {item.message} - cid:{item.correlationId}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-zinc-200 bg-white p-4">
            <h2 className="text-xl font-medium">Hata Taksonomisi</h2>
            <ul className="mt-2 space-y-2 text-xs">
              {errors.slice(0, 20).map((item) => (
                <li className="rounded border border-red-200 bg-red-50 p-2" key={item.id}>
                  {item.taxonomyCode ?? "N/A"} - {item.message} - cid:{item.correlationId}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="text-xl font-medium">Backup Raporları</h2>
          <ul className="mt-2 space-y-2 text-xs">
            {reports.map((report) => (
              <li className="rounded border border-zinc-200 p-2" key={report.id}>
                {report.createdAt} - {report.status} - {report.filePath ?? "dosya yok"}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
