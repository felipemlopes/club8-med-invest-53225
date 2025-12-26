
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import investmentApi from "@/lib/investmentApi.ts";

const EditPersonalDataDialog = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    crm: user?.crm || '',
    specialty: user?.specialty || ''
  });

  const handleSave = async () => {
    // Simular atualização dos dados
    if (updateUser) {
      updateUser(formData);

      try {
        const response = await investmentApi.updateProfile(formData);

        // atualiza o user global (context)
        //updateUser(response.user);

        toast({
          title: "Dados atualizados",
          description: "Suas informações foram atualizadas com sucesso.",
        });

        setIsOpen(false);
      } catch (error) {
        toast({
          title: 'Erro ao atualizar',
          description: 'Não foi possível atualizar seus dados.',
          variant: 'destructive',
        });
      }
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
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
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
          {user?.specialty && (
            <div>
              <Label htmlFor="especialidade">Especialidade</Label>
              <Input
                id="especialidade"
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
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
