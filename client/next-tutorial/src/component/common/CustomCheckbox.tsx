import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCheckboxContainer = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #d9d9d9;
  position: relative;
  cursor: pointer;
  margin-right: 8px;
  border: ${(props) =>
    props.checked ? "2px solid #000" : "2px solid transparent"};

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 5px;
    width: 5px;
    height: 10px;
    border: 2px solid #000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const checkedStyle = css`
  &::after {
    opacity: 1;
  }
`;

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
}) => (
  <CheckboxLabel>
    <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
    <CustomCheckboxContainer checked={checked} css={checked && checkedStyle} />
    {label}
  </CheckboxLabel>
);

export default CustomCheckbox;
