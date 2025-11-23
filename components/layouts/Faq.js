'use client';
import { useState } from 'react';
import Heading from '../ui/Heading';

const Faq = ({ type = 'interior' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const interiorFaqs = [
    {
      question: "How much should it cost to paint the interior of a 2000 sq ft house?",
      answer: "The cost depends on wall height, number of rooms, and paint type. On average, painting a 2000 sq ft home may range from moderate to higher budgets based on prep work and coats. Using Middler's calculator gives you a closer estimate for your home."
    },
    {
      question: "How much paint for a 1000 sq ft house interior?",
      answer: "Most 1000 sq ft homes need several gallons for two coats, depending on wall conditions and color changes. Our calculator helps you see how much paint and labor your project may require."
    },
    {
      question: "How much should I charge to paint a 20x20 room?",
      answer: "A 20x20 room usually needs multiple gallons of paint and a few hours of labor. The price depends on ceiling height, wall repairs, and coats. Enter your room size in our tool for an exact estimate."
    },
    {
      question: "How much does it cost to paint a 3 bedroom house interior?",
      answer: "A 3-bedroom home often ranges widely in price depending on square footage, number of coats, ceiling height, and extra areas like trims and doors. The calculator helps you understand your expected total cost."
    },
    {
      question: "How much cost to paint a room?",
      answer: "Room painting prices vary based on size and paint type, but our calculator gives you a clear estimate in seconds. You can enter any room size and get an accurate cost range instantly"
    }
  ];

  const exteriorFaqs = [
    {
      question: "How do you calculate exterior painting cost?",
      answer: "We calculate cost based on home size, number of stories, paint type, wall condition, and the amount of prep work needed. Middler's calculator uses these details to give you a quick and clear estimate."
    },
    {
      question: "How much exterior paint for a 2000 square foot house?",
      answer: "A 2000 sq ft house usually needs 10–18 gallons of paint, depending on the number of coats, texture of the walls, and paint brand."
    },
    {
      question: "How much to paint a 1500 sq ft house exterior near me?",
      answer: "Prices depend on your location, paint quality, and home condition. Use our calculator to get a fast estimate for your area."
    },
    {
      question: "Why is exterior house painting so expensive?",
      answer: "Exterior painting takes time, skill, and high-quality materials. It also includes cleaning, repairs, priming, and safety steps. The cost covers labor, paint, tools, and long-lasting protection for your home."
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