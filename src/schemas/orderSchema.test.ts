import { describe, it, expect } from 'vitest'
import { orderSchema, OrderFormData } from './orderSchema'

describe('Order Form Validation Schema (orderSchema)', () => {
  const validFormData: OrderFormData = {
    name: 'Carlos',
    lastname: 'Silva',
    email: 'carlos.silva@example.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-10',
    store: 'Velô Paulista - Av. Paulista, 1000',
    terms: true,
  }

  it('deve validar com sucesso quando todos os campos estiverem preenchidos corretamente', () => {
    const result = orderSchema.safeParse(validFormData)
    expect(result.success).toBe(true)
  })

  it('deve aceitar telefone de 8 dígitos formatado corretamente', () => {
    const result = orderSchema.safeParse({
      ...validFormData,
      phone: '(11) 3456-7890',
    })
    expect(result.success).toBe(true)
  })

  describe('Validação do campo Nome', () => {
    it('deve rejeitar nome com menos de 2 caracteres', () => {
      const result = orderSchema.safeParse({ ...validFormData, name: 'A' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('name'))
        expect(error?.message).toBe('Nome deve ter pelo menos 2 caracteres')
      }
    })

    it('deve rejeitar nome vazio', () => {
      const result = orderSchema.safeParse({ ...validFormData, name: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('name'))
        expect(error?.message).toBe('Nome deve ter pelo menos 2 caracteres')
      }
    })
  })

  describe('Validação do campo Sobrenome', () => {
    it('deve rejeitar sobrenome com menos de 2 caracteres', () => {
      const result = orderSchema.safeParse({ ...validFormData, lastname: 'S' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('lastname'))
        expect(error?.message).toBe('Sobrenome deve ter pelo menos 2 caracteres')
      }
    })
  })

  describe('Validação do campo Email', () => {
    it('deve rejeitar emails em formatos inválidos', () => {
      const invalidEmails = ['plainaddress', '@missingusername.com', 'user@.com', 'user@domain']
      for (const email of invalidEmails) {
        const result = orderSchema.safeParse({ ...validFormData, email })
        expect(result.success).toBe(false)
        if (!result.success) {
          const error = result.error.errors.find((e) => e.path.includes('email'))
          expect(error?.message).toBe('Email inválido')
        }
      }
    })
  })

  describe('Validação do campo Telefone', () => {
    it('deve rejeitar telefone sem máscara', () => {
      const result = orderSchema.safeParse({ ...validFormData, phone: '11987654321' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('phone'))
        expect(error?.message).toBe('Telefone inválido')
      }
    })

    it('deve rejeitar telefone com máscara incompleta', () => {
      const result = orderSchema.safeParse({ ...validFormData, phone: '(11) 9876-432' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('phone'))
        expect(error?.message).toBe('Telefone inválido')
      }
    })
  })

  describe('Validação do campo CPF', () => {
    it('deve rejeitar CPF sem formatação/máscara', () => {
      const result = orderSchema.safeParse({ ...validFormData, cpf: '12345678910' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('cpf'))
        expect(error?.message).toBe('CPF inválido')
      }
    })

    it('deve rejeitar CPF incompleto', () => {
      const result = orderSchema.safeParse({ ...validFormData, cpf: '123.456.789' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('cpf'))
        expect(error?.message).toBe('CPF inválido')
      }
    })
  })

  describe('Validação do campo Loja', () => {
    it('deve rejeitar quando nenhuma loja for selecionada (string vazia)', () => {
      const result = orderSchema.safeParse({ ...validFormData, store: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('store'))
        expect(error?.message).toBe('Selecione uma loja')
      }
    })
  })

  describe('Validação dos Termos e Condições', () => {
    it('deve rejeitar se os termos não forem aceitos (terms = false)', () => {
      const result = orderSchema.safeParse({ ...validFormData, terms: false })
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path.includes('terms'))
        expect(error?.message).toBe('Aceite os termos')
      }
    })
  })
})

