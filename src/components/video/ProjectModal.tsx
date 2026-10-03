import { ShortFormProject } from "../../data/videoPortfolioData";

interface ProjectModalProps {
  project: ShortFormProject | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="relative w-full max-w-xl max-h-[90vh] bg-[#0d0d14] border border-white/15 rounded-3xl overflow-y-auto p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition z-20"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <div className="w-full aspect-[9/16] max-h-[480px] rounded-2xl overflow-hidden mb-6 bg-black border border-white/10 shadow-lg mx-auto">
          <video
            src={project.videoUrl}
            poster={project.thumbnail}
            controls
            autoPlay
            playsInline
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Info */}
        <div className="flex items-center justify-between gap-4 mb-3 border-b border-white/10 pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-violet-400 font-bold">
              {project.category} • {project.client}
            </span>
            <h2 className="text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
              {project.title}
            </h2>
          </div>
          {project.views && (
            <span className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-xs font-bold text-violet-300 font-mono">
              {project.views}
            </span>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div>
          <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2 font-mono">Software Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
