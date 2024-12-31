import { DocumentUpload } from "@/components/documents/document-upload";
import { DocumentList } from "@/components/documents/document-list";

export default function DocumentsPage() {
  return (
    <div className="container p-6 space-y-8">
      <DocumentUpload />
      <DocumentList />
    </div>
  );
}