document.addEventListener("DOMContentLoaded", () => {
  const markdownInput = document.getElementById("markdown-input");
  const previewFrame = document.getElementById("preview-frame");
  const downloadBtn = document.getElementById("download-btn");
  const themeSelector = document.getElementById("theme-selector");
  const fontSelector = document.getElementById("font-selector");

  const themes = {
    default: {
      h1: "black",
      h2: "black",
    },
    theme1: {
      h1: "navy",
      h2: "navy",
    },
    theme2: {
      h1: "goldenrod",
      h2: "goldenrod",
    },
    theme3: {
      h1: "teal",
      h2: "teal",
    },
    theme4: {
      h1: "maroon",
      h2: "maroon",
    },
    theme5: {
      h1: "purple",
      h2: "purple",
    },
  };

  const fonts = {
    "Arial, sans-serif": "Arial",
    "Georgia, serif": "Georgia",
    "Verdana, sans-serif": "Verdana",
  };

  const template = (h1Color, h2Color, fontFamily) => `
      <html>
      <head>
        <style>
          body { font-family: ${fontFamily}; margin: 0; padding: 20px; }
          h1 { text-align: center; color: ${h1Color}; }
          .center { text-align: center; margin-bottom: 20px; }
          h2 { border-bottom: 2px solid ${h2Color}; padding-bottom: 5px; margin-bottom: 10px; color: ${h2Color}; }
          b { display: block; text-align: left; }
          .summary, .work-experience, .projects, .education, .publications, .skills { margin-bottom: 20px; }
          p { margin: 5px 0; }
          .date { font-style: italic; }
        </style>
      </head>
      <body>
        {{content}}
      </body>
      </html>
    `;

  const resumeTemplate = `
# Your Name
  
<div class="center">
<strong><a href="https://www.linkedin.com">LinkedIn</a> | <a href="https://github.com">GitHub</a> | <a href="https://mysite.com">Website</a> | email@mysite.com | +00 000 000 000</strong>
</div>
  
## Summary
  
Experienced professional with a background in [Your Field]. Skilled in [Key Skills], with a proven track record of [Notable Achievements]. Seeking to leverage expertise in [Your Expertise] to contribute to [Company/Project Name].
  
## Work Experience
  
### Job Title - Company Name
**Jan 2021 - Present**
- Led a team of [number] to achieve [specific goals].
- Implemented [projects/initiatives] that resulted in [measurable outcomes].
- Collaborated with [departments/teams] to streamline processes and improve efficiency.
  
### Job Title - Company Name
**Mar 2019 - Jan 2021**
- Managed [tasks/responsibilities] to support [department/team].
- Developed [strategies/solutions] that enhanced [performance/productivity].
- Conducted [analysis/research] to inform decision-making.
  
## Projects
  
### Project Title
**[Link to Demo](#)**
- Description of the project, including objectives, outcomes, and your role.
- Technologies used: [List of technologies].
  
## Education
  
### Degree - Institution
**2030 - Present**
- Major: [Your Major]
- GPA: 4.0/4.0
  
### Degree - Institution
**2023 - 2027**
- Major: [Your Major]
- GPA: 4.0/4.0
  
### High School - Institution
**2021**
- Major: [Your Major]
- GPA: [Your GPA]
  
## Skills
  
- **Technical Skills**: This, That, Some of this, and that etc.
- **More Skills**: Also some more of this, some more that, and some of this and that etc.
    `;

  // Preload the resume template into the textarea
  markdownInput.value = resumeTemplate;

  // Initial render of the template
  const renderTemplate = () => {
    const markdownText = markdownInput.value;
    const selectedTheme = themes[themeSelector.value];
    const selectedFont = fontSelector.value;
    const htmlContent = marked.parse(markdownText);
    previewFrame.srcdoc = template(
      selectedTheme.h1,
      selectedTheme.h2,
      selectedFont
    ).replace("{{content}}", htmlContent);
  };

  markdownInput.addEventListener("input", renderTemplate);
  themeSelector.addEventListener("change", renderTemplate);
  fontSelector.addEventListener("change", renderTemplate);

  downloadBtn.addEventListener("click", () => {
    const iframeDocument = previewFrame.contentDocument;
    const iframeWindow = previewFrame.contentWindow;

    iframeWindow.focus();
    iframeWindow.print();
  });

  // Trigger the initial render
  renderTemplate();
});
