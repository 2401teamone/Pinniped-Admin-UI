import styled from "styled-components";

export default function Checkbox({ checked, onChange }) {
  return (
    <CheckBoxWrapper onClick={(e) => e.stopPropagation()}>
      <label className="custom-checkbox">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark"></span>
      </label>
    </CheckBoxWrapper>
  );
}

const CheckBoxWrapper = styled.div`
  .custom-checkbox input[type="checkbox"] {
    display: none;
  }

  .custom-checkbox .checkmark {
    position: relative;
    height: 15px;
    width: 15px;
    background-color: white;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid var(--light-gray);
    border-radius: 4px;
    transition: 0.2s all;
  }

  .custom-checkbox:hover input ~ .checkmark {
    background-color: #ccc;
  }

  .custom-checkbox input:checked ~ .checkmark {
    background-color: var(--accent2);

    &:active {
      transform: scale(0.9);
    }
  }

  .custom-checkbox .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .custom-checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  .custom-checkbox .checkmark:after {
    left: 5px;
    top: 3px;
    width: 2px;
    height: 5px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
