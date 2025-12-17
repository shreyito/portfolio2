const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "AI & Automation Systems",
    desc:
      "Building AI-driven agents, chatbots, and automated workflows using LLMs, APIs, and orchestration tools like n8n.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Secure Backend Development",
    desc:
      "Designing secure, scalable backend systems with Flask, REST APIs, IAM/IGA workflows, and SCIM integrations.",
  },
  {
    imgPath: "/images/time.png",
    title: "Leadership & Execution",
    desc:
      "Leading technical teams, organizing developer events, and delivering high-impact solutions on time with quality.",
  },
];

const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div className="mx-auto grid-3-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-8 flex flex-col gap-4"
        >
          <div className="size-14 flex items-center justify-center rounded-full">
            <img src={imgPath} alt={title} />
          </div>

          <h3 className="text-white text-2xl font-semibold mt-2">
            {title}
          </h3>

          <p className="text-white-50 text-lg">
            {desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
