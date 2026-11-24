import { z } from 'zod'

export const orderSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastname: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().refine((val) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val), 'Telefone inválido'),
  cpf: z.string().refine((val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), 'CPF inválido'),
  store: z.string().min(1, 'Selecione uma loja'),
  terms: z.boolean().refine((val) => val === true, 'Aceite os termos'),
})

export type OrderFormData = z.infer<typeof orderSchema>

