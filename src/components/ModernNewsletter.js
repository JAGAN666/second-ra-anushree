import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement);

// Global styles with modern fonts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow-x: hidden;
    background: ${props => props.darkMode ? '#0a0a0a' : '#ffffff'};
  }
`;

// Animations
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Styled Components
const NewsletterWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.darkMode
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  position: relative;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 0%, #e0e0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.1);
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-bottom: 3rem;
  max-width: 800px;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  width: 100%;
  max-width: 800px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const ContentSection = styled(motion.section)`
  padding: 100px 20px;
  position: relative;
  background: ${props => props.darkMode
    ? 'rgba(10, 10, 10, 0.95)'
    : 'rgba(255, 255, 255, 0.98)'};
  backdrop-filter: blur(20px);
  margin: 50px 0;
  border-radius: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const GlassCard = styled(motion.div)`
  background: ${props => props.darkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 2.5rem;
  margin: 2rem 0;
  border: 1px solid ${props => props.darkMode
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.3)'};
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);

    &::before {
      left: 100%;
    }
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled(GlassCard)`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.2))';
      case 'warning': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.2))';
      case 'danger': return 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.2))';
      default: return 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.2))';
    }
  }};
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'danger': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      default: return 'linear-gradient(135deg, #6366f1, #4f46e5)';
    }
  }};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.darkMode ? '#fff' : '#1a202c'};
`;

const FeatureValue = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 1rem 0;
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'danger': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      default: return 'linear-gradient(135deg, #6366f1, #4f46e5)';
    }
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.darkMode ? 'rgba(255, 255, 255, 0.8)' : '#64748b'};
`;

const ChartContainer = styled(motion.div)`
  background: ${props => props.darkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ChartTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.darkMode ? '#fff' : '#2d3748'};
  text-align: center;
`;

const InsightCard = styled(motion.div)`
  background: ${props => {
    switch(props.type) {
      case 'success': return props.darkMode
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.2))';
      case 'warning': return props.darkMode
        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05))'
        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.2))';
      default: return props.darkMode
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.05))'
        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.2))';
    }
  }};
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#6366f1';
    }
  }};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

const InsightTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.darkMode ? '#fff' : '#1a202c'};
`;

const InsightText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.darkMode ? 'rgba(255, 255, 255, 0.85)' : '#4a5568'};
`;

const Footer = styled.footer`
  text-align: center;
  padding: 4rem 2rem;
  color: #fff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  backdrop-filter: blur(10px);
  border-radius: 30px 30px 0 0;
  margin-top: 4rem;
`;

const CitationLink = styled.a`
  color: #a5b4fc;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;

  &:hover {
    color: #c7d2fe;
    border-bottom-color: #c7d2fe;
  }
`;

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    transform: scale(1.1) rotate(90deg);
  }
`;

