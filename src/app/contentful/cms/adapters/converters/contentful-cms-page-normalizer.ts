import { Injectable } from '@angular/core';

import {
  CMS_COMPONENT_NORMALIZER,
  CMS_FLEX_COMPONENT_TYPE,
  CmsComponent,
  CmsStructureModel,
  ContentSlotComponentData,
  ContentSlotData,
  Converter,
  ConverterService,
  Page,
  PageRobotsMeta,
} from '@spartacus/core';
import { BREAKPOINT, LayoutConfig, LayoutSlotConfig, SlotConfig, SlotGroup } from '@spartacus/storefront';

import { Entry } from 'contentful';

import { ComponentSkeleton, FooterSkeleton, HeaderSkeleton, PageSkeleton } from '../../../core/content-types';
import { RestrictionsService } from '../../../core/services/contentful-restrictions.service';
import { isEntry, isResolvedEntry, isSlotConfig, isSlotGroup } from '../../../core/type-guards';

type EntryWithContentSlots = Entry<PageSkeleton, undefined, string> | Entry<HeaderSkeleton, undefined, string> | Entry<FooterSkeleton, undefined, string>;

@Injectable({ providedIn: 'root' })
export class ContentfulCmsPageNormalizer implements Converter<Entry<PageSkeleton, undefined, string>, CmsStructureModel> {
  constructor(
    private readonly config: LayoutConfig,
    private readonly restrictionsService: RestrictionsService,
    private readonly converter: ConverterService,
  ) {}

  convert(source: Entry<PageSkeleton, undefined, string>, target: CmsStructureModel = {}): CmsStructureModel {
    this.normalizePageData(source, target);
    this.normalizeEntryData(source, [source.fields.template], target, true);

    if (isResolvedEntry<HeaderSkeleton>(source.fields.header)) {
      this.normalizeEntryData(source.fields.header, ['header', 'navigation'], target);
    }

    if (isResolvedEntry<FooterSkeleton>(source.fields.footer)) {
      this.normalizeEntryData(source.fields.footer, ['footer'], target);
    }
    return target;
  }

  /**
   * Converts the Contentful CMS Page model to the `Page` in the `CmsStructureModel`.
   */
  protected normalizePageData(source: Entry<PageSkeleton, undefined, string>, target: CmsStructureModel): void {
    const page: Page = {};

    if (source.fields.internalName) {
      page.name = source.fields.internalName;
    }
    if (source.fields.slug) {
      page.label = `/${source.fields.slug}`;
    }
    if (source.fields.template) {
      page.template = source.fields.template;
    }
    if (source.sys.id) {
      page.pageId = source.sys.id;
    }
    if (source.fields.title) {
      page.title = source.fields.title;
    }
    if (source.fields.description) {
      page.description = source.fields.description;
    }
    if (source.fields.type) {
      page.type = source.fields.type;
    }

    this.normalizeRobots(source, page);

    target.page = page;
  }

  /**
   * Takes an Entry with fields that are named after Slots in corresponding Templates and maps it to the:
   * 1. Page-level slot data
   * 2. Slot-level component data
   * 3. Cms structure-level component data
   */
  protected normalizeEntryData(source: EntryWithContentSlots, templateNames: string[], target: CmsStructureModel, hasBottomHeaderSlot: boolean = false) {
    const entrySlotComponents = this.getSlotComponentsFromEntry(source, templateNames, hasBottomHeaderSlot);
    this.normalizeEntrySlotData(Array.from(entrySlotComponents.keys()), target);
    this.normalizeEntryComponentData(entrySlotComponents, target);
    this.normalizeComponentData(entrySlotComponents, target);
  }

  /**
   * Takes an Entry with fields that are named after Slots in corresponding Templates
   * and returns a map of component arrays that are contained within the Entry fields
   */
  protected getSlotComponentsFromEntry(
    source: EntryWithContentSlots,
    templateNames: string[],
    hasBottomHeaderSlot?: boolean,
  ): Map<string, Entry<ComponentSkeleton, undefined, string>[]> {
    const templateSlotNames = this.getSlotNamesFromConfiguration(templateNames);
    templateSlotNames.push('HeaderLinks');
    if (hasBottomHeaderSlot) {
      templateSlotNames.push('BottomHeaderSlot');
    }
    const entryComponents = new Map<string, Entry<ComponentSkeleton, undefined, string>[]>();
    templateSlotNames
      .filter((slotName) => slotName in source.fields)
      .forEach((slotName) => entryComponents.set(slotName, this.getComponents(source, slotName)));
    return entryComponents;
  }

