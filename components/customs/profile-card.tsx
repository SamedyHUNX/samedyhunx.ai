import { X, Github, Mail, Twitter } from "lucide-react";

type ProfileCardProps = {
  image: string;
  name: string;
  description: string;
  gitHubLink: string;
  xLink: string;
  email: string;
};

export const ProfileCard = ({
  image,
  name,
  description,
  xLink,
  gitHubLink,
  email,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-8 py-16 bg-white border-gray-100">
      <div className="p-4 md:p-12 flex-1 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Profile Image */}
          <div className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-gray-100 shadow-lg">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">
              {name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 justify-center md:justify-start pt-4">
              {xLink && (
                <a
                  href={xLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all duration-200 shadow-md"
                  aria-label="X"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
              {gitHubLink && (
                <a
                  href={gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all duration-200 shadow-md"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all duration-200 shadow-md"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