const ModernNewsletter = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Data for visualizations
  const participationData = {
    labels: ['Stable Participation', 'Major Increases', 'Major Decreases'],
    datasets: [{
      data: [60, 20, 20],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  const providerTypeData = {
    labels: ['Family Medicine', 'Internal Medicine', 'NPs', 'PAs', 'OB/GYN', 'Pediatrics'],
    datasets: [{
      label: 'Stability Rate (%)',
      data: [67, 64, 52, 52, 68, 70],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(196, 181, 253, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(79, 70, 229, 0.8)'
      ],
      borderRadius: 10,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#1a202c',
          font: {
            size: 12,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#64748b',
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#64748b',
        }
      }
    }
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <NewsletterWrapper darkMode={darkMode}>
        <Container>
          {/* Hero Section */}
          <HeroSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroTitle
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Medicaid Provider Participation Crisis
            </HeroTitle>

            <HeroSubtitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Unveiling the Dynamic Nature of Healthcare Access Through
              Groundbreaking Research on Provider Stability
            </HeroSubtitle>

            <StatsGrid>
              <StatCard
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>
                  <CountUp end={220665} duration={2} separator="," />
                </StatNumber>
                <StatLabel>Clinicians Analyzed</StatLabel>
              </StatCard>

              <StatCard
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>
                  <CountUp end={40} duration={2} />
                </StatNumber>
                <StatLabel>States Covered</StatLabel>
              </StatCard>

              <StatCard
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>
                  <CountUp end={40} duration={2} suffix="%" />
                </StatNumber>
                <StatLabel>Provider Volatility</StatLabel>
              </StatCard>
            </StatsGrid>

            <ScrollIndicator
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </HeroSection>

          {/* Key Findings Section */}
          <ContentSection darkMode={darkMode} ref={ref}>
            <SectionTitle
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              Key Research Findings
            </SectionTitle>

            <FeatureGrid>
              <FeatureCard
                type="primary"
                darkMode={darkMode}
                initial={{ x: -50, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <FeatureIcon type="primary">📊</FeatureIcon>
                <FeatureTitle darkMode={darkMode}>Provider Stability</FeatureTitle>
                <FeatureValue type="primary">
                  <CountUp end={60} duration={2} suffix="%" />
                </FeatureValue>
                <FeatureDescription darkMode={darkMode}>
                  Only 60% of primary care clinicians maintained stable Medicaid
                  participation over the study period
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard
                type="success"
                darkMode={darkMode}
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <FeatureIcon type="success">📈</FeatureIcon>
                <FeatureTitle darkMode={darkMode}>Growth Patterns</FeatureTitle>
                <FeatureValue type="success">
                  <CountUp end={20} duration={2} suffix="%" />
                </FeatureValue>
                <FeatureDescription darkMode={darkMode}>
                  Providers experienced major increases in patient volume,
                  suggesting capacity expansion
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard
                type="danger"
                darkMode={darkMode}
                initial={{ x: 50, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <FeatureIcon type="danger">📉</FeatureIcon>
                <FeatureTitle darkMode={darkMode}>Access Disruption</FeatureTitle>
                <FeatureValue type="danger">
                  <CountUp end={20} duration={2} suffix="%" />
                </FeatureValue>
                <FeatureDescription darkMode={darkMode}>
                  Significant decreases in participation, disrupting care for
                  thousands of beneficiaries
                </FeatureDescription>
              </FeatureCard>
            </FeatureGrid>
          </ContentSection>

          {/* Data Visualization Section */}
          <ContentSection darkMode={darkMode}>
            <SectionTitle>Data Insights</SectionTitle>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              <ChartContainer darkMode={darkMode}>
                <ChartTitle darkMode={darkMode}>Provider Participation Patterns</ChartTitle>
                <div style={{ height: '300px' }}>
                  <Doughnut data={participationData} options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        ...chartOptions.plugins.legend,
                        position: 'bottom'
                      }
                    }
                  }} />
                </div>
              </ChartContainer>

              <ChartContainer darkMode={darkMode}>
                <ChartTitle darkMode={darkMode}>Stability by Provider Type</ChartTitle>
                <div style={{ height: '300px' }}>
                  <Bar data={providerTypeData} options={chartOptions} />
                </div>
              </ChartContainer>
            </div>
          </ContentSection>

          {/* Insights Section */}
          <ContentSection darkMode={darkMode}>
            <SectionTitle>Critical Insights</SectionTitle>

            <InsightCard type="success" darkMode={darkMode}>
              <InsightTitle darkMode={darkMode}>Community Health Center Excellence</InsightTitle>
              <InsightText darkMode={darkMode}>
                CHC-affiliated providers demonstrated significantly higher stability compared to non-CHC providers,
                suggesting that institutional support and mission-driven care models enhance provider retention
                and reduce participation volatility.
              </InsightText>
            </InsightCard>

            <InsightCard type="warning" darkMode={darkMode}>
              <InsightTitle darkMode={darkMode}>Rural Access Challenges</InsightTitle>
              <InsightText darkMode={darkMode}>
                Rural areas show higher volatility rates and greater susceptibility to access disruptions.
                Provider shortages in rural regions compound the impact of participation changes, creating
                critical access vulnerabilities for Medicaid beneficiaries.
              </InsightText>
            </InsightCard>

            <InsightCard type="highlight" darkMode={darkMode}>
              <InsightTitle darkMode={darkMode}>Policy Impact</InsightTitle>
              <InsightText darkMode={darkMode}>
                The study examined the impact of Medicaid expansion on provider participation patterns.
                State Medicaid policy decisions appear to influence provider participation and network adequacy,
                though specific quantitative impacts varied across states.
              </InsightText>
            </InsightCard>
          </ContentSection>

          {/* Footer */}
          <Footer>
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              Research by Bodas, M., Luo, Q., Vichare, A.
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Published in International Journal of Environmental Research and Public Health, 2025
            </p>
            <p style={{ marginTop: '1rem' }}>
              <CitationLink href="https://doi.org/10.3390/ijerph22091339" target="_blank" rel="noopener noreferrer">
                DOI: 10.3390/ijerph22091339
              </CitationLink>
            </p>
          </Footer>
        </Container>

        {/* Dark Mode Toggle */}
        <FloatingButton
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? '☀️' : '🌙'}
        </FloatingButton>
      </NewsletterWrapper>
    </>
  );
};

export default ModernNewsletter;