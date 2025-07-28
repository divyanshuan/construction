import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">About the Project</h2>
        <p className="mt-4 text-lg text-gray-600">
          The project aims to promote earthquake-resistant construction by
          directly engaging with house owners in rural Himachal. Unlike previous
          initiatives that focused on masons, this project ensures that owners
          themselves understand and adopt safe building practices.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
