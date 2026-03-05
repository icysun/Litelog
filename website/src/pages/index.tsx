import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    icon: '⚡',
    title: 'Ridiculously Fast',
    description: 'Async Go goroutines + SQLite WAL mode. Handles thousands of logs per second at ~40MB RAM.',
  },
  {
    icon: '📦',
    title: 'Single Binary',
    description: 'No containers. No config files. One binary that runs anywhere — Mac, Linux, Raspberry Pi, Docker.',
  },
  {
    icon: '🔍',
    title: 'SQL Query Engine',
    description: 'Query your logs with standard SQL directly from the terminal. Group, filter, aggregate — all local.',
  },
  {
    icon: '🌊',
    title: 'Real-Time Streaming',
    description: 'Stream live logs with litelog tail. Filter by service or level as your app runs.',
  },
  {
    icon: '📊',
    title: 'Terminal Dashboard',
    description: 'htop-style live dashboard showing logs/sec, error rates, top services and recent errors.',
  },
  {
    icon: '🗄️',
    title: 'Zero Configuration',
    description: 'Run litelog start and you have a full logging stack. Database is created automatically.',
  },
];

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="LiteLog" description="Centralized logging without the infrastructure.">
      <main>
        {/* Hero */}
        <div className="hero">
          <div className="container" style={{ textAlign: 'center' }}>
            <img src="img/logo.png" alt="LiteLog" className="hero-logo" />
            <h1 className="hero__title">LiteLog</h1>
            <p className="hero__subtitle">
              Centralized logging without the infrastructure.<br />
              The SQLite of logging systems.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="button button--primary button--lg" to="/docs/quick-start">
                Get Started →
              </Link>
              <Link className="button button--secondary button--lg" href="https://github.com/yashnaiduu/Litelog">
                View on GitHub
              </Link>
            </div>

            {/* Install snippet */}
            <div style={{ marginTop: '2.5rem', display: 'inline-block', textAlign: 'left' }}>
              <pre style={{
                background: '#010409',
                border: '1px solid rgba(4,181,117,0.3)',
                borderRadius: '8px',
                padding: '1rem 1.5rem',
                fontSize: '0.95rem',
                color: '#04b575',
              }}>
                <code>
                  git clone https://github.com/yashnaiduu/Litelog.git{'\n'}
                  cd Litelog && go build -o litelog cmd/litelog/main.go{'\n'}
                  ./litelog start
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container" style={{ padding: '4rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>Why LiteLog?</h2>
          <div className="row" style={{ gap: '1rem 0' }}>
            {features.map((f) => <Feature key={f.title} {...f} />)}
          </div>
        </div>

        {/* Benchmarks */}
        <div style={{ background: 'rgba(4,181,117,0.04)', padding: '4rem 0' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>Benchmarks</h2>
            <div className="row">
              <div className="col col--6">
                <h3>RAM Usage</h3>
                <table className="benchmark-table" style={{ width: '100%' }}>
                  <thead><tr><th>Tool</th><th>RAM</th></tr></thead>
                  <tbody>
                    <tr><td>ELK Stack</td><td>2GB+</td></tr>
                    <tr><td><strong style={{ color: '#04b575' }}>LiteLog</strong></td><td><strong style={{ color: '#04b575' }}>~40MB</strong></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="col col--6">
                <h3>Startup Time</h3>
                <table className="benchmark-table" style={{ width: '100%' }}>
                  <thead><tr><th>Tool</th><th>Time</th></tr></thead>
                  <tbody>
                    <tr><td>Elasticsearch</td><td>~30s</td></tr>
                    <tr><td><strong style={{ color: '#04b575' }}>LiteLog</strong></td><td><strong style={{ color: '#04b575' }}>&lt;1s</strong></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 style={{ fontSize: '2rem' }}>Ready to ditch the heavy stack?</h2>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>One binary. Zero config. Full power.</p>
          <Link className="button button--primary button--lg" to="/docs/quick-start">
            Read the Docs →
          </Link>
        </div>
      </main>
    </Layout>
  );
}
