import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/404'
import AboutUs from './pages/Aboutus';
import Footer from './components/Footer';
import SolutionSection from './components/Solutions/Solutions';
import Integration from './pages/Integration';
import ContactUsPage from './pages/ContactUsPage';
import PricingPage from './pages/Pricing';
import SuccessStories from './pages/SuccessStories';
import ComparisonPage from './pages/ComparisonPage';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPage';
import Blogs from './pages/blogs';
import BlogPosts from './pages/blogPosts';
import Security from './pages/Security';
import ScrollToTop from './components/Helper/ScrollToTop';
import SmartCoach360Loader from './components/Loader';
export default function LandingPage() {
  return (
    <>
     <Router>
      <ScrollToTop/>
      <SmartCoach360Loader/>
    <Navbar/>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="about-us" element={<AboutUs/>}/>
        <Route path="solutions" element={<SolutionSection/>}/>
        <Route path="integrations" element={<Integration/>}/>
        <Route path="contact-us" element={<ContactUsPage/>}/>
        <Route path="pricing" element={<PricingPage/>}/>
        <Route path="success-stories" element={<SuccessStories/>}/>
        <Route path="comparison" element={<ComparisonPage/>}/>
        <Route path="terms-and-conditions" element={<TermsAndConditions/>}/>
        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="blogs" element={<Blogs/>}/>
        <Route path="/blogs/:slug" element={<BlogPosts />} /> 
        <Route path="/security" element={<Security />} /> 

   </Routes>
    </main>
    <Footer/>
    </Router>
    </>

  )
}
