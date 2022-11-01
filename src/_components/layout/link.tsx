import type { Children } from "#types";

export default (
  props: {
    href: string;
    className?: string;
    active: boolean;
    itemProp: string;
    children: Children;
  },
) => {
  const className = [props.className, props.active && "is-active"].filter(
    Boolean,
  ).join(" ");
  return (
    <a
      href={props.href}
      {...(className && { className })}
      {...(props.active && { "aria-current": "page" })}
      itemProp={props.itemProp}
    >
      {props.children}
    </a>
  );
};
