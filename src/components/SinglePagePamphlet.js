import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'react-google-charts';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler, ChartDataLabels);

// Clean global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f8fafc;
    min-height: 100vh;
    color: #1a202c;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
`;

// Main container - single page
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 30px auto;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 1440px) {
    margin: 20px;
  }

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
`;

// Clean header
const Header = styled.header`
  background: linear-gradient(135deg, #2c5aa0 0%, #1e3a5f 100%);
  color: white;
  padding: 35px 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 25px;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 15px;
    gap: 20px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  opacity: 0.95;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const HeaderStat = styled.div`
  text-align: center;

  .value {
    font-size: 1.9rem;
    font-weight: 800;
    display: block;
  }

  .label {
    font-size: 0.8rem;
    opacity: 0.85;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .value { font-size: 1.5rem; }
    .label { font-size: 0.75rem; }
  }
`;

// Content wrapper
const Content = styled.div`
  padding: 25px 35px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Grid layouts
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 25px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin-bottom: 25px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

// Clean stat card
const StatCard = styled.div`
  background: #f8fafc;
  border-radius: 10px;
  padding: 18px;
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: #2c5aa0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 5px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
`;

// Section styles
const Section = styled.div`
  margin-bottom: 25px;

  @media (max-width: 968px) {
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 3px solid #2c5aa0;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #2c5aa0;
  }
`;

// Clean chart container
const ChartBox = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px;
  height: ${props => props.height || '200px'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ChartLabel = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 10px;
`;

// Clean info box
const InfoBox = styled.div`
  background: #f8fafc;
  border-left: 4px solid ${props => props.borderColor || '#2c5aa0'};
  padding: 20px;
  border-radius: 0 8px 8px 0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #475569;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

// Key points
const KeyPoints = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
`;

const KeyPoint = styled.li`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #475569;
  padding: 10px 0;
  padding-left: 24px;
  position: relative;
  font-weight: 500;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #2c5aa0;
    font-weight: 700;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 0;
    padding-left: 20px;
  }
`;

// Timeline
const TimelineRow = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 18px 0;

  &::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 45px;
    right: 45px;
    height: 2px;
    background: linear-gradient(90deg, #2c5aa0, #3b82f6, #0891b2, #10b981);
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    &::before { display: none; }
  }
`;

const TimelineItem = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const TimelineYear = styled.div`
  width: 42px;
  height: 42px;
  background: ${props => props.active ? '#2c5aa0' : 'white'};
  color: ${props => props.active ? 'white' : '#2c5aa0'};
  border: 2px solid #2c5aa0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0 auto 10px;
`;

const TimelineLabel = styled.div`
  font-size: 0.8rem;
  color: #475569;
  font-weight: 600;
`;

// Footer
const Footer = styled.div`
  background: #f8fafc;
  padding: 18px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 12px 20px;
    gap: 10px;
  }
`;

const FooterText = styled.p`
  font-size: 0.85rem;
  color: #64748b;
`;

const PaperLink = styled.a`
  color: #2c5aa0;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border: 2px solid #2c5aa0;
  border-radius: 6px;
  transition: all 0.2s;
  display: inline-block;

  &:hover {
    background: #2c5aa0;
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
`;

// Visualization Selector Components
const VizSelectorContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 30px;
  border: 1px solid #e2e8f0;
`;

const VizTabsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
`;

const VizTab = styled.button`
  background: ${props => props.active ? '#2c5aa0' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: ${props => props.active ? '2px solid #2c5aa0' : '2px solid #e2e8f0'};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.85rem;
  font-weight: ${props => props.active ? '700' : '600'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  line-height: 1.3;
  min-height: 44px;

  &:hover {
    background: ${props => props.active ? '#1e3a5f' : '#f1f5f9'};
    border-color: ${props => props.active ? '#1e3a5f' : '#cbd5e1'};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 12px 10px;
    font-size: 0.75rem;
    line-height: 1.2;
  }
`;

const DetailedVizPanel = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DetailedChartBox = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 25px;
  height: ${props => props.height || '500px'};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 400px;
    padding: 15px;
  }
`;

const DetailedChartTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DetailedChartSubtitle = styled.p`
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 15px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 20px;

  @media (max-width: 768px) {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  }
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th {
    background: #f8fafc;
    color: #475569;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #e2e8f0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 600;
  }

  tr:hover td {
    background: #f8fafc;
  }

  .number-cell {
    font-weight: 800;
    color: #2c5aa0;
  }

  .highlight {
    background: #fef3c7;
  }

  strong {
    color: #1e293b;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;

    th {
      font-size: 0.75rem;
      padding: 8px;
    }

    td {
      font-size: 0.8rem;
      padding: 8px;
    }
  }
