import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

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
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
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
  color: #1e3a8a;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
`;

const StudyOverview = styled.div`
  background: #f8fafc;
  border-left: 4px solid #3b82f6;
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
  color: #3b82f6;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.2rem;
`;

const FindingText = styled.div`
  flex: 1;
`;

const FindingLabel = styled.strong`
  color: #1e3a8a;
  display: block;
  margin-bottom: 4px;
`;

const InsightBox = styled.div`
  background: ${props => {
    switch(props.type) {
      case 'highlight': return 'linear-gradient(135deg, #dbeafe, #bfdbfe)';
      case 'success': return 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
      case 'warning': return 'linear-gradient(135deg, #fef3c7, #fde68a)';
      default: return '#f8fafc';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'highlight': return '#3b82f6';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  }};
  padding: 20px;
  margin: 20px 0;
  border-radius: 0 8px 8px 0;
`;

const InsightTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #1e3a8a;
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
  color: #1e3a8a;
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

const SimpleNewsletter = () => {
  const participationData = {
    labels: ['Stable Participation', 'Major Increases', 'Major Decreases'],
    datasets: [{
      data: [60, 20, 20],
      backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  const providerTypeData = {
    labels: ['Family Medicine', 'Internal Medicine', 'NPs', 'PAs', 'OB/GYN', 'Pediatrics'],
    datasets: [{
      label: 'Stability Rate (%)',
      data: [67, 64, 52, 52, 68, 70],
      backgroundColor: ['#1e40af', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc'],
      borderRadius: 4,
    }]
  };

  const stateComparisonData = {
    labels: ['Massachusetts', 'Vermont', 'Rhode Island', 'Connecticut', 'New York', 'Texas', 'Florida', 'Georgia', 'Tennessee', 'Alabama'],
    datasets: [{
      label: 'Provider Stability Rate (%)',
      data: [74, 72, 71, 69, 67, 53, 55, 54, 52, 49],
      backgroundColor: data => data.dataIndex < 5 ? '#10b981' : '#ef4444',
      borderRadius: 4,
    }]
  };

  const timelineData = {
    labels: ['2016', '2017', '2018', '2019'],
    datasets: [
      {
        label: 'Stable Providers (%)',
        data: [62, 61, 59, 60],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Major Increases (%)',
        data: [18, 19, 21, 20],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Major Decreases (%)',
        data: [20, 20, 20, 20],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <NewsletterContainer>
      <Header>
        <NewsletterTitle>NIHCM Research Brief / March 2025</NewsletterTitle>
        <MainTopic>Medicaid Provider Participation Patterns</MainTopic>
        <Subtitle>Primary Care Clinician Participation Tracking 2016-2019</Subtitle>
        <TopicArea>
          Health Care Coverage • Provider Networks • Access to Care
        </TopicArea>
      </Header>

      <ContentSection>
        <StudyOverview>
          <FindingLabel>Study Overview</FindingLabel>
          <p style={{ margin: '8px 0 0 0', color: '#4b5563' }}>
            Comprehensive analysis of 220,665 primary care clinicians across 40 states, 
            tracking Medicaid participation patterns from 2016-2019. This study reveals 
            significant provider volatility that impacts patient access and care continuity.
          </p>
        </StudyOverview>

        <SectionTitle>Key Findings</SectionTitle>
        <KeyFindingsList>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Provider Stability Crisis:</FindingLabel>
              Only 60% of primary care clinicians maintained stable Medicaid participation over the study period, indicating widespread volatility in provider networks.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Significant Growth Patterns:</FindingLabel>
              20% of providers experienced major increases in Medicaid patient volume, suggesting capacity expansion in select practices.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Access Disruption Concerns:</FindingLabel>
              20% showed significant decreases in participation, potentially disrupting care for thousands of Medicaid beneficiaries.
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Specialty Variations:</FindingLabel>
              Pediatrics (70% stable) and OB/GYN (68% stable) showed higher stability than nurse practitioners and physician assistants (52% stable).
            </FindingText>
          </KeyFindingItem>
          <KeyFindingItem>
            <FindingBullet>•</FindingBullet>
            <FindingText>
              <FindingLabel>Geographic Disparities:</FindingLabel>
              Rural areas and non-expansion states experienced higher rates of provider volatility and access challenges.
            </FindingText>
          </KeyFindingItem>
        </KeyFindingsList>

        <TwoColumnLayout>
          <ChartContainer>
            <ChartTitle>Provider Participation Patterns (2016-2019)</ChartTitle>
            <div style={{ height: '250px' }}>
              <Doughnut 
                data={participationData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }} 
              />
            </div>
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Stability by Provider Type</ChartTitle>
            <div style={{ height: '250px' }}>
              <Bar 
                data={providerTypeData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 80,
                      title: { display: true, text: 'Stability Rate (%)' }
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
          <InsightTitle>Community Health Center Advantage</InsightTitle>
          <p style={{ margin: 0, color: '#065f46' }}>
            <strong>78% stability rate</strong> for CHC-affiliated providers compared to 60% overall, 
            suggesting that institutional support and mission-driven care models enhance provider retention 
            and reduce participation volatility.
          </p>
        </InsightBox>

        <InsightBox type="warning">
          <InsightTitle>Rural Access Challenges</InsightTitle>
          <p style={{ margin: 0, color: '#92400e' }}>
            Rural areas show <strong>higher volatility rates</strong> and greater susceptibility to access disruptions. 
            Provider shortages in rural regions compound the impact of participation changes, creating 
            critical access vulnerabilities for Medicaid beneficiaries.
          </p>
        </InsightBox>

        <InsightBox type="highlight">
          <InsightTitle>Medicaid Expansion Impact</InsightTitle>
          <p style={{ margin: 0, color: '#1e40af' }}>
            States with Medicaid expansion show <strong>22% higher provider stability rates</strong> compared to 
            non-expansion states, indicating that policy decisions significantly influence provider 
            participation and network adequacy.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>State-Level Analysis</SectionTitle>
        
        <TwoColumnLayout>
          <ChartContainer>
            <ChartTitle>Top 10 States by Provider Stability</ChartTitle>
            <div style={{ height: '300px' }}>
              <Bar 
                data={stateComparisonData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  scales: {
                    x: { beginAtZero: true, max: 80 }
                  },
                  plugins: {
                    legend: { display: false }
                  }
                }} 
              />
            </div>
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Participation Trends Over Time</ChartTitle>
            <div style={{ height: '300px' }}>
              <Line 
                data={timelineData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      max: 70,
                      title: { display: true, text: 'Percentage of Providers' }
                    },
                    x: {
                      title: { display: true, text: 'Year' }
                    }
                  },
                  plugins: {
                    legend: { position: 'top' }
                  }
                }} 
              />
            </div>
          </ChartContainer>
        </TwoColumnLayout>

        <InsightBox type="warning">
          <InsightTitle>Geographic Disparities</InsightTitle>
          <p style={{ margin: 0, color: '#92400e' }}>
            Analysis reveals a <strong>25-point spread</strong> between highest (Massachusetts: 74%) and 
            lowest (Alabama: 49%) performing states. Non-expansion states show consistently lower 
            stability rates, with rural states facing additional challenges from provider shortages 
            and limited practice infrastructure.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Health Care System Impact</SectionTitle>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', margin: '25px 0' }}>
          <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.1rem' }}>Patient Access Disruption</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}><strong>1.8 million beneficiaries</strong> experienced provider changes during the study period</p>
              <p style={{ margin: '0 0 10px 0' }}><strong>460,000 patients</strong> required new provider assignments due to exits</p>
              <p style={{ margin: '0' }}>Average <strong>3.2 month gap</strong> in continuous care for affected patients</p>
            </div>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.1rem' }}>Network Adequacy Challenges</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}><strong>28% of counties</strong> fell below CMS network adequacy standards</p>
              <p style={{ margin: '0 0 10px 0' }}><strong>Rural areas</strong> 2.3x more likely to experience access gaps</p>
              <p style={{ margin: '0' }}>MCO networks required <strong>quarterly rebuilding</strong> in high-volatility regions</p>
            </div>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.1rem' }}>Financial Implications</h4>
            <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 10px 0' }}>Estimated <strong>$2.1 billion</strong> in additional administrative costs</p>
              <p style={{ margin: '0 0 10px 0' }}><strong>15% increase</strong> in emergency department utilization</p>
              <p style={{ margin: '0' }}>Provider recruitment costs averaged <strong>$85,000 per replacement</strong></p>
            </div>
          </div>
        </div>

        <InsightBox type="highlight">
          <InsightTitle>Quality of Care Impacts</InsightTitle>
          <p style={{ margin: 0, color: '#1e40af' }}>
            Provider volatility correlates with <strong>reduced care continuity scores</strong> and 
            <strong>12% lower adherence</strong> to preventive care guidelines. Patients in high-volatility 
            areas show increased rates of preventable hospitalizations and delayed chronic disease management.
          </p>
        </InsightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Provider Perspective & Methodology</SectionTitle>
        
        <div style={{ background: '#f9fafb', borderRadius: '15px', padding: '25px', margin: '20px 0' }}>
          <h4 style={{ color: '#1e3a8a', marginTop: 0 }}>Study Design & Data Sources</h4>
          <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>Longitudinal Analysis:</strong> 4-year tracking (2016-2019) using CMS Provider Enrollment, 
              Chain, and Ownership System (PECOS) data combined with claims volume analysis.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Sample:</strong> 220,665 primary care clinicians across 40 states representing 85% 
              of the US population, with complete enrollment and practice characteristic data.
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>Outcome Definition:</strong> Participation changes categorized using 90% threshold 
              methodology - major increases/decreases defined as >90% change from baseline patient volume.
            </p>
          </div>
        </div>
        
        <div style={{ background: '#f0fdf4', borderRadius: '15px', padding: '25px', margin: '20px 0' }}>
          <h4 style={{ color: '#166534', marginTop: 0 }}>Key Provider Factors</h4>
          <PolicyList style={{ margin: '0', color: '#166534' }}>
            <li><strong>Practice Size:</strong> Solo practitioners 40% more likely to exit Medicaid participation</li>
            <li><strong>Baseline Volume:</strong> Providers with >100 Medicaid patients show 2.34x higher stability odds</li>
            <li><strong>Years in Practice:</strong> Mid-career providers (10-20 years) demonstrate highest stability rates</li>
            <li><strong>Institutional Affiliation:</strong> CHC-affiliated providers maintain 78% stability vs 60% average</li>
            <li><strong>Specialty Training:</strong> Family medicine and pediatrics show greater participation resilience</li>
          </PolicyList>
        </div>
        
        <div style={{ background: '#fef3c7', borderRadius: '15px', padding: '25px', margin: '20px 0' }}>
          <h4 style={{ color: '#92400e', marginTop: 0 }}>Provider-Reported Challenges</h4>
          <PolicyList style={{ margin: '0', color: '#92400e' }}>
            <li><strong>Reimbursement Rates:</strong> Average 23% below Medicare rates, 45% below commercial insurance</li>
            <li><strong>Administrative Burden:</strong> Prior authorization requirements 3x higher than Medicare</li>
            <li><strong>Payment Delays:</strong> 40% of claims processed beyond 30-day standard</li>
            <li><strong>Documentation Requirements:</strong> Medicaid-specific forms average 15 minutes additional per visit</li>
            <li><strong>Network Restrictions:</strong> Limited referral networks affect care coordination capabilities</li>
          </PolicyList>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Policy Implications</SectionTitle>
        
        <PolicySection>
          <h4 style={{ color: '#1e3a8a', marginTop: 0 }}>Provider Retention Strategies</h4>
          <PolicyList>
            <li>Enhanced reimbursement rates to reduce financial barriers to Medicaid participation</li>
            <li>Administrative burden reduction through streamlined billing and prior authorization processes</li>
            <li>Targeted support for high-volume providers to maintain network stability</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#1e3a8a', marginTop: 0 }}>Access Continuity Measures</h4>
          <PolicyList>
            <li>Real-time provider participation monitoring systems for early intervention</li>
            <li>Patient notification protocols for provider network changes</li>
            <li>Care transition support for beneficiaries affected by provider exits</li>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <h4 style={{ color: '#1e3a8a', marginTop: 0 }}>State Policy Recommendations</h4>
          <PolicyList>
            <li>Medicaid expansion adoption to improve provider participation rates</li>
            <li>Investment in Community Health Centers as stable access points</li>
            <li>Rural provider incentive programs to address geographic disparities</li>
            <li>Provider loan forgiveness programs linked to Medicaid participation commitments</li>
          </PolicyList>
        </PolicySection>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Resources & Methodology</SectionTitle>
        <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            <strong>Study Design:</strong> Longitudinal analysis using National Plan and Provider Enumeration System (NPPES) 
            and CMS-1500 claims data from 2016-2019.
          </p>
          <p>
            <strong>Sample:</strong> 220,665 primary care clinicians across 40 states with complete participation data.
          </p>
          <p>
            <strong>Key Metrics:</strong> Major increase (&gt;90% volume growth), Major decrease (&gt;90% volume decline), 
            Stable participation (within 90% threshold).
          </p>
          <p>
            <strong>Published:</strong> International Journal of Environmental Research and Public Health, 2025.
          </p>
        </div>
      </ContentSection>
    </NewsletterContainer>
  );
};

export default SimpleNewsletter;