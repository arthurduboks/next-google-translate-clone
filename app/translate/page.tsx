import { auth } from "@clerk/nextjs/server";

function TranslatePage() {
  auth().protect();
  const { userId } = auth();

  return <div>Translate Page</div>;
}

export default TranslatePage;
