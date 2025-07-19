import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">About DevPulse</h1>
        <p className="text-base-content mb-6 text-lg">
          DevPulse is a modern web application built to help developers connect,
          share, and grow together.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="badge badge-outline badge-primary text-lg p-3">
              React.js
            </div>
            <div className="badge badge-outline badge-primary text-lg p-3">
              Tailwind CSS
            </div>
            <div className="badge badge-outline badge-primary text-lg p-3">
              DaisyUI
            </div>
            <div className="badge badge-outline badge-secondary text-lg p-3">
              Node.js
            </div>
            <div className="badge badge-outline badge-secondary text-lg p-3">
              Express.js
            </div>
            <div className="badge badge-outline badge-secondary text-lg p-3">
              MongoDB
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">About the Developer</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-primary">Shresth</h3>
              <p className="text-base-content">
                Hi, I'm Shresth — a passionate full-stack developer who loves
                building efficient, scalable, and user-friendly web
                applications. DevPulse is a project I built to connect
                like-minded developers and showcase the power of the MERN stack
                with modern UI tools like DaisyUI and Tailwind.
              </p>
              <div className="mt-4">
                <div className="badge badge-accent p-3">
                  Full-Stack Developer
                </div>
                <div className="badge badge-info ml-2 p-3">MERN Stack</div>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="https://www.linkedin.com/in/shresth2725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Shresth2725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-base"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm text-neutral-content">
            Built with ❤️ by Shresth. Powered by the MERN Stack.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
