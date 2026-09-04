import { useMemo, useState } from "react";
import {
  GRADE_SCALE,
  calculateGpa,
  type GradeLetter,
  type Subject,
} from "@/lib/gpa";

interface Props {
  subjects: Subject[];
  currentGpa: number | null;
}

export function WhatIfPanel({ subjects, currentGpa }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, GradeLetter>>({});

  const projected = useMemo(() => {
    if (!enabled) return null;
    return calculateGpa(
      subjects.map((s) => ({ ...s, grade: overrides[s.id] ?? s.grade }))
    );
  }, [enabled, subjects, overrides]);

  const delta =
    projected !== null && currentGpa !== null ? projected - currentGpa : null;

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary">What-If GPA</h2>
        <button
          onClick={() => setEnabled((v) => !v)}
          role="switch"
          aria-checked={enabled}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            enabled ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
              enabled ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Try hypothetical grades to preview your projected GPA. Your real entries
        are not changed.
      </p>

      {enabled && subjects.length === 0 && (
        <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
          Add some subjects first, then experiment here.
        </p>
      )}

      {enabled && subjects.length > 0 && (
        <div className="mt-4 space-y-3">
          {subjects.map((s) => {
            const value = overrides[s.id] ?? s.grade;
            const changed = value !== s.grade;
            return (
              <label key={s.id} className="block">
                <span className="mb-1 flex items-baseline justify-between text-xs font-medium text-muted-foreground">
                  <span className={changed ? "text-primary" : undefined}>
                    {s.name}
                    {changed && " · hypothetical"}
                  </span>
                  <span className="figure">{s.credits} cr</span>
                </span>
                <select
                  value={value}
                  onChange={(e) =>
                    setOverrides((prev) => ({
                      ...prev,
                      [s.id]: e.target.value as GradeLetter,
                    }))
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
                >
                  {GRADE_SCALE.map((g) => (
                    <option key={g.letter} value={g.letter}>
                      {g.letter} — {g.points.toFixed(1)}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}

          <div className="flex items-center justify-between rounded-lg bg-accent px-4 py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-muted-foreground">Projected</span>
              <span className="figure text-2xl font-semibold text-primary">
                {projected !== null ? projected.toFixed(2) : "—"}
              </span>
            </div>
            {delta !== null && (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold figure ${
                  delta > 0
                    ? "bg-primary/10 text-primary"
                    : delta < 0
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {delta > 0 ? "+" : ""}
                {delta.toFixed(2)}
              </span>
            )}
          </div>
          {subjects.some((s) => overrides[s.id] && overrides[s.id] !== s.grade) && (
            <button
              onClick={() => setOverrides({})}
              className="w-full rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:bg-muted"
            >
              Reset hypothetical grades
            </button>
          )}
        </div>
      )}
    </div>
  );
}
