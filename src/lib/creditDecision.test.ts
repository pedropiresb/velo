import { describe, it, expect } from 'vitest'
import { evaluateCreditDecision } from './creditDecision'

describe('Credit Decision Engine (evaluateCreditDecision)', () => {
  describe('Regra 1: Entrada Alta (>= 50% do valor total)', () => {
    it('deve aprovar crédito quando a entrada for exatamente 50%, mesmo com score baixo (<= 500)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 50000,
        score: 350,
      })
      expect(decision).toBe('APROVADO')
    })

    it('deve aprovar crédito quando a entrada for maior que 50% (ex: 60%), mesmo com score baixo', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 60000,
        score: 200,
      })
      expect(decision).toBe('APROVADO')
    })

    it('deve aprovar crédito quando a entrada for 100% do total', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 150000,
        entryValue: 150000,
        score: 100,
      })
      expect(decision).toBe('APROVADO')
    })
  })

  describe('Regra 2: Score Alto (> 700) com entrada < 50%', () => {
    it('deve aprovar crédito no limite logo acima de 700 (score = 701)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 20000,
        score: 701,
      })
      expect(decision).toBe('APROVADO')
    })

    it('deve aprovar crédito para cliente com excelente score (ex: 850)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 120000,
        entryValue: 10000,
        score: 850,
      })
      expect(decision).toBe('APROVADO')
    })
  })

  describe('Regra 3: Score Médio (501 a 700) com entrada < 50%', () => {
    it('deve colocar em análise no limite superior (score = 700)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 20000,
        score: 700,
      })
      expect(decision).toBe('EM_ANALISE')
    })

    it('deve colocar em análise no ponto médio da faixa (score = 600)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 30000,
        score: 600,
      })
      expect(decision).toBe('EM_ANALISE')
    })

    it('deve colocar em análise no limite inferior (score = 501)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 20000,
        score: 501,
      })
      expect(decision).toBe('EM_ANALISE')
    })
  })

  describe('Regra 4: Score Baixo (<= 500) com entrada < 50%', () => {
    it('deve reprovar no limite superior de reprovação (score = 500)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 20000,
        score: 500,
      })
      expect(decision).toBe('REPROVADO')
    })

    it('deve reprovar score baixo típico (score = 350)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 20000,
        score: 350,
      })
      expect(decision).toBe('REPROVADO')
    })

    it('deve reprovar score mínimo (score = 0)', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 100000,
        entryValue: 0,
        score: 0,
      })
      expect(decision).toBe('REPROVADO')
    })
  })

  describe('Casos de Borda e Segurança', () => {
    it('deve lidar com totalPrice = 0 sem gerar divisão por zero', () => {
      const decision = evaluateCreditDecision({
        totalPrice: 0,
        entryValue: 0,
        score: 600,
      })
      expect(decision).toBe('EM_ANALISE')
    })
  })
})

