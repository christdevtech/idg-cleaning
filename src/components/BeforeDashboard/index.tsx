import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import Link from 'next/link'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      <div className={`${baseClass}__actions`}>
        <Link
          href="/"
          target="_blank"
          className="btn btn--style-primary btn--size-medium"
          style={{ textDecoration: 'none' }}
        >
          Home Page
        </Link>
        <Link
          href="/services"
          target="_blank"
          className="btn btn--style-secondary btn--size-medium"
          style={{ textDecoration: 'none' }}
        >
          Services
        </Link>
        <Link
          href="/posts"
          target="_blank"
          className="btn btn--style-secondary btn--size-medium"
          style={{ textDecoration: 'none' }}
        >
          Posts
        </Link>
      </div>
    </div>
  )
}

export default BeforeDashboard
