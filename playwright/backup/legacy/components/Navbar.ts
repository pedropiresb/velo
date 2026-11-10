import { Page, expect } from '@playwright/test'

export class NavBar {

    constructor(private page: Page) { }

    async goToOrderLookupPage() {

        await this.page.getByRole('link', { name: 'Consultar Pedido' }).click()
    }

}