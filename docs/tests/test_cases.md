# Test Cases Specification: Velô Sprint - Electric Vehicle Configurator

**System Name:** Velô Sprint - Electric Vehicle Configurator  
**Document Version:** 2.0 (Optimized & Lean Suite)  
**Target Environment:** Web (Single Page Application - React)  
**Author:** Senior Quality Assurance Analyst  
**Date:** November 2026  

---

## 1. Executive Summary & Test Scope

This document provides an optimized functional blackbox test suite for the **Velô Sprint** web application. It eliminates redundant and low-ROI checks while maintaining 100% test coverage over critical business rules, pricing calculations, credit analysis decisions, and end-to-end customer workflows across all application modules:

1. **Landing Page**
2. **Vehicle Configurator**
3. **Checkout / Order Submission**
4. **Automated Credit Analysis & Financing Calculations**
5. **Order Confirmation (Success Page)**
6. **Order Lookup**

### Covered Profiles
- **Customer (Standard User)**: Unauthenticated visitor configuring a vehicle, submitting an order, and querying order status.

### Excluded Scope
- Performance, load, stress, and low-level component unit testing.

---

## Module 1: Landing Page

---

### CT01 - Landing Page: Initial Load, Information Display, and Configurator Navigation

#### Objective
Verify that the Landing Page loads correctly with all key sections, brand identity, technical specifications, and that clicking the primary Call to Action (CTA) redirects the user to the Vehicle Configurator.

