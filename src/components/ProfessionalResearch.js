import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler, ChartDataLabels);

// Global styles with professional fonts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Source+Sans+Pro:wght@300;400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #f8f9fa;
    color: #2d3748;
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }
`;

// Professional styled components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
`;

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #1e3a5f;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 0 20px;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 80px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;

  &:first-of-type {
    padding-top: 150px;
  }
`;

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%);
  color: white;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Merriweather', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: white;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  font-weight: 300;
  max-width: 900px;
  margin: 0 auto 3rem;
  opacity: 0.95;
  line-height: 1.8;
`;

const SectionTitle = styled.h2`
  font-family: 'Merriweather', serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #1e3a5f;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: #2c5aa0;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
  border-left: 4px solid ${props => props.accent || '#2c5aa0'};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const StatCard = styled(Card)`
  text-align: center;
  border-left: none;
  border-top: 4px solid ${props => props.color || '#2c5aa0'};
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.color || '#2c5aa0'};
  font-family: 'IBM Plex Mono', monospace;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatDescription = styled.p`
  font-size: 0.9rem;
  color: #718096;
  margin-top: 0.5rem;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin: 2rem 0;
`;

const TableHeader = styled.thead`
  background: #1e3a5f;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: #e8f4f8;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.95rem;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  font-weight: 600;
  text-align: left;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin: 2rem 0;
`;

const ChartTitle = styled.h3`
  font-family: 'Merriweather', serif;
  font-size: 1.5rem;
  color: #1e3a5f;
  margin-bottom: 1.5rem;
`;

const HeatMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const HeatMapGrid = styled.div`
  display: grid;
  grid-template-columns: 150px repeat(5, 1fr);
  gap: 2px;
  background: #e2e8f0;
  padding: 2px;
  border-radius: 8px;
  margin-top: 1rem;
`;

const HeatMapCell = styled.div`
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.isHeader ? '#1e3a5f' : props.value > 40 ? 'white' : '#1e3a5f'};
  background: ${props => {
    if (props.isHeader) return '#f8f9fa';
    if (props.isLabel) return '#f1f5f9';
    const intensity = props.value / 70;
    if (props.pattern === 'decrease') return `rgba(239, 68, 68, ${intensity})`;
    if (props.pattern === 'stable') return `rgba(148, 163, 184, ${intensity})`;
    return `rgba(34, 197, 94, ${intensity})`;
  }};
  border-radius: 4px;
  position: relative;

  ${props => props.isLabel && `
    text-align: left;
    font-size: 0.8rem;
    font-weight: 500;
  `}

  &:hover:not([data-header]):not([data-label]) {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 10;
    cursor: pointer;
  }
`;

const HeatMapLegend = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  align-items: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${props => props.color};
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  background: ${props => {
    switch(props.type) {
      case 'success': return '#f0fdf4';
      case 'warning': return '#fef3c7';
      case 'danger': return '#fef2f2';
      default: return '#eff6ff';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'success': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'danger': return '#ef4444';
      default: return '#3b82f6';
    }
  }};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
`;

const InfoTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e3a5f;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const Citation = styled.div`
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
  color: #475569;
`;

const TeamMember = styled.div`
  text-align: center;
  padding: 1.5rem;
`;

const MemberName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e3a5f;
  margin-bottom: 0.3rem;
`;

const MemberRole = styled.p`
  color: #64748b;
  font-size: 0.95rem;
`;

const Footer = styled.footer`
  background: #1e3a5f;
  color: white;
  padding: 3rem 0;
  text-align: center;
`;

