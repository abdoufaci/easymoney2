import ArabicLegalDocuments from "./_components/arabic-legal-document";
import LegalDocuments from "./_components/legal-documents";

async function WebsiteLegalPage({ params }: any) {
  const { lang } = await params;
  return lang === "en" ? <LegalDocuments /> : <ArabicLegalDocuments />;
}

export default WebsiteLegalPage;
