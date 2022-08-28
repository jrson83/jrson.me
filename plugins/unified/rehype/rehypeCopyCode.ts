import type { HastElement, HastRoot } from "#plugins/unified/deps.ts";
import { unified, visit } from "#plugins/unified/deps.ts";

const rehypeCopyCode: unified.Plugin<[], HastRoot> = () => {
  return (tree: HastRoot) => {
    visit(
      tree,
      { type: "element", tagName: "div" },
      (node: HastElement) => {
        const className = node?.properties?.className as Array<string> || [];

        if (
          Array.isArray(className) && className.length === 0 &&
          className[0] !== "rehype-code-title"
        ) {
          return;
        }

        const value = node.children[0].type === "text"
          ? node.children[0].value
          : "";

        node.children = [
          {
            type: "element",
            tagName: "span",
            children: [{ type: "text", value }],
          },
          {
            type: "element",
            tagName: "button",
            properties: { className: ["btn-reset", "btn-copy"] },
            children: [
              {
                type: "element",
                tagName: "svg",
                properties: {
                  role: "img",
                  width: "24",
                  height: "24",
                  preserveAspectRatio: "xMidYMid meet",
                  viewBox: "0 0 24 24",
                },
                children: [
                  {
                    type: "element",
                    tagName: "title",
                    properties: {},
                    children: [{ type: "text", value: "Copy to clipboard" }],
                  },
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      fill: "currentColor",
                      d: "M21 8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19a.32.32 0 0 0-.09 0a.88.88 0 0 0-.33-.11H10a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3V8.94Zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM15 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1v7a3 3 0 0 0 3 3h5Zm4-4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z",
                    },
                    children: [],
                  },
                ],
              },
              {
                type: "element",
                tagName: "svg",
                properties: {
                  /* style: "display: none;fill: var(--code-attr-value);", */
                  class: "visually-hidden green",
                  role: "img",
                  width: "24",
                  height: "24",
                  preserveAspectRatio: "xMidYMid meet",
                  viewBox: "0 0 24 24",
                },
                children: [
                  {
                    type: "element",
                    tagName: "title",
                    properties: {},
                    children: [{ type: "text", value: "Copied!" }],
                  },
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      fill: "var(--code-attr-value)",
                      d: "M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47Z",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ];
      },
    );
  };
};

export default rehypeCopyCode;