  /**
   * Takes an array of Slot names and creates empty slots within target Page
   */
  protected normalizeEntrySlotData(slotNames: string[], target: CmsStructureModel): void {
    target.page = target.page ?? {};
    target.page.slots = target.page.slots ?? {};
    for (const slot of slotNames) {
      target.page.slots[slot] = {} as ContentSlotData;
    }
  }

  /**
   * Takes map of slot names and respective component arrays
   * and creates basic component data that gets pushed into page's conten slots
   */
  protected normalizeEntryComponentData(entrySlotComponents: Map<string, Entry<ComponentSkeleton, undefined, string>[]>, target: CmsStructureModel): void {
    entrySlotComponents.forEach((components, slotName) => {
      components.filter(isResolvedEntry).forEach((component) => {
        const targetComponent: ContentSlotComponentData = {
          uid: component.sys.id,
          typeCode: component.sys.contentType.sys.id,
          flexType: this.getFlexTypeFromComponent(component),
          properties: {
            data: component,
          },
        };

        const targetSlot = target.page?.slots?.[slotName];
        if (targetSlot) {
          targetSlot.components ??= [];
          targetSlot.components.push(targetComponent);
        }
      });
    });
  }

  /**
   * Takes map of slot names and respective component arrays
   * and creates advanced component data that gets pushed into resulting
   * CMS structure object
   */
  protected normalizeComponentData(entrySlotComponents: Map<string, Entry<ComponentSkeleton, undefined, string>[]>, target: CmsStructureModel): void {
    entrySlotComponents.forEach((components) => {
      components.filter(isResolvedEntry<ComponentSkeleton>).forEach((sourceComponent) => {
        target.components ??= [];

        const newComponent: CmsComponent = this.converter.convert<Entry<ComponentSkeleton, undefined, string>, CmsComponent>(
          sourceComponent,
          CMS_COMPONENT_NORMALIZER,
        );

        target.components.push(newComponent);
      });
    });
  }

  /**
   * Returns a list of non-repeating content slot names used in the templates provided
   */
  protected getSlotNamesFromConfiguration(templateNames: string[]): string[] {
    const slotNames = new Set<string>();
    for (const templateName of templateNames) {
      const layoutConfiguration = this.config.layoutSlots?.[templateName];
      const templateSlotNames = this.extractSlotNames(layoutConfiguration);
      templateSlotNames.forEach((slotName) => slotNames.add(slotName));
    }
    return Array.from(slotNames);
  }

  /**
   * Returns a list of content slot names used in the layout configuration provided
   */
  protected extractSlotNames(layoutConfiguration: LayoutSlotConfig | SlotConfig | SlotGroup | undefined): string[] {
    const slotNames: string[] = [];
    if (isSlotConfig(layoutConfiguration)) {
      slotNames.push(...(layoutConfiguration.slots ?? []));
    }
    if (isSlotGroup(layoutConfiguration)) {
      Object.values(BREAKPOINT).forEach((value) => {
        if (value !== BREAKPOINT.xl) {
          slotNames.push(...this.extractSlotNames(layoutConfiguration[value]));
        }
      });
    }
    return slotNames;
  }

  /**
   * Returns an array of components from an entry field
   */
  protected getComponents(entry: Entry, field: string): Entry<ComponentSkeleton, undefined, string>[] {
    const components = entry.fields[field] as unknown;

    if (!Array.isArray(components)) {
      return [];
    }

    return components.filter((component) => isEntry<ComponentSkeleton>(component) && this.restrictionsService.isEntryAccessible(component));
  }

  /**
   * Returns the flex type based on the configuration of component properties
   */
  protected getFlexTypeFromComponent(component: Entry<ComponentSkeleton, undefined, string>): string {
    if (component.sys.contentType.sys.id === CMS_FLEX_COMPONENT_TYPE) {
      return <string>component.fields['flexType'];
    }
    return component.sys.contentType.sys.id;
  }

  /**
   * Normalizes the page robot string to an array of `PageRobotsMeta` items.
   */
  protected normalizeRobots(source: Entry<PageSkeleton, undefined, string>, target: Page): void {
    const robots = [];
    if (source.fields.robots) {
      switch (source.fields.robots) {
        case 'index, follow':
          robots.push(PageRobotsMeta.INDEX);
          robots.push(PageRobotsMeta.FOLLOW);
          break;
        case 'noindex':
          robots.push(PageRobotsMeta.NOINDEX);
          robots.push(PageRobotsMeta.FOLLOW);
          break;
        case 'nofollow':
          robots.push(PageRobotsMeta.INDEX);
          robots.push(PageRobotsMeta.NOFOLLOW);
          break;
        case 'noindex, nofollow':
          robots.push(PageRobotsMeta.NOINDEX);
          robots.push(PageRobotsMeta.NOFOLLOW);
          break;
      }
    }

    target.robots = robots;
  }
}
