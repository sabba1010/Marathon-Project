import React from "react";

const TopTrainingTips = () => {
  const tips = [
    "Consistency is key — train regularly to build endurance.",
    "Stay hydrated before, during, and after training.",
    "Include rest days in your schedule to prevent injury.",
    "Maintain a balanced diet rich in carbs and proteins.",
    "Warm-up properly before every training session.",
    "Get enough sleep to allow your muscles to recover.",
  ];

  return (
    <section className="training-tips p-6 bg-white rounded shadow max-w-7xl mx-auto my-12">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Top Marathon Training Tips
      </h2>
      <ul className="list-disc list-inside space-y-3 text-gray-700 max-w-3xl mx-auto">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-lg">
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopTrainingTips;
