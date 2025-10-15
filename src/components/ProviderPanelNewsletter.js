import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement);

const NewsletterContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  color: white;
  padding: 30px;
  text-align: center;
`;

const NewsletterTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
`;

const MainTopic = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 300;
`;

const TopicArea = styled.div`
  font-size: 0.9rem;
  margin-top: 15px;
  opacity: 0.8;
`;

const ContentSection = styled.section`
  padding: 30px;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  color: #7c3aed;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
`;

const StudyOverview = styled.div`
  background: #faf5ff;
  border-left: 4px solid #a855f7;
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 0 8px 8px 0;
`;

const KeyFindingsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const KeyFindingItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

const FindingBullet = styled.span`
  color: #a855f7;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.2rem;
`;

const FindingText = styled.div`
  flex: 1;
`;

const FindingLabel = styled.strong`
  color: #7c3aed;
  display: block;
  margin-bottom: 4px;
`;

const InsightBox = styled.div`
  background: ${props => {
    switch(props.type) {
      case 'innovation': return 'linear-gradient(135deg, #fef3c7, #fde68a)';
      case 'success': return 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
      case 'concern': return 'linear-gradient(135deg, #fecaca, #fca5a5)';
      case 'highlight': return 'linear-gradient(135deg, #e0e7ff, #c7d2fe)';
      default: return '#f8fafc';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'innovation': return '#f59e0b';
      case 'success': return '#10b981';
      case 'concern': return '#ef4444';
      case 'highlight': return '#6366f1';
      default: return '#6b7280';
    }
  }};
  padding: 20px;
  margin: 20px 0;
  border-radius: 0 8px 8px 0;
`;

const InsightTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #7c3aed;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  margin: 25px 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ChartTitle = styled.h4`
  text-align: center;
  color: #7c3aed;
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 25px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ThreeColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 25px 0;
`;

const PolicySection = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  margin: 25px 0;
`;

const PolicyList = styled.ul`
  list-style: disc;
  margin-left: 20px;
  
  li {
    margin: 8px 0;
    color: #4b5563;
  }
`;

const PRRExplanation = styled.div`
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-left: 4px solid #f59e0b;
  padding: 25px;
  margin: 25px 0;
  border-radius: 0 8px 8px 0;
`;

