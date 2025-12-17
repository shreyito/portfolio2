import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

/* ================= EXPERIENCE DATA ================= */
const expCards = [
  {
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Software Developer Intern – Ilantus Services",
    date: "May 2025 – July 2025",
    responsibilities: [
      "Assessed IAM/IGA processes to identify automation and compliance gaps.",
      "Designed agentic AI-driven IAM workflows using SailPoint IIQ and n8n.",
      "Developed an LLM-powered chatbot to streamline access requests, reducing tickets by 30%.",
      "Automated Joiner, Mover, and Leaver (JML) lifecycle workflows using SCIM APIs.",
      "Implemented access certification and role-mining automation using Playwright.",
    ],
  },
  {
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "UI/UX Developer Intern – Eko Hand",
    date: "January 2025 – April 2025",
    responsibilities: [
      "Designed and optimized user-centric interfaces using Figma.",
      "Analyzed user interaction metrics to identify usability improvements.",
      "Improved user retention by 25% through targeted UI enhancements.",
      "Translated analytics insights into actionable design decisions.",
    ],
  },
  {
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Vice-President – Mozilla Firefox Club, VIT Bhopal",
    date: "2024 – Present",
    responsibilities: [
      "Led and managed a 50+ member student developer community.",
      "Organized technical workshops, hackathons, and open-source events.",
      "Increased club engagement and participation by 40%.",
      "Coordinated with faculty, speakers, and sponsors for events.",
    ],
  },
];

const Experience = () => {
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />

        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div
                key={card.title}
                className="exp-card-wrapper timeline-card"
              >
                {/* LEFT: COMPANY IMAGE CARD */}
                <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    <div className="flex items-center justify-center h-full py-10">
                      <img
                        src={card.imgPath}
                        alt="Company"
                        className="max-w-[180px] max-h-[120px] object-contain grayscale hover:grayscale-0 transition duration-300"
                      />
                    </div>
                  </GlowCard>
                </div>

                {/* RIGHT: EXPERIENCE DETAILS */}
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>

                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                      </div>

                      <div>
                        <h1 className="font-semibold text-3xl">
                          {card.title}
                        </h1>
                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>

                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>

                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map((item, index) => (
                            <li key={index} className="text-lg">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
