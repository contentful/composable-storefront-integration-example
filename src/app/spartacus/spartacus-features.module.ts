import { NgModule } from '@angular/core';

import {
  AnonymousConsentsModule,
  AuthModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  ProductModule,
  ProductOccModule,
  UserModule,
  UserOccModule,
  provideFeatureToggles,
} from '@spartacus/core';
import {
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
  BreadcrumbModule,
  CategoryNavigationModule,
  CmsParagraphModule,
  ConsentManagementModule,
  FooterNavigationModule,
  HamburgerMenuModule,
  HomePageEventModule,
  LinkModule,
  LoginRouteModule,
  LogoutModule,
  MyAccountV2Module,
  MyCouponsModule,
  MyInterestsModule,
  NavigationEventModule,
  NavigationModule,
  NotificationPreferenceModule,
  PDFModule,
  PageTitleModule,
  PaymentMethodsModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListModule,
  ProductListingPageModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  ScrollToTopModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  SiteThemeSwitcherModule,
  StockNotificationModule,
  TabParagraphContainerModule,
  VideoModule,
} from '@spartacus/storefront';

import { AsmCustomer360FeatureModule } from './features/asm/asm-customer360-feature.module';
import { AsmFeatureModule } from './features/asm/asm-feature.module';
import { CartBaseFeatureModule } from './features/cart/cart-base-feature.module';
import { CartImportExportFeatureModule } from './features/cart/cart-import-export-feature.module';
import { CartQuickOrderFeatureModule } from './features/cart/cart-quick-order-feature.module';
import { CartSavedCartFeatureModule } from './features/cart/cart-saved-cart-feature.module';
import { WishListFeatureModule } from './features/cart/wish-list-feature.module';
import { CheckoutFeatureModule } from './features/checkout/checkout-feature.module';
import { ContentfulCMSFeatureModule } from './features/contentful/contentful-cms-feature.module';
import { CustomerTicketingFeatureModule } from './features/customer-ticketing/customer-ticketing-feature.module';
import { OrderFeatureModule } from './features/order/order-feature.module';
import { OrganizationAccountSummaryFeatureModule } from './features/organization/organization-account-summary-feature.module';
import { OrganizationAdministrationFeatureModule } from './features/organization/organization-administration-feature.module';
import { OrganizationOrderApprovalFeatureModule } from './features/organization/organization-order-approval-feature.module';
import { OrganizationUnitOrderFeatureModule } from './features/organization/organization-unit-order-feature.module';
import { OrganizationUserRegistrationFeatureModule } from './features/organization/organization-user-registration-feature.module';
import { ProductImageZoomFeatureModule } from './features/product/product-image-zoom-feature.module';
import { ProductVariantsFeatureModule } from './features/product/product-variants-feature.module';
import { QuoteFeatureModule } from './features/quote/quote-feature.module';
import { StoreFinderFeatureModule } from './features/storefinder/store-finder-feature.module';
import { PersonalizationFeatureModule } from './features/tracking/personalization-feature.module';
import { UserFeatureModule } from './features/user/user-feature.module';

