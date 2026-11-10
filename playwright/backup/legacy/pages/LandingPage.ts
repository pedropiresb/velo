import { Page, expect } from '@playwright/test'

export class LandingPage {

    constructor(private page: Page) { }

    async goTo() {

        await this.page.goto('http://localhost:5173/')
        const heading = this.page.getByTestId('hero-section').getByRole('heading')
        await expect(heading).toContainText('Velô Sprint')
    }

}