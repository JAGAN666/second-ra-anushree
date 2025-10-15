import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler);

// Animations
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Modern global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #2d3748;
    -webkit-font-smoothing: antialiased;
  }
`;

// Background pattern
const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255, 119, 77, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(118, 75, 162, 0.3) 0%, transparent 50%);
  z-index: 0;
`;

// Main container with glass effect
const PageContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 30px auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 100px rgba(102, 126, 234, 0.2);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 1440px) {
    margin: 20px;
  }

  @media (max-width: 768px) {
    margin: 10px;
    border-radius: 16px;
  }
`;

// Vibrant header
const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderTitle = styled(motion.h1)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const HeaderSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.95;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HeaderStats = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 20px;
    gap: 20px;
  }
`;

const HeaderStat = styled(motion.div)`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.25);
  }

  .value {
    font-size: 2rem;
    font-weight: 900;
    display: block;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .label {
    font-size: 0.8rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    .value { font-size: 1.5rem; }
    .label { font-size: 0.7rem; }
  }
`;

// Content wrapper
const Content = styled.div`
  padding: 30px 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Colorful stats row
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const StatCard = styled(motion.div)`
  background: ${props => props.gradient};
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${props => props.shadow || 'rgba(0,0,0,0.1)'};

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    background-size: 200% 200%;
    animation: ${shimmer} 3s linear infinite;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 25px ${props => props.shadow || 'rgba(0,0,0,0.15)'};

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Modern charts grid
const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ChartBox = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  height: 220px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${props => props.borderGradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
    border-radius: 20px;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
  }
`;

const ChartLabel = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 12px;
  font-family: 'Space Grotesk', sans-serif;
`;

// Content sections with better design
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ContentCard = styled(motion.div)`
  background: linear-gradient(135deg, #f7fafc 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 30px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 15px;
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '${props => props.icon || '📊'}';
    font-size: 1.5rem;
  }
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 15px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BulletItem = styled.li`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #4a5568;
  padding: 8px 0;
  padding-left: 28px;
  position: relative;

  &::before {
    content: '${props => props.icon || '✓'}';
    position: absolute;
    left: 0;
    top: 8px;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
  }
`;

// Beautiful timeline
const TimelineSection = styled.div`
  margin: 30px 0;
  padding: 25px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 20px;
`;

const TimelineRow = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50px;
    right: 50px;
    height: 3px;
    background: linear-gradient(90deg,
      #667eea 0%,
      #764ba2 25%,
      #f687b3 50%,
      #48bb78 75%,
      #4299e1 100%
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 15px;
    &::before { display: none; }
  }
`;

const TimelineItem = styled(motion.div)`
  text-align: center;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const TimelineCircle = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: ${props => props.active
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)'};
  border: 3px solid ${props => props.active ? '#667eea' : '#cbd5e0'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${props => props.active ? 'white' : '#4a5568'};
  margin: 0 auto 10px;
  box-shadow: 0 4px 15px ${props => props.active
    ? 'rgba(102, 126, 234, 0.4)'
    : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${props => props.active
      ? 'rgba(102, 126, 234, 0.6)'
      : 'rgba(0, 0, 0, 0.15)'};
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 0.9rem;
  }
`;

const TimelineLabel = styled.div`
  font-size: 0.85rem;
  color: #4a5568;
  font-weight: 600;
`;

// Info boxes at bottom
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InfoBox = styled(motion.div)`
  background: ${props => props.gradient};
  padding: 20px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  color: white;
  box-shadow: 0 4px 20px ${props => props.shadow};
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px ${props => props.shadow};
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 12px;
  opacity: 0.9;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
`;

const InfoContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.95;
  position: relative;
  z-index: 1;
`;

// Footer
const Footer = styled.div`
  background: linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid rgba(102, 126, 234, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 15px 20px;
    gap: 15px;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

const PrintBtn = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
  }

  @media print {
    display: none;
  }
