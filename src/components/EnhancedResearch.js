import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler, ChartDataLabels);

// Animated gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
`;

// Global styles with modern design
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0a0b1e;
    color: #ffffff;
    overflow-x: hidden;
    position: relative;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
`;

// Modern styled components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #0a0b1e, #1a1b3a, #2d1b69, #0f3460);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
    pointer-events: none;
    z-index: 1;
  }
`;

const GlowingOrb = styled(motion.div)`
  position: fixed;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  border-radius: 50%;
  background: ${props => props.color || 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)'};
  filter: blur(40px);
  top: ${props => props.top || '10%'};
  left: ${props => props.left || '10%'};
  z-index: 0;
  pointer-events: none;
`;

const Navigation = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 11, 30, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding: 0 40px;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled(motion.div)`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const NavLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #667eea;
    &::after {
      width: 100%;
    }
  }
`;

const CTAButton = styled(motion.button)`
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 120px 40px 80px;
  z-index: 10;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  text-align: center;
  z-index: 10;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 50%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  letter-spacing: -2px;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 50px;
  font-weight: 300;
  line-height: 1.6;
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-top: 80px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatCard = styled(motion.div)`
  text-align: center;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const StatNumber = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const Section = styled.section`
  padding: 100px 40px;
  position: relative;
  z-index: 10;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ChartContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 40px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
  }
`;

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const FeatureCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: ${pulseAnimation} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};

  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #ffffff;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  padding: 40px 0;
  max-width: 1000px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    &::before {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  position: relative;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: row !important;
    padding-left: 60px;
  }
`;

const TimelineContent = styled(motion.div)`
  flex: 1;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 30px;
`;

const TimelineDot = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);

  @media (max-width: 768px) {
    left: 30px;
  }
`;

const Footer = styled.footer`
  padding: 60px 40px;
  background: rgba(10, 11, 30, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  z-index: 10;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: translateY(-5px) rotate(10deg);
  }