const ProviderPanelNewsletter = () => {
  const prrData = {
    labels: ['Non-Hispanic White', 'Non-Hispanic Black', 'Hispanic'],
    datasets: [{
      label: 'Panel Representation Ratio (PRR)',
      data: [1.28, 0.98, 0.82],
      backgroundColor: ['#7c3aed', '#a855f7', '#c084fc'],
      borderRadius: 6,
    }]
  };

  const specialtyPRRData = {
    labels: ['Pediatricians', 'OB/GYN', 'Internal Medicine', 'Family Physicians', 'NPs', 'PAs'],
    datasets: [
      {
        label: 'Hispanic PRR',
        data: [1.17, 0.92, 0.66, 0.77, 0.81, 0.80],
        backgroundColor: '#a855f7',
        borderRadius: 4,
      }
    ]
  };

  const chcComparisonData = {
    labels: ['CHC Providers', 'Non-CHC Providers'],
    datasets: [
      {
        label: 'Non-Hispanic Black PRR',
        data: [1.64, 0.94],
        backgroundColor: '#8b5cf6',
        borderRadius: 6,
      },
      {
        label: 'Hispanic PRR',  
        data: [1.37, 0.81],
        backgroundColor: '#a855f7',
        borderRadius: 6,
      }
    ]
  };

  const geographicPRRData = {
    labels: ['Rural HPSA', 'Rural Non-HPSA', 'Urban HPSA', 'Urban Non-HPSA'],
    datasets: [
      {
        label: 'NHW PRR',
        data: [1.04, 1.08, 1.21, 1.32],
        backgroundColor: '#7c3aed',
        borderRadius: 4,
      },
      {
        label: 'NHB PRR',
        data: [1.28, 1.44, 0.91, 0.97],
        backgroundColor: '#a855f7',
        borderRadius: 4,
      },
      {
        label: 'Hispanic PRR',
        data: [1.02, 1.03, 0.80, 0.81],
        backgroundColor: '#c084fc',
        borderRadius: 4,
      }
    ]
  };

  return (
    <NewsletterContainer>
      <Header>
        <NewsletterTitle>NIHCM Research Brief / March 2025</NewsletterTitle>
        <MainTopic>Provider Panel Equity Study</MainTopic>
        <Subtitle>Do Primary Care Providers' Medicaid Panels Represent the Communities They Serve?</Subtitle>
        <TopicArea>
          Healthcare Equity • Provider Panels • Panel Representation Ratio
        </TopicArea>
      </Header>

      <ContentSection>
        <StudyOverview>
          <FindingLabel>Study Innovation</FindingLabel>
          <p style={{ margin: '8px 0 0 0', color: '#4b5563' }}>
            First-of-its-kind analysis introducing the Panel Representation Ratio (PRR) metric to measure 
            how well primary care provider Medicaid panels reflect the racial and ethnic diversity of 
            their local communities. Study encompasses 372,320 providers across 44 states using 2019 data.
          </p>
        </StudyOverview>

        <PRRExplanation>
          <h4 style={{ color: '#92400e', marginTop: 0, fontSize: '1.2rem' }}>🔍 Understanding the Panel Representation Ratio (PRR)</h4>
          <div style={{ color: '#92400e', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '15px' }}>
              <strong>PRR Formula:</strong> (% of racial/ethnic group in provider's panel) ÷ (% of same group in county Medicaid population)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <strong>PRR = 1.0</strong><br/>Perfect representation
              </div>
              <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <strong>PRR &gt; 1.0</strong><br/>Overrepresentation
              </div>
              <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <strong>PRR &lt; 1.0</strong><br/>Underrepresentation
              </div>
            </div>
          </div>
        </PRRExplanation>

        <SectionTitle>Key Findings</SectionTitle>
        <KeyFindingsList>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Systematic Representation Disparities:</FindingLabel>
              Non-Hispanic White enrollees are overrepresented in provider panels (PRR=1.28), while 
              Hispanic enrollees face significant underrepresentation (PRR=0.82) and Black enrollees 
              are slightly underrepresented (PRR=0.98).
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Pediatric Care Excellence:</FindingLabel>
              Pediatricians demonstrate the most equitable panels with 43.4% NHW enrollees, 26.8% Hispanic enrollees, 
              and the only specialty achieving Hispanic overrepresentation (PRR=1.17).
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Community Health Center Leadership:</FindingLabel>
              CHC providers consistently achieve superior representation across all demographics, with PRRs 
              reaching 1.64 for Black enrollees and 1.37 for Hispanic enrollees in rural non-HPSA areas.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Urban Equity Challenges:</FindingLabel>
              Urban non-HPSA areas show the greatest disparities with NHW overrepresentation (PRR=1.32) 
              and significant underrepresentation of both Black (PRR=0.97) and Hispanic enrollees (PRR=0.81).
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Rural Representation Paradox:</FindingLabel>
              Rural areas demonstrate Black enrollee overrepresentation but persistent Hispanic underrepresentation, 
              suggesting complex geographic and cultural access patterns.
            </FindingText>
          </KeyFindingItem>
        </KeyFindingsList>

        <TwoColumnLayout>
          <ChartContainer>
            <ChartTitle>Overall Panel Representation Ratios</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={prrData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 1.5,
                      title: { display: true, text: 'Panel Representation Ratio' }
                    }
                  },
                  plugins: {
                    legend: { display: false }
                  }
                }} 
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem', color: '#6b7280' }}>
              Horizontal line at 1.0 indicates perfect representation
            </div>
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Hispanic Representation by Provider Type</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={specialtyPRRData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 1.3,
                      title: { display: true, text: 'Hispanic PRR' }
                    }
                  },
                  plugins: {
                    legend: { display: false }
                  }
                }} 
              />
            </div>
          </ChartContainer>
        </TwoColumnLayout>

        <InsightBox type="innovation">
          <InsightTitle>Methodological Innovation: Panel Representation Ratio</InsightTitle>
          <p style={{ margin: 0, color: '#92400e' }}>
            This study introduces the <strong>Panel Representation Ratio (PRR)</strong> as a novel metric for measuring 
            healthcare equity. Unlike traditional access measures, PRR reveals whether provider panels truly reflect 
            community demographics, providing actionable insights for workforce planning and equity initiatives.
          </p>
        </InsightBox>

        <InsightBox type="concern">
          <InsightTitle>Hispanic Access Crisis</InsightTitle>
          <p style={{ margin: 0, color: '#991b1b' }}>
            With an overall PRR of 0.82, Hispanic Medicaid enrollees face systematic underrepresentation in 
            primary care panels across nearly all provider types and geographic areas. This <strong>18% representation gap</strong> 
            indicates significant barriers to culturally appropriate primary care access.
          </p>
        </InsightBox>

        <InsightBox type="success">
          <InsightTitle>Community Health Center Excellence</InsightTitle>
          <p style={{ margin: 0, color: '#065f46' }}>
            CHCs demonstrate <strong>exceptional equity leadership</strong> with PRRs consistently above 1.0 for 
            underrepresented groups. Their success provides a roadmap for achieving equitable panel composition 
            across all healthcare settings.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Geographic & Setting Analysis</SectionTitle>
        
        <ChartContainer>
          <ChartTitle>Panel Representation by Geographic Setting</ChartTitle>
          <div style={{ height: '350px' }}>
            <Bar 
              data={geographicPRRData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  y: { 
                    beginAtZero: true, 
                    max: 1.6,
                    title: { display: true, text: 'Panel Representation Ratio' }
                  }
                },
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />
          </div>
        </ChartContainer>

        <ThreeColumnLayout>
          <div style={{ background: '#faf5ff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ color: '#7c3aed', marginBottom: '15px', fontSize: '1.1rem' }}>Rural Areas</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>Black enrollees: <strong>Overrepresented</strong> (PRR 1.28-1.44)</p>
              <p style={{ margin: '0 0 10px 0' }}>Hispanic enrollees: <strong>Near equity</strong> (PRR 1.02-1.03)</p>
              <p style={{ margin: '0' }}>Rural HPSAs show most balanced representation patterns</p>
            </div>
          </div>
          
          <div style={{ background: '#faf5ff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ color: '#7c3aed', marginBottom: '15px', fontSize: '1.1rem' }}>Urban Areas</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>NHW enrollees: <strong>Highly overrepresented</strong> (PRR 1.21-1.32)</p>
              <p style={{ margin: '0 0 10px 0' }}>Minority groups: <strong>Underrepresented</strong></p>
              <p style={{ margin: '0' }}>Greatest disparities in non-HPSA urban areas</p>
            </div>
          </div>
          
          <div style={{ background: '#faf5ff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ color: '#7c3aed', marginBottom: '15px', fontSize: '1.1rem' }}>HPSA Impact</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>22.1% of PCPs practice in HPSAs</p>
              <p style={{ margin: '0 0 10px 0' }}>Rural HPSAs: <strong>Better minority representation</strong></p>
              <p style={{ margin: '0' }}>Urban HPSAs: Mixed representation patterns</p>
            </div>
          </div>
        </ThreeColumnLayout>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Community Health Center Equity Leadership</SectionTitle>
        
        <TwoColumnLayout>
          <ChartContainer>
            <ChartTitle>CHC vs Non-CHC Provider Panel Representation</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={chcComparisonData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 1.8,
                      title: { display: true, text: 'Panel Representation Ratio' }
                    }
                  },
                  plugins: {
                    legend: { position: 'top' }
                  }
                }} 
              />
            </div>
          </ChartContainer>

          <div style={{ background: '#ecfdf5', padding: '25px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
            <h4 style={{ color: '#065f46', marginBottom: '15px' }}>CHC Equity Advantages</h4>
            <div style={{ color: '#065f46', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Cultural Responsiveness:</strong> Bilingual staff and culturally appropriate care models
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>Mission-Driven Care:</strong> Explicit commitment to serving underserved populations
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>Community Integration:</strong> Deep roots in local communities and trust-building
              </p>
              <p style={{ marginBottom: '0' }}>
                <strong>Comprehensive Services:</strong> Wraparound services addressing social determinants
              </p>
            </div>
          </div>
        </TwoColumnLayout>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', margin: '25px 0' }}>
          <div style={{ background: '#f0fdf4', padding: '25px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
            <h4 style={{ color: '#166534', marginBottom: '15px', fontSize: '1.1rem' }}>Outstanding Performance Metrics</h4>
            <div style={{ color: '#166534', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}><strong>Black enrollees:</strong> PRR up to 1.64 (64% overrepresentation)</p>
              <p style={{ margin: '0 0 10px 0' }}><strong>Hispanic enrollees:</strong> PRR up to 1.37 (37% overrepresentation)</p>
              <p style={{ margin: '0' }}>Consistent excellence across all geographic settings</p>
            </div>
          </div>
          
          <div style={{ background: '#f0fdf4', padding: '25px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
            <h4 style={{ color: '#166534', marginBottom: '15px', fontSize: '1.1rem' }}>Policy Model Success</h4>
            <div style={{ color: '#166534', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>Federally mandated to serve <strong>medically underserved areas</strong></p>
              <p style={{ margin: '0 0 10px 0' }}>Board governance includes <strong>community representation</strong></p>
              <p style={{ margin: '0' }}>Sliding fee scales ensure <strong>economic accessibility</strong></p>
            </div>
          </div>
        </div>

        <InsightBox type="highlight">
          <InsightTitle>Scaling CHC Success: Policy Implications</InsightTitle>
          <p style={{ margin: 0, color: '#3730a3' }}>
            CHC excellence in achieving equitable panel representation demonstrates that <strong>intentional equity policies work</strong>. 
            Expanding CHC capacity and applying CHC principles to other healthcare settings could dramatically 
            improve representation disparities across the healthcare system.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Provider Specialty Equity Analysis</SectionTitle>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', margin: '25px 0' }}>
          <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            <h4 style={{ color: '#1e40af', marginBottom: '15px' }}>Pediatric Excellence</h4>
            <div style={{ color: '#1e40af', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>Most diverse panels: 43.4% NHW, 26.8% Hispanic</p>
              <p style={{ margin: '0 0 8px 0' }}>Only specialty with Hispanic PRR &gt;1.0 (1.17)</p>
              <p style={{ margin: '0' }}>Largest panel sizes (626 patients on average)</p>
            </div>
          </div>
          
          <div style={{ background: '#fdf4ff', padding: '20px', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
            <h4 style={{ color: '#7c3aed', marginBottom: '15px' }}>OB/GYN Performance</h4>
            <div style={{ color: '#7c3aed', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>Second most diverse: 46.4% NHW, 21.2% Hispanic</p>
              <p style={{ margin: '0 0 8px 0' }}>Strong NHB representation (PRR 1.12)</p>
              <p style={{ margin: '0' }}>Serves pregnancy-focused Medicaid population</p>
            </div>
          </div>
          
          <div style={{ background: '#fefbeb', padding: '20px', borderRadius: '12px', border: '1px solid #fde68a' }}>
            <h4 style={{ color: '#92400e', marginBottom: '15px' }}>Internal Medicine Challenges</h4>
            <div style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>Lowest Hispanic PRR (0.66 - significant underrepresentation)</p>
              <p style={{ margin: '0 0 8px 0' }}>Highest NHW overrepresentation (PRR 1.39)</p>
              <p style={{ margin: '0' }}>Critical need for diversity improvement</p>
            </div>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#475569', marginBottom: '15px' }}>Mid-Level Providers</h4>
            <div style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>NPs and PAs show similar patterns to Family Medicine</p>
              <p style={{ margin: '0 0 8px 0' }}>Hispanic PRR around 0.80-0.81</p>
              <p style={{ margin: '0' }}>Opportunity for enhanced cultural training</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Policy Implications & Recommendations</SectionTitle>
        
        <PolicySection>
          <h4 style={{ color: '#7c3aed', marginTop: 0 }}>Medical Education Reform</h4>
          <PolicyList>
            <li>Integrate PRR methodology into medical school curricula and residency training</li>
            <li>Mandate implicit bias training focused on patient panel composition impacts</li>
            <li>Develop cultural competency requirements tied to panel representation metrics</li>
            <li>Create specialty-specific equity training programs addressing documented disparities</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#7c3aed', marginTop: 0 }}>Workforce Policy Innovation</h4>
          <PolicyList>
            <li>Incorporate PRR data into Health Professional Shortage Area (HPSA) designations</li>
            <li>Link provider loan forgiveness programs to panel representation improvements</li>
            <li>Create equity-focused provider recruitment incentives for underrepresented areas</li>
            <li>Establish PRR monitoring requirements for federally funded health programs</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#7c3aed', marginTop: 0 }}>Community Health Center Expansion</h4>
          <PolicyList>
            <li>Increase federal funding for CHC capacity expansion in high-disparity areas</li>
            <li>Replicate CHC governance and service delivery models in other healthcare settings</li>
            <li>Support CHC-led training programs for cultural competency and community engagement</li>
            <li>Develop CHC-academic medical center partnerships for equity-focused provider training</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#7c3aed', marginTop: 0 }}>Transparency & Accountability</h4>
          <PolicyList>
            <li>Mandate public reporting of provider panel demographic composition</li>
            <li>Create PRR report cards for healthcare systems and provider networks</li>
            <li>Establish equity performance standards for Medicaid managed care contracts</li>
            <li>Develop patient-facing tools showing provider panel diversity information</li>
          </PolicyList>
        </PolicySection>

        <InsightBox type="innovation">
          <InsightTitle>Future Policy Applications</InsightTitle>
          <p style={{ margin: 0, color: '#92400e' }}>
            The Panel Representation Ratio provides a <strong>powerful new tool</strong> for policymakers to measure 
            and address healthcare equity. Integration of PRR into quality metrics, funding decisions, and 
            performance evaluations could drive systematic improvements in equitable care delivery.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Resources & Methodology</SectionTitle>
        <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            <strong>Novel Methodology:</strong> Panel Representation Ratio (PRR) calculated as the percentage of a 
            racial/ethnic group in a provider's Medicaid panel divided by that group's percentage in the county 
            Medicaid population.
          </p>
          <p>
            <strong>Data Source:</strong> 2019 Transformed Medicaid Statistical Information System (T-MSIS) 
            Analytic Files (TAF) and National Plan and Provider Enumeration System (NPPES).
          </p>
          <p>
            <strong>Sample:</strong> 372,320 primary care providers (physicians, nurse practitioners, and physician associates) 
            across 44 states with complete panel and demographic data.
          </p>
          <p>
            <strong>Geographic Scope:</strong> Analysis stratified by rurality (USDA Rural-Urban Continuum Codes), 
            Health Professional Shortage Area designation, and Community Health Center affiliation.
          </p>
          <p>
            <strong>Quality Measures:</strong> Excluded providers with extremely large (&gt;5,000 patients) or small 
            (&lt;10 patients) panels, and those with &gt;50% missing race/ethnicity data.
          </p>
          <p>
            <strong>Published:</strong> Healthcare, 2025. DOI: 10.3390/healthcare13162062
          </p>
        </div>
      </ContentSection>
    </NewsletterContainer>
  );
};

export default ProviderPanelNewsletter;