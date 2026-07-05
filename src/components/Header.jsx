import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { useStudents } from "../context/StudentContext";
import { getAverage } from "../utils/constants";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceAlt};
  background: ${({ theme }) => theme.colors.background};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const LogoMark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.2px;
`;

const StatsBar = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Header = () => {
  const { students } = useStudents();
  const average = getAverage(students);

  return (
    <ThemeProvider theme={theme}>
      <Bar>
        <Inner>
          <LogoMark>KC</LogoMark>
          <TitleGroup>
            <Title>KodeCamp 6.0</Title>
            <StatsBar>
              {students.length} Students · Avg: {average.toFixed(1)}%
            </StatsBar>
          </TitleGroup>
        </Inner>
      </Bar>
    </ThemeProvider>
  );
};

export default Header;
