// script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById('skills-container');
    const template = document.getElementById('skill-card-template');

    skills.forEach(skill => {
        // Clone the template content
        const clone = template.content.cloneNode(true);

        // Set the image src and alt attributes
        const img = clone.querySelector('.skill-front img');
        img.src = `https://skillicons.dev/icons?i=${skill.icon}`;
        img.alt = skill.name;

        // Set the skill name text
        const skillName = clone.querySelector('.skill-back .skill-name');
        skillName.textContent = skill.name;

        // Append the cloned skill card to the container
        skillsContainer.appendChild(clone);
    });
});
