import { useLocation } from "react-router-dom";
import React from "react";

interface ToggleSelectedIdLinkProps {
  idToToggle: string;
  children: React.ReactNode;
}

const ToggleSelectedIdLink: React.FC<ToggleSelectedIdLinkProps> = ({ idToToggle, children }) => {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    const allParams = new URLSearchParams(url.search);
    const idStr = String(idToToggle);

    const selectedIds = allParams.getAll("selectedIds");

    const updatedIds = selectedIds.includes(idStr)
      ? selectedIds.filter((id) => id !== idStr)
      : [...selectedIds, idStr];

    allParams.delete("selectedIds");
    updatedIds.forEach((id) => allParams.append("selectedIds", id));

    const newUrl = `${location.pathname}?${allParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <a href="#" onClick={handleClick}>
      {children}
    </a>
  );
};

export default ToggleSelectedIdLink;
