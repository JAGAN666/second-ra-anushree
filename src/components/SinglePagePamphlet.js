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
  gap: 22px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
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
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #2c5aa0;
  display: inline-block;
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
  font-size: 0.9rem;
  line-height: 1.6;
  color: #475569;
`;

// Key points
const KeyPoints = styled.ul`
  list-style: none;
  padding: 0;
`;

const KeyPoint = styled.li`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #475569;
  padding: 8px 0;
  padding-left: 22px;
  position: relative;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #2c5aa0;
    font-weight: 700;
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

const PrintBtn = styled.button`
  background: #2c5aa0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;

  &:hover {
    background: #1e3a5f;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.85rem;
    width: 100%;
  }

  @media print {
    display: none;
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
  grid-template-columns: repeat(5, 1fr);
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
  const participationData = {
    labels: ['Stable Volume', 'Major Increases', 'Major Decreases'],
    datasets: [{
      label: 'Clinician Participation (%)',
      data: [60, 20, 20],
      backgroundColor: ['#2c5aa0', '#28a745', '#dc3545'],
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
      backgroundColor: 'rgba(44, 90, 160, 0.8)',
      borderColor: '#2c5aa0',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const majorChangesData = {
    labels: ['NPs', 'FPs', 'IMs', 'OBGYNs', 'Peds', 'PAs'],
    datasets: [
      {
        label: 'Major Increases (%)',
        data: [22, 14, 17, 16, 14, 24],
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
        borderColor: '#28a745',
        borderWidth: 1,
      },
      {
        label: 'Major Decreases (%)',
        data: [26, 20, 19, 16, 16, 24],
        backgroundColor: 'rgba(220, 53, 69, 0.7)',
        borderColor: '#dc3545',
        borderWidth: 1,
      }
    ]
  };

  const baselineVolumeData = {
    labels: ['1-10', '11-50', '51-100', '100+'],
    datasets: [{
      label: 'Baseline Enrollees Served',
      data: [19, 21, 14, 45],
      borderColor: '#2c5aa0',
      backgroundColor: 'rgba(44, 90, 160, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#2c5aa0',
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
  const detailedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 13, weight: 'bold' },
          padding: 15
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12, weight: 'bold' }
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: {
          size: 14,
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
          font: { size: 11, weight: 'bold' }
        }
      },
      y: {
        grid: {
          color: '#e2e8f0'
        },
        ticks: {
          font: { size: 11, weight: 'bold' },
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12, weight: 'bold' }
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
    { id: 'specialty', label: '🏥 By Specialty', icon: '🏥' },
    { id: 'trends', label: '📈 Participation Trends', icon: '📈' },
    { id: 'baseline', label: '📍 Baseline Volume', icon: '📍' },
    { id: 'flow', label: '🔄 Flow Analysis', icon: '🔄' }
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
      case 'trends':
        return renderTrendsViz();
      case 'baseline':
        return renderBaselineViz();
      case 'flow':
        return renderSankeyViz();
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

      <DataTable>
        <thead>
          <tr>
            <th>Category</th>
            <th>Clinicians (N)</th>
            <th>Percentage</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Stable Volume</strong></td>
            <td className="number-cell">137,039</td>
            <td className="number-cell">62.1%</td>
            <td>Maintained consistent Medicaid enrollee volumes (±90% of baseline)</td>
          </tr>
          <tr className="highlight">
            <td><strong>Major Increases</strong></td>
            <td className="number-cell">38,761</td>
            <td className="number-cell">17.6%</td>
            <td>Experienced &gt;90% increase from baseline enrollee volume</td>
          </tr>
          <tr className="highlight">
            <td><strong>Major Decreases</strong></td>
            <td className="number-cell">44,756</td>
            <td className="number-cell">20.3%</td>
            <td>Experienced &gt;90% decrease from baseline enrollee volume</td>
          </tr>
        </tbody>
      </DataTable>

      <InsightCard bgColor="#e0f2fe" borderColor="#0284c7">
        <h4>Key Insight</h4>
        <p>
          While 62.1% of clinicians maintained stable Medicaid participation, 37.9% experienced major fluctuations (17.6% increases, 20.3% decreases).
          This suggests that access to care may be more volatile than previously understood, highlighting the need for policies supporting consistent clinician engagement.
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
          backgroundColor: 'rgba(44, 90, 160, 0.8)',
          borderColor: '#2c5aa0',
          borderWidth: 2
        },
        {
          label: 'Major Increases (%)',
          data: specialtyLabels.map(s => detailedSpecialtyData[s].increasesPct),
          backgroundColor: 'rgba(40, 167, 69, 0.8)',
          borderColor: '#28a745',
          borderWidth: 2
        },
        {
          label: 'Major Decreases (%)',
          data: specialtyLabels.map(s => detailedSpecialtyData[s].decreasesPct),
          backgroundColor: 'rgba(220, 53, 69, 0.8)',
          borderColor: '#dc3545',
          borderWidth: 2
        }
      ]
    };

    return (
      <DetailedVizPanel>
        <DetailedChartTitle>Participation Patterns by Specialty</DetailedChartTitle>
        <DetailedChartSubtitle>
          Detailed breakdown showing stable participation, major increases, and major decreases for each primary care specialty
        </DetailedChartSubtitle>

        <DetailedChartBox height="600px">
          <Bar data={allPatternsData} options={detailedChartOptions} />
        </DetailedChartBox>

        <DataTable>
          <thead>
            <tr>
              <th>Specialty</th>
              <th>Total Clinicians</th>
              <th>Stable Volume</th>
              <th>Major Increases</th>
              <th>Major Decreases</th>
            </tr>
          </thead>
          <tbody>
            {specialtyLabels.map(specialty => (
              <tr key={specialty}>
                <td><strong>{specialty}</strong></td>
                <td className="number-cell">{detailedSpecialtyData[specialty].total.toLocaleString()}</td>
                <td className="number-cell">{detailedSpecialtyData[specialty].stablePct}% ({detailedSpecialtyData[specialty].stable.toLocaleString()})</td>
                <td className="number-cell">{detailedSpecialtyData[specialty].increasesPct}% ({detailedSpecialtyData[specialty].increases.toLocaleString()})</td>
                <td className="number-cell">{detailedSpecialtyData[specialty].decreasesPct}% ({detailedSpecialtyData[specialty].decreases.toLocaleString()})</td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        <TwoColumnGrid>
          <InsightCard bgColor="#dcfce7" borderColor="#16a34a">
            <h4>Most Stable Specialties</h4>
            <p>
              <strong>Pediatricians (70%)</strong> and <strong>OBGYNs (68%)</strong> demonstrated the highest stability rates.
              This may be attributed to the routine nature of well-child visits and prenatal care, which are often unavoidable services.
            </p>
          </InsightCard>
          <InsightCard bgColor="#fee2e2" borderColor="#dc2626">
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

  const renderTrendsViz = () => (
    <DetailedVizPanel>
      <DetailedChartTitle>Participation Trends: Increases vs Decreases</DetailedChartTitle>
      <DetailedChartSubtitle>
        Comparison of major increases and decreases in Medicaid enrollee volumes across specialties
      </DetailedChartSubtitle>

      <DetailedChartBox height="550px">
        <Bar data={majorChangesData} options={detailedChartOptions} />
      </DetailedChartBox>

      <InsightCard bgColor="#fef3c7" borderColor="#f59e0b">
        <h4>Pattern Analysis</h4>
        <p>
          The bidirectional nature of changes suggests that Medicaid participation is influenced by multiple dynamic factors including
          reimbursement rates, managed care contracting, practice transitions, and local market conditions. 37.9% of clinicians
          experienced substantial changes (17.6% increases, 20.3% decreases), indicating significant workforce volatility.
        </p>
      </InsightCard>
    </DetailedVizPanel>
  );

  const renderBaselineViz = () => {
    const specialtyNames = Object.keys(baselineBySpecialty);
    const volumeCategories = ['1-10', '11-50', '51-100', '100+'];

    const baselineStackedData = {
      labels: specialtyNames,
      datasets: volumeCategories.map((cat, idx) => ({
        label: cat + ' enrollees',
        data: specialtyNames.map(s => baselineBySpecialty[s][cat]),
        backgroundColor: ['rgba(220, 38, 38, 0.7)', 'rgba(249, 115, 22, 0.7)', 'rgba(234, 179, 8, 0.7)', 'rgba(34, 197, 94, 0.7)'][idx],
        borderColor: ['#dc2626', '#f97316', '#eab308', '#22c55e'][idx],
        borderWidth: 1
      }))
    };

    const stackedOptions = {
      ...detailedChartOptions,
      scales: {
        ...detailedChartOptions.scales,
        x: { ...detailedChartOptions.scales.x, stacked: true },
        y: { ...detailedChartOptions.scales.y, stacked: true, max: 100 }
      }
    };

    return (
      <DetailedVizPanel>
        <DetailedChartTitle>Baseline Enrollee Volume Distribution by Specialty</DetailedChartTitle>
        <DetailedChartSubtitle>
          Percentage of clinicians in each baseline enrollee volume category (2016)
        </DetailedChartSubtitle>

        <DetailedChartBox height="550px">
          <Bar data={baselineStackedData} options={stackedOptions} />
        </DetailedChartBox>

        <DataTable>
          <thead>
            <tr>
              <th>Specialty</th>
              <th>1-10 Enrollees</th>
              <th>11-50 Enrollees</th>
              <th>51-100 Enrollees</th>
              <th>100+ Enrollees</th>
            </tr>
          </thead>
          <tbody>
            {specialtyNames.map(specialty => (
              <tr key={specialty}>
                <td><strong>{specialty}</strong></td>
                <td className="number-cell">{baselineBySpecialty[specialty]['1-10']}%</td>
                <td className="number-cell">{baselineBySpecialty[specialty]['11-50']}%</td>
                <td className="number-cell">{baselineBySpecialty[specialty]['51-100']}%</td>
                <td className="number-cell">{baselineBySpecialty[specialty]['100+']}%</td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        <InsightCard bgColor="#ddd6fe" borderColor="#7c3aed">
          <h4>Predictor of Stability</h4>
          <p>
            Clinicians serving <strong>more than 100 Medicaid patients at baseline</strong> were significantly more likely to maintain stable participation.
            Pediatricians (72%) had the highest proportion in this category, correlating with their high stability rate (70%).
          </p>
        </InsightCard>
      </DetailedVizPanel>
    );
  };

  const renderSankeyViz = () => {
    // IMPORTANT: The research paper does not provide actual cross-tabulation data
    // The distribution below is an illustrative estimate based on research findings that:
    // - Higher baseline volumes correlate with greater stability
    // - 51-100 enrollees showed highest stability
    // - Numbers are proportionally distributed to match exact research totals

    // Calculated baseline volumes from research: 220,556 total × distribution (19%, 21%, 14%, 45%)
    // Baseline totals: 41,906 (1-10) + 46,317 (11-50) + 30,878 (51-100) + 101,455 (100+) = 220,556

    const sankeyData = [
      ['From', 'To', 'Clinicians'],
      // 1-10 enrollees: 41,906 total (42% stable, 28.6% increases, 29.4% decreases)
      ['1-10 Enrollees', 'Stable', 17601],
      ['1-10 Enrollees', 'Major Increases', 12000],
      ['1-10 Enrollees', 'Major Decreases', 12305],
      // 11-50 enrollees: 46,317 total (60% stable, 18.4% increases, 21.6% decreases)
      ['11-50 Enrollees', 'Stable', 27790],
      ['11-50 Enrollees', 'Major Increases', 8500],
      ['11-50 Enrollees', 'Major Decreases', 10027],
      // 51-100 enrollees: 30,878 total (72% stable, 12% increases, 16% decreases)
      ['51-100 Enrollees', 'Stable', 22232],
      ['51-100 Enrollees', 'Major Increases', 3700],
      ['51-100 Enrollees', 'Major Decreases', 4946],
      // 100+ enrollees: 101,455 total (68.4% stable, 14.4% increases, 17.2% decreases)
      ['100+ Enrollees', 'Stable', 69416],
      ['100+ Enrollees', 'Major Increases', 14561],
      ['100+ Enrollees', 'Major Decreases', 17478]
    ];

    const sankeyOptions = {
      height: 600,
      sankey: {
        node: {
          colors: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#22c55e', '#06b6d4', '#ef4444'],
          label: {
            fontName: 'Inter',
            fontSize: 14,
            color: '#1a202c',
            bold: true
          },
          width: 20,
          nodePadding: 40
        },
        link: {
          colorMode: 'gradient',
          colors: ['#22c55e', '#06b6d4', '#ef4444']
        }
      },
      tooltip: {
        textStyle: {
          fontName: 'Inter',
          fontSize: 13
        }
      }
    };

    return (
      <DetailedVizPanel>
        <DetailedChartTitle>Participation Flow: Baseline Volume to Outcomes</DetailedChartTitle>
        <DetailedChartSubtitle>
          <strong>Illustrative visualization</strong> showing estimated distribution of how clinicians in different baseline volume categories (2016)
          may have transitioned to participation outcomes (2016-2019). Cross-tabulation data not available in source research;
          distribution is proportionally estimated to match exact research totals while reflecting documented correlation between higher baseline volumes and greater stability.
        </DetailedChartSubtitle>

        <div style={{ height: '600px', marginTop: '20px' }}>
          <Chart
            chartType="Sankey"
            width="100%"
            height="600px"
            data={sankeyData}
            options={sankeyOptions}
          />
        </div>

        <DataTable style={{ marginTop: '30px' }}>
          <thead>
            <tr>
              <th>Baseline Volume Category</th>
              <th>To Stable</th>
              <th>To Major Increases</th>
              <th>To Major Decreases</th>
              <th>Total Clinicians</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1-10 Enrollees</strong></td>
              <td className="number-cell">42.0% (17,601)</td>
              <td className="number-cell">28.6% (12,000)</td>
              <td className="number-cell">29.4% (12,305)</td>
              <td className="number-cell">41,906</td>
            </tr>
            <tr>
              <td><strong>11-50 Enrollees</strong></td>
              <td className="number-cell">60.0% (27,790)</td>
              <td className="number-cell">18.4% (8,500)</td>
              <td className="number-cell">21.6% (10,027)</td>
              <td className="number-cell">46,317</td>
            </tr>
            <tr>
              <td><strong>51-100 Enrollees</strong></td>
              <td className="number-cell">72.0% (22,232)</td>
              <td className="number-cell">12.0% (3,700)</td>
              <td className="number-cell">16.0% (4,946)</td>
              <td className="number-cell">30,878</td>
            </tr>
            <tr>
              <td><strong>100+ Enrollees</strong></td>
              <td className="number-cell">68.4% (69,416)</td>
              <td className="number-cell">14.4% (14,561)</td>
              <td className="number-cell">17.2% (17,478)</td>
              <td className="number-cell">101,455</td>
            </tr>
            <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
              <td><strong>TOTAL (from research)</strong></td>
              <td className="number-cell">62.1% (137,039)</td>
              <td className="number-cell">17.6% (38,761)</td>
              <td className="number-cell">20.3% (44,756)</td>
              <td className="number-cell">220,556</td>
            </tr>
          </tbody>
        </DataTable>

        <TwoColumnGrid style={{ marginTop: '25px' }}>
          <InsightCard bgColor="#ddd6fe" borderColor="#7c3aed">
            <h4>Illustrative Pattern: Volume-Stability Correlation</h4>
            <p>
              This estimated distribution shows <strong>51-100 baseline enrollees with 72% stability</strong>,
              compared to 42% for those with 1-10 enrollees. Research confirms higher baseline volumes predict greater stability,
              though exact cross-tabulation percentages were not published in the source study.
            </p>
          </InsightCard>
          <InsightCard bgColor="#e0f2fe" borderColor="#0284c7">
            <h4>Data Accuracy Note</h4>
            <p>
              <strong>All total numbers match the research exactly</strong> (137,039 stable, 38,761 increases, 44,756 decreases).
              The baseline category distribution is proportionally estimated to reflect the documented correlation
              between higher volumes and stability, while ensuring mathematical accuracy.
            </p>
          </InsightCard>
        </TwoColumnGrid>
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
            <MainTitle>Medicaid Clinician Participation Dynamics</MainTitle>
            <Subtitle>Longitudinal Analysis of Primary Care Provider Engagement (2016-2019)</Subtitle>
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
              <StatNumber>60%</StatNumber>
              <StatLabel>Stable Volume</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>70%</StatNumber>
              <StatLabel>Peds Stable</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>68%</StatNumber>
              <StatLabel>OBGYNs Stable</StatLabel>
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

          {/* Main Content Grid */}
          <MainGrid>
            {/* Left Column */}
            <div>
              <Section>
                <SectionTitle>Study Overview</SectionTitle>
                <InfoText style={{ marginBottom: '12px' }}>
                  This longitudinal analysis tracked 220,556 primary care clinicians across 40 states
                  from 2016 to 2019, examining changes in Medicaid participation patterns. The study
                  used T-MSIS Analytic Files to measure changes in the number of unique Medicaid
                  enrollees served annually, with major changes defined as variations exceeding 90%
                  of baseline enrollee volume.
                </InfoText>
              </Section>

              <Section>
                <SectionTitle>Key Findings</SectionTitle>
                <KeyPoints>
                  <KeyPoint>60% of clinicians maintained stable Medicaid enrollee volumes</KeyPoint>
                  <KeyPoint>Nearly 40% experienced substantial changes in participation</KeyPoint>
                  <KeyPoint>Pediatricians (70%) and OBGYNs (68%) showed greatest stability</KeyPoint>
                  <KeyPoint>NPs (26%) and PAs (24%) had highest rates of major decreases</KeyPoint>
                  <KeyPoint>Higher baseline volume strongly predicted stability</KeyPoint>
                </KeyPoints>
              </Section>
            </div>

            {/* Right Column */}
            <div>
              <Section>
                <SectionTitle>Predictors of Stability</SectionTitle>
                <InfoText style={{ marginBottom: '12px' }}>
                  Clinicians serving more than 100 Medicaid patients at baseline were significantly
                  more likely to maintain stable participation. Community Health Center affiliation
                  was associated with greater stability and higher odds of increases. Conversely,
                  rural practice settings were linked to higher odds of major decreases in enrollee
                  volume.
                </InfoText>
              </Section>

              <Section>
                <SectionTitle>Policy Implications</SectionTitle>
                <KeyPoints>
                  <KeyPoint>Access to care may be more volatile than previously understood</KeyPoint>
                  <KeyPoint>Need to support consistent clinician engagement with Medicaid</KeyPoint>
                  <KeyPoint>CHCs play crucial role in maintaining stable provider networks</KeyPoint>
                  <KeyPoint>Rural areas require targeted workforce retention strategies</KeyPoint>
                  <KeyPoint>Track participation trends as Medicaid faces potential changes</KeyPoint>
                </KeyPoints>
              </Section>
            </div>
          </MainGrid>
        </Content>

        {/* Footer */}
        <Footer>
          <FooterText>
            <strong>Research Study 2016-2019</strong> | Bodas, Luo & Vichare | George Washington University
          </FooterText>
          <PrintBtn onClick={() => window.print()}>
            🖨 Print Report
          </PrintBtn>
        </Footer>
      </PageContainer>
    </>
  );
};

export default SinglePagePamphlet;