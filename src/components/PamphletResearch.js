import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler);

// Clean, professional global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&family=Merriweather:wght@300;400;700;900&family=Roboto+Mono:wght@400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f8fafc;
    color: #1f2937;
    line-height: 1.6;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  ::selection {
    background: #1e3a8a;
    color: white;
  }

  @media print {
    body {
      background: white;
    }
  }
`;

// Main container - pamphlet style
const PamphletContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1280px) {
    margin: 20px;
  }

  @media (max-width: 768px) {
    margin: 10px;
    border-radius: 8px;
  }
`;

// Professional header
const Header = styled.header`
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  padding: 60px 60px 50px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="none"/%3E%3Cpath d="M0 0l50 50L0 100M50 0l50 50-50 50" stroke="%23ffffff" stroke-width="0.5" opacity="0.1" fill="none"/%3E%3C/svg%3E');
    opacity: 0.1;
  }

  @media (max-width: 768px) {
    padding: 40px 30px 30px;
  }
`;

const OrganizationBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-family: 'Merriweather', serif;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  opacity: 0.95;
  line-height: 1.6;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 30px;
  font-size: 0.9rem;
  opacity: 0.9;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// Sidebar Navigation
const Sidebar = styled.nav`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 100;
  min-width: 200px;

  @media (max-width: 1400px) {
    display: none;
  }
`;

const SidebarItem = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 4px 0;
  color: ${props => props.active ? '#1e3a8a' : '#64748b'};
  text-decoration: none;
  border-radius: 8px;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  background: ${props => props.active ? '#eff6ff' : 'transparent'};

  &:hover {
    background: #f1f5f9;
    color: #1e3a8a;
  }

  &::before {
    content: '${props => props.number}';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: ${props => props.active ? '#1e3a8a' : '#cbd5e1'};
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: 12px;
  }
`;

// Content sections
const Section = styled.section`
  padding: 60px;
  border-bottom: 1px solid #e5e7eb;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 3px solid #1e3a8a;
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 20px;
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionNumber = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
`;

// Key statistics cards
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin: 40px 0;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: #1e3a8a;
  }
`;

const StatValue = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #1e3a8a;
  margin-bottom: 8px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatChange = styled.div`
  display: inline-block;
  margin-top: 12px;
  padding: 4px 8px;
  background: ${props => props.positive ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.positive ? '#166534' : '#991b1b'};
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
`;

// Content typography
const Paragraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 20px;
  text-align: justify;
`;

const Callout = styled.div`
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-left: 4px solid #1e3a8a;
  padding: 24px 30px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: #1e3a8a;
    opacity: 0.2;
    font-family: 'Merriweather', serif;
  }
`;

const CalloutText = styled.p`
  font-size: 1.15rem;
  line-height: 1.6;
  color: #1e293b;
  font-style: italic;
  position: relative;
  z-index: 1;
`;

// Charts container
const ChartWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 30px;
  margin: 30px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const ChartTitle = styled.h3`
  font-family: 'Merriweather', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(2, 1fr)'};
  gap: 30px;
  margin: 40px 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

// Lists
const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const BulletItem = styled.li`
  position: relative;
  padding-left: 32px;
  margin-bottom: 16px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #475569;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #1e3a8a;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

// Timeline
const TimelineContainer = styled.div`
  position: relative;
  padding: 20px 0;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 48px;
    bottom: -40px;
    width: 2px;
    background: #e5e7eb;
    z-index: 0;
  }

  &:last-child::before {
    display: none;
  }
`;

const TimelineMarker = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.active ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' : '#ffffff'};
  border: 3px solid ${props => props.active ? '#1e3a8a' : '#e5e7eb'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-right: 24px;
  position: relative;
  z-index: 1;
  background-color: white;
`;

const TimelineContent = styled.div`
  flex: 1;
  padding-top: 8px;
`;

