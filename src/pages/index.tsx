import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
// import 'antd/dist/antd.css'
// import 'antd/dist/antd.dark.css'
import styles from './index.module.css'
function buttonItem(options) {
  return (
    <>
      <div className={styles.button} key={options.url}>
        <Link className="button button--secondary button--lg" to={options.url}>
          {options.label}
        </Link>
      </div>
    </>
  )
}
const routes = [
  { label: '工作计划', url: 'workPlan' },
  // { label: '我的项目', url: 'myProject' },
  { label: 'tracking', url: 'tracking' },
]
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {routes.map((item, index) => buttonItem(item))}
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const ads = `<!--dp-->
  <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
  <script>
    window.googletag = window.googletag || {cmd: []};
    googletag.cmd.push(function() {
      googletag.defineSlot('/22985426034/dp', [300, 250], 'div-gpt-ad-1706626560916-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });
  </script>
  <!-- /22985426034/dp -->
  <div id='div-gpt-ad-1706626560916-0' style='min-width: 300px; min-height: 250px;'>
    <script>
      googletag.cmd.push(function() { googletag.display('div-gpt-ad-1706626560916-0'); });
    </script>
  </div>
  `
  const ads2 = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578177460190720"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-6578177460190720"
     data-ad-slot="1641167614"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
  return (
    <Layout
      title={`Hello from ${siteConfig.title}  IT技术笔记`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      {/* <div dangerouslySetInnerHTML={{ __html: ads }}></div> */}
      <hr />
      <div dangerouslySetInnerHTML={{ __html: ads2 }}></div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: ads }}></div>

      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  )
}
