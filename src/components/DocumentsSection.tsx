
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import investmentApi, {Document} from "@/lib/investmentApi.ts";
import {useQuery} from "@tanstack/react-query";

const DocumentsSection = () => {

    const { data: documents = [], isLoading, error, refetch } = useQuery<Document[]>({
        queryKey: ['/api/documents'],
        queryFn: () => investmentApi.getDocuments(),
        staleTime: 30000,
        retry: 2,
    });

  const downloadDocument = (docUrl: string) => {
    console.log(`Baixando documento: ${docUrl}`);
      window.open(docUrl, '_blank');
  };



  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-black" />
        Documentos
      </h3>
      
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <p className="font-medium text-club8-dark">{doc.name}</p>
              <p className="text-sm text-gray-600">{doc.type} • {doc.date}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => downloadDocument(doc.url)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DocumentsSection;
