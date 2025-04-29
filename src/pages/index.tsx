import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// Hero Section
function HeroSection() {
    return (
        <section className={clsx(styles.heroSection)}>
            <div className={clsx(styles.heroContent)}>
                <h1 className={clsx(styles.heroTitle)}>
                    Hookah: Webhook Routing Simplified
                </h1>
                <p className={clsx(styles.heroDescription)}>
                    Dynamically filter and route your webhooks with ease. Simple, powerful, and reliable.
                </p>
                <Link to="/docs/getting-started/quick-introduction" className={clsx(styles.heroButton)}>
                    Get Started
                </Link>
            </div>
        </section>
    );
}

// Main Page Component
export default function Home() {
    return (
        <Layout>
            <HeroSection/>
        </Layout>
    );
}
