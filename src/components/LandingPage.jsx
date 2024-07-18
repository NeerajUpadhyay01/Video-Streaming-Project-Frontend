import React, { useState } from "react";
import { Link } from "react-router-dom";
import { terms, policies } from "../../Term&Policy";

function LandingPage() {
  const [isActive, setisActive] = useState(false);

  function handleClick() {
    setisActive(!isActive);
  }
  return (
    <div className="landingPage" onClick={handleClick}>
      <header className={isActive ? "active" : ""}>
        <span>
          <img src="/Designer (4).webp" alt="app-logo" />
          <img
            src="/icons8-menu-64.webp"
            id="menu"
            alt="menu-icon"
            onClick={handleClick}
          />
        </span>
        <nav>
          <a id="nav-item" href="#features" onClick={handleClick}>
            Features
          </a>
          <a id="nav-item" href="#FAQ" onClick={handleClick}>
            FAQs
          </a>
          <a id="nav-item" href="#contact" onClick={handleClick}>
            Contact US
          </a>
          <Link to="/login">
            <button id="loginButton">Login</button>
          </Link>
        </nav>
      </header>
      <main>
        <div className="intro">
          <div className="custom-shape-divider-bottom-1721021087">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div id="intro">
            <h2>
              Welcome to <span>BuzzTube</span>
            </h2>
            <p>
              We're revolutionizing the way you experience online content. Our
              platform combines the best of both worlds, offering you the
              immersive video streaming experience with the real-time social
              engagement. Let's create a profile and build your presence in the
              community.
            </p>
            <Link to="/register">
              <button>Create Profile</button>
            </Link>
          </div>
        </div>
        <div className="features" id="features">
          <img src="./video-library.webp" alt="" />
          <span>
            <h2>Extensive Video Library</h2>
            <p>
              Dive into a vast collection of videos, from educational content
              and entertainment to vlogs. Our easy-to-navigate interface ensures
              you find exactly what you're looking for.
            </p>
          </span>
          <img src="./interaction.webp" alt="" />
          <span>
            <h2>Engage with Content</h2>
            <p>
              Like, comment, and share your favorite videos. Our platform
              fosters interaction, allowing you to connect with creators and
              fellow viewers.
            </p>
          </span>
          <img src="./content-engagement.webp" alt="" />
          <span>
            <h2>Real-Time Interaction</h2>
            <p>
              With our integrated tweet functionality, you can share your
              thoughts, reactions, and updates instantly. Follow your favorite
              content creators, engage in trending topics, and join the
              conversation as it happens.
            </p>
          </span>
          <img src="./upload.webp" alt="" />
          <span>
            <h2>Create and Share</h2>
            <p>
              Share your content with the world. Whether you're a budding
              vlogger or an established creator, our user-friendly upload
              process makes it easy to share your videos.
            </p>
          </span>
        </div>
        <div className="FAQ" id="FAQ">
          <div className="custom-shape-divider-bottom-1721061459 shape1">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="custom-shape-divider-bottom-1721061459 shape2">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="Questions">
            <span>
              <h5>Q: How do I register?</h5>
              <p>
                A: You can register by clicking on the "Register" button on our
                homepage. You'll need to provide your fullname, create a
                username, email address, set a password, bio, avatar and cover
                image (optional).
              </p>
            </span>
            <span>
              <h5>Q: How do I upload a video?</h5>
              <p>
                A: To upload a video, click on the "avatar",go to "vidoes" click
                on "+" button in the bottom. Enter your video file, add a title
                and description, thumbnail and click "publish video" to upload.
              </p>
            </span>
            <span>
              <h5>Q: How do I post a tweet?</h5>
              <p>
                A: You can post a tweet by clicking on the "Tweet" button,
                typically located on the homepage or your profile page. Enter
                your message in the text box and click "Tweet" to post.
              </p>
            </span>
            <span>
              <h5>Q: How do I change my password?</h5>
              <p>
                A: To change your password, click on the "avatar", go to "view
                profile", select "Change Password," and follow the instructions.
                You'll need to enter your current password and then your new
                password.
              </p>
            </span>
            <span>
              <h5>Q: Why is my video taking a long time to upload?</h5>
              <p>
                A: Upload times can vary based on the size of your video file
                and the speed of your internet connection. If your upload is
                taking unusually long, try checking your connection or reducing
                the file size of your video.
              </p>
            </span>
            <span>
              <h5>Q: Can I livestream on BuzzTube?</h5>
              <p>A: No, you can not livestream on BuzzTube.</p>
            </span>
          </div>
        </div>
      </main>
      <footer>
        <div id="Terms">
          <span>
            <img src="./icons8-points-64.webp" alt="" />
            <h2>Terms of Service</h2>
          </span>
          <span>
            <span>
              <h3>User Accounts</h3>
              <h5 data-content={terms[1][1]}>Account Security</h5>
              <h5 data-content={terms[1][2]}>Account Termination</h5>
            </span>
            <span>
              <h3>Content and Conduct</h3>
              <h5 data-content={terms[2][1]}>User Content</h5>
              <h5 data-content={terms[2][2]}>Prohibited Content</h5>
              <h5 data-content={terms[2][3]}>User Conduct</h5>
            </span>
            <span>
              <h3>Intellectual Property</h3>
              <h5 data-content={terms[3][1]}>Our Content</h5>
              <h5 data-content={terms[3][2]}>Account Termination</h5>
            </span>
            <span>
              <h3>Disclaimers and Limitation of Liability</h3>
              <h5 data-content={terms[4][1]}>Disclaimers</h5>
              <h5 data-content={terms[4][2]}>Limitation of Liability</h5>
            </span>
          </span>
        </div>
        <div id="Policies">
          <span>
            <img src="./icons8-points-64.webp" alt="" />
            <h2>Privacy Policy</h2>
          </span>
          <span>
            <span>
              <h3>Information We Collect</h3>
              <h5 data-content={policies[1][1]}>Personal Information</h5>
              <h5 data-content={policies[1][2]}>Usage Data</h5>
              <h5 data-content={policies[1][3]}>Cookies</h5>
            </span>
            <span>
              <h3>How We Use Your Information</h3>
              <h5 data-content={policies[2][1]}>Provide Services</h5>
              <h5 data-content={policies[2][2]}>Communicate</h5>
              <h5 data-content={policies[2][3]}>Analyze and Improve</h5>
            </span>
            <span>
              <h3>Information Sharing</h3>
              <h5 data-content={policies[3][1]}>
                Third-Party Service Providers
              </h5>
              <h5 data-content={policies[3][2]}>Legal Requirements</h5>
            </span>
            <span>
              <h3>Your Rights</h3>
              <h5 data-content={policies[4][1]}>Access and Update</h5>
              <h5 data-content={policies[4][2]}>Delete</h5>
            </span>
          </span>
        </div>
        <div id="Note">
          <p>
            <h3>Note -</h3>We may update these Terms of Service and Privacy
            Policy from time to time. We will notify you of any changes by
            posting the new terms and policy on our platform. Your continued use
            of our services after any changes constitutes your acceptance of the
            new terms and policy.
          </p>
        </div>
        <div className="contact" id="contact">
          <h2>Contact Us</h2>
          <a href="#">
            <img src="./icons8-instagram-64.webp" alt="Instagram" />
          </a>
          <a href="#">
            <img src="./icons8-facebook-64.webp" alt="Facebook" />
          </a>
          <a href="#">
            <img src="./icons8-x-64.webp" alt="Twitter" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
