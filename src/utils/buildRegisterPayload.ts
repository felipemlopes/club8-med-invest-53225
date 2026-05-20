/**
 * Builds the register payload from form data.
 * Extracted from handleSubmit in MembershipSection.tsx for testability.
 */

export interface FormData {
  nome: string;
  cpf: string;
  crm: string;
  estado: string;
  especialidade: string;
  cidade: string;
  email: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidadeEndereco: string;
  estadoEndereco: string;
  telefone: string;
  plano: string;
  senha: string;
  confirmarSenha: string;
}

export function mapPlanId(plano: string): number {
  if (plano === 'premium') return 2;
  if (plano === 'lista') return 3;
  return 1;
}

export function buildRegisterPayload(formData: FormData) {
  return {
    name: formData.nome,
    email: formData.email,
    password: formData.senha,
    password_confirmation: formData.confirmarSenha,
    crm: formData.crm.replace(/\D/g, ''),
    uf: formData.estado,
    city: formData.cidade,
    specialty: formData.especialidade,
    phone: formData.telefone,
    plan_id: mapPlanId(formData.plano),
    cpf: formData.cpf.replace(/\D/g, ''),
    zip_code: formData.cep.replace(/\D/g, ''),
    address: formData.endereco,
    address_number: formData.numero,
    neighborhood: formData.bairro,
    address_city: formData.cidadeEndereco,
    address_state: formData.estadoEndereco,
    ...(formData.complemento ? { address_complement: formData.complemento } : {}),
  };
}
