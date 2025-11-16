'use client';
import { useState } from 'react';
import Heading from '../ui/Heading';

const Faq = ({ type = 'interior' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const interiorFaqs = [
    {
      question: "What is the average cost to paint interior walls per square foot?",
      answer: "Most professional painters charge between $1.00-$3.00 per sq ft for interior wall painting. Rates vary by region, room condition, and paint type—premium finishes command the higher end of the range."
    },
    {
      question: "How do I calculate paint quantity for interior rooms?",
      answer: "Calculate total wall area by measuring wall perimeter × ceiling height, then subtract door/window openings. Divide by your paint's coverage rate (typically 350-400 sq ft per gallon). Add 10% extra for touch-ups."
    },
    {
      question: "What factors affect interior painting costs?",
      answer: "Key factors include room size, ceiling height, wall condition, paint quality, number of coats needed, trim work, and local labor rates. Textured walls and multiple colors increase costs."
    },
    {
      question: "How long does interior painting take?",
      answer: "A typical room takes 1-2 days including prep work. Whole house interiors usually take 3-7 days depending on size, condition, and detail work required."
    },
    {
      question: "Do I need primer for interior walls?",
      answer: "Primer is recommended when changing colors dramatically, painting over stains, or using high-quality paint on new drywall. Many modern paints include primer for light color changes."
    },
    {
      question: "What's included in professional interior painting?",
      answer: "Professional services typically include surface preparation, priming (if needed), paint application, trim work, cleanup, and materials. Some contractors charge extra for extensive prep work."
    }
  ];

  const exteriorFaqs = [
    {
      question: "What is the average cost to paint exterior walls per square foot?",
      answer: "Professional exterior painting costs range from $1.50-$4.00 per sq ft. Factors include surface material, condition, height, and paint quality. Multi-story homes and detailed trim work increase costs."
    },
    {
      question: "How do I calculate exterior paint coverage?",
      answer: "Measure total exterior wall area (length × height of each wall), subtract windows/doors, then divide by paint coverage (typically 300-400 sq ft per gallon). Add 15% extra for texture and touch-ups."
    },
    {
      question: "What affects exterior painting costs the most?",
      answer: "Major factors include home size, surface condition, paint quality, number of stories, architectural details, weather conditions, and local labor rates. Extensive prep work significantly increases costs."
    },
    {
      question: "How often should I paint my home's exterior?",
      answer: "Most exteriors need repainting every 7-10 years, but this varies by climate, paint quality, and surface material. Wood siding may need painting every 5-7 years, while fiber cement lasts longer."
    },
    {
      question: "What's the best time of year for exterior painting?",
      answer: "Late spring through early fall offers ideal conditions. Avoid painting in direct sunlight, high humidity, or when rain is expected within 24 hours. Temperature should be between 50-85°F."
    },
    {
      question: "Do exterior painting estimates include all materials?",
      answer: "Most professional estimates include paint, primer, brushes, rollers, and basic supplies. Extensive prep work, power washing, or repairs may be quoted separately."
    }
  ];

  const faqs = type === 'interior' ? interiorFaqs : exteriorFaqs;
  const title = type === 'interior' ? 'Interior Paint Calculator' : 'Exterior Paint Calculator';

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 lg:py-20">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="px-3 lg:px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
              <Heading
                heading={`Frequently Asked Questions About ${title}`}
                highlight="Questions"
                preheading="FAQ"
              />
              
              <div className="w-full max-w-4xl">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-6 px-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <span className="flex-shrink-0 ml-4">
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-200 ${
                            openIndex === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                      }`}
                    >
                      <div className="px-4 text-gray-600 text-base lg:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;