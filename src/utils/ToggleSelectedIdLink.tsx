import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

interface ToggleSelectedIdLinkProps {
  idToToggle: string;
  paramName: string;
  children: React.ReactNode;
}

const ToggleSelectedIdLink: React.FC<ToggleSelectedIdLinkProps> = ({
  idToToggle,
  paramName,
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const currentParams = new URLSearchParams(location.search);
    const idStr = String(idToToggle);

    const selectedIds = currentParams.getAll(paramName);

    const updatedIds = selectedIds.includes(idStr)
      ? selectedIds.filter((id) => id !== idStr)
      : [...selectedIds, idStr];

    currentParams.delete(paramName);
    updatedIds.forEach((id) => currentParams.append(paramName, id));

    navigate(`${location.pathname}?${currentParams.toString()}`, {
      replace: false,
    });
  };

  return (
    <a href="#" onClick={handleClick}>
      {children}
    </a>
  );
};

export default ToggleSelectedIdLink;