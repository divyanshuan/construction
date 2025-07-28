import React from "react";

const CommunitySection = () => {
  return (
    <section
      id="community"
      className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Strengthening Communities
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Collaborating with Gram Panchayats and homeowners to implement
          earthquake-resistant practices and spread awareness about safe
          construction.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-left">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Community Engagement
            </h3>
            <p className="text-gray-600">
              Direct interaction with Gram Pradhans and homeowners ensures the
              successful implementation of safety practices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-left">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Knowledge Dissemination
            </h3>
            <p className="text-gray-600">
              We educate through hands-on assistance, visual content, and local
              language material to make an impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
