import TitleHeader from "../components/TitleHeader";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Resume"
          sub="📄 View & Download My Resume"
        />

        <div className="mt-16 flex flex-col items-center gap-8">
          {/* Resume Viewer */}
          <div className="w-full max-w-5xl h-[80vh] card-border rounded-xl overflow-hidden">
            <iframe
              src="/resume.pdf"
              title="Resume Viewer"
              className="w-full h-full"
            />
          </div>

          {/* Download Button */}
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 rounded-lg bg-white text-black font-semibold hover:scale-105 transition-transform"
          >
            ⬇️ Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