`;

const VisualPamphlet = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });
  const { ref: chartsRef, inView: chartsInView } = useInView({ threshold: 0.2 });

  // Enhanced chart data with vibrant colors
  const enrollmentData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Enrollment (M)',
      data: [71.4, 80.5, 86.7, 91.2, 93.8, 95.2],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(246, 135, 179, 0.8)',
        'rgba(72, 187, 120, 0.8)',
        'rgba(66, 153, 225, 0.8)',
        'rgba(237, 100, 166, 0.8)',
      ],
      borderWidth: 0,
      borderRadius: 8,
    }]
  };

  const coverageData = {
    labels: ['Adults', 'Children', 'Disabled', 'Elderly'],
    datasets: [{
      data: [45, 28, 12, 15],
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f687b3',
        '#48bb78',
      ],
      borderWidth: 3,
      borderColor: '#fff',
    }]
  };

  const trendData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: '2024 Coverage %',
      data: [26.2, 26.5, 26.7, 26.8],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 6,
      pointBackgroundColor: '#667eea',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 8,
    }]
  };

  const impactData = {
    labels: ['Access', 'Quality', 'Equity', 'Efficiency', 'Outcomes'],
    datasets: [{
      label: 'Score',
      data: [85, 78, 90, 82, 75],
      backgroundColor: 'rgba(118, 75, 162, 0.3)',
      borderColor: '#764ba2',
      borderWidth: 2,
      pointBackgroundColor: '#764ba2',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#764ba2',
      pointRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12, weight: 600 },
        bodyFont: { size: 11 },
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10, weight: 500 },
          color: '#64748b'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: { size: 10, weight: 500 },
          color: '#64748b'
        }
      }
    }
  };

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { display: false },
        pointLabels: {
          font: { size: 10, weight: 600 },
          color: '#4a5568'
        }
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundPattern />

      <PageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced Header */}
        <Header>
          <HeaderContent>
            <HeaderLeft>
              <HeaderTitle
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                🏥 Medicaid Insights Dashboard 2024
              </HeaderTitle>
              <HeaderSubtitle
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Transforming Healthcare Through Data-Driven Excellence
              </HeaderSubtitle>
            </HeaderLeft>
            <HeaderStats>
              <HeaderStat
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="value">{statsInView && <CountUp end={95.2} duration={2} decimals={1} />}M</span>
                <span className="label">Beneficiaries</span>
              </HeaderStat>
              <HeaderStat
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="value">{statsInView && <CountUp end={26.8} duration={2} decimals={1} />}%</span>
                <span className="label">Coverage</span>
              </HeaderStat>
              <HeaderStat
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="value">${statsInView && <CountUp end={699} duration={2} />}B</span>
                <span className="label">Annual</span>
              </HeaderStat>
            </HeaderStats>
          </HeaderContent>
        </Header>

        <Content ref={statsRef}>
          {/* Vibrant Stats Cards */}
          <StatsRow>
            <StatCard
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              shadow="rgba(102, 126, 234, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon delay="0s">🏛️</StatIcon>
              <StatValue>50</StatValue>
              <StatLabel>States</StatLabel>
            </StatCard>

            <StatCard
              gradient="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
              shadow="rgba(253, 160, 133, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon delay="0.2s">🚑</StatIcon>
              <StatValue>41%</StatValue>
              <StatLabel>ER Drop</StatLabel>
            </StatCard>

            <StatCard
              gradient="linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
              shadow="rgba(72, 187, 120, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon delay="0.4s">💉</StatIcon>
              <StatValue>65%</StatValue>
              <StatLabel>Prevention</StatLabel>
            </StatCard>

            <StatCard
              gradient="linear-gradient(135deg, #f687b3 0%, #ed64a6 100%)"
              shadow="rgba(237, 100, 166, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon delay="0.6s">👶</StatIcon>
              <StatValue>28M</StatValue>
              <StatLabel>Children</StatLabel>
            </StatCard>

            <StatCard
              gradient="linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)"
              shadow="rgba(159, 122, 234, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon delay="0.8s">🏘️</StatIcon>
              <StatValue>23%</StatValue>
              <StatLabel>Rural↑</StatLabel>
            </StatCard>

            <StatCard
              gradient="linear-gradient(135deg, #4299e1 0%, #3182ce 100%)"
              shadow="rgba(66, 153, 225, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon delay="1s">💼</StatIcon>
              <StatValue>240K</StatValue>
              <StatLabel>Jobs</StatLabel>
            </StatCard>
          </StatsRow>

          {/* Beautiful Charts */}
          <ChartsGrid ref={chartsRef}>
            <ChartBox
              borderGradient="linear-gradient(135deg, #667eea, #764ba2)"
              initial={{ opacity: 0, y: 20 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ChartLabel>📈 Enrollment Growth</ChartLabel>
              <Bar data={enrollmentData} options={chartOptions} />
            </ChartBox>

            <ChartBox
              borderGradient="linear-gradient(135deg, #f687b3, #ed64a6)"
              initial={{ opacity: 0, y: 20 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ChartLabel>🎯 Coverage Mix</ChartLabel>
              <Doughnut data={coverageData} options={chartOptions} />
            </ChartBox>

            <ChartBox
              borderGradient="linear-gradient(135deg, #48bb78, #38a169)"
              initial={{ opacity: 0, y: 20 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ChartLabel>📊 Quarterly Trends</ChartLabel>
              <Line data={trendData} options={chartOptions} />
            </ChartBox>

            <ChartBox
              borderGradient="linear-gradient(135deg, #4299e1, #3182ce)"
              initial={{ opacity: 0, y: 20 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ChartLabel>⭐ Impact Metrics</ChartLabel>
              <Radar data={impactData} options={radarOptions} />
            </ChartBox>
          </ChartsGrid>

          {/* Content Cards */}
          <MainGrid>
            <ContentCard
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SectionTitle icon="📋">Executive Summary</SectionTitle>
              <InfoText>
                Medicaid has achieved unprecedented success with 95.2M beneficiaries,
                demonstrating remarkable improvements in healthcare access and outcomes
                while driving economic growth across all participating states.
              </InfoText>

              <SectionTitle icon="🏆" style={{ marginTop: '20px' }}>Key Achievements</SectionTitle>
              <BulletList>
                <BulletItem>Record enrollment across all 50 states</BulletItem>
                <BulletItem>$3.4B in additional state revenue</BulletItem>
                <BulletItem>85% prescription drug coverage rate</BulletItem>
                <BulletItem>Mental health services increased 65%</BulletItem>
              </BulletList>
            </ContentCard>

            <ContentCard
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SectionTitle icon="💡">Strategic Insights</SectionTitle>
              <InfoText>
                Enhanced FMAP rates and integrated care models are transforming
                healthcare delivery, with value-based initiatives driving both
                improved outcomes and cost efficiency across the program.
              </InfoText>

              <SectionTitle icon="🎯" style={{ marginTop: '20px' }}>Recommendations</SectionTitle>
              <BulletList>
                <BulletItem>Automated eligibility systems</BulletItem>
                <BulletItem>Enhanced care coordination</BulletItem>
                <BulletItem>Expanded telehealth services</BulletItem>
                <BulletItem>Value-based payment models</BulletItem>
              </BulletList>
            </ContentCard>
          </MainGrid>

          {/* Timeline */}
          <TimelineSection>
            <SectionTitle icon="📅">Implementation Journey</SectionTitle>
            <TimelineRow>
              <TimelineItem>
                <TimelineCircle whileHover={{ scale: 1.15 }}>2019</TimelineCircle>
                <TimelineLabel>71.4M Baseline</TimelineLabel>
              </TimelineItem>
              <TimelineItem>
                <TimelineCircle whileHover={{ scale: 1.15 }}>2020</TimelineCircle>
                <TimelineLabel>Pandemic Era</TimelineLabel>
              </TimelineItem>
              <TimelineItem>
                <TimelineCircle whileHover={{ scale: 1.15 }}>2022</TimelineCircle>
                <TimelineLabel>Expansion Wave</TimelineLabel>
              </TimelineItem>
              <TimelineItem>
                <TimelineCircle active whileHover={{ scale: 1.15 }}>2024</TimelineCircle>
                <TimelineLabel>95.2M Peak</TimelineLabel>
              </TimelineItem>
              <TimelineItem>
                <TimelineCircle whileHover={{ scale: 1.15 }}>2025</TimelineCircle>
                <TimelineLabel>30% Target</TimelineLabel>
              </TimelineItem>
            </TimelineRow>
          </TimelineSection>

          {/* Info Boxes */}
          <InfoGrid>
            <InfoBox
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              shadow="rgba(102, 126, 234, 0.3)"
              whileHover={{ scale: 1.03 }}
            >
              <InfoIcon>🏥</InfoIcon>
              <InfoTitle>Healthcare Revolution</InfoTitle>
              <InfoContent>
                Emergency visits down 41%, preventive care up 65%,
                creating healthier communities nationwide.
              </InfoContent>
            </InfoBox>

            <InfoBox
              gradient="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
              shadow="rgba(253, 160, 133, 0.3)"
              whileHover={{ scale: 1.03 }}
            >
              <InfoIcon>💰</InfoIcon>
              <InfoTitle>Economic Impact</InfoTitle>
              <InfoContent>
                240,000 new jobs created, $3.4B in state revenue,
                multiplier effects boosting local economies.
              </InfoContent>
            </InfoBox>

            <InfoBox
              gradient="linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
              shadow="rgba(72, 187, 120, 0.3)"
              whileHover={{ scale: 1.03 }}
            >
              <InfoIcon>🚀</InfoIcon>
              <InfoTitle>Future Vision</InfoTitle>
              <InfoContent>
                Targeting 30% coverage by 2025 with focus on
                value-based care and health equity initiatives.
              </InfoContent>
            </InfoBox>
          </InfoGrid>
        </Content>

        {/* Footer */}
        <Footer>
          <FooterText>
            <strong>Medicaid Insights 2024</strong> | Real-time Analytics Dashboard
          </FooterText>
          <PrintBtn
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
          >
            🖨️ Print Report
          </PrintBtn>
        </Footer>
      </PageContainer>
    </>
  );
};

export default VisualPamphlet;