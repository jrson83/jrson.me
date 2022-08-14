import type {
  HastElement,
  HastRoot,
  TestFunctionAnything,
} from "#plugins/unified/deps.ts";
import {
  findAfter,
  slugger,
  toString,
  unified,
  visit,
} from "#plugins/unified/deps.ts";

export interface RehypeSlugSectionizeAnchorizeOptions {
  depth?: number;
  wrapperTagName?: string;
  wrapperProperties?: HTMLElement;
  wrapperSlugAdditive?: string;
}

const defaults: RehypeSlugSectionizeAnchorizeOptions = {
  depth: 3,
  wrapperTagName: "section",
  wrapperProperties: undefined,
  wrapperSlugAdditive: "-section",
};

const rehypeSlugSectionizeAnchorize: unified.Plugin<
  [RehypeSlugSectionizeAnchorizeOptions?],
  HastRoot
> = (userOptions?: RehypeSlugSectionizeAnchorizeOptions) => {
  const options = { ...defaults, ...userOptions };

  return (tree: HastRoot) => {
    for (let depth = 0; depth <= options.depth!; depth++) {
      visit(
        tree,
        { type: "element", tagName: `h${depth}` },
        (node, index, parent) => {
          if (parent == null || typeof index !== "number") return;

          const start = node;
          const depth = start.tagName;

          const isEnd = (node: HastElement) =>
            node.type === "element" && node.tagName == depth;

          const end = findAfter(
            parent,
            start,
            isEnd as TestFunctionAnything,
          ) as HastElement;

          const startIndex = parent.children.indexOf(node);
          const endIndex = parent.children.indexOf(end);

          const between = parent.children.slice(
            startIndex,
            endIndex > 0 ? endIndex : undefined,
          );

          const slugId: string | null = node?.properties?.id as string ||
            slugger.slug(toString(node)) || null;

          node.children = [
            {
              type: "element",
              tagName: "a",
              properties: {
                className: "header-anchor",
                href: `#${slugId}`,
              },
              children: [
                {
                  type: "element",
                  tagName: "button",
                  properties: {
                    className: ["btn-reset", "btn-header-anchor"],
                    type: "button",
                  },
                  children: [
                    { type: "text", value: "#" },
                  ],
                },
              ],
            },
            {
              type: "element",
              tagName: "span",
              properties: { role: "heading", ariaLevel: depth.slice(1) },
              children: [
                Object.assign(
                  {},
                  ...node.children,
                  node.properties = {
                    ...(slugId &&
                      {
                        id: slugId,
                      }),
                    role: "presentation",
                  },
                ),
              ],
            },
          ];

          const section = {
            type: "element",
            tagName: options.wrapperTagName,
            properties: {
              ...(options.wrapperProperties &&
                { ...options.wrapperProperties }),
              ...(slugId &&
                {
                  id: `${slugId}${
                    options.wrapperSlugAdditive && options.wrapperSlugAdditive
                  }`,
                }),
            },
            children: between,
          };

          parent!.children.splice(
            startIndex,
            section.children.length,
            section as HastElement,
          );
        },
      );
    }
  };
};

export default rehypeSlugSectionizeAnchorize;
