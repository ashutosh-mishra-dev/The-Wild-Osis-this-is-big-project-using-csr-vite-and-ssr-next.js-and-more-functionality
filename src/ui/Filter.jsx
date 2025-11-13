import { useSearchParams } from "react-router";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

//---------------- here we are make dynamic filter for all table via URL ----------------------
function Filter({ filterField, options }) {
  //yha ham url se filter karne vale h
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value); // here the first value isthe name of the state (discount) and second value itself that we are receivingin the function.
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

// ---------------- yha hamne sirf cabin table ke liye filter ka code likha h via url ---------------
// function Filter() {
//   //yha ham url se filter karne vale h
//   const [searchParams, setSearchParams] = useSearchParams();

//   function handleClick(value) {
//     searchParams.set("discount", value); // here the first value isthe name of the state (discount) and second value itself that we are receivingin the function.
//     setSearchParams(searchParams);
//   }

//   return (
//     <StyledFilter>
//       <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
//       <FilterButton onClick={() => handleClick("no-discount")}>
//         No discount
//       </FilterButton>
//       <FilterButton onClick={() => handleClick("with-discount")}>
//         With discount
//       </FilterButton>
//     </StyledFilter>
//   );
// }
//export default Filter;