`;

const EnhancedResearch = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });
  const { ref: chartsRef, inView: chartsInView } = useInView({ threshold: 0.3 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.3 });
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chart data with vibrant colors
  const barChartData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Enrollment (Millions)',
        data: [71.4, 80.5, 86.7, 91.2, 93.8, 95.2],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 10,
      },
      {
        label: 'Coverage Rate (%)',
        data: [20.1, 22.8, 24.2, 25.6, 26.3, 26.8],
        backgroundColor: 'rgba(118, 75, 162, 0.8)',
        borderColor: 'rgba(118, 75, 162, 1)',
        borderWidth: 2,
        borderRadius: 10,
      }
    ]
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Growth',
        data: [65, 68, 70, 74, 78, 82, 85, 88, 91, 94, 96, 98],
        borderColor: 'rgba(102, 126, 234, 1)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Projected Growth',
        data: [65, 69, 73, 77, 81, 85, 89, 93, 97, 101, 105, 109],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const doughnutData = {
    labels: ['Adults', 'Children', 'Disabled', 'Elderly', 'Others'],
    datasets: [{
      data: [45, 28, 12, 10, 5],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
      borderWidth: 0,
    }]
  };

  const radarData = {
    labels: ['Access', 'Quality', 'Efficiency', 'Equity', 'Outcomes', 'Satisfaction'],
    datasets: [
      {
        label: 'Current Performance',
        data: [85, 78, 82, 90, 75, 88],
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
      },
      {
        label: 'Target Performance',
        data: [95, 90, 90, 95, 85, 92],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 14,
            weight: 500,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        cornerRadius: 10,
        padding: 15,
      },
      datalabels: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      }
    }
  };

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            weight: 500,
          }
        }
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        {/* Animated Background Orbs */}
        <GlowingOrb
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          size="400px"
          top="10%"
          left="5%"
        />
        <GlowingOrb
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          size="300px"
          color="radial-gradient(circle, rgba(118, 75, 162, 0.5) 0%, transparent 70%)"
          top="60%"
          left="70%"
        />
        <GlowingOrb
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          size="250px"
          color="radial-gradient(circle, rgba(255, 99, 132, 0.3) 0%, transparent 70%)"
          top="40%"
          left="40%"
        />

        {/* Navigation */}
        <Navigation
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <NavContainer>
            <Logo
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📊</span> MediResearch
            </Logo>
            <NavLinks>
              <NavLink href="#home" whileHover={{ scale: 1.1 }}>Home</NavLink>
              <NavLink href="#stats" whileHover={{ scale: 1.1 }}>Statistics</NavLink>
              <NavLink href="#insights" whileHover={{ scale: 1.1 }}>Insights</NavLink>
              <NavLink href="#features" whileHover={{ scale: 1.1 }}>Features</NavLink>
              <NavLink href="#timeline" whileHover={{ scale: 1.1 }}>Timeline</NavLink>
              <CTAButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </CTAButton>
            </NavLinks>
          </NavContainer>
        </Navigation>

        {/* Hero Section */}
        <HeroSection id="home" ref={heroRef}>
          <HeroContent
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroTitle
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming Healthcare Through Data
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive insights into Medicaid participation trends,
              coverage patterns, and healthcare outcomes across America
            </HeroSubtitle>
            <HeroStats
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <StatCard delay="0s">
                <StatNumber>
                  {statsInView && <CountUp end={95.2} duration={2} decimals={1} />}M
                </StatNumber>
                <StatLabel>Total Beneficiaries</StatLabel>
              </StatCard>
              <StatCard delay="0.2s">
                <StatNumber>
                  {statsInView && <CountUp end={26.8} duration={2} decimals={1} />}%
                </StatNumber>
                <StatLabel>Population Coverage</StatLabel>
              </StatCard>
              <StatCard delay="0.4s">
                <StatNumber>
                  {statsInView && <CountUp end={50} duration={2} />}
                </StatNumber>
                <StatLabel>States Expanded</StatLabel>
              </StatCard>
              <StatCard delay="0.6s">
                <StatNumber>
                  {statsInView && <CountUp end={699} duration={2} />}B
                </StatNumber>
                <StatLabel>Annual Spending ($)</StatLabel>
              </StatCard>
            </HeroStats>
          </HeroContent>
        </HeroSection>

        {/* Statistics Section */}
        <Section id="stats" ref={statsRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Key Statistics & Trends
          </SectionTitle>

          <GridContainer>
            <ChartContainer
              initial={{ opacity: 0, x: -50 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div style={{ height: '400px' }}>
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, x: 50 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={{ height: '400px' }}>
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </ChartContainer>
          </GridContainer>

          <GridContainer>
            <ChartContainer
              initial={{ opacity: 0, y: 50 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div style={{ height: '400px' }}>
                <Doughnut data={doughnutData} options={chartOptions} />
              </div>
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, y: 50 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div style={{ height: '400px' }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </ChartContainer>
          </GridContainer>
        </Section>

        {/* Features Section */}
        <Section id="features" ref={featuresRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Research Highlights
          </SectionTitle>

          <GridContainer>
            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              delay="0s"
            >
              <IconWrapper>🏥</IconWrapper>
              <FeatureTitle>Healthcare Access</FeatureTitle>
              <FeatureDescription>
                Expanded coverage has improved healthcare access for millions,
                reducing emergency room visits by 41% and increasing preventive care utilization.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              delay="0.2s"
            >
              <IconWrapper>💊</IconWrapper>
              <FeatureTitle>Prescription Coverage</FeatureTitle>
              <FeatureDescription>
                Over 85% of beneficiaries now have comprehensive prescription drug coverage,
                saving an average of $1,500 annually on medications.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              delay="0.4s"
            >
              <IconWrapper>👨‍👩‍👧‍👦</IconWrapper>
              <FeatureTitle>Family Coverage</FeatureTitle>
              <FeatureDescription>
                28 million children receive healthcare through Medicaid,
                ensuring comprehensive pediatric care and early intervention services.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              delay="0.6s"
            >
              <IconWrapper>🧠</IconWrapper>
              <FeatureTitle>Mental Health</FeatureTitle>
              <FeatureDescription>
                Mental health services utilization increased by 65%,
                with integrated behavioral health becoming a standard of care.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              delay="0.8s"
            >
              <IconWrapper>🏘️</IconWrapper>
              <FeatureTitle>Rural Impact</FeatureTitle>
              <FeatureDescription>
                Rural communities saw a 23% increase in healthcare provider availability
                after Medicaid expansion implementation.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              delay="1s"
            >
              <IconWrapper>💰</IconWrapper>
              <FeatureTitle>Economic Benefits</FeatureTitle>
              <FeatureDescription>
                States that expanded Medicaid created 240,000 new jobs and generated
                $3.4 billion in additional state revenue through economic multiplier effects.
              </FeatureDescription>
            </FeatureCard>
          </GridContainer>
        </Section>

        {/* Timeline Section */}
        <Section id="timeline" ref={timelineRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Evolution Timeline
          </SectionTitle>

          <TimelineContainer>
            <TimelineItem
              initial={{ opacity: 0, x: -50 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <TimelineContent>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>2010 - ACA Passed</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  The Affordable Care Act includes provisions for Medicaid expansion,
                  setting the stage for comprehensive healthcare reform.
                </p>
              </TimelineContent>
              <TimelineDot />
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: 50 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TimelineContent>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>2014 - Expansion Begins</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  First wave of states implement Medicaid expansion,
                  covering millions of previously uninsured Americans.
                </p>
              </TimelineContent>
              <TimelineDot />
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: -50 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TimelineContent>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>2020 - Pandemic Response</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Medicaid proves crucial during COVID-19, providing coverage for
                  testing, treatment, and vaccines for millions.
                </p>
              </TimelineContent>
              <TimelineDot />
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: 50 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TimelineContent>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>2024 - Future Outlook</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Continued expansion and innovation in care delivery models,
                  with focus on value-based care and health equity.
                </p>
              </TimelineContent>
              <TimelineDot />
            </TimelineItem>
          </TimelineContainer>
        </Section>

        {/* Footer */}
        <Footer>
          <FooterContent>
            <Logo style={{ justifyContent: 'center', marginBottom: '30px' }}>
              <span>📊</span> MediResearch
            </Logo>
            <FooterText>
              Advancing healthcare through data-driven insights and comprehensive research
            </FooterText>
            <FooterText style={{ fontSize: '0.9rem', opacity: 0.6 }}>
              © 2024 MediResearch. All rights reserved.
            </FooterText>
            <SocialLinks>
              <SocialLink
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📧
              </SocialLink>
              <SocialLink
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                🐦
              </SocialLink>
              <SocialLink
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                💼
              </SocialLink>
              <SocialLink
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📱
              </SocialLink>
            </SocialLinks>
          </FooterContent>
        </Footer>
      </PageWrapper>
    </>
  );
};

export default EnhancedResearch;