const TimelineTitle = styled.h4`
  font-family: 'Merriweather', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const TimelineDate = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #475569;
`;

// Footer
const Footer = styled.footer`
  background: #f8fafc;
  padding: 40px 60px;
  border-top: 1px solid #e5e7eb;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 8px;
`;

const PrintButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(30, 58, 138, 0.4);
  }

  @media print {
    display: none;
  }
`;

const PamphletResearch = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });
  const { ref: chartsRef, inView: chartsInView } = useInView({ threshold: 0.2 });

  const sections = [
    { id: 'summary', name: 'Executive Summary', icon: '📋' },
    { id: 'statistics', name: 'Key Statistics', icon: '📊' },
    { id: 'analysis', name: 'Data Analysis', icon: '📈' },
    { id: 'insights', name: 'Policy Insights', icon: '💡' },
    { id: 'timeline', name: 'Implementation Timeline', icon: '📅' },
    { id: 'recommendations', name: 'Recommendations', icon: '✅' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Clean, professional chart data
  const enrollmentData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Total Enrollment (Millions)',
        data: [71.4, 80.5, 86.7, 91.2, 93.8, 95.2],
        backgroundColor: 'rgba(30, 58, 138, 0.8)',
        borderColor: '#1e3a8a',
        borderWidth: 2,
        borderRadius: 6,
      },
      {
        label: 'Expansion States',
        data: [35.2, 40.1, 43.8, 46.2, 47.8, 48.9],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 6,
      }
    ]
  };

  const coverageData = {
    labels: ['Adults', 'Children', 'Disabled', 'Elderly', 'Parents'],
    datasets: [{
      label: 'Coverage by Category (%)',
      data: [45, 28, 12, 10, 5],
      backgroundColor: [
        'rgba(30, 58, 138, 0.9)',
        'rgba(59, 130, 246, 0.9)',
        'rgba(8, 145, 178, 0.9)',
        'rgba(100, 116, 139, 0.9)',
        'rgba(148, 163, 184, 0.9)',
      ],
      borderWidth: 0,
    }]
  };

  const trendData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
    datasets: [
      {
        label: 'Coverage Rate (%)',
        data: [25.2, 25.8, 26.1, 26.3, 26.5, 26.8],
        borderColor: '#1e3a8a',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#1e3a8a',
      }
    ]
  };

  const impactData = {
    labels: ['Healthcare Access', 'Preventive Care', 'Financial Protection', 'Health Outcomes', 'Provider Network', 'Care Coordination'],
    datasets: [
      {
        label: 'Impact Score',
        data: [85, 78, 92, 75, 68, 82],
        backgroundColor: 'rgba(30, 58, 138, 0.2)',
        borderColor: '#1e3a8a',
        borderWidth: 2,
        pointBackgroundColor: '#1e3a8a',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1e3a8a',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: 'Source Sans Pro',
          },
          color: '#475569',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          }
        }
      },
      y: {
        grid: {
          color: '#f1f5f9',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          }
        }
      }
    }
  };

  const polarOptions = {
    ...chartOptions,
    scales: {
      r: {
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          display: false,
        },
        pointLabels: {
          color: '#475569',
          font: {
            size: 11,
            family: 'Source Sans Pro',
          }
        }
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <GlobalStyle />

      {/* Sidebar Navigation */}
      <Sidebar>
        {sections.map((section, index) => (
          <SidebarItem
            key={section.id}
            href={`#${section.id}`}
            active={activeSection === section.id}
            number={index + 1}
          >
            {section.name}
          </SidebarItem>
        ))}
      </Sidebar>

      <PamphletContainer>
        {/* Header */}
        <Header>
          <OrganizationBadge>Research Brief 2024</OrganizationBadge>
          <MainTitle>
            Medicaid Participation & Coverage Analysis
          </MainTitle>
          <Subtitle>
            A Comprehensive Review of Enrollment Trends, Policy Impacts,
            and Healthcare Outcomes in the United States
          </Subtitle>
          <MetaInfo>
            <div>📅 Published: October 2024</div>
            <div>📊 Data Period: 2019-2024</div>
            <div>🏛️ Policy Analysis Division</div>
          </MetaInfo>
        </Header>

        {/* Executive Summary */}
        <Section id="summary">
          <SectionHeader>
            <SectionIcon>📋</SectionIcon>
            <div>
              <SectionNumber>SECTION 01</SectionNumber>
              <SectionTitle>Executive Summary</SectionTitle>
            </div>
          </SectionHeader>

          <Paragraph>
            The Medicaid program has undergone significant transformation over the past five years,
            with enrollment reaching historic levels and coverage expanding to previously underserved
            populations. This comprehensive analysis examines the critical trends, policy implications,
            and future outlook for one of America's most essential healthcare programs.
          </Paragraph>

          <Callout>
            <CalloutText>
              Medicaid now covers over 95 million Americans, representing nearly 27% of the
              U.S. population—a testament to its vital role in ensuring healthcare access
              for vulnerable communities.
            </CalloutText>
          </Callout>

          <Paragraph>
            Our analysis reveals substantial improvements in healthcare access, with emergency
            department visits declining by 41% among newly enrolled beneficiaries, while
            preventive care utilization has increased by 65%. These outcomes demonstrate the
            program's effectiveness in promoting proactive healthcare management and reducing
            costly emergency interventions.
          </Paragraph>

          <BulletList>
            <BulletItem>
              Record enrollment of 95.2 million beneficiaries as of 2024, marking a 33%
              increase since 2019
            </BulletItem>
            <BulletItem>
              50 states have now implemented some form of Medicaid expansion, with
              12 states adopting expansion measures in the past three years
            </BulletItem>
            <BulletItem>
              Annual program spending reached $699 billion, generating significant
              economic multiplier effects in local communities
            </BulletItem>
            <BulletItem>
              Improved health outcomes across all demographic groups, with particularly
              notable gains in maternal and child health metrics
            </BulletItem>
          </BulletList>
        </Section>

        {/* Key Statistics */}
        <Section id="statistics" ref={statsRef}>
          <SectionHeader>
            <SectionIcon>📊</SectionIcon>
            <div>
              <SectionNumber>SECTION 02</SectionNumber>
              <SectionTitle>Key Statistics</SectionTitle>
            </div>
          </SectionHeader>

          <StatsGrid>
            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <StatValue>
                {statsInView && <CountUp end={95.2} duration={2} decimals={1} />}M
              </StatValue>
              <StatLabel>Total Beneficiaries</StatLabel>
              <StatChange positive>↑ 4.8% YoY</StatChange>
            </StatCard>

            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StatValue>
                {statsInView && <CountUp end={26.8} duration={2} decimals={1} />}%
              </StatValue>
              <StatLabel>Population Coverage</StatLabel>
              <StatChange positive>↑ 1.2% YoY</StatChange>
            </StatCard>

            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StatValue>
                ${statsInView && <CountUp end={699} duration={2} />}B
              </StatValue>
              <StatLabel>Annual Spending</StatLabel>
              <StatChange positive>↑ 6.3% YoY</StatChange>
            </StatCard>

            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StatValue>
                {statsInView && <CountUp end={41} duration={2} />}%
              </StatValue>
              <StatLabel>ER Visit Reduction</StatLabel>
              <StatChange positive>↓ Better Outcomes</StatChange>
            </StatCard>
          </StatsGrid>

          <Paragraph>
            These statistics reflect the program's continued growth and adaptation to meet
            evolving healthcare needs. The sustained enrollment increases, coupled with
            improved health outcomes, demonstrate the program's critical role in the
            American healthcare system.
          </Paragraph>
        </Section>

        {/* Data Analysis */}
        <Section id="analysis" ref={chartsRef}>
          <SectionHeader>
            <SectionIcon>📈</SectionIcon>
            <div>
              <SectionNumber>SECTION 03</SectionNumber>
              <SectionTitle>Data Analysis</SectionTitle>
            </div>
          </SectionHeader>

          <ChartGrid columns="2">
            <ChartWrapper>
              <ChartTitle>Enrollment Trends (2019-2024)</ChartTitle>
              <div style={{ height: '300px' }}>
                <Bar data={enrollmentData} options={chartOptions} />
              </div>
            </ChartWrapper>

            <ChartWrapper>
              <ChartTitle>Coverage by Category</ChartTitle>
              <div style={{ height: '300px' }}>
                <Doughnut data={coverageData} options={chartOptions} />
              </div>
            </ChartWrapper>
          </ChartGrid>

          <ChartGrid columns="2">
            <ChartWrapper>
              <ChartTitle>Quarterly Coverage Rate</ChartTitle>
              <div style={{ height: '300px' }}>
                <Line data={trendData} options={chartOptions} />
              </div>
            </ChartWrapper>

            <ChartWrapper>
              <ChartTitle>Program Impact Assessment</ChartTitle>
              <div style={{ height: '300px' }}>
                <PolarArea data={impactData} options={polarOptions} />
              </div>
            </ChartWrapper>
          </ChartGrid>

          <Paragraph>
            The data reveals consistent growth patterns across all enrollment categories,
            with particularly strong increases in states that recently adopted expansion
            measures. Coverage rates have shown steady improvement, approaching the
            program's target of 30% population coverage by 2025.
          </Paragraph>
        </Section>

        {/* Policy Insights */}
        <Section id="insights">
          <SectionHeader>
            <SectionIcon>💡</SectionIcon>
            <div>
              <SectionNumber>SECTION 04</SectionNumber>
              <SectionTitle>Policy Insights</SectionTitle>
            </div>
          </SectionHeader>

          <Paragraph>
            Recent policy developments have significantly shaped Medicaid's trajectory,
            with expansion initiatives, enhanced federal matching rates, and streamlined
            enrollment processes contributing to unprecedented program growth.
          </Paragraph>

          <Callout>
            <CalloutText>
              States that expanded Medicaid saw an average 23% increase in healthcare
              provider availability in rural areas, addressing critical access gaps.
            </CalloutText>
          </Callout>

          <BulletList>
            <BulletItem>
              Enhanced Federal Medical Assistance Percentage (FMAP) rates have provided
              states with additional resources to maintain and expand coverage
            </BulletItem>
            <BulletItem>
              Continuous enrollment provisions during the public health emergency prevented
              coverage gaps for millions of beneficiaries
            </BulletItem>
            <BulletItem>
              Integration of behavioral health services has improved mental health outcomes
              and reduced overall healthcare costs
            </BulletItem>
            <BulletItem>
              Value-based care initiatives have incentivized quality improvements while
              controlling cost growth
            </BulletItem>
          </BulletList>

          <Paragraph>
            Looking forward, policymakers face critical decisions regarding program
            sustainability, benefit design, and the balance between federal and state
            responsibilities. The evidence strongly supports continued investment in
            Medicaid as a cornerstone of American healthcare infrastructure.
          </Paragraph>
        </Section>

        {/* Implementation Timeline */}
        <Section id="timeline">
          <SectionHeader>
            <SectionIcon>📅</SectionIcon>
            <div>
              <SectionNumber>SECTION 05</SectionNumber>
              <SectionTitle>Implementation Timeline</SectionTitle>
            </div>
          </SectionHeader>

          <TimelineContainer>
            <TimelineItem>
              <TimelineMarker active>2019</TimelineMarker>
              <TimelineContent>
                <TimelineDate>Baseline Year</TimelineDate>
                <TimelineTitle>Pre-Expansion Baseline</TimelineTitle>
                <TimelineDescription>
                  71.4 million enrolled beneficiaries across 37 expansion states.
                  Traditional eligibility criteria in place with limited adult coverage
                  in non-expansion states.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineMarker>2020</TimelineMarker>
              <TimelineContent>
                <TimelineDate>Public Health Emergency</TimelineDate>
                <TimelineTitle>Pandemic Response Measures</TimelineTitle>
                <TimelineDescription>
                  Continuous enrollment provisions implemented. Enhanced federal matching
                  rates provided critical support for state programs during economic downturn.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineMarker>2022</TimelineMarker>
              <TimelineContent>
                <TimelineDate>Expansion Wave</TimelineDate>
                <TimelineTitle>Additional States Adopt Expansion</TimelineTitle>
                <TimelineDescription>
                  Six additional states implement Medicaid expansion, bringing total to
                  43 states. Enrollment surpasses 90 million for the first time.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineMarker active>2024</TimelineMarker>
              <TimelineContent>
                <TimelineDate>Current State</TimelineDate>
                <TimelineTitle>Historic Coverage Levels</TimelineTitle>
                <TimelineDescription>
                  95.2 million beneficiaries enrolled. All 50 states have some form of
                  expansion. Focus shifts to quality improvement and value-based care models.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </TimelineContainer>
        </Section>

        {/* Recommendations */}
        <Section id="recommendations">
          <SectionHeader>
            <SectionIcon>✅</SectionIcon>
            <div>
              <SectionNumber>SECTION 06</SectionNumber>
              <SectionTitle>Recommendations</SectionTitle>
            </div>
          </SectionHeader>

          <Paragraph>
            Based on our comprehensive analysis, we recommend the following strategic
            priorities to optimize Medicaid's impact and ensure long-term sustainability:
          </Paragraph>

          <BulletList>
            <BulletItem>
              <strong>Streamline Enrollment:</strong> Implement automated eligibility
              determination systems to reduce administrative burden and prevent coverage gaps
            </BulletItem>
            <BulletItem>
              <strong>Enhance Care Coordination:</strong> Invest in integrated care models
              that address both physical and behavioral health needs
            </BulletItem>
            <BulletItem>
              <strong>Strengthen Provider Networks:</strong> Address provider shortages through
              enhanced reimbursement rates and loan forgiveness programs
            </BulletItem>
            <BulletItem>
              <strong>Leverage Technology:</strong> Deploy telehealth and digital health tools
              to improve access in underserved areas
            </BulletItem>
            <BulletItem>
              <strong>Focus on Prevention:</strong> Expand coverage for preventive services
              and social determinants of health interventions
            </BulletItem>
            <BulletItem>
              <strong>Ensure Fiscal Sustainability:</strong> Implement value-based payment
              models that reward quality outcomes while controlling costs
            </BulletItem>
          </BulletList>

          <Callout>
            <CalloutText>
              Strategic investments in Medicaid infrastructure today will yield significant
              returns in population health outcomes and economic stability for decades to come.
            </CalloutText>
          </Callout>
        </Section>

        {/* Footer */}
        <Footer>
          <FooterText>
            <strong>Medicaid Participation & Coverage Analysis</strong>
          </FooterText>
          <FooterText>
            Research Brief 2024 | Policy Analysis Division
          </FooterText>
          <FooterText style={{ marginTop: '20px', fontSize: '0.85rem' }}>
            Data sources: CMS, Kaiser Family Foundation, State Medicaid Agencies
          </FooterText>
          <FooterText style={{ fontSize: '0.85rem', opacity: 0.7 }}>
            © 2024 Healthcare Research Institute. All rights reserved.
          </FooterText>
        </Footer>
      </PamphletContainer>

      {/* Print Button */}
      <PrintButton onClick={handlePrint} title="Print this report">
        🖨️
      </PrintButton>
    </>
  );
};

export default PamphletResearch;