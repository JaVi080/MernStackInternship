
// CONTACT FORM SUBMISSION

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We\'ll get back to you within 24 hours.\n\n(Note: This is a demo - no message was actually sent)');
            
            // Reset form
            contactForm.reset();
            
            console.log('Form submitted with data:', {
                firstName,
                lastName,
                email,
                subject,
                message
            });
        });
    }
});
