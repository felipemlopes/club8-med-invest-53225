import { describe, it, expect } from 'vitest';
import { buildRegisterPayload, FormData } from './buildRegisterPayload';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeFormData = (overrides: Partial<FormData> = {}): FormData => ({
  nome: 'Dr. João Silva',
  cpf: '123.456.789-00',
  crm: '123456',
  estado: 'SP',
  especialidade: 'Cardiologia',
  cidade: 'São Paulo',
  email: 'joao@example.com',
  cep: '01310-100',
  endereco: 'Av. Paulista',
  numero: '1000',
  complemento: 'Apto 5',
  bairro: 'Bela Vista',
  cidadeEndereco: 'São Paulo',
  estadoEndereco: 'SP',
  telefone: '(11) 99999-9999',
  plano: 'starter',
  senha: 'senha123',
  confirmarSenha: 'senha123',
  ...overrides,
});

// ---------------------------------------------------------------------------
// Property 1: Bug Condition
// Verifica que o payload construído pelo buildRegisterPayload NÃO contém os
// campos de endereço e CPF — confirmando o bug no código não corrigido.
// EXPECTED: este teste FALHA no código não corrigido (confirma o bug).
// ---------------------------------------------------------------------------

describe('Property 1: Bug Condition - Payload Omite Campos de Endereço e CPF', () => {
  it('deve conter cpf no payload', () => {
    const formData = makeFormData({ cpf: '123.456.789-00' });
    const payload = buildRegisterPayload(formData);
    // BUG: cpf não está no payload — este assert FALHA no código não corrigido
    expect(payload).toHaveProperty('cpf');
  });

  it('deve conter zip_code no payload', () => {
    const formData = makeFormData({ cep: '01310-100' });
    const payload = buildRegisterPayload(formData);
    // BUG: zip_code não está no payload — este assert FALHA no código não corrigido
    expect(payload).toHaveProperty('zip_code');
  });

  it('deve conter address no payload', () => {
    const formData = makeFormData({ endereco: 'Av. Paulista' });
    const payload = buildRegisterPayload(formData);
    expect(payload).toHaveProperty('address');
  });

  it('deve conter address_number no payload', () => {
    const formData = makeFormData({ numero: '1000' });
    const payload = buildRegisterPayload(formData);
    expect(payload).toHaveProperty('address_number');
  });

  it('deve conter neighborhood no payload', () => {
    const formData = makeFormData({ bairro: 'Bela Vista' });
    const payload = buildRegisterPayload(formData);
    expect(payload).toHaveProperty('neighborhood');
  });

  it('deve conter address_city no payload', () => {
    const formData = makeFormData({ cidadeEndereco: 'São Paulo' });
    const payload = buildRegisterPayload(formData);
    expect(payload).toHaveProperty('address_city');
  });

  it('deve conter address_state no payload', () => {
    const formData = makeFormData({ estadoEndereco: 'SP' });
    const payload = buildRegisterPayload(formData);
    expect(payload).toHaveProperty('address_state');
  });

  it('cpf deve ter máscara removida (apenas dígitos)', () => {
    const formData = makeFormData({ cpf: '123.456.789-00' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.cpf).toBe('12345678900');
  });

  it('zip_code deve ter máscara removida (apenas dígitos)', () => {
    const formData = makeFormData({ cep: '01310-100' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.zip_code).toBe('01310100');
  });

  it('address_complement deve ser incluído quando complemento está preenchido', () => {
    const formData = makeFormData({ complemento: 'Apto 5' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.address_complement).toBe('Apto 5');
  });

  it('address_complement deve ser undefined quando complemento está vazio', () => {
    const formData = makeFormData({ complemento: '' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.address_complement).toBeUndefined();
  });

  it('isBugCondition: payload sem os 7 campos obrigatórios confirma o bug', () => {
    const formData = makeFormData();
    const payload = buildRegisterPayload(formData) as Record<string, unknown>;
    const requiredFields = ['cpf', 'zip_code', 'address', 'address_number', 'neighborhood', 'address_city', 'address_state'];
    const missingFields = requiredFields.filter(f => !(f in payload));
    // No código não corrigido, todos os 7 campos estarão ausentes
    // Counterexample documentado: payload não contém nenhum dos campos de endereço/CPF
    expect(missingFields).toHaveLength(0); // FALHA no código não corrigido
  });
});

// ---------------------------------------------------------------------------
// Property 2: Preservation
// Verifica que os campos existentes no payload continuam presentes e corretos
// após a correção. Estes testes PASSAM no código não corrigido.
// ---------------------------------------------------------------------------

describe('Property 2: Preservation - Comportamentos Existentes Inalterados', () => {
  it('deve conter name no payload', () => {
    const formData = makeFormData({ nome: 'Dr. João Silva' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.name).toBe('Dr. João Silva');
  });

  it('deve conter email no payload', () => {
    const formData = makeFormData({ email: 'joao@example.com' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.email).toBe('joao@example.com');
  });

  it('deve conter crm sem máscara no payload', () => {
    const formData = makeFormData({ crm: '123456' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.crm).toBe('123456');
  });

  it('deve conter uf no payload', () => {
    const formData = makeFormData({ estado: 'SP' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.uf).toBe('SP');
  });

  it('deve conter city no payload', () => {
    const formData = makeFormData({ cidade: 'São Paulo' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.city).toBe('São Paulo');
  });

  it('deve conter specialty no payload', () => {
    const formData = makeFormData({ especialidade: 'Cardiologia' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.specialty).toBe('Cardiologia');
  });

  it('deve conter phone no payload', () => {
    const formData = makeFormData({ telefone: '(11) 99999-9999' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.phone).toBe('(11) 99999-9999');
  });

  it('deve mapear plano starter para plan_id 1', () => {
    const payload = buildRegisterPayload(makeFormData({ plano: 'starter' })) as any;
    expect(payload.plan_id).toBe(1);
  });

  it('deve mapear plano premium para plan_id 2', () => {
    const payload = buildRegisterPayload(makeFormData({ plano: 'premium' })) as any;
    expect(payload.plan_id).toBe(2);
  });

  it('deve mapear plano lista para plan_id 3', () => {
    const payload = buildRegisterPayload(makeFormData({ plano: 'lista' })) as any;
    expect(payload.plan_id).toBe(3);
  });

  it('deve conter password e password_confirmation no payload', () => {
    const formData = makeFormData({ senha: 'senha123', confirmarSenha: 'senha123' });
    const payload = buildRegisterPayload(formData) as any;
    expect(payload.password).toBe('senha123');
    expect(payload.password_confirmation).toBe('senha123');
  });
});
