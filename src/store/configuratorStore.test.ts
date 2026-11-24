import { describe, it, expect } from 'vitest';
import {
  calculateTotalPrice,
  calculateInstallment,
  formatPrice,
  CarConfiguration,
} from './configuratorStore';

describe('configuratorStore utilities', () => {
  describe('calculateTotalPrice', () => {
    it('deve retornar o preço base para configuração padrão com rodas aero e sem opcionais', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: [],
      };

      const total = calculateTotalPrice(config);
      expect(total).toBe(40000);
    });

    it('deve adicionar o valor das rodas sport ao preço base', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: [],
      };

      const total = calculateTotalPrice(config);
      expect(total).toBe(42000); // 40000 + 2000
    });

    it('deve adicionar o opcional precision-park corretamente', () => {
      const config: CarConfiguration = {
        exteriorColor: 'lunar-white',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['precision-park'],
      };

      const total = calculateTotalPrice(config);
      expect(total).toBe(45500); // 40000 + 5500
    });

    it('deve adicionar o opcional flux-capacitor corretamente', () => {
      const config: CarConfiguration = {
        exteriorColor: 'midnight-black',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['flux-capacitor'],
      };

      const total = calculateTotalPrice(config);
      expect(total).toBe(45000); // 40000 + 5000
    });

    it('deve calcular o total acumulado com rodas sport e todos os opcionais', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: ['precision-park', 'flux-capacitor'],
      };

      const total = calculateTotalPrice(config);
      expect(total).toBe(52500); // 40000 + 2000 + 5500 + 5000
    });

    it('deve lidar com lista de opcionais vazia ou indefinida sem quebrar', () => {
      const config = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
      } as unknown as CarConfiguration;

      const total = calculateTotalPrice(config);
      expect(total).toBe(40000);
    });
  });

  describe('calculateInstallment', () => {
    it('deve calcular a parcela correta para 12x com juros de 2% a.m.', () => {
      const total = 40000;
      const installment = calculateInstallment(total);

      // (40000 * 0.02 * (1.02)^12) / ((1.02)^12 - 1) ≈ 3782.38
      expect(installment).toBeCloseTo(3782.38, 2);
    });

    it('deve retornar 0 para total igual a 0', () => {
      const installment = calculateInstallment(0);
      expect(installment).toBe(0);
    });

    it('deve arredondar o resultado para no máximo duas casas decimais', () => {
      const installment = calculateInstallment(35000);
      const decimalPlaces = installment.toString().split('.')[1]?.length ?? 0;
      expect(decimalPlaces).toBeLessThanOrEqual(2);
    });
  });

  describe('formatPrice', () => {
    it('deve formatar valores monetários no padrão brasileiro BRL', () => {
      const formatted = formatPrice(40000);
      // Remove espaços normais e non-breaking spaces (\u00a0) para comparação limpa
      const normalized = formatted.replace(/\s+/g, ' ');
      expect(normalized).toBe('R$ 40.000,00');
    });

    it('deve formatar corretamente o valor 0', () => {
      const formatted = formatPrice(0);
      const normalized = formatted.replace(/\s+/g, ' ');
      expect(normalized).toBe('R$ 0,00');
    });

    it('deve formatar valores fracionados com duas casas decimais', () => {
      const formatted = formatPrice(2550.5);
      const normalized = formatted.replace(/\s+/g, ' ');
      expect(normalized).toBe('R$ 2.550,50');
    });
  });
});

