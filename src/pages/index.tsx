import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-slate-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
        </div>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                {siteConfig.title}
              </span>{' '}
              <span className="block text-primary xl:inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                技术博客
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              分享前端开发技术文章、工具资源，记录学习笔记和心得体会
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/docs/intro"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition duration-150 md:py-4 md:text-lg md:px-10"
                >
                  开始阅读
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="/blog"
                  className="w-full flex items-center justify-center px-8 py-3 border border-primary text-base font-medium rounded-md text-primary hover:text-white hover:bg-primary hover:border-primary transition duration-150 md:py-4 md:text-lg md:px-10"
                >
                  博客文章
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ImageCarousel() {
  const images = [
    {
      url: 'https://picsum.photos/800/400?random=1',
      title: '技术'
    },
    {
      url: 'https://picsum.photos/800/400?random=2',
      title: '编程'
    },
    {
      url: 'https://picsum.photos/800/400?random=3',
      title: '代码'
    },
    {
      url: 'https://picsum.photos/800/400?random=4',
      title: '开发'
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default function Home(): React.ReactElement {
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
      <ImageCarousel />
      {/* <div dangerouslySetInnerHTML={{ __html: ads }}></div> */}
      <hr />
      <div dangerouslySetInnerHTML={{ __html: ads2 }}></div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: ads }}></div>

      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  )
}
