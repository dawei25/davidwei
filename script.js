// script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById('skills-container');
    const template = document.getElementById('skill-card-template');
    const airplanesContainer = document.getElementById('airplanes-container');

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

     /*===== CONTACT FORM SUBMISSION HANDLING =====*/
     const contactForm = document.getElementById('contact-form');
     const responseMessage = document.getElementById('form-response');
 
     if (contactForm) {
         contactForm.addEventListener('submit', function(event) {
             event.preventDefault(); // Prevent the default form submission
             console.log('Form action URL:', contactForm.action);

 
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
                     contactForm.reset(); // Reset the form fields
                     responseMessage.style.display = 'block';
                     responseMessage.textContent = 'Thank you! Your message has been sent successfully.';
                     responseMessage.style.color = 'green';
                 } else {
                     return response.json().then(data => {
                         if (data.errors) {
                             throw new Error(data.errors.map(error => error.message).join(', '));
                         } else {
                             throw new Error('Something went wrong. Please try again.');
                         }
                     });
                 }
             })
             .catch(error => {
                 responseMessage.style.display = 'block';
                 responseMessage.textContent = error.message;
                 responseMessage.style.color = 'red';
             });
         });
     }

    const artContainers = document.querySelectorAll('.art__container');

    artContainers.forEach(container => {
        const items = container.querySelectorAll('.art__item');
        const count = items.length;

        if (count === 3) {
            container.classList.add('three-items');
        } else if (count % 2 === 0) {
            // For any even number of items, add two-items class
            container.classList.add('two-items');
        } else {
            // Fallback if it's not three and not even (e.g., 5 items)
            // Adjust as needed
            container.classList.add('two-items');
        }
    });
 });



