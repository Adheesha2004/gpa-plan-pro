import { GRADE_SCALE } from "@/lib/gpa";

export function GradeReference() {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary">Grade-point reference</h2>
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          4.0 scale
        </span>
      </div>
      <ul className="mt-3 divide-y text-sm">
        {GRADE_SCALE.map((g) => (
          <li key={g.letter} className="flex items-center justify-between py-1.5">
            <span className="font-medium">{g.letter}</span>
            <span className="figure text-muted-foreground">{g.points.toFixed(1)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
