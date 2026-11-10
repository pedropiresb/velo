import { Page, expect } from '@playwright/test';

export type WheelType = 'aero' | 'sport';
export type OptionalType = 'Precision Park' | 'Flux Capacitor';
export type ExteriorColorType = 'Glacier Blue' | 'Midnight Black' | 'Lunar White';

export function createConfiguratorActions(page: Page) {
    // Locators
    const precisionPark = page.getByRole('checkbox', { name: /Precision Park/ });
    const fluxCapacitor = page.getByRole('checkbox', { name: /Flux Capacitor/ });
    const sportWheels = page.getByRole('button', { name: /Sport Wheels/ });
    const aeroWheels = page.getByRole('button', { name: /Aero Wheels/ });
    const totalPrice = page.getByTestId('total-price');
    const checkoutButton = page.getByRole('button', { name: 'Monte o Seu' });

    return {
        async open() {
            await page.addInitScript(() => {
                window.localStorage.clear();
            });
            await page.goto('http://localhost:5173/configure');
            await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();
        },

        // Unified Wheel Selection Action
        async selectWheel(type: WheelType) {
            const targetWheel = type === 'sport' ? sportWheels : aeroWheels;
            await targetWheel.click();
        },

        async goToCheckout() {
            await checkoutButton.click();
        },

        // Unified Optional Selection Action (check = true to select, false to unselect)
        async setOptional(name: OptionalType, check = true) {
            const checkbox = name === 'Precision Park' ? precisionPark : fluxCapacitor;
            if (check) {
                await checkbox.check();
            } else {
                await checkbox.uncheck();
            }
        },

        // Color Selection Action
        async selectColor(color: ExteriorColorType) {
            await page.getByRole('button', { name: color }).click();
        },

        // Validations
        async validatePrice(price: string) {
            await expect(page.getByText('Preço de Venda')).toBeVisible();
            await expect(totalPrice).toHaveText(price);
        },

        async validateCarImage(altText: string) {
            await expect(page.getByRole('img', { name: altText })).toBeVisible();
        },

        async validateWheelActive(type: WheelType) {
            if (type === 'sport') {
                await expect(sportWheels).toHaveClass(/border-primary/);
                await expect(aeroWheels).not.toHaveClass(/border-primary/);
            } else {
                await expect(aeroWheels).toHaveClass(/border-primary/);
                await expect(sportWheels).not.toHaveClass(/border-primary/);
            }
        },

        async validateOptionalChecked(name: OptionalType, checked = true) {
            const checkbox = name === 'Precision Park' ? precisionPark : fluxCapacitor;
            if (checked) {
                await expect(checkbox).toBeChecked();
            } else {
                await expect(checkbox).not.toBeChecked();
            }
        },

        async validateDefaultConfiguration() {
            // 1. Car Stage preview
            await expect(
                page.getByRole('img', { name: 'Velô Sprint - glacier-blue with aero wheels' })
            ).toBeVisible();

            // 2. Default selections
            await expect(page.getByRole('button', { name: 'Glacier Blue' })).toBeVisible();
            await expect(aeroWheels).toBeVisible();
            await expect(aeroWheels).toContainText('Incluso');
            await expect(precisionPark).not.toBeChecked();
            await expect(fluxCapacitor).not.toBeChecked();

            // 3. Price and CTA
            await expect(page.getByText('Preço de Venda')).toBeVisible();
            await expect(totalPrice).toHaveText('R$ 40.000,00');
            await expect(checkoutButton).toBeVisible();
            await expect(checkoutButton).toBeEnabled();
        },
    };
}