#### Preconditions
- The web browser is open.
- The Velô Sprint application is accessible at the root URL (`/`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Navigate to the root URL `/`. | The Landing Page loads successfully, displaying the Header with brand logo, navigation links, Hero section, Specs section, and Footer. |
| 2  | Verify the presence of vehicle specifications (e.g., Range, Top Speed, Acceleration 0-100 km/h). | Specification cards are visible with accurate values and units. |
| 3  | Click the "Monte o Seu" / "Configure Agora" button in the Hero section. | The application navigates to `/configure`, displaying the Vehicle Configurator interface. |

#### Expected Results
- The Landing Page renders cleanly without visual glitches or missing assets, and navigation to `/configure` functions as intended.

#### Acceptance Criteria
- All brand images, headline copy, and CTA buttons render within expected timeframes.
- Clicking the hero CTA routes to `/configure`.

---

### CT02 - Landing Page: Header Navigation to Order Lookup

#### Objective
Ensure that clicking the "Consultar Pedido" link in the global header correctly redirects the customer to the Order Lookup module.

#### Preconditions
- Customer is on the Landing Page (`/`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Locate the top navigation bar (Header). | The Header is displayed containing the brand logo and the "Consultar Pedido" navigation link. |
| 2  | Click the "Consultar Pedido" link. | The URL changes to `/lookup`, and the Order Lookup page is displayed with the search card. |

#### Expected Results
- Direct navigation from the Landing Page to the Order Lookup page is completed smoothly.

#### Acceptance Criteria
- The route `/lookup` is activated without full page reload.
- The Order Lookup search form is focused or ready for user input.

---

## Module 2: Vehicle Configurator

---

### CT03 - Configurator: Default Configuration and Initial Pricing Display

#### Objective
Verify that accessing the Configurator loads the default vehicle state (Glacier Blue, Carbon Black interior, Aero Wheels, no optionals) and calculates the base price of R$ 40.000,00.

#### Preconditions
- Customer has navigated to `/configure`.
- Local storage has no prior cached vehicle configuration.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Observe the car preview stage on the left/center. | The vehicle image displays "Glacier Blue" body color with standard "Aero Wheels". |
| 2  | Observe the selection indicators in the configuration panel. | "Glacier Blue" is marked as selected under Colors; "Aero Wheels" (+R$ 0) is selected under Wheels; neither optional feature is checked. |
| 3  | Check the displayed total sales price ("Preço de Venda"). | The total price is displayed exactly as `R$ 40.000,00`. |

#### Expected Results
- The initial baseline configuration is loaded with zero supplementary charges, totaling R$ 40.000,00.

#### Acceptance Criteria
- Default color: Glacier Blue.
- Default wheels: Aero Wheels.
- Default optionals: None.
- Total price: `R$ 40.000,00`.

---

### CT04 - Configurator: Sport Wheels Selection and Price Recalculation

#### Objective
Validate that selecting "Sport Wheels" adds +R$ 2.000,00 to the total price and updates the car visual render with the sport rim design.

#### Preconditions
- Customer is on `/configure` with base price `R$ 40.000,00`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | In the "Rodas" section, click on the "Sport Wheels (+ R$ 2.000,00)" option. | The Sport Wheels card is highlighted as active. |
| 2  | Check the vehicle preview stage. | The car render updates to display the vehicle fitted with Sport Wheels. |
| 3  | Check the total sales price. | The total price increases to `R$ 42.000,00` (Base 40.000 + 2.000). |
| 4  | Click back on the "Aero Wheels" option. | The Aero Wheels option becomes active. The vehicle render reverts to Aero rims. The total price returns to `R$ 40.000,00`. |

#### Expected Results
- Wheel selection updates both the car render and recalculates the total price accurately.

#### Acceptance Criteria
- Selecting Sport Wheels sets total price to `R$ 42.000,00`.
- Switching back to Aero Wheels restores total price to `R$ 40.000,00`.

---

### CT05 - Configurator: Optional Features Selection and Additive Pricing

#### Objective
Verify that adding "Precision Park" (+R$ 5.500,00) and "Flux Capacitor" (+R$ 5.000,00) accurately updates the total sales price individually and cumulatively.

#### Preconditions
- Customer is on `/configure` with default settings (`R$ 40.000,00`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Check the checkbox for "Precision Park" (+R$ 5.500,00). | The checkbox is checked. The total price recalculates to `R$ 45.500,00` (40.000 + 5.500). |
| 2  | Check the checkbox for "Flux Capacitor" (+R$ 5.000,00). | Both checkboxes are checked. The total price recalculates to `R$ 50.500,00` (40.000 + 5.500 + 5.000). |
| 3  | Uncheck both "Precision Park" (+R$ 5.500,00) and "Flux Capacitor" (+R$ 5.000,00). | Both checkboxes are unchecked. The total price recalculates to `R$ 40.000,00`. | 
| 4  | Click in `Monte o Seu` | User is redirected to `Finalizar Pedido` and Total is equal to `R$ 40.000,00`  | 

#### Expected Results
- Each optional feature incrementally updates the displayed price in accordance with business rules.

#### Acceptance Criteria
- Precision Park adds exactly R$ 5.500,00.
- Flux Capacitor adds exactly R$ 5.000,00.
- Combined total displays `R$ 50.500,00`.

---

### CT06 - Configurator: Transition to Checkout with State Retention

#### Objective
Verify that clicking "Monte o Seu" (Proceed to Checkout) routes the user to the Order page while preserving all selected customization choices and prices.

#### Preconditions
- Customer has configured: Lunar White, Sport Wheels, and Precision Park (`R$ 47.500,00`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Click the "Monte o Seu" button in the configurator footer. | Application navigates to `/order`. |
| 2  | Inspect the Order Summary card on the right-hand panel. | The summary card displays: Lunar White exterior, Sport Wheels, Precision Park (+R$ 5.500,00), matching thumbnail render, and Total `R$ 47.500,00`. |

#### Expected Results
- The custom vehicle state is seamlessly transferred to the checkout module without data loss.

#### Acceptance Criteria
- Route switches to `/order`.
- Summary reflects all selections made on the previous screen.

---

## Module 3: Checkout and Form Validations

---

### CT07 - Checkout: Successful Cash Order Submission (Happy Path)

#### Objective
Validate that a customer can successfully submit a full cash order ("À Vista") with complete and valid personal information, successfully creating the order in the database and landing on the confirmation page.

#### Preconditions
- Customer has configured a vehicle and navigated to `/order`.
- Payment method is set to "À Vista".

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | In the "Dados Pessoais" section, enter valid Name: `Carlos`. | Field accepts input without error. |
| 2  | Enter valid Surname: `Silva`. | Field accepts input without error. |
| 3  | Enter valid Email: `carlos.silva@example.com`. | Field accepts input without error. |
| 4  | Enter valid Phone: `(11) 98765-4321`. | Mask formats the phone number correctly. |
| 5  | Enter valid CPF: `123.456.789-00`. | Mask formats the CPF correctly. |
| 6  | Select a pickup store from the dropdown: `Velô Paulista - Av. Paulista, 1000`. | Store is selected. |
| 7  | Ensure payment method is selected as "À Vista". | "À Vista" button is active with full price displayed. |
| 8  | Check the "Li e aceito os Termos de Uso e Política de Privacidade" checkbox. | Checkbox is marked as checked. |
| 9  | Click "Confirmar Pedido". | Button displays loader ("Processando..."). Order is saved with status `APROVADO`. User is redirected to `/success`. |

#### Expected Results
- Order is placed successfully with status `APROVADO` (cash payment bypasses credit analysis) and the user receives a confirmation page with an assigned order number.

#### Acceptance Criteria
- Submission succeeds without validation errors.
- Redirects to `/success` displaying order number formatted like `VLO-XXXXXX`.

---

### CT08 - Checkout: Mandatory Fields Empty Validation

#### Objective
Ensure that submitting the checkout form with all fields empty blocks submission and displays specific error messages for every mandatory field.

#### Preconditions
- Customer is on `/order` with all form fields untouched and blank.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Click "Confirmar Pedido" immediately without filling in any fields. | Form submission is prevented. Field borders highlight in destructive red style, and validation error messages are displayed beneath the inputs. |
| 2  | Verify the displayed error messages. | - Name: "Nome deve ter pelo menos 2 caracteres"<br>- Surname: "Sobrenome deve ter pelo menos 2 caracteres"<br>- Email: "Email inválido"<br>- Phone: "Telefone inválido"<br>- CPF: "CPF inválido"<br>- Store: "Selecione uma loja"<br>- Terms: "Aceite os termos" |

#### Expected Results
- All mandatory input requirements are enforced, preventing empty submissions.

#### Acceptance Criteria
- Form does not submit.
- The 7 distinct validation error messages are clearly shown to the user.

---

### CT09 - Checkout: Invalid Email Format Validation

#### Objective
Validate that malformed email inputs (e.g., missing `@`, missing domain, invalid characters) are rejected by schema validation.

#### Preconditions
- Customer is on `/order`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Fill Name, Surname, Phone, CPF, Store, and Terms with valid dummy data. | Valid fields ready. |
| 2  | In the Email field, enter `carlos.silva`. | Value has no domain or `@`. |
| 3  | Click "Confirmar Pedido". | Error message "Email inválido" is displayed under the email field. |
| 4  | Change Email to `carlos@` and click submit. | Error message "Email inválido" persists. |
| 5  | Change Email to `carlos@domain.com`. | Error message clears. |

#### Expected Results
- Email syntax validation ensures only RFC-compliant addresses are accepted.

#### Acceptance Criteria
- Malformed emails block checkout with "Email inválido".

---

## Module 4: Financing Calculation & Automated Credit Analysis

---

### CT10 - Financing: Installment Calculation and Down Payment Recalculation

#### Objective
Validate that selecting "Financiamento" calculates the 12 installments with 2% monthly interest, and entering a down payment dynamically reduces the financed principal and updates monthly installments in real time.

#### Preconditions
- Customer is on `/order` with base vehicle price `R$ 40.000,00`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | In the "Forma de Pagamento" section, click the "Financiamento" card. | "Financiamento" becomes the active payment method. Down payment input and finance card expand. |
| 2  | Verify the calculated installment value with Down Payment = R$ 0,00. | Formula: `(40000 / 12) * 1.02 = 3400.00`. Display reads: `12x de R$ 3.400,00`. Total financed: `R$ 40.800,00`. |
| 3  | In the "Valor da Entrada" input field, type `10000` (R$ 10.000,00 down payment). | Amount to finance updates to `R$ 30.000,00` (40.000 - 10.000). |
| 4  | Verify the updated monthly installment and summary values. | New installment formula: `(30000 / 12) * 1.02 = 2550.00`. Display reads `12x de R$ 2.550,00`. Summary total updates to `R$ 40.600,00` (10.000 + 30.600). |

#### Expected Results
- Financing calculations accurately apply the 12x term with 2% monthly interest and dynamically recalculate upon down payment input without full page reload.

#### Acceptance Criteria
- Default zero down payment yields 12 installments of R$ 3.400,00.
- R$ 10.000,00 down payment recalculates installments to R$ 2.550,00.

---

### CT11 - Financing: Automatic Approval for Down Payment >= 50% (Business Rule Exception)

#### Objective
Validate the critical business rule exception: if the customer provides a down payment of 50% or more of the vehicle's total price, the credit analysis must automatically grant `APROVADO` status, even if the customer's credit score is lower than 700.

#### Preconditions
- Customer is on `/order` with vehicle total price `R$ 40.000,00`.
- Customer CPF corresponds to a low credit score (e.g. Score = 450, which would normally be rejected).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Select "Financiamento" as the payment method. | Financing inputs are visible. |
| 2  | In the "Valor da Entrada" field, enter `20000` (exactly 50% of R$ 40.000,00). | Down payment is R$ 20.000,00 (50%). Amount to finance is R$ 20.000,00. |
| 3  | Fill all personal data with valid information, using a CPF associated with Score 450. | All fields are valid. |
| 4  | Accept terms and click "Confirmar Pedido". | Submitting triggers credit-analysis function. System detects `entryPercentage >= 0.5`. Order status is set to `APROVADO`. |
| 5  | Verify the resulting page. | User lands on `/success` displaying "Pedido Aprovado!" with a green checkmark icon. |

#### Expected Results
- The 50% down payment rule overrides the low score, granting immediate order approval.

#### Acceptance Criteria
- Order status is `APROVADO`.
- Success page displays approved state.

---

### CT12 - Financing: Credit Score > 700 Yields Immediate Approval

#### Objective
Validate that when the down payment is less than 50%, an applicant with a credit score greater than 700 receives an automatic `APROVADO` status.

#### Preconditions
- Customer is on `/order` with total price `R$ 40.000,00`.
- Down payment is set to `R$ 5.000,00` (12.5% < 50%).
- Customer CPF returns a credit score of `850` from the credit analysis API.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Select "Financiamento" and enter `5000` in "Valor da Entrada". | Amount to finance is R$ 35.000,00. |
| 2  | Fill all required customer fields with the CPF associated with Score 850. | All fields are populated. |
| 3  | Check terms and click "Confirmar Pedido". | Submitting contacts credit service; score returned is 850 (> 700). Order is marked `APROVADO`. |
| 4  | Verify the resulting page. | Redirects to `/success` displaying "Pedido Aprovado!", green banner, and assigned order number. |

#### Expected Results
- High score (> 700) results in approval without human review requirement.

#### Acceptance Criteria
- Order status in database is `APROVADO`.
- Confirmation header reads "Pedido Aprovado!".

---

### CT13 - Financing: Credit Score Between 501 and 700 Sets Status to Under Analysis

#### Objective
Validate that when down payment is less than 50% and the customer's credit score is between 501 and 700, the order is registered with status `EM_ANALISE`.

#### Preconditions
- Customer is on `/order`.
- Down payment is set to `R$ 0,00`.
- Customer CPF returns a credit score of `600` (Score between 501 and 700).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Select "Financiamento" with zero down payment. | Financing mode active. |
| 2  | Fill in required personal data using the CPF that yields score 600. | Fields are valid. |
| 3  | Accept terms and click "Confirmar Pedido". | Submitting contacts credit service; score returned is 600. Decision rule sets status to `EM_ANALISE`. |
| 4  | Verify database insertion and transition. | Order is saved with status `EM_ANALISE` and user proceeds to confirmation. |

#### Expected Results
- Moderate credit score sets the order into the pending review state `EM_ANALISE`.

#### Acceptance Criteria
- Database record has `status = 'EM_ANALISE'`.

---

### CT14 - Financing: Credit Score <= 500 Yields Order Rejection

#### Objective
Validate that when down payment is less than 50% and the customer's credit score is 500 or lower, the order status is set to `REPROVADO` and the customer is informed accordingly.

#### Preconditions
- Customer is on `/order`.
- Down payment is set to `R$ 0,00`.
- Customer CPF returns a credit score of `350` (Score <= 500).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Select "Financiamento" with zero down payment. | Financing mode active. |
| 2  | Fill in required customer data using the CPF that yields score 350. | All fields valid. |
| 3  | Accept terms and click "Confirmar Pedido". | Credit service returns score 350. Rule 4 assigns status `REPROVADO`. User is redirected to `/success`. |
| 4  | Verify the status presentation on `/success`. | Headline reads "Crédito Reprovado" in destructive red styling with an X icon. Text advises trying again with cash payment. |

#### Expected Results
- Low credit score causes credit disapproval (`REPROVADO`), clearly notifying the customer on the outcome screen.

#### Acceptance Criteria
- Database record has `status = 'REPROVADO'`.
- Success page displays "Crédito Reprovado" and red icon.

---

## Module 5: Order Confirmation (Success Page)

---

### CT15 - Confirmation: Order Details Presentation and Navigation Actions

#### Objective
Validate that upon successful order creation, the `/success` page displays all essential order details (Order Number, Customer Details, Pickup Store, Vehicle preview, and Finalized Price) and provides functional navigation buttons ("Consultar Pedido" and "Configurar Outro").

#### Preconditions
- Customer just finalized an approved order with number `VLO-123456`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Land on `/success` via navigation state from checkout. | The page renders with a green checkmark and "Pedido Aprovado!". |
| 2  | Verify Order Number and Customer metadata. | Displays the generated order code (`VLO-123456`), Customer Name, Email, and Pickup Store matching checkout entries. |
| 3  | Verify Order Summary card. | Displays vehicle thumbnail matching selected configuration and the finalized Total Price. |
| 4  | Click the "Consultar Pedido" button (`data-testid="goto-consultar"`). | Navigates to `/lookup` (Order Lookup page). |
| 5  | Return to `/success` and click "Configurar Outro" button (`data-testid="configure-another"`). | Navigates to `/configure` with a fresh baseline configuration ready. |

#### Expected Results
- All purchase and customer attributes are displayed clearly for the customer's records, and action buttons navigate correctly.

#### Acceptance Criteria
- Order ID matches the pattern `VLO-[A-Z0-9]{6}`.
- All customer and vehicle details match the submitted order.
- Action buttons navigate to `/lookup` and `/configure` respectively.

---

## Module 6: Order Lookup

---

### CT16 - Order Lookup: Order Search and Status Badges (Approved, Rejected, Under Review)

#### Objective
Verify that querying existing orders by their valid order code (`order_number`) retrieves full vehicle and customer details and displays the appropriate status badge and color for each state (`APROVADO`, `REPROVADO`, and `EM_ANALISE`).

#### Preconditions
- Orders exist in the database with known numbers:
  - Approved order: `VLO-LXCG92` (Status: `APROVADO`)
  - Rejected order: `VLO-PSVJPK` (Status: `REPROVADO`)
  - Under analysis order: `VLO-R4PQOJ` (Status: `EM_ANALISE`)
- Customer is on `/lookup`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | In the "Número do Pedido" input, enter `VLO-LXCG92` and click "Buscar Pedido". | Result card renders with full order details and a green badge displaying `APROVADO` with a check icon. |
| 2  | Enter `VLO-PSVJPK` and click "Buscar Pedido". | Result card renders with a red badge displaying `REPROVADO` with an X icon. |
| 3  | Enter `VLO-R4PQOJ` and click "Buscar Pedido". | Result card renders with an amber badge displaying `EM_ANALISE` with a clock icon. |

#### Expected Results
- Order search correctly displays vehicle/customer data and renders the distinct visual badge appropriate for each approval state.

#### Acceptance Criteria
- `APROVADO` displays green styling (`bg-green-100 text-green-700`).
- `REPROVADO` displays red styling (`bg-red-100 text-red-700`).
- `EM_ANALISE` displays amber styling (`bg-amber-100 text-amber-700`).

---

### CT17 - Order Lookup: Search Button Disabled State for Empty or Whitespace Input

#### Objective
Ensure that the "Buscar Pedido" submit button remains disabled when the order number field is empty or contains only whitespace characters, preventing unnecessary API queries.

#### Preconditions
- Customer is on `/lookup`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Inspect the "Buscar Pedido" button upon page load with an empty input. | Button is disabled (`disabled` attribute is true). |
| 2  | Type three space characters (`   `) into the order number input. | Input contains spaces only. Button remains disabled (`disabled` is true). |
| 3  | Type a valid character `V`. | Input is `   V`. Button immediately becomes enabled. |
| 4  | Clear the field completely. | Button returns to disabled state. |

#### Expected Results
- Input trimming prevents empty queries and enforces client-side entry verification.

#### Acceptance Criteria
- Button is disabled if `!orderId.trim()`.
- Button is enabled as soon as non-whitespace characters are entered.

---

### CT18 - Order Lookup: Non-Existent Order Number (Not Found State)

#### Objective
Verify that searching for an order number that does not exist in the database displays an explicit "Pedido não encontrado" error card and hides any prior search results.

#### Preconditions
- Customer is on `/lookup`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | In the "Número do Pedido" input, enter a non-existent code: `VLO-000000`. | Input contains `VLO-000000`. |
| 2  | Click "Buscar Pedido". | Loader is shown briefly while querying Supabase. |
| 3  | Observe the response UI. | "Pedido não encontrado" card is displayed with an X icon and the message: "Verifique o número do pedido e tente novamente". No order result card is rendered. |

#### Expected Results
- System alerts the user gracefully when a search yields no records.

#### Acceptance Criteria
- Error card displays headline "Pedido não encontrado" and subtitle "Verifique o número do pedido e tente novamente".
- Result details card is not rendered.

---

## 2. Requirements Traceability Matrix (RTM)

| Requirement / Business Rule | Description | Covered Test Cases |
|:----------------------------|:------------|:-------------------|
| **REQ-01: Base Vehicle Pricing** | Base car price is R$ 40.000,00 | CT03, CT04, CT05 |
| **REQ-02: Sport Wheels Option** | Sport wheels add +R$ 2.000,00 | CT04, CT06 |
| **REQ-03: Precision Park Option** | Precision Park adds +R$ 5.500,00 | CT05, CT06 |
| **REQ-04: Flux Capacitor Option** | Flux Capacitor adds +R$ 5.000,00 | CT05 |
| **REQ-05: Real-time Car Visuals** | Color and wheel selections update car image preview | CT03, CT04, CT06 |
| **REQ-06: Checkout Mandatory Fields** | Name, Surname, Email, Phone, CPF, Store, Terms | CT07, CT08, CT09 |
| **REQ-07: Financing Calculation** | Locked at 12x with 2% monthly interest formula | CT10 |
| **REQ-08: Down Payment Deduction** | Down payment reduces amount to finance dynamically | CT10, CT11 |
| **REQ-09: 50% Down Payment Exception** | Down Payment >= 50% automatically approves order (Score bypassed) | CT11 |
| **REQ-10: Credit Score > 700** | Automatically approved (`APROVADO`) | CT12 |
| **REQ-11: Credit Score 501 to 700** | Under review (`EM_ANALISE`) | CT13 |
| **REQ-12: Credit Score <= 500** | Rejected (`REPROVADO`) | CT14 |
| **REQ-13: Confirmation Page** | Displays Order ID, customer, configuration, pricing, and actions | CT15 |
| **REQ-14: Order Lookup Search & Badges** | Requires valid `order_number`, disabled on empty, displays badges | CT16, CT17, CT18 |
| **REQ-15: Landing Page Content & Nav** | Specs, Header, Hero CTA to configurator and lookup | CT01, CT02 |
