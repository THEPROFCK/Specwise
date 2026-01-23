import React from 'react'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import Features from '@/components/Features'
import CTA from '@/components/CTA'


export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  )
}
