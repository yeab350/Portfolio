export default function App() {
  return (
    <>
      <input type="checkbox" id="darkModeToggle" className="dark-mode-toggle" />

      <div className="page">
        <header>
          <nav className="navbar" aria-label="Primary">
            <h1>Yeab T. Mekasha</h1>

            <input type="checkbox" id="menu-toggle" className="menu-toggle" />

            <label htmlFor="menu-toggle" className="burger" aria-label="Open navigation menu">
              <span></span>
              <span></span>
              <span></span>
            </label>

            <ul className="nav-links" role="menu">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>

            <label className="toggle-switch" htmlFor="darkModeToggle" aria-label="Toggle dark mode">
              <span className="slider"></span>
            </label>
          </nav>
        </header>

        <main>
          <section className="hero reveal" id="home" aria-label="Intro">
            <div className="hero-bg" aria-hidden="true">
              <span className="blob b1" data-speed="0.03"></span>
              <span className="blob b2" data-speed="0.05"></span>
              <span className="blob b3" data-speed="0.04"></span>
            </div>

            <img
              src="/Images/Profile.jpg"
              alt="Profile picture of Yeab Mekasha"
              className="profile-img"
            />
            <h2 className="hero-title">
              Hi, I&apos;m <span className="accent">Yeab</span>
            </h2>
            <p className="hero-subtitle">
              Full‑stack Developer · Software Engineering Student
            </p>
            <div className="hero-ctas">
              <a href="/cv.html" className="cv-button">
                View CV
              </a>
            </div>
            <ul className="social-links-row" aria-label="Social links">
              <li>
                <a href="#contact" aria-label="Email">
                  Email
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub">
                  GitHub
                </a>
              </li>
            </ul>
          </section>

          <section className="skills reveal">
            <h2>Core Skills</h2>
            <div className="skills-grid" aria-label="Core skills list">
              <ul>
                <li>HTML, CSS, JavaScript</li>
                <li>React</li>
                <li>Node.js / Express</li>
                <li>TypeScript</li>
              </ul>
              <ul>
                <li>Git &amp; GitHub</li>
                <li>Flutter (Dart)</li>
                <li>Kotlin</li>
                <li>Nest.js &amp; Next.js</li>
              </ul>
            </div>
          </section>

          <section id="about" className="reveal">
            <article>
              <h2>About Me</h2>
              <p>
                I build web and mobile applications that solve real problems. 
                My work spans full-stack development with NestJS, Next.js, PostgreSQL, and Docker, 
                as well as mobile apps in Kotlin.
              </p>
              <p>
                Some of my projects include a multi-tenant platform, a MERN-based eCommerce site, 
                and a filter app for mobile. Through these, I’ve gained hands-on experience designing APIs, 
                managing data, and building systems that are both reliable and maintainable.
              </p>
              <p>
                I focus on clean, practical solutions and enjoy figuring out the best way to make things work.
              </p>
            </article>
          </section>

          <section className="reveal">
            <div className="split-grid split-grid--roomy">
              <article>
                <h2>Education</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Degree</th>
                      <th>Institution</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BSc in Software Engineering</td>
                      <td>HiLCoE School of Computer Science &amp; Technology</td>
                      <td>Expected January 2027</td>
                    </tr>
                    <tr>
                      <td>High School Diploma</td>
                      <td>Gibson Youth Academy</td>
                      <td>July 2021</td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <article>
                <h2>Languages</h2>
                <ol className="languages-list">
                  <li>English – Advanced</li>
                  <li>Amharic – Native</li>
                </ol>
              </article>
            </div>
          </section>

          <section className="reveal">
            <h2>Work Experience</h2>
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Company</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Android Developer (Intern)</td>
                  <td>IntelliVerse</td>
                  <td>Mar 2026 - Present</td>
                </tr>
                <tr>
                  <td>Freelance Web Designer</td>
                  <td>Self-Employed</td>
                  <td>2023 - Present</td>
                </tr>
                <tr>
                  <td>Data Entry Specialist</td>
                  <td>Swift Rides LLC</td>
                  <td>May 2025 – August 2025</td>
                </tr>
                <tr>
                  <td>Full-Stack Developer</td>
                  <td>Sweaven Solutions</td>
                  <td>January 2024 - April 2025</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="portfolio-main reveal" id="portfolio">
            <h2>Recent Projects</h2>
            <hr />
            <div className="portfolio-cards">
              <div className="portfolio-card">
                <h3>UI Store</h3>
                <p>
                  E-commerce platform for UI templates/components with user accounts and admin management.
                </p>
                <ul>
                  <li>Admin CRUD + order management</li>
                  <li>Auth + purchase history</li>
                  <li>Express + PostgreSQL</li>
                </ul>
              </div>

              <div className="portfolio-card">
                <h3>Coffee E-commerce Website</h3>
                <p>
                  Online coffee shop with product browsing, cart, and checkout.
                </p>
                <ul>
                  <li>Browse products + add to cart</li>
                  <li>Simple checkout flow</li>
                  <li>Responsive layout</li>
                </ul>
              </div>

              <div className="portfolio-card">
                <h3>Coffee Shop App (Flutter)</h3>
                <p>
                  Cross-platform companion app built with Flutter.
                </p>
                <ul>
                  <li>Reusable widgets + clean navigation</li>
                  <li>Responsive layouts</li>
                  <li>Maintainable code structure</li>
                </ul>
              </div>
            </div>

            <div className="portfolio-cards">
              <div className="portfolio-card">
                <h3>Portfolio Website</h3>
                <p>This responsive personal CV/portfolio site showcasing projects, skills, and contact details.</p>
                <ul>
                  <li>Dark/light mode + responsive layout</li>
                  <li>Built with React + Vite</li>
                </ul>
              </div>

              <div className="portfolio-card">
                <h3>UI/UX Wireframe</h3>
                <p>Mobile app wireframes focused on flow and usability.</p>
                <ul>
                  <li>Navigation flow + layout consistency</li>
                  <li>Fast iteration and feedback</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="reveal">
            <h2>Certifications</h2>
            <ul>
              <li>
                <strong>Flutter Masterclass - Your Complete Guide to App Development Certificate (Udemy)</strong> (
                <a
                  href="https://www.udemy.com/certificate/UC-c1e6aace-266f-4a64-a4b7-7c768cb23fe9/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate
                </a>
                )
              </li>
              <li>
                Verified Certificate of Nanodegree Program Completion – Programming Fundamentals (
                <a
                  href="https://www.udacity.com/certificate/e/7b7dc418-4dcd-11ef-a8ef-af08c2425f8e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate
                </a>
                )
              </li>
              <li>English Proficiency Certificate</li>
              <li>SAT</li>
            </ul>
          </section>

          <section className="reveal" id="contact">
            <div className="contact-container">
              <div className="contact-info">
                <h2>Get In Touch</h2>

                <div className="contact-grid">
                  <div className="contact-primary" aria-label="Direct contact">
                    <div className="info-item">
                      <i className="fas fa-envelope"></i>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=yeabtsegaye350@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        yeabtsegaye350@gmail.com
                      </a>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-phone"></i>
                      <a href="tel:+251988200866">+251 988 200 866</a>
                    </div>

                    <div className="social-links">
                      <div className="social-item">
                        <i className="fab fa-linkedin"></i>
                        <a
                          href="https://www.linkedin.com/in/yeab-tsegaye-25765724b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BpnLRywWuRcyz1FXh%2BnaprQ%3D%3D"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Yeab Tsegaye
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-social" aria-label="Social links">
                    <div className="social-links">
                      <div className="social-item">
                        <i className="fab fa-telegram"></i>
                        <a href="https://t.me/yeab350" target="_blank" rel="noreferrer">
                          @yeab350
                        </a>
                      </div>

                      <div className="social-item">
                        <i className="fab fa-twitter"></i>
                        <a href="https://twitter.com/yeab350" target="_blank" rel="noreferrer">
                          @yeab350
                        </a>
                      </div>

                      <div className="social-item">
                        <i className="fab fa-github"></i>
                        <a href="https://github.com/yeab350" target="_blank" rel="noreferrer">
                          @yeab350
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p id="footer-text">&copy; 2025 Yeab T. Mekasha</p>
        </footer>
      </div>
    </>
  );
}
