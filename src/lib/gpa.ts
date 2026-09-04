export const GRADE_SCALE = [
  { letter: "A", points: 4.0 },
  { letter: "A-", points: 3.7 },
  { letter: "B+", points: 3.3 },
  { letter: "B", points: 3.0 },
  { letter: "B-", points: 2.7 },
  { letter: "C+", points: 2.3 },
  { letter: "C", points: 2.0 },
  { letter: "C-", points: 1.7 },
  { letter: "D", points: 1.0 },
  { letter: "F", points: 0.0 },
] as const;

export type GradeLetter = (typeof GRADE_SCALE)[number]["letter"];

export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: GradeLetter;
}

export function gradePoints(letter: GradeLetter): number {
  return GRADE_SCALE.find((g) => g.letter === letter)?.points ?? 0;
}

export function subjectPoints(subject: Subject): number {
  return subject.credits * gradePoints(subject.grade);
}

export function totalCredits(subjects: Subject[]): number {
  return subjects.reduce((sum, s) => sum + s.credits, 0);
}

export function totalPoints(subjects: Subject[]): number {
  return subjects.reduce((sum, s) => sum + subjectPoints(s), 0);
}

export function calculateGpa(subjects: Subject[]): number | null {
  const credits = totalCredits(subjects);
  if (credits <= 0) return null;
  return totalPoints(subjects) / credits;
}

export function gpaStanding(gpa: number): string {
  if (gpa >= 3.7) return "Outstanding — Dean's List territory";
  if (gpa >= 3.3) return "Excellent standing";
  if (gpa >= 3.0) return "Strong standing";
  if (gpa >= 2.5) return "Good standing";
  if (gpa >= 2.0) return "Satisfactory — room to climb";
  return "At risk — consider academic advising";
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
