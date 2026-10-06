/**
 * =======================================================
 * PORTFOLIO CLIENT JAVASCRIPT
 * Handles: Theme Toggle, Mobile Nav, ScrollSpy, Skills Animation,
 * Project Filters & Modals, Interactive AI Chat, Contact Form API
 * =======================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------
    // 1. NIGHT MODE & SYSTEM THEME DETECTION
    // -------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', colorSchemeQuery.matches ? 'dark' : 'light');
    }

    // Auto-update if user changes OS color scheme and has not set manual preference
    colorSchemeQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            htmlElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || (colorSchemeQuery.matches ? 'dark' : 'light');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // -------------------------------------------------------
    // 2. MOBILE NAVIGATION MENU DRAWER
    // -------------------------------------------------------
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        });

        // Close mobile drawer when clicking any link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // -------------------------------------------------------
    // 3. SCROLLSPY ACTIVE NAVIGATION LINK HIGHLIGHTING
    // -------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveNav() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightActiveNav, { passive: true });

    // -------------------------------------------------------
    // 4. ANIMATED SKILLS PROGRESS BARS VIA INTERSECTION OBSERVER
    // -------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress');
    if ('IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.style.getPropertyValue('--skill-width');
                    bar.style.width = targetWidth || '90%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    } else {
        // Fallback
        skillBars.forEach(bar => {
            bar.style.width = bar.style.getPropertyValue('--skill-width') || '90%';
        });
    }

    // -------------------------------------------------------
    // 5. PROJECTS CATEGORY FILTERING
    // -------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------
    // 6. PROJECT DETAILS MODAL POPUP
    // -------------------------------------------------------
    const projectData = {
        'project-1': {
            title: 'Distributed Task Queue Scheduler',
            subtitle: 'High-Throughput Cloud Job Orchestrator',
            tags: ['Go', 'Redis', 'gRPC', 'Docker', 'AWS'],
            metrics: 'Handles 50M+ tasks/day &bull; 99.99% Availability &bull; Sub-15ms Latency',
            description: 'Designed a fault-tolerant, horizontally scalable job scheduler that dynamically allocates compute resources across Kubernetes clusters. Features distributed leader election, atomic task locks, and dead-letter queue retry mechanisms.',
            features: [
                'Cron & Interval scheduling with sub-millisecond precision',
                'Distributed lock management with Redis Redlock algorithm',
                'Prometheus telemetry exporter with Grafana visual metrics',
                'Automatic worker auto-scaling during traffic spikes'
            ],
            githubUrl: 'https://github.com',
            demoUrl: '#'
        },
        'project-2': {
            title: 'Cloud Code IDE & Compiler',
            subtitle: 'Collaborative Real-time Browser Environment',
            tags: ['React', 'TypeScript', 'WebAssembly', 'Node.js', 'Docker'],
            metrics: 'Supports 12+ Languages &bull; Real-time AST Parsing &bull; Zero-install setup',
            description: 'A responsive in-browser software development environment featuring live syntax parsing, sandbox execution containers via Docker, and instant WebSocket pair-programming collaboration.',
            features: [
                'Monaco Editor integration with custom syntax language servers',
                'Sandboxed execution in ephemeral Docker containers',
                'Operational Transformation for concurrent multi-user typing',
                'Export to GitHub Repository and one-click cloud deployment'
            ],
            githubUrl: 'https://github.com',
            demoUrl: '#'
        },
        'project-3': {
            title: 'AI Knowledge Graph API',
            subtitle: 'Vector Semantic Search & Documentation Indexer',
            tags: ['Python', 'FastAPI', 'Pinecone', 'PyTorch', 'OpenAI'],
            metrics: 'Sub-40ms Vector Queries &bull; 10M+ Node Index &bull; GraphQL API',
            description: 'Semantic vector search engine and knowledge graph for engineering documentation and codebase exploration. Indexes code snippets, pull request discussions, and architectural decision records.',
            features: [
                'Contextual embeddings using PyTorch transformer models',
                'Hybrid vector + BM25 keyword search ranking',
                'FastAPI backend with automated OpenAPI & GraphQL schemas',
                'Incremental live ingestion from GitHub webhooks'
            ],
            githubUrl: 'https://github.com',
            demoUrl: '#'
        },
        'project-4': {
            title: 'Telemetry & APM Monitor',
            subtitle: 'Real-time System Metrics & Alerting Engine',
            tags: ['Next.js', 'PostgreSQL', 'WebSockets', 'Tailwind', 'Go'],
            metrics: 'Ingests 100k events/sec &bull; WebGL Live Charts &bull; Instant Alerts',
            description: 'An enterprise monitoring suite designed to visualize distributed traces, server health, CPU/RAM utilization, and error stack rates with zero client-side lag.',
            features: [
                'GPU-accelerated WebGL telemetry charts for millions of points',
                'Custom threshold alerting via Slack, Discord, and Webhooks',
                'Anomaly detection algorithms for early warning spikes',
                'Role-based access control with SSO authentication'
            ],
            githubUrl: 'https://github.com',
            demoUrl: '#'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data || !modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="modal-project-view">
                <div class="modal-title-group">
                    <span class="pixel-badge" style="margin-bottom: 0.5rem;">STATUS: PRODUCTION READY</span>
                    <h2 id="modal-project-title" style="font-size: 1.6rem; font-weight: 700; margin-bottom: 0.3rem;">${data.title}</h2>
                    <p style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 1rem;">${data.subtitle}</p>
                </div>

                <div class="pixel-stats-hud" style="margin-bottom: 1.25rem;">
                    <span style="font-family: var(--font-pixel); font-size: 0.65rem; color: var(--accent-secondary);">[ KEY PERFORMANCE METRICS ]</span>
                    <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-primary); margin-top: 0.3rem;">${data.metrics}</p>
                </div>

                <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">${data.description}</p>

                <h4 style="font-family: var(--font-pixel); font-size: 0.72rem; color: var(--accent-primary); margin-bottom: 0.6rem;">CORE ARCHITECTURAL FEATURES:</h4>
                <ul style="padding-left: 1.2rem; font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.5rem;">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>

                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                    ${data.tags.map(t => `<span class="pixel-tags"><span>${t}</span></span>`).join('')}
                </div>

                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn pixel-btn pixel-btn-primary">
                        <i class="fa-brands fa-github"></i> <span>VIEW REPOSITORY</span>
                    </a>
                    <button class="btn pixel-btn pixel-btn-secondary" onclick="document.getElementById('project-modal').classList.remove('open')">
                        <span>CLOSE WINDOW</span>
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach click listeners to cards and modal close
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent if clicking directly on an external link
            if (e.target.closest('a') && !e.target.closest('.open-modal-link')) {
                return;
            }
            e.preventDefault();
            const projectId = card.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeProjectModal();
        }
    });

    // -------------------------------------------------------
    // 7. INTERACTIVE AI CHAT INTERFACE
    // -------------------------------------------------------
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatClearBtn = document.getElementById('chat-clear-btn');
    const chatChips = document.querySelectorAll('.chip-btn');

    // Simulated Knowledge Base for AI Alex
    const aiKnowledge = {
        stack: "My primary tech stack includes TypeScript, React, Next.js, Node.js, Python (FastAPI/Django), Go, PostgreSQL, Redis, Docker, Kubernetes, and AWS.",
        projects: "My top featured projects include the Distributed Task Queue Scheduler (Go + Redis), the Cloud Code IDE (React + WebAssembly), and the AI Knowledge Graph API (FastAPI + Pinecone). Check out the Projects section for deep-dive technical specs!",
        hire: "Yes! I am actively open to senior full-stack engineering roles, backend systems architecture positions, and high-impact technical consulting. You can use the contact form below or email me directly at alex.morgan@example.com.",
        contact: "You can reach me via email at alex.morgan@example.com, or message me on LinkedIn/GitHub via the footer links. Feel free to use the transmission form below!",
        experience: "I have 6+ years of software engineering experience leading distributed squads, architecting cloud systems, and scaling applications to millions of active users.",
        default: "That's a great question! As an AI representation of Alex Morgan, I can share that Alex is passionate about clean code, scalable distributed systems, and modern UI engineering. Feel free to ask about tech stack, projects, career timeline, or hiring availability!"
    };

    function appendMessage(sender, text) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
        
        const avatarIcon = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        msgDiv.innerHTML = `
            <div class="message-avatar">${avatarIcon}</div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAIResponse(userText) {
        const lower = userText.toLowerCase();
        
        // -------------------------------------------------------
        // EXTERNAL AI API INTEGRATION NOTE:
        // To connect this interface to OpenAI / Google Gemini API:
        // Replace this block with a fetch() call:
        //
        // const response = await fetch('/api/chat', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message: userText })
        // });
        // const data = await response.json();
        // appendMessage('bot', data.reply);
        // -------------------------------------------------------

        if (lower.includes('stack') || lower.includes('technology') || lower.includes('language') || lower.includes('framework')) {
            return aiKnowledge.stack;
        } else if (lower.includes('project') || lower.includes('work') || lower.includes('built') || lower.includes('portfolio')) {
            return aiKnowledge.projects;
        } else if (lower.includes('hire') || lower.includes('job') || lower.includes('availab') || lower.includes('role') || lower.includes('contract')) {
            return aiKnowledge.hire;
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('message')) {
            return aiKnowledge.contact;
        } else if (lower.includes('experience') || lower.includes('year') || lower.includes('background') || lower.includes('history')) {
            return aiKnowledge.experience;
        } else {
            return aiKnowledge.default;
        }
    }

    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            appendMessage('user', message);
            chatInput.value = '';

            // Simulated AI typing latency
            setTimeout(() => {
                const reply = generateAIResponse(message);
                appendMessage('bot', reply);
            }, 500);
        });
    }

    // Quick prompt chip buttons
    chatChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            if (!prompt) return;
            appendMessage('user', prompt);
            setTimeout(() => {
                const reply = generateAIResponse(prompt);
                appendMessage('bot', reply);
            }, 450);
        });
    });

    if (chatClearBtn && chatMessages) {
        chatClearBtn.addEventListener('click', () => {
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="message-content">
                        <p>Chat cleared! What else would you like to know about Alex Morgan's software engineering background?</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            `;
        });
    }

    // -------------------------------------------------------
    // 8. CONTACT FORM SUBMISSION WITH EMAIL SERVICE API HOOK
    // -------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const subject = document.getElementById('contact-subject')?.value.trim();
            const message = document.getElementById('contact-message')?.value.trim();

            if (!name || !email || !subject || !message) {
                if (formFeedback) {
                    formFeedback.style.display = 'block';
                    formFeedback.className = 'form-feedback-alert error';
                    formFeedback.textContent = '⚠️ Please fill out all required fields before submitting.';
                }
                return;
            }

            // Set sending button state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>TRANSMITTING...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            }

            // -------------------------------------------------------
            // EMAIL SERVICE API INTEGRATION NOTE:
            // Connect to Resend API / Formspree / EmailJS here:
            //
            // try {
            //     const response = await fetch('https://api.resend.com/emails', {
            //         method: 'POST',
            //         headers: {
            //             'Authorization': 'Bearer YOUR_RESEND_API_KEY',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             from: 'portfolio@yourdomain.com',
            //             to: 'alex.morgan@example.com',
            //             subject: `[Portfolio Contact] ${subject}`,
            //             text: `From: ${name} (${email})\n\n${message}`
            //         })
            //     });
            // } catch(err) { ... }
            // -------------------------------------------------------

            // Simulate server network roundtrip
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.style.display = 'block';
                    formFeedback.className = 'form-feedback-alert success';
                    formFeedback.innerHTML = '✅ <strong>Transmission Received!</strong> Thank you, ' + name + '. I have received your message and will reply shortly.';
                }

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>SEND TRANSMISSION</span> <i class="fa-regular fa-paper-plane"></i>';
                }

                // Hide alert after 8 seconds
                setTimeout(() => {
                    if (formFeedback) formFeedback.style.display = 'none';
                }, 8000);

            }, 800);
        });
    }

    // -------------------------------------------------------
    // 9. DYNAMIC FOOTER YEAR
    // -------------------------------------------------------
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
