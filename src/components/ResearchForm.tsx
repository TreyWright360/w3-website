/**
 * W3 Deep Research Discovery Form
 * 4-Section Multi-Step Form with Validation
 */

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FormData {
  // Section 1: Core Identity
  company_name: string;
  website_url: string;
  primary_usp: string;
  dream_outcome: string;
  brand_archetype: 'The Sage' | 'The Hero' | 'The Outlaw' | 'The Magician' | '';
  proof_assets: string[];

  // Section 2: Voice & Personality
  voice_persona: 'Support Specialist' | 'High-Energy Closer' | '';
  forbidden_phrases: string;
  bridge_question: string;

  // Section 3: Competitive Landscape
  competitor_1_name: string;
  competitor_1_website: string;
  competitor_2_name: string;
  competitor_2_website: string;
  competitor_3_name: string;
  competitor_3_website: string;
  competitor_friction: string;

  // Section 4: Deep Knowledge
  technical_constraints: string;

  // Contact Info
  contact_name: string;
  contact_email: string;
  contact_phone: string;
}

const initialFormData: FormData = {
  company_name: '',
  website_url: '',
  primary_usp: '',
  dream_outcome: '',
  brand_archetype: '',
  proof_assets: ['', '', ''],
  voice_persona: '',
  forbidden_phrases: '',
  bridge_question: '',
  competitor_1_name: '',
  competitor_1_website: '',
  competitor_2_name: '',
  competitor_2_website: '',
  competitor_3_name: '',
  competitor_3_website: '',
  competitor_friction: '',
  technical_constraints: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
};

