# cfi-gui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Spartacus

Selected default features and modules during initialization:

- ✅ Assisted Services Module
- ✅ ASM Customer 360
- ✅ Import/Export
- ✅ Saved Cart
- ✅ Quick Order
- ⛔️ Customer Data Cloud Integration - B2C
- ⛔️ Customer Data Cloud Integration - B2B
- ⛔️ Customer Data Platform Integration
- ⛔️ Context-Driven Services Integration
- ✅ Checkout base
- ✅ Checkout B2B (b2b feature, requires Base Checkout)
- ✅ Checkout Scheduled Replenishment (b2b feature, requires Base and B2B Checkout)
- ✅ Cart
- ✅ WishList
- ✅ Order
- ⛔️ Digital Payments Integration
- ⛔️ EPD Visualization Integration
- ✅ Organization - Administration (b2b feature)
- ✅ Organization - User Registration (b2b feature)
- ✅ Organization - Unit Order (b2b feature)
- ✅ Organization - Order Approval (b2b feature)
- ✅ Organization - Account Summary (b2b feature, requires Organization - Administration)
- ⛔️ Product - Bulk Pricing (b2b feature)
- ✅ Product - Variants
- ⛔️ Product Multi-Dimensional - Selector
- ⛔️ Product Multi-Dimensional - PLP price range
- ✅ Product - Image Zoom
- ⛔️ Product - Future Stock
- ⛔️ Product Configurator - Variant Configurator
- ⛔️ Product Configurator - Textfield Configurator
- ⛔️ Product Configurator - CPQ Configurator (b2b feature)
- ⛔️ PDF Invoices
- ⛔️ Qualtrics
- ⛔️ Requested Delivery Date
- ⛔️ Estimated Delivery Date
- ⛔️ S/4HANA Order Management (b2b feature)
- ⛔️ CPQ Quote Integration (b2b feature)
- ⛔️ S/4HANA Service integration (b2b feature)
- ⛔️ SAP Order Management Foundation Integration
- ✅ SmartEdit
- ✅ Store Finder
- ✅ Tracking - Personalization
- ⛔️ Segment Reference
- ⛔️ Tracking - Tag Management System - Google Tag Manager
- ⛔️ Tracking - Tag Management System - Adobe Experience Platform Launch
- ⛔️ Omnichannel Promotion Pricing Service (OPPS) Integration
- ✅ User - Account
- ✅ User - Profile
- ✅ Quote
- ✅ Customer Ticketing
- ⛔️ Pickup in Store

## Spartacus RBSC Token

Before running `npm install`, replace the `${SAP_RBSC_TOKEN}` from the `.npmrc` file with the provided Spartacus RBSC token.

## Permissions and component restrictions

Quick overview of the restricted components and the user roles required for them:

| Component                                | Anonymous | Login | Customer | Approver | Manager | Admin | Unit Level Order Viewer |
| :--------------------------------------- | :-------: | :---: | :------: | :------: | :-----: | :---: | :---------------------: |
| Anonymous Consent Management Banner      |    ✅     |       |          |          |         |       |                         |
| Anonymous Consent Management Open Dialog |    ✅     |       |          |          |         |       |                         |
| My Account                               |           |  ✅   |          |          |         |       |                         |
| PaymentDetailsLink                       |           |       |    ✅    |          |         |       |                         |
| OrderHistoryLink                         |           |       |    ✅    |          |         |       |                         |
| AddressBookLink                          |           |       |    ✅    |          |         |       |                         |
| ApprovalDashboardLink                    |           |       |          |    ✅    |         |       |                         |
| MyCompanyLink                            |           |       |          |          |         |  ✅   |                         |
| UnitLevelOrderLink                       |           |       |          |          |         |       |           ✅            |
