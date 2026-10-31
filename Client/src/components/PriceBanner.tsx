import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Shown from 1 Nov 2026 00:00 to 15 Nov 2026 00:00 Sofia time (EET, UTC+2).
const SHOW_FROM = new Date('2026-11-01T00:00:00+02:00').getTime();
const SHOW_UNTIL = new Date('2026-11-15T00:00:00+02:00').getTime();

const isActive = () => {
  const now = Date.now();
  return now >= SHOW_FROM && now < SHOW_UNTIL;
};

const Notice = styled.p`
  color: #E53935;
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: -0.5rem 0 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: -0.5rem 0 1.25rem;
  }
`;

const PriceBanner = () => {
  const [visible, setVisible] = useState(isActive);

  // Re-check every 30s so it appears at midnight / disappears without a reload.
  useEffect(() => {
    const id = setInterval(() => setVisible(isActive()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return <Notice>Нови цени от 1 ноември</Notice>;
};

export default PriceBanner;
