import { ITranslation } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";
import TimeAgoText from "./TimeAgoText";
import DeleteTranslationButton from "./DeleteTranslationButton";

const getLanguage = (code: string) => {
  const lang = new Intl.DisplayNames(["en"], { type: "language" });
  return lang.of(code);
};

async function TranslationHistory() {
  const { userId } = auth();

  // Ensuring the URL always has the correct protocol
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

  const url = `${baseUrl}/translationHistory?userId=${userId}`;

  const res = await fetch(url, {
    next: {
      tags: ["translationHistory"],
    },
  });

  const { translations }: { translations: Array<ITranslation> } =
    await res.json();

  return (
    <div>
      <h1 className="text-3xl my-5">History</h1>
      {translations.length === 0 && (
        <p className="mb-5 text-gray-400">No translations yet</p>
      )}

      <ul className="divide-y border rounded-md">
        {translations.map((translation) => (
          <li
            key={translation._id}
            className="flex justify-between items-center p-5 hover:bg-gray-50 relative"
          >
            <div>
              <p className="text-sm mb-5 text-gray-500">
                {getLanguage(translation.from)}
                {" -> "}
                {getLanguage(translation.to)}
              </p>

              <div className="space-y-2 pr-5">
                <p>{translation.fromText}</p>
                <p className="text-gray-400">{translation.toText}</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 absolute top-2 right-2">
              <TimeAgoText
                date={new Date(translation.timestamp).toISOString()}
              />
            </p>

            <DeleteTranslationButton id={translation._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TranslationHistory;
