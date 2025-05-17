// import { Link, LinkProps, useSearchParams } from "react-router-dom";
// import { getSearchWith, SearchParams } from "./searchHelper";

// type Props = Omit<LinkProps, "to"> & {
//   params: SearchParams;
// };

// export const SearchLink: React.FC<Props> = ({
//   children,
//   params,
//   ...props
// }) => {
//   const [searchParams] = useSearchParams();

//   return (
//     <Link
//       to={{
//         search: getSearchWith(searchParams, params),
//       }}
//       {...props}
//     >
//       {children}
//     </Link>
//   );
// };
import { Link, useSearchParams } from "react-router-dom";
import React from "react";

interface SearchLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  params:
    | Record<string, string>
    | ((prev: URLSearchParams) => Record<string, string>);
  children: React.ReactNode;
}

export const SearchLink: React.FC<SearchLinkProps> = ({
  params,
  children,
  ...rest
}) => {
  const [searchParams] = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());

  const newParams =
    typeof params === "function"
      ? params(current)
      : { ...Object.fromEntries(current.entries()), ...params };

  const queryString = new URLSearchParams(newParams).toString();

  return <Link to={`?${queryString}`} {...rest}>{children}</Link>;
};
