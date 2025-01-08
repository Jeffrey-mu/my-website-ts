import React, { useState, useEffect, useRef } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import style from './index.module.css'
import clsx from 'clsx'
import {
  getResourceData,
  getResourceType,
  ResourceDataModel,
  ResourceTypeModel,
} from '../../api/resource'

// 添加分享平台配置
const shareOptions = [
  {
    name: 'Twitter',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
      </svg>
    ),
    getShareUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 12a8 8 0 10-9.25 7.903v-5.59H8.719V12h2.031v-1.762c0-2.005 1.194-3.113 3.022-3.113.875 0 1.79.156 1.79.156V9.25h-1.008c-.994 0-1.304.617-1.304 1.25V12h2.219l-.355 2.313H13.25v5.59A8.002 8.002 0 0020 12z" />
      </svg>
    ),
    getShareUrl: (url: string) =>
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    getShareUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
]

export default function App() {
  const [resourceData, setResourceData] = useState<ResourceDataModel[]>([])
  const [resourceDataType, setResourceDataType] = useState<ResourceTypeModel[]>(
    []
  )
  const [active, setActive] = useState<number>(1)
  const [activeShareId, setActiveShareId] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getDataType()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveShareId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  async function getDataType() {
    let data = await getResourceType()
    setResourceDataType(data)
    getData()
  }
  async function getData() {
    let { result } = await getResourceData()
    setResourceData(result)
  }
  function handleMenu(id: number) {
    setActive(id)
  }
  function Menu() {
    return resourceDataType.map((item, index) => (
      <div
        onClick={() => handleMenu(item.id)}
        className={clsx(
          'px-4 py-2 cursor-pointer rounded-lg transition-colors',
          active === item.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
        )}
        key={item.id}
      >
        <p key={index}>{item.label}</p>
      </div>
    ))
  }
  function Card() {
    return resourceData.map((item) => (
      <section
        className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
        key={item.id}
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="p-5">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-50">
              <img
                src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=128`}
                alt="site icon"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'block'
                }}
              />
              <svg
                style={{ display: 'none' }}
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="p-2 text-gray-400"
              >
                <path
                  d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <a
            href={item.url}
            className="flex items-center justify-between px-5 py-3 bg-gray-50 text-sm text-gray-600 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-medium">访问网站</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    ))
  }
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className="container mx-auto px-4 py-8">
        {/* <div className="w-64 flex-shrink-0">{Menu()}</div> */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Card()}</div>
      </main>
    </Layout>
  )
}
