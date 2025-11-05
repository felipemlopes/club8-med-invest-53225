
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const EditPersonalDataDialog = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    crm: user?.crm || '',
    especialidade: user?.especialidade || ''
  });

  const handleSave = () => {
    // Simular atualização dos dados
    if (updateUser) {
      updateUser(formData);
      toast({
        title: "Dados atualizados",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Editar Dados
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Dados Pessoais</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          {user?.crm && (
            <div>
              <Label htmlFor="crm">CRM</Label>
              <Input
                id="crm"
                value={formData.crm}
                onChange={(e) => setFormData({...formData, crm: e.target.value})}
              />
            </div>
          )}
          {user?.especialidade && (
            <div>
              <Label htmlFor="especialidade">Especialidade</Label>
              <Input
                id="especialidade"
                value={formData.especialidade}
                onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDataDialog;
