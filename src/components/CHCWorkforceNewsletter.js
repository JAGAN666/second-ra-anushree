import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

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
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
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
  color: #0f766e;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
`;

const StudyOverview = styled.div`
  background: #f0fdfa;
  border-left: 4px solid #14b8a6;
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
  color: #14b8a6;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.2rem;
`;

const FindingText = styled.div`
  flex: 1;
`;

const FindingLabel = styled.strong`
  color: #0f766e;
  display: block;
  margin-bottom: 4px;
`;

const InsightBox = styled.div`
  background: ${props => {
    switch(props.type) {
      case 'highlight': return 'linear-gradient(135deg, #ecfdf5, #d1fae5)';
      case 'success': return 'linear-gradient(135deg, #f0fdf9, #ccfbf1)';
      case 'warning': return 'linear-gradient(135deg, #fef3c7, #fde68a)';
      case 'urgent': return 'linear-gradient(135deg, #fef2f2, #fecaca)';
      default: return '#f8fafc';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'highlight': return '#14b8a6';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'urgent': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  padding: 20px;
  margin: 20px 0;
  border-radius: 0 8px 8px 0;
`;

const InsightTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #0f766e;
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
  color: #0f766e;
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

const CHCWorkforceNewsletter = () => {
  const workforceGrowthData = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [
      {
        label: 'Pregnant Enrollees Workforce',
        data: [22027, 23905, 26914, 28964, 28668, null],
        backgroundColor: '#14b8a6',
        borderRadius: 4,
      },
      {
        label: 'Postpartum Enrollees Workforce',
        data: [null, 25655, 28444, 30609, 30554, 32026],
        backgroundColor: '#0d9488',
        borderRadius: 4,
      }
    ]
  };

  const providerTypeGrowthData = {
    labels: ['Nurse Practitioners', 'Family Physicians', 'OBGYNs', 'Physician Associates'],
    datasets: [
      {
        label: 'Growth Rate (%)',
        data: [31, 17, 2, 1],
        backgroundColor: ['#14b8a6', '#0d9488', '#0f766e', '#134e4a'],
        borderRadius: 6,
      }
    ]
  };

  const patientVolumeData = {
    labels: ['OBGYNs', 'Family Physicians', 'Nurse Practitioners', 'Physician Associates'],
    datasets: [
      {
        label: 'Average Patients per Provider',
        data: [140, 30, 20, 10],
        backgroundColor: ['#0f766e', '#14b8a6', '#0d9488', '#0a5d56'],
        borderRadius: 6,
      }
    ]
  };

  const telehealthTimelineData = {
    labels: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020', 'Jul 2020', 'Aug 2020', 'Sep 2020', 'Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021'],
    datasets: [
      {
        label: 'Pregnant Care Providers',
        data: [800, 850, 2400, 5200, 4800, 4200, 3800, 3500, 3400, 3600, 4200, 5000, 4800, 4600, 4500],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Postpartum Care Providers',
        data: [1200, 1300, 3000, 6500, 6000, 5200, 4800, 4400, 4200, 4500, 5200, 6000, 5800, 5500, 5300],
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <NewsletterContainer>
      <Header>
        <NewsletterTitle>NIHCM Research Brief / March 2025</NewsletterTitle>
        <MainTopic>CHC Perinatal Workforce Growth</MainTopic>
        <Subtitle>Community Health Center Workforce Serving Pregnant and Postpartum Medicaid Enrollees 2016-2021</Subtitle>
        <TopicArea>
          Maternal Health • Community Health Centers • Workforce Development
        </TopicArea>
      </Header>

      <ContentSection>
        <StudyOverview>
          <FindingLabel>Study Overview</FindingLabel>
          <p style={{ margin: '8px 0 0 0', color: '#4b5563' }}>
            Comprehensive analysis of the workforce serving pregnant and postpartum Medicaid enrollees 
            across 1,280 Community Health Centers in 28 states plus DC from 2016-2021. This study reveals 
            significant workforce growth patterns and the evolving role of different healthcare professionals 
            in perinatal care delivery at safety-net facilities.
          </p>
        </StudyOverview>

        <SectionTitle>Key Findings</SectionTitle>
        <KeyFindingsList>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Substantial Workforce Growth:</FindingLabel>
              23% increase in providers serving pregnant Medicaid enrollees (22,027→28,668) and 20% growth 
              for postpartum care (25,655→32,026), demonstrating CHC capacity expansion during the study period.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Nurse Practitioner Leadership:</FindingLabel>
              NPs showed the fastest growth rate at 31% for prenatal and 27% for postpartum care, 
              significantly outpacing family physicians (17%) and becoming critical to CHC perinatal workforce expansion.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>OBGYN Specialist Concerns:</FindingLabel>
              OBGYN and PA numbers remained relatively stable during the study period, raising concerns 
              about specialist availability for high-risk pregnancies and complex perinatal care needs.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Telehealth Integration Success:</FindingLabel>
              Dramatic surge in telehealth providers during COVID-19 (peak: 5,200 for prenatal, 6,500 for postpartum), 
              with sustained adoption demonstrating viability for ongoing perinatal care delivery.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Patient Volume Differentials:</FindingLabel>
              OBGYNs maintain highest patient volumes (140 pregnant enrollees per provider) compared to 
              FPs (30), NPs (20), and PAs (10), highlighting productivity and specialization patterns.
            </FindingText>
          </KeyFindingItem>
        </KeyFindingsList>

        <TwoColumnLayout>
          <ChartContainer>
            <ChartTitle>CHC Workforce Growth (2016-2021)</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={workforceGrowthData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true,
                      title: { display: true, text: 'Number of Providers' }
                    }
                  },
                  plugins: {
                    legend: { position: 'top' }
                  }
                }} 
              />
            </div>
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Provider Type Growth Rates</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={providerTypeGrowthData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 35,
                      title: { display: true, text: 'Growth Rate (%)' }
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

        <InsightBox type="success">
          <InsightTitle>CHC Perinatal Care Capacity</InsightTitle>
          <p style={{ margin: 0, color: '#065f46' }}>
            CHCs serve <strong>~560,000 individuals</strong> with perinatal care annually, representing nearly 
            1 in 6 Medicaid enrollees. With Medicaid covering 41% of all U.S. childbirths, this workforce growth 
            directly impacts maternal health access for the nation's most vulnerable populations.
          </p>
        </InsightBox>

        <InsightBox type="warning">
          <InsightTitle>OBGYN Specialist Shortage</InsightTitle>
          <p style={{ margin: 0, color: '#92400e' }}>
            The lack of significant OBGYN growth is concerning given HRSA projections of <strong>significant 
            specialist shortages by 2030</strong>. This pattern may limit CHC capacity to manage high-risk pregnancies 
            and provide comprehensive obstetric services in underserved communities.
          </p>
        </InsightBox>

        <InsightBox type="highlight">
          <InsightTitle>Integrated Care Team Approach</InsightTitle>
          <p style={{ margin: 0, color: '#0f766e' }}>
            Growth in non-traditional perinatal providers (dentists, social workers, counselors) confirms 
            CHCs' <strong>comprehensive, team-based approach</strong> to addressing the multifaceted needs of 
            expectant mothers, supporting both medical and social determinants of health.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Telehealth Transformation</SectionTitle>
        
        <ChartContainer>
          <ChartTitle>COVID-19 Telehealth Adoption Timeline</ChartTitle>
          <div style={{ height: '300px' }}>
            <Line 
              data={telehealthTimelineData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  y: { 
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Providers Using Telehealth' }
                  },
                  x: {
                    title: { display: true, text: 'Time Period' }
                  }
                },
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />
          </div>
        </ChartContainer>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', margin: '25px 0' }}>
          <div style={{ background: '#f0fdfa', padding: '25px', borderRadius: '12px', border: '1px solid #ccfbf1' }}>
            <h4 style={{ color: '#0f766e', marginBottom: '15px', fontSize: '1.1rem' }}>Rapid Telehealth Scaling</h4>
            <div style={{ color: '#0f766e', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}><strong>6.5x increase</strong> in telehealth providers within 2 months</p>
              <p style={{ margin: '0 0 10px 0' }}>Peak utilization: <strong>April 2020</strong> during initial COVID surge</p>
              <p style={{ margin: '0' }}>Sustained adoption at <strong>5,000+ providers</strong> through 2021</p>
            </div>
          </div>
          
          <div style={{ background: '#f0fdfa', padding: '25px', borderRadius: '12px', border: '1px solid #ccfbf1' }}>
            <h4 style={{ color: '#0f766e', marginBottom: '15px', fontSize: '1.1rem' }}>Care Continuity Benefits</h4>
            <div style={{ color: '#0f766e', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>Maintained access during <strong>lockdown periods</strong></p>
              <p style={{ margin: '0 0 10px 0' }}>Enabled <strong>behavioral health integration</strong> for postpartum care</p>
              <p style={{ margin: '0' }}>Reduced barriers for <strong>rural and underserved</strong> patients</p>
            </div>
          </div>
          
          <div style={{ background: '#f0fdfa', padding: '25px', borderRadius: '12px', border: '1px solid #ccfbf1' }}>
            <h4 style={{ color: '#0f766e', marginBottom: '15px', fontSize: '1.1rem' }}>Future Integration</h4>
            <div style={{ color: '#0f766e', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>Baseline established for <strong>hybrid care models</strong></p>
              <p style={{ margin: '0 0 10px 0' }}>Critical for <strong>postpartum mental health</strong> services</p>
              <p style={{ margin: '0' }}>Platform for <strong>extended coverage</strong> implementation</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Provider Productivity & Specialization</SectionTitle>
        
        <TwoColumnLayout>
          <ChartContainer>
            <ChartTitle>Average Patient Volume per Provider</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={patientVolumeData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true,
                      title: { display: true, text: 'Patients per Provider' }
                    }
                  },
                  plugins: {
                    legend: { display: false }
                  }
                }} 
              />
            </div>
          </ChartContainer>

          <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#0f766e', marginBottom: '15px' }}>Workforce Productivity Insights</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Specialist Efficiency:</strong> OBGYNs serve 4.7x more patients than FPs, 
                reflecting specialized training and focused perinatal practice patterns.
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>Primary Care Integration:</strong> FPs and NPs provide foundational prenatal 
                care, with NPs showing rapid workforce expansion to meet growing demand.
              </p>
              <p style={{ marginBottom: '0' }}>
                <strong>Team-Based Approach:</strong> PAs complement physician care with lower but 
                consistent patient volumes, supporting comprehensive service delivery.
              </p>
            </div>
          </div>
        </TwoColumnLayout>

        <InsightBox type="urgent">
          <InsightTitle>Workforce Sustainability Concerns</InsightTitle>
          <p style={{ margin: 0, color: '#991b1b' }}>
            While overall workforce growth is positive, the <strong>stagnant OBGYN numbers</strong> combined with 
            projected national shortages could create bottlenecks for complex perinatal care. Strategic investments 
            in specialist recruitment and retention are essential for maintaining CHC service comprehensiveness.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Policy Implications & Future Directions</SectionTitle>
        
        <PolicySection>
          <h4 style={{ color: '#0f766e', marginTop: 0 }}>Workforce Development Priorities</h4>
          <PolicyList>
            <li>Targeted OBGYN recruitment and retention incentives for CHC settings</li>
            <li>Nurse practitioner training program expansion with perinatal specialization tracks</li>
            <li>Family physician obstetric skills maintenance and continuing education support</li>
            <li>Physician assistant perinatal care competency development programs</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#0f766e', marginTop: 0 }}>Extended Coverage Implementation</h4>
          <PolicyList>
            <li>Workforce planning for 12-month postpartum Medicaid coverage expansion</li>
            <li>Behavioral health specialist integration for comprehensive postpartum care</li>
            <li>Telehealth infrastructure investment to sustain remote care capabilities</li>
            <li>Care coordination protocols for extended enrollment periods</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#0f766e', marginTop: 0 }}>Transforming Maternal Health (TMaH) Model Integration</h4>
          <PolicyList>
            <li>Doula and midwife integration pathways within CHC workforce models</li>
            <li>Medicaid reimbursement framework development for expanded provider types</li>
            <li>Rural CHC partnership strategies for comprehensive maternity services</li>
            <li>Community health worker training for perinatal care support roles</li>
          </PolicyList>
        </PolicySection>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Resources & Methodology</SectionTitle>
        <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            <strong>Data Source:</strong> Transformed Medicaid Statistical Information System (T-MSIS) 
            Analytical File (TAF) and National Plan and Provider Enumeration System (NPPES), 2016-2021.
          </p>
          <p>
            <strong>Sample:</strong> 1,280 Community Health Centers across 28 states plus DC with complete 
            workforce and enrollment data throughout the study period.
          </p>
          <p>
            <strong>Study Design:</strong> Longitudinal workforce analysis using CHC-specific provider 
            identifiers and Medicaid claims data for pregnant and postpartum enrollee care.
          </p>
          <p>
            <strong>Key Metrics:</strong> Annual provider counts by specialty, patient volume per provider, 
            telehealth utilization patterns, and workforce growth rates by provider type.
          </p>
          <p>
            <strong>Published:</strong> Journal of Primary Care & Community Health, 2025.
          </p>
        </div>
      </ContentSection>
    </NewsletterContainer>
  );
};

export default CHCWorkforceNewsletter;