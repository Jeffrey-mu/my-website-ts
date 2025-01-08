import React, { useState, useEffect } from 'react'
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

export default function App() {
  const [resourceData, setResourceData] = useState<ResourceDataModel[]>([])
  const [resourceDataType, setResourceDataType] = useState<ResourceTypeModel[]>(
    []
  )
  const [active, setActive] = useState<number>(1)
  useEffect(() => {
    getDataType()
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
      <section className="bg-white rounded-lg shadow-md overflow-hidden" key={item.id}>
        <div className="p-4 flex">
          <div className="w-8 h-8 flex-shrink-0">
            <img
              src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=128`}
              alt="site icon"
              className="w-full h-full object-contain"
              onError={(e) => {
                // 当图标加载失败时显示默认SVG
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
            >
              <path
                d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
                fill="#CBD5E1"
              />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <div className="font-medium text-gray-900">{item.title}</div>
            {item.description.length > 50 ? (
              <div className="text-gray-600 text-sm mt-1" title={item.description}>
                {item.description.slice(0, 50)}..
              </div>
            ) : (
              <div className="text-gray-600 text-sm mt-1">{item.description}</div>
            )}
          </div>
        </div>
        <div className="border-t px-4 py-3 flex justify-end space-x-4">
          <a href="#" className="text-gray-600 hover:text-red-500 flex items-center" target="_blank">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center" target="_blank">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
          </a>
          <a href={item.url} className="text-gray-600 hover:text-green-500 flex items-center" target="_blank">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
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