export default function ResearchForm() {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle proof assets array
  const handleProofAssetChange = (index: number, value: string) => {
    const newProofAssets = [...formData.proof_assets];
    newProofAssets[index] = value;
    setFormData((prev) => ({ ...prev, proof_assets: newProofAssets }));
  };

  // Validate section
  const validateSection = (section: number): boolean => {
    switch (section) {
      case 1:
        return !!(
          formData.company_name &&
          formData.primary_usp &&
          formData.dream_outcome &&
          formData.brand_archetype
        );
      case 2:
        return !!(formData.voice_persona && formData.bridge_question);
      case 3:
        return !!(
          (formData.competitor_1_name || formData.competitor_1_website) &&
          formData.competitor_friction
        );
      case 4:
        return !!(formData.contact_name && formData.contact_email);
      default:
        return false;
    }
  };

  // Navigate sections
  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => Math.min(prev + 1, 4));
    } else {
      alert('Please fill in all required fields before continuing.');
    }
  };

  const prevSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 1));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSection(4)) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for Supabase
      const submissionData = {
        ...formData,
        proof_assets: formData.proof_assets.filter((url) => url.trim() !== ''),
        forbidden_phrases: formData.forbidden_phrases
          .split(',')
          .map((phrase) => phrase.trim())
          .filter((phrase) => phrase !== ''),
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('companies')
        .insert([submissionData])
        .select();

      if (error) throw error;

      console.log('Form submitted successfully:', data);

      // Trigger Python backend (optional - can also use Supabase webhook)
      if (process.env.NEXT_PUBLIC_BACKEND_URL) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/research/trigger`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company_id: data[0].id }),
        });
      }

      setSubmitStatus('success');
      setFormData(initialFormData);
      setCurrentSection(1);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render section
  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return <Section1 formData={formData} onChange={handleChange} onProofAssetChange={handleProofAssetChange} />;
      case 2:
        return <Section2 formData={formData} onChange={handleChange} />;
      case 3:
        return <Section3 formData={formData} onChange={handleChange} />;
      case 4:
        return <Section4 formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-navy mb-2" style={{ fontFamily: 'Nothing You Could Do' }}>
          W3 Deep Research Discovery
        </h1>
        <p className="text-slate text-lg">
          Get your $1,500 competitive intelligence report in 24 hours
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Core Identity', 'Voice & Personality', 'Competitive Landscape', 'Contact Info'].map((label, idx) => (
            <div
              key={idx}
              className={`text-sm ${
                idx + 1 === currentSection ? 'text-navy font-semibold' : 'text-slate'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-cream rounded-full overflow-hidden">
          <div
            className="h-full bg-navy transition-all duration-300"
            style={{ width: `${(currentSection / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-beige">
        {renderSection()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevSection}
            disabled={currentSection === 1}
            className="px-6 py-3 border-2 border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentSection < 4 ? (
            <button
              type="button"
              onClick={nextSection}
              className="px-6 py-3 bg-navy text-cream rounded-lg font-semibold hover:bg-slate transition-colors"
            >
              Next Section
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-navy text-cream rounded-lg font-semibold hover:bg-slate transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Research'}
            </button>
          )}
        </div>
      </form>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✅ Form submitted successfully! Your deep research will be ready in 24 hours. Check your email for updates.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ❌ Submission failed. Please try again or contact support.
        </div>
      )}
    </div>
  );
}

// Section Components
function Section1({ formData, onChange, onProofAssetChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy mb-4">Section 1: Core Identity</h2>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="FitFlow Nutrition"
        />
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">Website URL</label>
        <input
          type="url"
          name="website_url"
          value={formData.website_url}
          onChange={onChange}
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="https://fitflownutrition.com"
        />
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Primary USP (Unique Selling Proposition) <span className="text-red-500">*</span>
        </label>
        <textarea
          name="primary_usp"
          value={formData.primary_usp}
          onChange={onChange}
          required
          rows={3}
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="What is the ONE thing you do that your top 3 competitors cannot claim?"
        />
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Dream Outcome <span className="text-red-500">*</span>
        </label>
        <textarea
          name="dream_outcome"
          value={formData.dream_outcome}
          onChange={onChange}
          required
          rows={2}
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="In one sentence, what transformation does your customer experience?"
        />
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Brand Archetype <span className="text-red-500">*</span>
        </label>
        <select
          name="brand_archetype"
          value={formData.brand_archetype}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
        >
          <option value="">Select archetype...</option>
          <option value="The Sage">The Sage (Expert, Thoughtful)</option>
          <option value="The Hero">The Hero (Empowering, Bold)</option>
          <option value="The Outlaw">The Outlaw (Rebellious, Disruptive)</option>
          <option value="The Magician">The Magician (Transformative, Visionary)</option>
        </select>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">Proof Assets (Links to Case Studies/Reviews)</label>
        {formData.proof_assets.map((asset: string, idx: number) => (
          <input
            key={idx}
            type="url"
            value={asset}
            onChange={(e) => onProofAssetChange(idx, e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none mb-2"
            placeholder={`Proof asset ${idx + 1} URL`}
          />
        ))}
      </div>
    </div>
  );
}

function Section2({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy mb-4">Section 2: Voice & Personality</h2>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Voice Persona <span className="text-red-500">*</span>
        </label>
        <select
          name="voice_persona"
          value={formData.voice_persona}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
        >
          <option value="">Select persona...</option>
          <option value="Support Specialist">Support Specialist (Safe, Patient, Helpful)</option>
          <option value="High-Energy Closer">High-Energy Closer (Bold, Direct, Confident)</option>
        </select>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">Forbidden Phrases</label>
        <textarea
          name="forbidden_phrases"
          value={formData.forbidden_phrases}
          onChange={onChange}
          rows={3}
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="Terms or phrases your agent should NEVER mention (comma-separated)"
        />
        <p className="text-sm text-slate mt-1">Example: competitor names, industry jargon, specific terms</p>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Bridge Question <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="bridge_question"
          value={formData.bridge_question}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="What ONE question should the agent ask to qualify a lead?"
        />
      </div>
    </div>
  );
}

function Section3({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy mb-4">Section 3: Competitive Landscape</h2>

      {[1, 2, 3].map((num) => (
        <div key={num} className="p-4 bg-cream rounded-lg">
          <h3 className="font-semibold text-navy mb-3">Competitor {num}</h3>
          <div className="space-y-3">
            <input
              type="text"
              name={`competitor_${num}_name`}
              value={formData[`competitor_${num}_name` as keyof FormData]}
              onChange={onChange}
              className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
              placeholder="Competitor name"
            />
            <input
              type="url"
              name={`competitor_${num}_website`}
              value={formData[`competitor_${num}_website` as keyof FormData]}
              onChange={onChange}
              className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
              placeholder="https://competitor-website.com"
            />
          </div>
        </div>
      ))}

      <div>
        <label className="block text-navy font-semibold mb-2">
          Competitor Friction <span className="text-red-500">*</span>
        </label>
        <textarea
          name="competitor_friction"
          value={formData.competitor_friction}
          onChange={onChange}
          required
          rows={3}
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="What is the #1 complaint people have about your competitors?"
        />
      </div>
    </div>
  );
}

function Section4({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy mb-4">Section 4: Deep Knowledge & Contact</h2>

      <div>
        <label className="block text-navy font-semibold mb-2">Technical Constraints</label>
        <textarea
          name="technical_constraints"
          value={formData.technical_constraints}
          onChange={onChange}
          rows={4}
          className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
          placeholder="Non-negotiables (pricing, shipping times, legal disclaimers, etc.)"
        />
      </div>

      <div className="border-t-2 border-beige pt-6 mt-6">
        <h3 className="font-semibold text-navy mb-4">Contact Information</h3>

        <div>
          <label className="block text-navy font-semibold mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
            placeholder="Sarah Johnson"
          />
        </div>

        <div className="mt-4">
          <label className="block text-navy font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
            placeholder="sarah@fitflownutrition.com"
          />
        </div>

        <div className="mt-4">
          <label className="block text-navy font-semibold mb-2">Phone (Optional)</label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={onChange}
            className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:border-navy focus:outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
    </div>
  );
}
