// FeaturesSection.js
import React from "react";

const features = [
  {
    title: "Community Engagement",
    description:
      "Collaborate with Gram Pradhans and local residents to implement safe construction practices.",
  },
  {
    title: "Education First",
    description:
      "Educate house owners with easy-to-understand IEC materials and field demonstrations.",
  },
  {
    title: "Cost Effective",
    description:
      "Even saving one house from collapse outweighs the total project cost.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-blue-50 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Key Features
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-blue-100"
            >
              <h3 className="text-2xl font-semibold text-blue-700">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
