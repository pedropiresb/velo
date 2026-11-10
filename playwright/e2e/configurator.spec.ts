import { test, expect } from '../support/fixtures';

test.describe('Vehicle Configurator', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open();
  });

  test('CT03 - should display default configuration and base price of R$ 40.000,00', async ({ app }) => {
    await app.configurator.validateDefaultConfiguration();
  });

  test('CT04 - Configurator: Sport Wheels Selection and Price Recalculation', async ({ app }) => {
    // 1. Select Sport Wheels and verify active highlighting, car image, and price
    await app.configurator.selectWheel('sport');
    await app.configurator.validateWheelActive('sport');
    await app.configurator.validateCarImage('Velô Sprint - glacier-blue with sport wheels');
    await app.configurator.validatePrice('R$ 42.000,00');

    // 2. Revert back to Aero Wheels and verify initial state restored
    await app.configurator.selectWheel('aero');
    await app.configurator.validateWheelActive('aero');
    await app.configurator.validateCarImage('Velô Sprint - glacier-blue with aero wheels');
    await app.configurator.validatePrice('R$ 40.000,00');
  });

  test('CT05 - Configurator: Optional Features Selection and Additive Pricing', async ({ app }) => {
    // 1. Add Precision Park (+R$ 5.500,00)
    await app.configurator.setOptional('Precision Park', true);
    await app.configurator.validatePrice('R$ 45.500,00');

    // 2. Add Flux Capacitor (+R$ 5.000,00)
    await app.configurator.setOptional('Flux Capacitor', true);
    await app.configurator.validatePrice('R$ 50.500,00');

    // 3. Uncheck both optional features and verify price returns to base R$ 40.000,00
    await app.configurator.setOptional('Flux Capacitor', false);
    await app.configurator.setOptional('Precision Park', false);
    await app.configurator.validatePrice('R$ 40.000,00');
    //4. Click in monte o seu button and go to checkout page validating the value there
    await app.configurator.goToCheckout();

    await app.checkout.validatePageLoad();
    await app.checkout.validateSummaryPrice('R$ 40.000,00')
  });
});
