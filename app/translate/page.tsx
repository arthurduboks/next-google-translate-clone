import TranslationForm from "@/components/TranslationForm";
import TranslationHistory from "@/components/TranslationHistory";
import { auth } from "@clerk/nextjs/server";

// Types
export type TranslationLang = {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
};

async function TranslatePage() {
  auth().protect();
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in.");

  // API
  const langEndpoint =
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";

  let languages;
  try {
    const res = await fetch(langEndpoint, {
      next: {
        revalidate: 60 * 60 * 24, // 24 hour cache
      },
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const responseBody = await res.text();

    try {
      languages = JSON.parse(responseBody) as TranslationLang;
    } catch (error) {
      console.error("Failed to parse JSON:", responseBody);
      throw error;
    }
  } catch (error) {
    console.error("Error fetching languages:", error);

    languages = { translation: {} } as TranslationLang;
  }

  return (
    <div className="px-10 lg:px-0 mb-20">
      {/* Form  */}
      <TranslationForm languages={languages} />
      {/* History */}
      <TranslationHistory />
    </div>
  );
}

export default TranslatePage;
