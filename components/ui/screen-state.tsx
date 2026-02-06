import { Card } from "@/components/ui/card";

type ScreenStateProps = {
  type: "loading" | "empty" | "error" | "access-denied";
  title: string;
  message: string;
};

const colors = {
  loading: "text-blue-700",
  empty: "text-slate-700",
  error: "text-red-700",
  "access-denied": "text-amber-700",
};

export function ScreenState({ type, title, message }: ScreenStateProps) {
  return (
    <Card>
      <div className={`space-y-2 ${colors[type]}`}>
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{message}</p>
      </div>
    </Card>
  );
}
