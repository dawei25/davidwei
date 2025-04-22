// script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Create skill cards
    const skillsContainer = document.getElementById('skills-container');
    const template = document.getElementById('skill-card-template');
    
    if (skillsContainer && template && typeof skills !== 'undefined') {
        // Function to create skill cards
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
    }

    // Contact form submission handling
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('form-response');
 
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            // Show loading state
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Sending message...';
            responseMessage.style.color = '#666';
 
            const formData = new FormData(contactForm);
 
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json().then(data => {
                        contactForm.reset(); 
                        responseMessage.textContent = 'Thank you! Your message has been sent successfully.';
                        responseMessage.style.color = 'green';
                    }).catch(() => {
                        // If JSON parsing fails but response was OK
                        contactForm.reset();
                        responseMessage.textContent = 'Thank you! Your message has been sent successfully.';
                        responseMessage.style.color = 'green';
                    });
                } else {
                    return response.json().then(data => {
                        if (data && data.errors) {
                            throw new Error(data.errors.map(error => error.message).join(', '));
                        } else {
                            throw new Error('Something went wrong. Please try again.');
                        }
                    }).catch(error => {
                        // Either from the explicit throw above or from JSON parsing
                        throw new Error('Something went wrong. Please try again.');
                    });
                }
            })
            .catch(error => {
                responseMessage.textContent = error.message;
                responseMessage.style.color = 'red';
            });
        });
    }

    // Layout adjustments for art containers
    const artContainers = document.querySelectorAll('.art__container');

    artContainers.forEach(container => {
        const items = container.querySelectorAll('.art__item');
        const count = items.length;

        // Apply appropriate classes based on item count
        if (count === 3) {
            container.classList.add('three-items');
        } else if (count % 2 === 0) {
            container.classList.add('two-items');
        } else {
            container.classList.add('two-items'); // Default to two-items layout
        }
    });

    // Note: Paper airplane animation moved to assets/js/airplane.js
});



