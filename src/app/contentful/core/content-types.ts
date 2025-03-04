import { EntryFieldType, EntryFieldTypes } from 'contentful';

export type PageSkeleton = {
  contentTypeId: 'cmsPage';
  fields: {
    internalName: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    label: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    robots: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    type: EntryFieldTypes.Symbol;
    template: EntryFieldTypes.Symbol;
    header: EntryFieldTypes.EntryLink<HeaderSkeleton>;
    footer: EntryFieldTypes.EntryLink<FooterSkeleton>;
  };
};

export type HeaderSkeleton = {
  contentTypeId: 'cmsHeader';
  fields: {
    [key: string]: EntryFieldType<ComponentSkeleton>;
  };
};

export type FooterSkeleton = {
  contentTypeId: 'cmsFooter';
  fields: {
    [key: string]: EntryFieldType<ComponentSkeleton>;
  };
};

export type ComponentSkeleton = {
  contentTypeId: string;
  fields: {
    [key: string]: EntryFieldType<ComponentSkeleton>;
  };
};

export type NavigationNodeSkeleton = {
  contentTypeId: 'NavNode';
  fields: {
    uid: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    children?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<NavigationNodeSkeleton>>;
    entries?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CMSLinkComponentSkeleton>>;
  };
};

export type CMSLinkComponentSkeleton = {
  contentTypeId: 'CMSLinkComponent';
  fields: {
    name: EntryFieldTypes.Symbol;
    linkName: EntryFieldTypes.Symbol;
    url: EntryFieldTypes.Symbol;
    target: EntryFieldTypes.Boolean;
  };
};

export type MediaContainerSkeleton = {
  contentTypeId: 'MediaContainer';
  fields: {
    name: EntryFieldTypes.Symbol;
    desktop: EntryFieldTypes.AssetLink;
    mobile: EntryFieldTypes.AssetLink;
    tablet: EntryFieldTypes.AssetLink;
    widescreen: EntryFieldTypes.AssetLink;
  };
};
