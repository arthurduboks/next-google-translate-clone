import { ITranslation } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";

async function TranslationHistory() {
  const { userId } = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translationHistory?userId=${userId}`;

  const res = await fetch(url, {
    next: {
      tags: ["translationHistory"],
    },
  });

  const { translations }: { translations: Array<ITranslation> } =
    await res.json();

  return <div>TranslationHistory</div>;
}

export default TranslationHistory;
