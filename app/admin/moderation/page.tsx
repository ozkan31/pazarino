import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function ModerationPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Review/Question Moderation" description="Yorum ve soru moderasyonu" />
      {db.reviews.map((review) => (
        <Card key={review.id}>{review.type}: {review.content}</Card>
      ))}
    </>
  );
}