@NgModule({
  declarations: [],
  imports: [
    AuthModule.forRoot(),
    LogoutModule,
    LoginRouteModule,
    HamburgerMenuModule,
    SiteContextSelectorModule,
    LinkModule,
    BannerModule,
    CmsParagraphModule,
    TabParagraphContainerModule,
    BannerCarouselModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,
    ScrollToTopModule,
    PageTitleModule,
    VideoModule,
    PDFModule,
    SiteThemeSwitcherModule,
    UserModule,
    UserOccModule,
    PaymentMethodsModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    MyAccountV2Module,
    StockNotificationModule,
    ConsentManagementModule,
    MyCouponsModule,
    AnonymousConsentsModule.forRoot(),
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,
    ProductModule.forRoot(),
    ProductOccModule,
    ProductDetailsPageModule,
    ProductListingPageModule,
    ProductListModule,
    SearchBoxModule,
    ProductFacetNavigationModule,
    ProductTabsModule,
    ProductCarouselModule,
    ProductReferencesModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductIntroModule,
    CostCenterOccModule,
    NavigationEventModule,
    HomePageEventModule,
    ProductPageEventModule,
    ExternalRoutesModule.forRoot(),
    UserFeatureModule,
    CartBaseFeatureModule,
    CartSavedCartFeatureModule,
    WishListFeatureModule,
    CartQuickOrderFeatureModule,
    CartImportExportFeatureModule,
    OrderFeatureModule,
    CheckoutFeatureModule,
    PersonalizationFeatureModule,
    StoreFinderFeatureModule,
    AsmFeatureModule,
    AsmCustomer360FeatureModule,
    ProductVariantsFeatureModule,
    ProductImageZoomFeatureModule,
    ContentfulCMSFeatureModule,
    OrganizationAdministrationFeatureModule,
    OrganizationOrderApprovalFeatureModule,
    OrganizationUserRegistrationFeatureModule,
    OrganizationUnitOrderFeatureModule,
    OrganizationAccountSummaryFeatureModule,
    QuoteFeatureModule,
    CustomerTicketingFeatureModule,
  ],
  providers: [
    provideFeatureToggles({
      //activated by default - configurable
      // searchBoxV2: true,  //since 2211.41
      // trendingSearches: true,  //since 2211.41
      // headerLayoutForSmallerViewports: true,  //since 2211.41
      // useExtendedMediaComponentConfiguration: true,  //since 2211.41
      // showRealTimeStockInPDP: true,  //since 2211.41
      // enableSecurePasswordValidation: true,  //since 2211.41
      // enableCarouselCategoryProducts: true,  //since 2211.42
      // enableClaimCustomerCouponWithCodeInRequestBody: true,  //since 2211.42
      // updateConsentGivenInOnChanges: true,  //since 2211.42

      // a11ySearchboxLabel: true, //since 2211.41
      // a11yPickupOptionsTabs: true, //since 2211.41
      // a11yUpdatingCartNoNarration: true,  //since 2211.41
      // a11yPasswordVisibliltyBtnValueOverflow: true,  //since 2211.41
      // a11yItemCounterFocus: true,  //since 2211.41
      // a11yScrollToReviewByShowReview: true,  //since 2211.41
      // a11yViewHoursButtonIconContrast: true,  //since 2211.41
      // a11yCheckoutStepsLandmarks: true,  //since 2211.41
      // a11yQTY2Quantity: true,  //since 2211.41
      // a11yDeleteButton2First: true,  //since 2211.41
      // a11yStyleExternalLinksAsLinks: true,  //since 2211.41
      // a11ySelectLabelWithContextForSelectedAddrOrPayment: true,  //since 2211.41
      // a11yTruncatedTextStoreFinder: true,  //since 2211.41
      // a11yNgSelectCloseDropdownOnEscape: true,  //since 2211.41
      // a11yStoreInStockIconContrast: true,  //since 2211.41
      // a11yImproveButtonsInCardComponent: true,  //since 2211.41
      // a11yWrapReviewOrderInSection: true,  //since 2211.41
      // a11yApprovalProcessWithNoClearable: true,  //since 2211.41
      // a11yPostRegisterSuccessMessage: true,  //since 2211.41
      // a11yShowLabelOfSelect: true,  //since 2211.41
      // a11yShowDownArrowOnFocusedSelectMenu: true,  //since 2211.41
      // a11yCroppedFocusRing: true,  //since 2211.41
      // a11yTextSpacingAdjustments: true,  //since 2211.41
      // a11yTableHeaderReadout: true,  //since 2211.41
      // a11ySearchboxAssistiveMessage: true,  //since 2211.41
      // a11yDifferentiateFocusedAndSelected: true,  //since 2211.41
      // a11yPdpGridArrangement: true,  //since 2211.41
      // a11yUseProperTextColorForFutureStockAccordion: true,  //since 2211.42
      // a11yPopoverHighContrast: true,  //since 2211.42
      // a11yTabsManualActivation: true,  //since 2211.42
      // a11yAnonymousConsentMessageInDialog: true,  //since 2211.42
      // a11yQuickOrderSearchListKeyboardNavigation: true,  //since 2211.42
      // a11yResetFocusAfterNavigating: true,  //since 2211.42
      // a11yNgSelectAriaLabelDropdownCustomized: true,  //since 2211.42
      // a11yMiniCartFocusOnMobile: true,  //since 2211.42
      // a11yQuickOrderSearchBoxRefocusOnClose: true,  //since 2211.42
      // a11yKeyboardFocusInSearchBox: true,  //since 2211.42
      // a11yNavigationButtonsAriaFixes: true,  //since 2211.42
      // a11yFocusOnCardAfterSelecting: true,  //since 2211.42
      // a11ySearchableDropdownFirstElementFocus: true,  //since 2211.42
      // a11yHideConsentButtonWhenBannerVisible: true,  //since 2211.42
      // a11yRepeatingButtonsUniqueLabels: true,  //since 2211.42
      // a11yHighContrastBorders: true,  //since 2211.42
      // a11yRegionAssociatedHeaders: true,  //since 2211.42
      // a11yHamburgerMenuTrapFocus: true,  //since 2211.42
      // a11yScrollToTopPositioning: true,  //since 2211.42
      // a11ySelectImprovementsCustomerTicketingCreateSelectbox: true,  //since 221121.1

      //deactivated by default - configurable
      opfEnablePreventingFromCheckoutWithoutEmail: true,
      enableReadDomainValuesOnDemand: true,
      //limitCacheByMemory: true,
      storeFinderFacadeCleanup: true,
      defaultProductPageRouteAllowsNoProductName: true,
      reserveHorizontalSpaceStarRating: true,
      topProgressBarUseTransformAnimation: true,
      readMoreDirective: true,
      productReviewCharactersLeft: true,
      consistentSizeProductCards: true,
      disableCxPageSlotMarginAnimation: true,
      productCarouselScrolling: true,
      createMediaPreconnectLink: true,
      unifiedDefaultHeaderSlotsAcrossBreakpoints: true,
      reserveSpaceForImagesOnPdpAndPlp: true,
      lazyLoadImagesByDefault: true,
      defaultLayoutConfigWithoutPageFold: true,
      authorizationCodeFlowByDefault: true,
      incrementProcessesCountForMergeCart: true,
      dispatchLoginActionOnlyWhenTokenReceived: true,
      cdsLoginEventsToken: true,
      //a11yImprovedErrorMessages: true,
      a11yWideScreenImprovements: true,
      a11yOptimizedMenuSpacing: true,
      a11yNgSelectLayering: true,
      a11yNgSelectAriaControls: true,
      a11yConfiguratorOverviewHeaderVPC: true,
      //a11yNgSelectUnicodeCarets: true,
      //a11yFutureStockAccordionAriaControls: true,
      a11yStoreFinderLabel: true,
      a11yAddPaddingToCarouselPanel: true,
      a11yKeyboardAccessibleZoom: true,
      a11yPreventCartItemsFormRedundantRecreation: true,
      a11yLinkBtnsToTertiaryBtns: true,
    }),
  ],
})
export class SpartacusFeaturesModule {}
