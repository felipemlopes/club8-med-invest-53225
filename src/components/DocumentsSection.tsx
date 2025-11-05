
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const DocumentsSection = () => {
  const documents = [
    { name: 'Contrato de Investimento', type: 'Contrato', date: '15/01/2024' },
    { name: 'Comprovante de Pagamento - Jan/24', type: 'Comprovante', date: '15/01/2024' },
    { name: 'Comprovante de Recebimento - Abr/24', type: 'Recebimento', date: '15/04/2024' }
  ];

  const downloadDocument = (docName: string) => {
    // Simular download
    console.log(`Baixando documento: ${docName}`);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-club8-turquoise" />
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
              onClick={() => downloadDocument(doc.name)}
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
