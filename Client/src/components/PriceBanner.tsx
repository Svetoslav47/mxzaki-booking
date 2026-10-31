import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Shown from 1 Nov 2026 00:00 to 15 Nov 2026 00:00 Sofia time (EET, UTC+2).
const SHOW_FROM = new Date('2026-11-01T00:00:00+02:00').getTime();
const SHOW_UNTIL = new Date('2026-11-15T00:00:00+02:00').getTime();

const isActive = () => {
  const now = Date.now();
  return now >= SHOW_FROM && now < SHOW_UNTIL;
};

const Banner = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.85rem 1.5rem;
  background-color: #C19B76;
  color: #000000;
  text-decoration: none;
  text-align: center;
  font-family: 'Montserrat', 'Arial', sans-serif;
  position: relative;
  z-index: 1001;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #D4B08C;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const Title = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Link = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  white-space: nowrap;
`;

const PriceBanner = () => {
  const [visible, setVisible] = useState(isActive);

  // Re-check every 30s so it appears at midnight / disappears without a reload.
  useEffect(() => {
    const id = setInterval(() => setVisible(isActive()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Banner href="#services" onClick={handleClick} role="status">
      <Title>Нови цени от 1 ноември</Title>
      <Link>Вижте услугите →</Link>
    </Banner>
  );
};

export default PriceBanner;
