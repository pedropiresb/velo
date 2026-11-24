export type CreditStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';

export interface CreditDecisionParams {
  totalPrice: number;
  entryValue: number;
  score: number;
}

/**
 * Avalia o status do crédito baseado no valor da entrada e no score Serasa.
 * 
 * Regras:
 * 1. Entrada >= 50% do valor total -> APROVADO (override de score)
 * 2. Score > 700 -> APROVADO
 * 3. Score entre 501 e 700 -> EM_ANALISE
 * 4. Score <= 500 -> REPROVADO
 */
export function evaluateCreditDecision({
  totalPrice,
  entryValue,
  score,
}: CreditDecisionParams): CreditStatus {
  const entryPercentage = totalPrice > 0 ? entryValue / totalPrice : 0;

  // 1️⃣ Regra da Entrada Alta: SE Entrada >= 50% do Total -> APROVADO
  if (entryPercentage >= 0.5) {
    return 'APROVADO';
  }

  // 2️⃣ Score Alto: SE Score > 700 -> APROVADO
  if (score > 700) {
    return 'APROVADO';
  }

  // 3️⃣ Score Médio: SE Score entre 501 e 700 -> EM_ANALISE
  if (score >= 501 && score <= 700) {
    return 'EM_ANALISE';
  }

  // 4️⃣ Score Baixo: SE Score <= 500 -> REPROVADO
  return 'REPROVADO';
}