const ProfessionalResearch = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [methodRef, methodInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Scroll tracking for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'executive', 'methodology', 'findings', 'providers', 'implications', 'team'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Improved Chart data
  // Horizontal Diverging Bar Chart for participation changes
  const divergingBarData = {
    labels: ['Nurse Practitioners', 'Physician Associates', 'Internal Medicine', 'OB/GYN', 'Family Medicine', 'Pediatrics'],
    datasets: [
      {
        label: 'Major Decrease',
        data: [-26, -24, -19, -16, -20, -16],
        backgroundColor: '#ef4444',
        barThickness: 35,
      },
      {
        label: 'Stable',
        data: [52, 52, 64, 68, 67, 70],
        backgroundColor: '#e2e8f0',
        barThickness: 35,
      },
      {
        label: 'Major Increase',
        data: [22, 24, 17, 16, 14, 14],
        backgroundColor: '#22c55e',
        barThickness: 35,
      }
    ]
  };

  // Time-series data for enrollment trends
  const timeSeriesData = {
    labels: ['2016', '2017', '2018', '2019'],
    datasets: [
      {
        label: 'Nurse Practitioners',
        data: [65000, 72000, 78000, 85000],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      },
      {
        label: 'Family Medicine',
        data: [48000, 49500, 51000, 52000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      },
      {
        label: 'Internal Medicine',
        data: [38000, 39000, 40500, 41000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      },
      {
        label: 'Pediatrics',
        data: [35000, 35500, 36000, 36200],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      }
    ]
  };

  // Grouped bar chart for clearer comparison
  const groupedBarData = {
    labels: ['Nurse\nPractitioners', 'Physician\nAssociates', 'Family\nMedicine', 'Internal\nMedicine', 'OB/GYN', 'Pediatrics'],
    datasets: [
      {
        label: 'Major Increase (%)',
        data: [22, 24, 14, 17, 16, 14],
        backgroundColor: '#22c55e',
        borderRadius: 6,
        barPercentage: 0.7
      },
      {
        label: 'Major Decrease (%)',
        data: [26, 24, 20, 19, 16, 16],
        backgroundColor: '#ef4444',
        borderRadius: 6,
        barPercentage: 0.7
      }
    ]
  };

  // Waterfall chart data for net changes
  const waterfallData = {
    labels: ['2016 Baseline', 'NPs +30.8%', 'PAs +9.5%', 'FM -4.1%', 'IM -2.6%', 'Peds Stable', '2019 Final'],
    datasets: [{
      label: 'Net Provider Changes',
      data: [220665, 20000, 5200, -2100, -1800, 500, 242465],
      backgroundColor: function(context) {
        const index = context.dataIndex;
        if (index === 0 || index === 6) return '#1e3a5f';
        const value = context.parsed.y || context.raw;
        return value >= 0 ? '#22c55e' : '#ef4444';
      },
      borderWidth: 1,
      barPercentage: 0.7
    }]
  };

  // Heat map matrix data for provider patterns
  const heatMapData = {
    providers: ['Nurse Practitioners', 'Physician Associates', 'Family Medicine', 'Internal Medicine', 'OB/GYN', 'Pediatrics'],
    patterns: ['Major Decrease', 'Minor Decrease', 'Stable', 'Minor Increase', 'Major Increase'],
    values: [
      [26, 12, 40, 10, 12], // NP
      [24, 11, 41, 11, 13], // PA
      [20, 10, 57, 7, 6],   // FM
      [19, 9, 55, 9, 8],    // IM
      [16, 8, 60, 8, 8],    // OB/GYN
      [16, 7, 63, 7, 7]     // Pediatrics
    ]
  };

  // Enhanced chart options for professional visualizations
  const divergingBarOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            family: 'Source Sans Pro',
            size: 13,
            weight: 600
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 95, 0.95)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label;
            const value = Math.abs(context.parsed.x);
            return `${label}: ${value}%`;
          }
        }
      },
      datalabels: {
        display: true,
        color: 'white',
        font: {
          weight: 'bold',
          size: 11
        },
        formatter: (value) => Math.abs(value) + '%'
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          callback: function(value) {
            return Math.abs(value) + '%';
          },
          font: {
            family: 'Source Sans Pro',
            size: 12
          }
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Source Sans Pro',
            size: 12,
            weight: 600
          }
        }
      }
    }
  };

  const timeSeriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          font: {
            family: 'Source Sans Pro',
            size: 13,
            weight: 600
          },
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 95, 0.95)',
        padding: 14,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' enrollees';
          }
        }
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return (value / 1000) + 'K';
          },
          font: {
            family: 'Source Sans Pro',
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Number of Enrollees',
          font: {
            family: 'Source Sans Pro',
            size: 14,
            weight: 600
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Source Sans Pro',
            size: 12,
            weight: 600
          }
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            family: 'Source Sans Pro',
            size: 14,
            weight: 600
          }
        }
      }
    }
  };

  const groupedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            family: 'Source Sans Pro',
            size: 13,
            weight: 600
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 95, 0.95)',
        padding: 12
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#1e3a5f',
        font: {
          weight: 'bold',
          size: 11
        },
        formatter: (value) => value + '%'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            family: 'Source Sans Pro',
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Percentage of Providers',
          font: {
            family: 'Source Sans Pro',
            size: 14,
            weight: 600
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Source Sans Pro',
            size: 11,
            weight: 600
          },
          maxRotation: 0,
          minRotation: 0
        }
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        {/* Fixed Navigation */}
        <Navigation>
          <NavContainer>
            <Logo>
              📊 Medicaid Provider Participation Study
            </Logo>
            <NavLinks>
              <NavLink href="#hero">Overview</NavLink>
              <NavLink href="#executive">Executive Summary</NavLink>
              <NavLink href="#methodology">Methodology</NavLink>
              <NavLink href="#findings">Findings</NavLink>
              <NavLink href="#providers">Provider Analysis</NavLink>
              <NavLink href="#implications">Policy Implications</NavLink>
              <NavLink href="#team">Research Team</NavLink>
            </NavLinks>
          </NavContainer>
        </Navigation>

        {/* Hero Section */}
        <HeroSection id="hero">
          <Container>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Tracking Changes in Primary Care Clinicians'
              Medicaid Participation Using Novel Methods
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A comprehensive longitudinal analysis of 220,665 primary care clinicians across 40 states,
              revealing critical insights into the dynamic nature of Medicaid provider participation from 2016-2019
            </HeroSubtitle>
            <StatsGrid>
              <StatCard color="#2c5aa0">
                <StatNumber>
                  <CountUp end={220665} duration={2} separator="," />
                </StatNumber>
                <StatLabel>Clinicians Tracked</StatLabel>
              </StatCard>
              <StatCard color="#22c55e">
                <StatNumber>
                  <CountUp end={40} duration={2} />
                </StatNumber>
                <StatLabel>States Analyzed</StatLabel>
              </StatCard>
              <StatCard color="#8b5cf6">
                <StatNumber>
                  <CountUp end={60} duration={2} suffix="%" />
                </StatNumber>
                <StatLabel>Stable Participation</StatLabel>
              </StatCard>
              <StatCard color="#ef4444">
                <StatNumber>
                  <CountUp end={40} duration={2} suffix="%" />
                </StatNumber>
                <StatLabel>Experienced Major Changes</StatLabel>
              </StatCard>
            </StatsGrid>
          </Container>
        </HeroSection>

        {/* Executive Summary */}
        <Section id="executive">
          <Container>
            <div>
              <SectionTitle>Executive Summary</SectionTitle>
              <Card>
                <InfoTitle>Research Objectives</InfoTitle>
                <InfoText>
                  This groundbreaking study investigates how primary care clinicians' engagement with Medicaid
                  evolved from 2016 to 2019, focusing on those already serving Medicaid patients at baseline.
                  Using longitudinal data from the Transformed Medicaid Statistical Information System Analytic
                  Files (TAFs), we analyzed changes in the number of unique Medicaid enrollees served annually
                  by clinicians across multiple specialties.
                </InfoText>
              </Card>

              <TwoColumnLayout>
                <InfoBox type="success">
                  <InfoTitle>Key Finding</InfoTitle>
                  <InfoText>
                    While approximately 60% of clinicians maintained stable enrollee volumes, nearly 20%
                    experienced substantial increases and 20% experienced substantial decreases in their
                    Medicaid participation.
                  </InfoText>
                </InfoBox>
                <InfoBox type="warning">
                  <InfoTitle>Critical Insight</InfoTitle>
                  <InfoText>
                    Higher baseline enrollee volume and affiliation with Community Health Centers were
                    associated with greater stability, while rural practice settings were linked to higher
                    odds of major decreases.
                  </InfoText>
                </InfoBox>
              </TwoColumnLayout>

              <ChartContainer>
                <ChartTitle>Provider Participation Changes by Specialty</ChartTitle>
                <InfoText style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                  Horizontal bars show the distribution of participation patterns across provider types.
                  Green indicates increases, gray shows stable participation, and red represents decreases.
                </InfoText>
                <div style={{ height: '400px' }}>
                  <Bar data={divergingBarData} options={divergingBarOptions} />
                </div>
              </ChartContainer>
            </div>
          </Container>
        </Section>

        {/* Methodology Section */}
        <Section id="methodology" ref={methodRef}>
          <Container>
            <div>
              <SectionTitle>Methodology</SectionTitle>

              <Card accent="#8b5cf6">
                <InfoTitle>Data Sources</InfoTitle>
                <InfoText>
                  We utilized the Transformed Medicaid Statistical Information System (T-MSIS) Analytic Files
                  (TAF) from 2016 to 2019, combined with the National Plan and Provider Enumeration System
                  (NPPES) data. The TAF provides comprehensive information on Medicaid claims, enabling detailed
                  analysis of clinicians' Medicaid participation patterns.
                </InfoText>
              </Card>

              <TwoColumnLayout>
                <Card>
                  <InfoTitle>Sample Selection</InfoTitle>
                  <ul style={{ marginLeft: '20px', color: '#64748b', lineHeight: '1.8' }}>
                    <li>Excluded clinicians not participating in Medicaid in 2016</li>
                    <li>Excluded those who changed states during study period</li>
                    <li>Excluded clinicians enumerated after 2012</li>
                    <li>Excluded those serving >2,500 enrollees annually</li>
                    <li>Excluded states with poor-quality TAF data</li>
                  </ul>
                </Card>
                <Card>
                  <InfoTitle>Provider Types Analyzed</InfoTitle>
                  <ul style={{ marginLeft: '20px', color: '#64748b', lineHeight: '1.8' }}>
                    <li>Nurse Practitioners (NPs)</li>
                    <li>Physician Associates (PAs)</li>
                    <li>Family Medicine Physicians</li>
                    <li>Internal Medicine Physicians</li>
                    <li>OB/GYN Physicians</li>
                    <li>Pediatricians</li>
                  </ul>
                </Card>
              </TwoColumnLayout>

              <Card accent="#3b82f6">
                <InfoTitle>Analytical Approach</InfoTitle>
                <InfoText>
                  We operationalized Medicaid participation as the annual count of unique enrollees served
                  office visits by each clinician. Major changes were defined as increases or decreases
                  exceeding 90% of baseline enrollee volume. We employed multivariable logistic regression
                  models and elastic net regularization to identify predictors of participation changes.
                </InfoText>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Key Findings Section */}
        <Section id="findings" ref={statsRef}>
          <Container>
            <div>
              <SectionTitle>Key Findings</SectionTitle>

              <ChartContainer>
                <ChartTitle>Comparison of Major Changes by Provider Type</ChartTitle>
                <InfoText style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                  Side-by-side comparison showing the percentage of providers experiencing major increases versus major decreases.
                </InfoText>
                <div style={{ height: '400px' }}>
                  <Bar data={groupedBarData} options={groupedBarOptions} />
                </div>
              </ChartContainer>

              <ChartContainer>
                <ChartTitle>Enrollment Trends Over Time (2016-2019)</ChartTitle>
                <InfoText style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                  Longitudinal view showing how provider enrollments changed across the study period. Notice the significant growth in Nurse Practitioners.
                </InfoText>
                <div style={{ height: '400px' }}>
                  <Line data={timeSeriesData} options={timeSeriesOptions} />
                </div>
              </ChartContainer>

              <StatsGrid>
                <InfoBox>
                  <InfoTitle>Baseline Volume Impact</InfoTitle>
                  <InfoText>
                    Clinicians serving more than 100 Medicaid enrollees at baseline were significantly
                    less likely to experience major changes, with odds ratios as low as 0.05 for major
                    increases and 0.18 for major decreases.
                  </InfoText>
                </InfoBox>
                <InfoBox type="success">
                  <InfoTitle>CHC Affiliation</InfoTitle>
                  <InfoText>
                    Clinicians affiliated with Community Health Centers had consistently higher odds of
                    experiencing major increases (OR range: 1.53-2.75) and lower odds of major decreases
                    (OR range: 0.19-0.51) across all specialties.
                  </InfoText>
                </InfoBox>
                <InfoBox type="warning">
                  <InfoTitle>Rural Practice Impact</InfoTitle>
                  <InfoText>
                    Practicing in rural areas was associated with higher odds of major decreases for most
                    provider types, with Internal Medicine physicians showing the highest risk (OR: 1.56).
                  </InfoText>
                </InfoBox>
              </StatsGrid>
            </div>
          </Container>
        </Section>

        {/* Provider Breakdown Section */}
        <Section id="providers">
          <Container>
            <div>
              <SectionTitle>Provider Type Analysis</SectionTitle>

              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Provider Type</TableHeaderCell>
                    <TableHeaderCell>Sample Size</TableHeaderCell>
                    <TableHeaderCell>Major Increase</TableHeaderCell>
                    <TableHeaderCell>Major Decrease</TableHeaderCell>
                    <TableHeaderCell>Stable</TableHeaderCell>
                    <TableHeaderCell>Key Characteristics</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  <TableRow>
                    <TableCell><strong>Nurse Practitioners</strong></TableCell>
                    <TableCell>43,936</TableCell>
                    <TableCell>22%</TableCell>
                    <TableCell>26%</TableCell>
                    <TableCell>52%</TableCell>
                    <TableCell>Highest volatility; 93% female</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Family Medicine</strong></TableCell>
                    <TableCell>52,390</TableCell>
                    <TableCell>14%</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>67%</TableCell>
                    <TableCell>54% serve >100 enrollees; 25% rural</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Internal Medicine</strong></TableCell>
                    <TableCell>52,755</TableCell>
                    <TableCell>17%</TableCell>
                    <TableCell>19%</TableCell>
                    <TableCell>64%</TableCell>
                    <TableCell>31% serve >100 enrollees; 10% rural</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>OB/GYN</strong></TableCell>
                    <TableCell>20,289</TableCell>
                    <TableCell>16%</TableCell>
                    <TableCell>16%</TableCell>
                    <TableCell>68%</TableCell>
                    <TableCell>High stability; 57% female</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Pediatrics</strong></TableCell>
                    <TableCell>28,212</TableCell>
                    <TableCell>14%</TableCell>
                    <TableCell>16%</TableCell>
                    <TableCell>70%</TableCell>
                    <TableCell>Highest stability; 72% serve >100 enrollees</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Physician Associates</strong></TableCell>
                    <TableCell>22,974</TableCell>
                    <TableCell>24%</TableCell>
                    <TableCell>24%</TableCell>
                    <TableCell>52%</TableCell>
                    <TableCell>High volatility; 65% female</TableCell>
                  </TableRow>
                </tbody>
              </Table>

              <ChartContainer>
                <ChartTitle>Net Provider Participation Changes (2016-2019)</ChartTitle>
                <InfoText style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                  Waterfall visualization showing the cumulative effect of provider changes on total Medicaid participation.
                </InfoText>
                <div style={{ height: '400px' }}>
                  <Bar data={waterfallData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        backgroundColor: 'rgba(30, 58, 95, 0.95)',
                        padding: 12,
                        callbacks: {
                          label: function(context) {
                            const value = context.parsed.y;
                            return value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString();
                          }
                        }
                      },
                      datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'top',
                        color: '#1e3a5f',
                        font: {
                          weight: 'bold',
                          size: 10
                        },
                        formatter: (value) => {
                          if (value > 1000) return Math.round(value/1000) + 'K';
                          return value > 0 ? '+' + value : value;
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          callback: function(value) {
                            return (value / 1000) + 'K';
                          },
                          font: {
                            family: 'Source Sans Pro',
                            size: 12
                          }
                        },
                        title: {
                          display: true,
                          text: 'Total Providers',
                          font: {
                            family: 'Source Sans Pro',
                            size: 14,
                            weight: 600
                          }
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        },
                        ticks: {
                          font: {
                            family: 'Source Sans Pro',
                            size: 11,
                            weight: 600
                          },
                          maxRotation: 45,
                          minRotation: 45
                        }
                      }
                    }
                  }} />
                </div>
              </ChartContainer>

              <ChartContainer>
                <ChartTitle>Provider Participation Patterns Heat Map</ChartTitle>
                <InfoText style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>
                  Distribution of providers across different participation patterns. Color intensity indicates the percentage of providers.
                </InfoText>
                <HeatMapContainer>
                  <HeatMapGrid>
                    {/* Header row */}
                    <HeatMapCell isHeader></HeatMapCell>
                    {heatMapData.patterns.map(pattern => (
                      <HeatMapCell key={pattern} isHeader>{pattern}</HeatMapCell>
                    ))}

                    {/* Data rows */}
                    {heatMapData.providers.map((provider, providerIndex) => (
                      <React.Fragment key={provider}>
                        <HeatMapCell isLabel>{provider}</HeatMapCell>
                        {heatMapData.values[providerIndex].map((value, patternIndex) => (
                          <HeatMapCell
                            key={`${providerIndex}-${patternIndex}`}
                            value={value}
                            pattern={patternIndex < 2 ? 'decrease' : patternIndex === 2 ? 'stable' : 'increase'}
                            title={`${provider}: ${value}% ${heatMapData.patterns[patternIndex]}`}
                          >
                            {value}%
                          </HeatMapCell>
                        ))}
                      </React.Fragment>
                    ))}
                  </HeatMapGrid>
                  <HeatMapLegend>
                    <LegendItem>
                      <LegendColor color="rgba(239, 68, 68, 0.7)" />
                      <span>Decreasing Participation</span>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="rgba(148, 163, 184, 0.7)" />
                      <span>Stable Participation</span>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="rgba(34, 197, 94, 0.7)" />
                      <span>Increasing Participation</span>
                    </LegendItem>
                  </HeatMapLegend>
                </HeatMapContainer>
              </ChartContainer>
            </div>
          </Container>
        </Section>

        {/* Policy Implications */}
        <Section id="implications">
          <Container>
            <div>
              <SectionTitle>Policy Implications</SectionTitle>

              <Card accent="#ef4444">
                <InfoTitle>Impact of Proposed Medicaid Cuts</InfoTitle>
                <InfoText>
                  The findings are particularly relevant in light of proposed Medicaid budget cuts.
                  Clinicians already serving smaller Medicaid panels may see further reductions in enrollee
                  volume, increasing the risk of disengagement. Administrative burdens associated with
                  eligibility redeterminations and coverage lapses could further destabilize state Medicaid
                  populations and clinician participation.
                </InfoText>
              </Card>

              <TwoColumnLayout>
                <Card>
                  <InfoTitle>Recommendations for Policymakers</InfoTitle>
                  <ul style={{ marginLeft: '20px', color: '#64748b', lineHeight: '1.8' }}>
                    <li>Track clinician participation trends over time</li>
                    <li>Prioritize stable participants in managed care contracting</li>
                    <li>Support Community Health Centers as anchors of stability</li>
                    <li>Address rural workforce challenges through targeted retention efforts</li>
                    <li>Reduce administrative burdens to maintain provider engagement</li>
                    <li>Monitor impact of policy changes on provider networks</li>
                  </ul>
                </Card>
                <Card>
                  <InfoTitle>Critical Vulnerabilities</InfoTitle>
                  <ul style={{ marginLeft: '20px', color: '#64748b', lineHeight: '1.8' }}>
                    <li>NPs and PAs face structural challenges in maintaining consistent engagement</li>
                    <li>Rural areas show higher volatility and greater susceptibility to access disruptions</li>
                    <li>Smaller practices lack institutional support to weather policy changes</li>
                    <li>"Incident to" billing may obscure true participation patterns</li>
                    <li>Reimbursement disparities continue to challenge sustainability</li>
                  </ul>
                </Card>
              </TwoColumnLayout>

              <InfoBox type="danger">
                <InfoTitle>Access to Care Warning</InfoTitle>
                <InfoText>
                  With 40% of clinicians experiencing major changes in their Medicaid participation over
                  just three years, access to care may be more volatile than previously understood. This
                  dynamic nature of participation undermines continuity of care, which is essential for
                  managing chronic conditions and preventing avoidable emergency department visits.
                </InfoText>
              </InfoBox>
            </div>
          </Container>
        </Section>

        {/* Research Team Section */}
        <Section id="team">
          <Container>
            <div>
              <SectionTitle>Research Team & Citation</SectionTitle>

              <Card>
                <InfoTitle>Research Authors</InfoTitle>
                <TwoColumnLayout>
                  <TeamMember>
                    <MemberName>Mandar Bodas, PhD</MemberName>
                    <MemberRole>Corresponding Author</MemberRole>
                  </TeamMember>
                  <TeamMember>
                    <MemberName>Qian Luo, MS</MemberName>
                    <MemberRole>Co-Author</MemberRole>
                  </TeamMember>
                  <TeamMember>
                    <MemberName>Anushree Vichare, PhD</MemberName>
                    <MemberRole>Co-Author</MemberRole>
                  </TeamMember>
                  <TeamMember>
                    <MemberName>Fitzhugh Mullan Institute</MemberName>
                    <MemberRole>George Washington University</MemberRole>
                  </TeamMember>
                </TwoColumnLayout>
              </Card>

              <Citation>
                <InfoTitle>How to Cite</InfoTitle>
                <p style={{ marginTop: '1rem', fontFamily: 'IBM Plex Mono' }}>
                  Bodas, M.; Luo, Q.; Vichare, A. Tracking Changes in Primary Care Clinicians' Medicaid
                  Participation Using Novel Methods. Int. J. Environ. Res. Public Health 2025, 22, 1339.
                  https://doi.org/10.3390/ijerph22091339
                </p>
              </Citation>

              <Card accent="#22c55e">
                <InfoTitle>Funding & Support</InfoTitle>
                <InfoText>
                  This project was supported by the Bureau of Health Workforce (BHW), National Center for
                  Health Workforce Analysis (NCHWA), Health Resources and Services Administration (HRSA)
                  of the U.S. Department of Health and Human Services (HHS) as part of an award totaling
                  $450,000. The contents are those of the authors and do not necessarily represent the
                  official views of, nor an endorsement by HRSA, HHS, or the U.S. Government.
                </InfoText>
              </Card>

              <InfoBox>
                <InfoTitle>Data Availability</InfoTitle>
                <InfoText>
                  The data used in this study was obtained from the Centers for Medicare and Medicaid Services
                  (CMS). Due to data use agreements, the authors are unable to share the raw data. Researchers
                  interested in replicating this study should contact CMS directly for data access.
                </InfoText>
              </InfoBox>
            </div>
          </Container>
        </Section>

        {/* Footer */}
        <Footer>
          <Container>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              © 2025 Fitzhugh Mullan Institute for Health Workforce Equity
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              George Washington University, Washington, DC
            </p>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
              Published in the International Journal of Environmental Research and Public Health
            </p>
          </Container>
        </Footer>
      </PageWrapper>
    </>
  );
};

export default ProfessionalResearch;