`;

const InsightCard = styled.div`
  background: ${props => props.bgColor || '#e0f2fe'};
  border-left: 4px solid ${props => props.borderColor || '#0284c7'};
  padding: 15px 18px;
  border-radius: 0 8px 8px 0;
  margin-top: 20px;

  h4 {
    font-size: 1rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.5;
    font-weight: 600;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyVizState = styled.div`
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  padding: 25px 20px;
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 8px;
  opacity: 0.4;
`;

const EmptyStateTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
`;

const EmptyStateText = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  max-width: 450px;
  line-height: 1.4;
`;

const SinglePagePamphlet = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });
  const [selectedViz, setSelectedViz] = useState(null);

  // Actual data from research paper
  // OVERVIEW TAB - COLORBLIND-SAFE PALETTE:
  // Sky Blue (#0EA5E9) = Stable | Amber (#F59E0B) = Increases | Pink (#EC4899) = Decreases
  // These colors are distinguishable for all types of colorblindness
  const participationData = {
    labels: ['Stable Volume', 'Major Increases', 'Major Decreases'],
    datasets: [{
      label: 'Clinician Participation (%)',
      data: [62.1, 17.6, 20.3],
      backgroundColor: ['#0EA5E9', '#F59E0B', '#EC4899'],
      borderWidth: 0,
    }]
  };

  // Detailed specialty data from Table 1
  const detailedSpecialtyData = {
    'Nurse Practitioners': { total: 43936, stable: 22861, increases: 9828, decreases: 11247, stablePct: 52, increasesPct: 22, decreasesPct: 26 },
    'Family Medicine': { total: 52390, stable: 34847, increases: 7312, decreases: 10231, stablePct: 67, increasesPct: 14, decreasesPct: 20 },
    'Internal Medicine': { total: 52755, stable: 33764, increases: 8869, decreases: 10122, stablePct: 64, increasesPct: 17, decreasesPct: 19 },
    'OBGYNs': { total: 20289, stable: 13785, increases: 3345, decreases: 3159, stablePct: 68, increasesPct: 16, decreasesPct: 16 },
    'Pediatricians': { total: 28212, stable: 19871, increases: 3841, decreases: 4500, stablePct: 70, increasesPct: 14, decreasesPct: 16 },
    'Physician Associates': { total: 22974, stable: 11911, increases: 5566, decreases: 5497, stablePct: 52, increasesPct: 24, decreasesPct: 24 }
  };

  // Baseline volume distribution by specialty from Table 1
  const baselineBySpecialty = {
    'Nurse Practitioners': { '1-10': 24, '11-50': 25, '51-100': 14, '100+': 36 },
    'Family Medicine': { '1-10': 13, '11-50': 18, '51-100': 14, '100+': 54 },
    'Internal Medicine': { '1-10': 24, '11-50': 27, '51-100': 17, '100+': 31 },
    'OBGYNs': { '1-10': 14, '11-50': 21, '51-100': 17, '100+': 49 },
    'Pediatricians': { '1-10': 10, '11-50': 10, '51-100': 8, '100+': 72 },
    'Physician Associates': { '1-10': 28, '11-50': 24, '51-100': 13, '100+': 35 }
  };


  const specialtyStabilityData = {
    labels: ['Nurse Practitioners', 'Family Medicine', 'Internal Medicine', 'OBGYNs', 'Pediatricians', 'Physician Associates'],
    datasets: [{
      label: 'Stable Volume (%)',
      data: [52, 67, 64, 68, 70, 52],
      backgroundColor: 'rgba(0, 114, 178, 0.8)',
      borderColor: '#0072B2',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const baselineVolumeData = {
    labels: ['1-10', '11-50', '51-100', '100+'],
    datasets: [{
      label: 'Baseline Enrollees Served',
      data: [19, 21, 14, 45],
      borderColor: '#0072B2',
      backgroundColor: 'rgba(0, 114, 178, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#0072B2',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 8,
        titleFont: { size: 11 },
        bodyFont: { size: 10 },
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: {
          size: 11,
          weight: 'bold'
        },
        formatter: function(value) {
          return value + '%';
        },
        anchor: 'center',
        align: 'center'
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 9 }, color: '#64748b' }
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 9 }, color: '#64748b' }
      }
    }
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: { size: 9 },
          padding: 10
        }
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: {
          size: 13,
          weight: 'bold'
        },
        formatter: function(value) {
          return value + '%';
        }
      }
    }
  };

  // Enhanced chart options for detailed views with better readability
  const isMobile = window.innerWidth <= 768;

  const detailedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: isMobile ? 'bottom' : 'top',
        labels: {
          font: { size: isMobile ? 10 : 13, weight: 'bold' },
          padding: isMobile ? 8 : 15,
          boxWidth: isMobile ? 12 : 40
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: isMobile ? 10 : 16,
        titleFont: { size: isMobile ? 11 : 14, weight: 'bold' },
        bodyFont: { size: isMobile ? 10 : 13 },
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const datasetLabel = context.dataset.label;
            const specialty = context.label;
            const percentage = context.parsed.y;

            // Map abbreviated names to full names
            const specialtyMap = {
              'NPs': 'Nurse Practitioners',
              'FPs': 'Family Medicine',
              'IMs': 'Internal Medicine',
              'OBGYNs': 'OBGYNs',
              'Peds': 'Pediatricians',
              'PAs': 'Physician Associates'
            };

            const fullSpecialty = specialtyMap[specialty] || specialty;

            // Get detailed data if available
            const detailedData = {
              'Nurse Practitioners': { total: 43936, stable: 22861, increases: 9828, decreases: 11247 },
              'Family Medicine': { total: 52390, stable: 34847, increases: 7312, decreases: 10231 },
              'Internal Medicine': { total: 52755, stable: 33764, increases: 8869, decreases: 10122 },
              'OBGYNs': { total: 20289, stable: 13785, increases: 3345, decreases: 3159 },
              'Pediatricians': { total: 28212, stable: 19871, increases: 3841, decreases: 4500 },
              'Physician Associates': { total: 22974, stable: 11911, increases: 5566, decreases: 5497 }
            };

            const data = detailedData[fullSpecialty];

            if (data) {
              const count = datasetLabel.includes('Stable') ? data.stable :
                           datasetLabel.includes('Increases') ? data.increases :
                           datasetLabel.includes('Decreases') ? data.decreases : 0;

              return [
                `${datasetLabel}: ${percentage}%`,
                `${count.toLocaleString()} clinicians`,
                `Out of ${data.total.toLocaleString()} total ${fullSpecialty.toLowerCase()}`
              ];
            }

            return `${datasetLabel}: ${percentage}%`;
          },
          footer: function(context) {
            const specialty = context[0].label;
            const specialtyMap = {
              'NPs': 'Nurse Practitioners',
              'FPs': 'Family Medicine',
              'IMs': 'Internal Medicine',
              'OBGYNs': 'OBGYNs',
              'Peds': 'Pediatricians',
              'PAs': 'Physician Associates'
            };
            const fullSpecialty = specialtyMap[specialty] || specialty;

            if (fullSpecialty === 'Pediatricians') {
              return '\nHighest stability rate (70%)';
            } else if (fullSpecialty === 'Nurse Practitioners') {
              return '\nHighest volatility (26% decreases)';
            }
            return '';
          }
        }
      },
      datalabels: {
        display: !isMobile,
        color: '#ffffff',
        font: {
          size: isMobile ? 10 : 14,
          weight: 'bold'
        },
        formatter: function(value) {
          return value + '%';
        },
        anchor: 'center',
        align: 'center'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: isMobile ? 8 : 11, weight: 'bold' },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0
        }
      },
      y: {
        grid: {
          color: '#e2e8f0'
        },
        ticks: {
          font: { size: isMobile ? 8 : 11, weight: 'bold' },
          callback: function(value) {
            return value + '%';
          }
        },
        beginAtZero: true
      }
    }
  };

  const detailedDoughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: { size: 13, weight: 'bold' },
          padding: 15
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 16,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const label = context.label;
            const value = context.parsed;
            const total = 220556;
            const count = Math.round((value / 100) * total);

            // Calculate actual counts based on research data
            const actualCounts = {
              'Stable Volume': 137039,
              'Major Increases': 38761,
              'Major Decreases': 44756
            };

            const actualCount = actualCounts[label] || count;
            const percentage = ((actualCount / total) * 100).toFixed(1);

            return [
              `${actualCount.toLocaleString()} clinicians`,
              `${percentage}% of all primary care clinicians`,
              ``,
              label === 'Stable Volume' ?
                'Maintained ±90% of baseline enrollee volume' :
              label === 'Major Increases' ?
                'Experienced >90% increase from baseline' :
                'Experienced >90% decrease from baseline'
            ];
          }
        }
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: {
          size: 16,
          weight: 'bold'
        },
        formatter: function(value) {
          return value + '%';
        }
      }
    }
  };

  // Visualization tabs configuration
  const vizTabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'specialty', label: '🏥 By Specialty/Profession', icon: '🏥' },
    { id: 'baseline', label: '📍 Baseline Enrollee Volume Differences', icon: '📍' },
    { id: 'predictors', label: '🎯 Predictors of Stability', icon: '🎯' }
  ];

  // Render functions for each visualization type
  const renderDetailedViz = () => {
    if (!selectedViz) {
      return (
        <EmptyVizState>
          <EmptyStateIcon>📊</EmptyStateIcon>
          <EmptyStateTitle>Select a Visualization to Explore</EmptyStateTitle>
          <EmptyStateText>
            Choose a category from the tabs above to view detailed charts, data tables, and insights about Medicaid clinician participation patterns.
          </EmptyStateText>
        </EmptyVizState>
      );
    }

    switch(selectedViz) {
      case 'overview':
        return renderOverviewViz();
      case 'specialty':
        return renderSpecialtyViz();
      case 'baseline':
        return renderBaselineViz();
      case 'predictors':
        return renderPredictorsViz();
      default:
        return renderOverviewViz();
    }
  };

  const renderOverviewViz = () => (
    <DetailedVizPanel>
      <DetailedChartTitle>Overall Participation Patterns (2016-2019)</DetailedChartTitle>
      <DetailedChartSubtitle>
        Distribution of 220,556 primary care clinicians' Medicaid participation dynamics across all specialties
      </DetailedChartSubtitle>

      <DetailedChartBox height="550px">
        <Doughnut data={participationData} options={detailedDoughnutOptions} />
      </DetailedChartBox>

      <InsightCard bgColor="#E0F2FE" borderColor="#0EA5E9">
        <h4>Key Insight</h4>
        <p>
          Patterns suggest that access to care may be more volatile than previously understood, highlighting the need for policies supporting consistent clinician engagement.
        </p>
      </InsightCard>
    </DetailedVizPanel>
  );

  const renderSpecialtyViz = () => {
    const specialtyLabels = Object.keys(detailedSpecialtyData);
    const allPatternsData = {
      labels: specialtyLabels,
      datasets: [
        {
          label: 'Stable Volume (%)',
          data: specialtyLabels.map(s => detailedSpecialtyData[s].stablePct),
          backgroundColor: 'rgba(14, 165, 233, 0.8)',
          borderColor: '#0EA5E9',
          borderWidth: 2
        },
        {
          label: 'Major Increases (%)',
          data: specialtyLabels.map(s => detailedSpecialtyData[s].increasesPct),
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          borderColor: '#F59E0B',
          borderWidth: 2
        },
        {
          label: 'Major Decreases (%)',
          data: specialtyLabels.map(s => detailedSpecialtyData[s].decreasesPct),
          backgroundColor: 'rgba(236, 72, 153, 0.8)',
          borderColor: '#EC4899',
          borderWidth: 2
        }
      ]
    };

    return (
      <DetailedVizPanel>
        <DetailedChartTitle>Participation Patterns by Specialty</DetailedChartTitle>
        <DetailedChartSubtitle>
          Detailed breakdown showing stable participation, major increases, and major decreases for each primary care specialty. Hover to see sample sizes.
        </DetailedChartSubtitle>

        <DetailedChartBox height="600px">
          <Bar data={allPatternsData} options={detailedChartOptions} />
        </DetailedChartBox>

        <TwoColumnGrid>
          <InsightCard bgColor="#E0F2FE" borderColor="#0EA5E9">
            <h4>Most Stable Specialties</h4>
            <p>
              <strong>Pediatricians (70%)</strong> and <strong>OBGYNs (68%)</strong> demonstrated the highest stability rates.
              This may be attributed to the routine nature of well-child visits and prenatal care, which are often unavoidable services.
            </p>
          </InsightCard>
          <InsightCard bgColor="#FCE7F3" borderColor="#EC4899">
            <h4>Highest Volatility</h4>
            <p>
              <strong>Nurse Practitioners (26% decreases)</strong> and <strong>Physician Associates (24% increases/decreases)</strong> showed
              the most volatility, potentially due to "incident to" billing practices and evolving practice patterns.
            </p>
          </InsightCard>
        </TwoColumnGrid>
      </DetailedVizPanel>
    );
  };

  const renderBaselineViz = () => {
    const specialtyNames = Object.keys(baselineBySpecialty);
    const volumeCategories = ['1-10', '11-50', '51-100', '100+'];

    const baselineStackedData = {
      labels: specialtyNames,
      datasets: volumeCategories.map((cat, idx) => ({
        label: cat + ' enrollees',
        data: specialtyNames.map(s => baselineBySpecialty[s][cat]),
        // Colorblind-friendly gradient from vermillion to blue
        backgroundColor: ['rgba(213, 94, 0, 0.8)', 'rgba(230, 159, 0, 0.8)', 'rgba(86, 180, 233, 0.8)', 'rgba(0, 114, 178, 0.8)'][idx],
        borderColor: ['#D55E00', '#E69F00', '#56B4E9', '#0072B2'][idx],
        borderWidth: 1
      }))
    };

    const stackedOptions = {
      ...detailedChartOptions,
      plugins: {
        ...detailedChartOptions.plugins,
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          padding: 16,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              const volumeCategory = context.dataset.label;
              const specialty = context.label;
              const percentage = context.parsed.y;

              const specialtyTotals = {
                'Nurse Practitioners': 43936,
                'Family Medicine': 52390,
                'Internal Medicine': 52755,
                'OBGYNs': 20289,
                'Pediatricians': 28212,
                'Physician Associates': 22974
              };

              const total = specialtyTotals[specialty];
              const clinicianCount = Math.round((percentage / 100) * total);

              return [
                `${volumeCategory}: ${percentage}%`,
                `Approximately ${clinicianCount.toLocaleString()} clinicians`,
                `Out of ${total.toLocaleString()} total ${specialty.toLowerCase()}`
              ];
            },
            footer: function(context) {
              const specialty = context[0].label;

              if (specialty === 'Pediatricians') {
                return '\n72% had 100+ enrollees - highest volume';
              } else if (specialty === 'Physician Associates' || specialty === 'Nurse Practitioners') {
                return '\nHigher proportion in low-volume categories';
              }
              return '';
            }
          }
        }
      },
      scales: {
        ...detailedChartOptions.scales,
        x: { ...detailedChartOptions.scales.x, stacked: true },
        y: { ...detailedChartOptions.scales.y, stacked: true, max: 100 }
      }
    };

    return (
      <DetailedVizPanel>
        <DetailedChartTitle>Baseline Enrollee Volume Distribution by Specialty/Profession</DetailedChartTitle>
        <DetailedChartSubtitle>
          Baseline differences in enrollee volume highlight varying levels of Medicaid engagement and the share of provider panels made up of Medicaid patients.
        </DetailedChartSubtitle>

        <DetailedChartBox height="550px">
          <Bar data={baselineStackedData} options={stackedOptions} />
        </DetailedChartBox>

        <InsightCard bgColor="#F3E5F5" borderColor="#9C27B0">
          <h4>Predictor of Stability</h4>
          <p>
            Clinicians serving <strong>more than 100 Medicaid patients at baseline</strong> were significantly more likely to maintain stable participation.
            Pediatricians (72%) had the highest proportion in this category, correlating with their high stability rate (70%).
          </p>
        </InsightCard>
      </DetailedVizPanel>
    );
  };

  const renderPredictorsViz = () => {
    // ALL DATA IN THIS VISUALIZATION IS 100% FROM THE RESEARCH PAPER
    // Data sources: Table 1 and multivariate analysis results from the study

    // Specialty stability data (100% accurate from research Table 1)
    const specialtyStabilityChartData = {
      labels: ['Pediatricians', 'OBGYNs', 'Family Medicine', 'Internal Medicine', 'Nurse Practitioners', 'Physician Associates'],
      datasets: [{
        label: 'Stability Rate (%)',
        data: [70, 68, 67, 64, 52, 52],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderColor: ['#22c55e', '#22c55e', '#3b82f6', '#3b82f6', '#ef4444', '#ef4444'],
        borderWidth: 2,
        borderRadius: 6
      }]
    };

    // Baseline volume distribution by specialty (100% accurate from research Table 1)
    const baselineVolumeBySpecialty = {
      labels: ['Peds', 'OBGYNs', 'Family Med', 'Internal Med', 'NPs', 'PAs'],
      datasets: [
        {
          label: '100+ Enrollees',
          data: [72, 49, 54, 31, 36, 35],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: '#22c55e',
          borderWidth: 1
        },
        {
          label: '51-100 Enrollees',
          data: [8, 17, 14, 17, 14, 13],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: '#3b82f6',
          borderWidth: 1
        },
        {
          label: '11-50 Enrollees',
          data: [10, 21, 18, 27, 25, 24],
          backgroundColor: 'rgba(249, 115, 22, 0.8)',
          borderColor: '#f97316',
          borderWidth: 1
        },
        {
          label: '1-10 Enrollees',
          data: [10, 14, 13, 24, 24, 28],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: '#ef4444',
          borderWidth: 1
        }
      ]
    };

    const stackedBarOptions = {
      ...detailedChartOptions,
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { font: { size: 11, weight: 'bold' } }
        },
        y: {
          stacked: true,
          grid: { color: '#e2e8f0' },
          ticks: {
            font: { size: 11, weight: 'bold' },
            callback: function(value) { return value + '%'; }
          },
          max: 100
        }
      },
      plugins: {
        ...detailedChartOptions.plugins,
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          padding: 16,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          callbacks: {
            title: function(context) {
              const specialtyMap = {
                'Peds': 'Pediatricians',
                'OBGYNs': 'OBGYNs',
                'Family Med': 'Family Medicine',
                'Internal Med': 'Internal Medicine',
                'NPs': 'Nurse Practitioners',
                'PAs': 'Physician Associates'
              };
              return specialtyMap[context[0].label] || context[0].label;
            },
            label: function(context) {
              const volumeCategory = context.dataset.label;
              const specialty = context.label;
              const percentage = context.parsed.y;

              const specialtyMap = {
                'Peds': 'Pediatricians',
                'OBGYNs': 'OBGYNs',
                'Family Med': 'Family Medicine',
                'Internal Med': 'Internal Medicine',
                'NPs': 'Nurse Practitioners',
                'PAs': 'Physician Associates'
              };

              const specialtyTotals = {
                'Pediatricians': 28212,
                'OBGYNs': 20289,
                'Family Medicine': 52390,
                'Internal Medicine': 52755,
                'Nurse Practitioners': 43936,
                'Physician Associates': 22974
              };

              const fullSpecialty = specialtyMap[specialty];
              const total = specialtyTotals[fullSpecialty];
              const clinicianCount = Math.round((percentage / 100) * total);

              return [
                `${volumeCategory}: ${percentage}%`,
                `Approximately ${clinicianCount.toLocaleString()} clinicians`,
                `Out of ${total.toLocaleString()} total ${fullSpecialty.toLowerCase()}`
              ];
            },
            footer: function(context) {
              const specialty = context[0].label;

              if (specialty === 'Peds') {
                return '\nHighest volume category (72% with 100+ enrollees)';
              } else if (specialty === 'NPs' || specialty === 'PAs') {
                return '\nHigher proportion in lower volume categories';
              }
              return '';
            }
          }
        },
        datalabels: { display: false }
      }
    };

    return (
      <DetailedVizPanel>
        {/* Sankey Flow Diagram: 2016 Baseline → 2019 Outcomes */}
        <div>
          <DetailedChartTitle>Baseline Volume (2016) → Participation Outcomes (2016-2019)</DetailedChartTitle>
          <DetailedChartSubtitle>
            Flow diagram showing how clinicians in different baseline enrollee volume categories (2016) transitioned to stable participation, major increases, or major decreases (2016-2019).
          </DetailedChartSubtitle>

          <div style={{ height: '600px', marginTop: '20px' }}>
            <Chart
              chartType="Sankey"
              width="100%"
              height="600px"
              data={[
                [
                  'From (2016)',
                  'To (2019)',
                  'Clinicians',
                  { type: 'string', role: 'tooltip', p: { html: true } }
                ],
                // 1-10 enrollees: 42,746 total
                [
                  '1-10 Enrollees (2016)',
                  'Stable (2019)',
                  11360,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">1-10 Enrollees → Stable</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>11,360 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 26.6% of 1-10 Enrollees category (42,746 total)<br/>• 5.2% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '1-10 Enrollees (2016)',
                  'Major Increases (2019)',
                  15359,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">1-10 Enrollees → Major Increases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>15,359 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 35.9% of 1-10 Enrollees category (42,746 total)<br/>• 7.0% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '1-10 Enrollees (2016)',
                  'Major Decreases (2019)',
                  16027,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">1-10 Enrollees → Major Decreases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>16,027 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 37.5% of 1-10 Enrollees category (42,746 total)<br/>• 7.3% of all clinicians (220,556 total)</div></div>'
                ],
                // 11-50 enrollees: 47,507 total
                [
                  '11-50 Enrollees (2016)',
                  'Stable (2019)',
                  24628,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">11-50 Enrollees → Stable</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>24,628 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 51.8% of 11-50 Enrollees category (47,507 total)<br/>• 11.2% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '11-50 Enrollees (2016)',
                  'Major Increases (2019)',
                  12019,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">11-50 Enrollees → Major Increases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>12,019 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 25.3% of 11-50 Enrollees category (47,507 total)<br/>• 5.5% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '11-50 Enrollees (2016)',
                  'Major Decreases (2019)',
                  10860,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">11-50 Enrollees → Major Decreases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>10,860 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 22.9% of 11-50 Enrollees category (47,507 total)<br/>• 4.9% of all clinicians (220,556 total)</div></div>'
                ],
                // 51-100 enrollees: 31,523 total
                [
                  '51-100 Enrollees (2016)',
                  'Stable (2019)',
                  20756,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">51-100 Enrollees → Stable</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>20,756 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 65.8% of 51-100 Enrollees category (31,523 total)<br/>• 9.4% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '51-100 Enrollees (2016)',
                  'Major Increases (2019)',
                  5123,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">51-100 Enrollees → Major Increases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>5,123 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 16.3% of 51-100 Enrollees category (31,523 total)<br/>• 2.3% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '51-100 Enrollees (2016)',
                  'Major Decreases (2019)',
                  5644,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">51-100 Enrollees → Major Decreases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>5,644 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 17.9% of 51-100 Enrollees category (31,523 total)<br/>• 2.6% of all clinicians (220,556 total)</div></div>'
                ],
                // 100+ enrollees: 109,686 total
                [
                  '100+ Enrollees (2016)',
                  'Stable (2019)',
                  89101,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">100+ Enrollees → Stable</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>89,101 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 81.2% of 100+ Enrollees category (109,686 total)<br/>• 40.4% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '100+ Enrollees (2016)',
                  'Major Increases (2019)',
                  6360,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">100+ Enrollees → Major Increases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>6,360 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 5.8% of 100+ Enrollees category (109,686 total)<br/>• 2.9% of all clinicians (220,556 total)</div></div>'
                ],
                [
                  '100+ Enrollees (2016)',
                  'Major Decreases (2019)',
                  14225,
                  '<div style="padding: 12px; font-family: Inter, sans-serif; line-height: 1.6;"><strong style="font-size: 14px; color: #1a202c;">100+ Enrollees → Major Decreases</strong><hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;"/><div style="font-size: 13px;"><strong>14,225 clinicians</strong></div><div style="margin-top: 6px; font-size: 12px; color: #64748b;">• 13.0% of 100+ Enrollees category (109,686 total)<br/>• 6.4% of all clinicians (220,556 total)</div></div>'
                ]
              ]}
              options={{
                height: 600,
                sankey: {
                  node: {
                    // Google Charts assigns colors based on node appearance order in data array:
                    // Index 0: 1-10 Enrollees (2016) - first source node
                    // Index 1: Stable (2019) - first destination
                    // Index 2: Major Increases (2019) - second destination
                    // Index 3: Major Decreases (2019) - third destination
                    // Index 4: 11-50 Enrollees (2016) - second source node
                    // Index 5: 51-100 Enrollees (2016) - third source node
                    // Index 6: 100+ Enrollees (2016) - fourth source node
                    colors: [
                      '#D55E00', // Index 0: 1-10 Enrollees (Vermillion from Baseline chart)
                      '#0EA5E9', // Index 1: Stable (Sky Blue from Overview)
                      '#F59E0B', // Index 2: Major Increases (Amber from Overview)
                      '#EC4899', // Index 3: Major Decreases (Pink from Overview)
                      '#E69F00', // Index 4: 11-50 Enrollees (Amber from Baseline chart)
                      '#56B4E9', // Index 5: 51-100 Enrollees (Sky Blue from Baseline chart)
                      '#0072B2'  // Index 6: 100+ Enrollees (Blue from Baseline chart)
                    ],
                    label: {
                      fontName: 'Inter',
                      fontSize: 13,
                      color: '#1a202c',
                      bold: true
                    },
                    width: 25,
                    nodePadding: 35
                  },
                  link: {
                    // Gradient mode creates smooth transitions from source node color to target node color
                    colorMode: 'gradient'
                  }
                },
                tooltip: {
                  isHtml: true,
                  textStyle: {
                    fontName: 'Inter',
                    fontSize: 12
                  }
                }
              }}
            />
          </div>

          {/* Cross-tabulation Table */}
          <TableWrapper style={{ marginTop: '30px' }}>
            <DataTable>
              <thead>
                <tr>
                  <th>Baseline Volume Category</th>
                  <th>Major Increases</th>
                  <th>Major Decreases</th>
                  <th>Stable Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1 to 10</strong></td>
                  <td className="number-cell">15,359</td>
                  <td className="number-cell">16,027</td>
                  <td className="number-cell">11,360</td>
                </tr>
                <tr>
                  <td><strong>11 to 50</strong></td>
                  <td className="number-cell">12,019</td>
                  <td className="number-cell">10,860</td>
                  <td className="number-cell">24,628</td>
                </tr>
                <tr>
                  <td><strong>51 to 100</strong></td>
                  <td className="number-cell">5,123</td>
                  <td className="number-cell">5,644</td>
                  <td className="number-cell">20,756</td>
                </tr>
                <tr>
                  <td><strong>100 or more</strong></td>
                  <td className="number-cell">6,360</td>
                  <td className="number-cell">14,225</td>
                  <td className="number-cell">89,101</td>
                </tr>
              </tbody>
            </DataTable>
          </TableWrapper>

          <InsightCard bgColor="#E3F2FD" borderColor="#0072B2" style={{ marginTop: '25px' }}>
            <h4>Key Predictors of Stability</h4>
            <p>
              Clinicians serving more than 100 Medicaid patients at baseline were significantly more likely to maintain stable participation.
            </p>
          </InsightCard>
        </div>
      </DetailedVizPanel>
    );
  };

  return (
    <>
      <GlobalStyle />

      <PageContainer>
        {/* Header */}
        <Header>
          <HeaderLeft>
            <MainTitle>Novel Methods for Tracking Primary Care Providers' Medicaid Participation</MainTitle>
            <Subtitle>Longitudinal Analysis of Primary Care Providers' Medicaid Participation (2016-2019)</Subtitle>
          </HeaderLeft>
          <HeaderRight>
            <HeaderStat>
              <span className="value">{statsInView && <CountUp end={220556} duration={2} />}</span>
              <span className="label">Clinicians Tracked</span>
            </HeaderStat>
            <HeaderStat>
              <span className="value">{statsInView && <CountUp end={40} duration={1.5} />}</span>
              <span className="label">States Included</span>
            </HeaderStat>
            <HeaderStat>
              <span className="value">{statsInView && <CountUp end={4} duration={1} />}</span>
              <span className="label">Study Years</span>
            </HeaderStat>
          </HeaderRight>
        </Header>

        <Content ref={statsRef}>
          {/* Key Participation Patterns */}
          <StatsRow>
            <StatCard>
              <StatNumber>62%</StatNumber>
              <StatLabel>Providers Had Stable Volume</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>70%</StatNumber>
              <StatLabel>Pediatricians Had Stable Volume</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>68%</StatNumber>
              <StatLabel>OBGYNs Had Stable Volume</StatLabel>
            </StatCard>
          </StatsRow>

          {/* Interactive Visualization Selector */}
          <VizSelectorContainer>
            <VizTabsRow>
              {vizTabs.map(tab => (
                <VizTab
                  key={tab.id}
                  active={selectedViz === tab.id}
                  onClick={() => setSelectedViz(tab.id)}
                >
                  {tab.label}
                </VizTab>
              ))}
            </VizTabsRow>
          </VizSelectorContainer>

          {/* Detailed Visualization Panel */}
          {renderDetailedViz()}

          {/* Main Content Grid - Balanced Three Column Layout */}
          <ThreeColumnGrid>
            <Section>
              <SectionTitle>Study Overview</SectionTitle>
              <InfoText style={{ marginBottom: '12px' }}>
                This longitudinal analysis tracked 220,556 primary care clinicians across 40 states from 2016 to 2019, examining changes in Medicaid participation patterns. It used data from T-MSIS Analytic Files (TAF) to measure changes in the number of unique Medicaid enrollees served annually.
              </InfoText>
              <InfoText style={{ marginBottom: '12px' }}>
                Major changes were defined as those exceeding 90% of baseline enrollee volume.
              </InfoText>
              <InfoText style={{ marginBottom: '12px' }}>
                <strong>More than 90% increase from the baseline = major increase</strong><br/>
                <strong>More than 90% decrease from the baseline = major decrease</strong>
              </InfoText>
            </Section>

            <Section>
              <SectionTitle>Key Findings</SectionTitle>
              <KeyPoints>
                <KeyPoint>Around 62% of clinicians maintained stable Medicaid enrollee volumes, while around 38% experienced substantial changes in participation</KeyPoint>
                <KeyPoint>Pediatricians and OBGYNs showed greatest stability; NPs and PAs had highest rates of major decreases</KeyPoint>
                <KeyPoint>Higher proportion of providers practicing in CHCs maintained stable volumes</KeyPoint>
                <KeyPoint>Higher baseline volume strongly predicted stability</KeyPoint>
              </KeyPoints>
            </Section>

            <Section>
              <SectionTitle>Policy Implications</SectionTitle>
              <KeyPoints>
                <KeyPoint>To ensure stable access for Medicaid enrollees, incentivizing consistent Medicaid participation is critical</KeyPoint>
                <KeyPoint>Strengthening community health centers is essential for stabilizing access</KeyPoint>
                <KeyPoint>To guide responsive workforce planning, states should track provider-level participation trends and consider variations by specialty/profession</KeyPoint>
              </KeyPoints>
            </Section>
          </ThreeColumnGrid>
        </Content>

        {/* Footer */}
        <Footer>
          <FooterText>
            <strong>Research Study 2016-2019</strong> | Bodas, Luo & Vichare | George Washington University
          </FooterText>
          <PaperLink
            href="https://www.mdpi.com/1660-4601/22/9/1339"
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 View Research Paper
          </PaperLink>
        </Footer>
      </PageContainer>
    </>
  );
};

export default SinglePagePamphlet;