import { gpaStanding, totalCredits } from "@/lib/gpa";

interface Props {
  gpa: number | null;
  subjectCount: number;
  totalPoints: number;
  calculated: boolean;
}

export function GpaResultCard({ gpa, subjectCount, totalPoints: points, calculated }: Props) {
  const credits = totalCreditsFromProps(points, gpa);
  const pct = gpa !== null ? Math.min(100, (gpa / 4) * 100) : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
      <span className="absolute -top-10 -right-10 size-36 rounded-full bg-gold/20" />
      <span className="absolute -bottom-12 -left-8 size-32 rounded-full bg-white/5" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
          Weighted GPA
        </p>
        {calculated && gpa !== null ? (
          <div className="animate-pop">
            <div className="mt-2 flex items-end gap-2">
              <span className="figure text-6xl font-semibold leading-none">
                {gpa.toFixed(2)}
              </span>
              <span className="mb-1 text-sm text-primary-foreground/60">/ 4.00</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-gold">{gpaStanding(gpa)}</p>
            <p className="mt-1 text-xs text-primary-foreground/60">
              {points.toFixed(1)} grade points ÷ {credits} credits across{" "}
              {subjectCount} {subjectCount === 1 ? "subject" : "subjects"}
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-2xl font-semibold text-primary-foreground/80">
              {subjectCount === 0
                ? "Add subjects to begin"
                : "Press “Calculate GPA” to see your result"}
            </p>
            <p className="mt-2 text-xs text-primary-foreground/60">
              Your GPA is computed locally in your browser — nothing is uploaded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function totalCreditsFromProps(points: number, gpa: number | null): string {
  if (gpa === null || gpa === 0) return "0";
  return String(Math.round((points / gpa) * 100) / 100);
}
