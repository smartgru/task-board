import styled from 'styled-components';

export const StyledNavbarLink = styled.a<{ current: boolean }>`
  text-decoration: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1em 1em;
  border-radius: 0.5em;
  display: flex;
  gap: 1em;

  ${({ current }) =>
    current
      ? `
  background-color: rgba(0, 0, 255, .2);
  font-weight: 600;
  `
      : ''}
`;
