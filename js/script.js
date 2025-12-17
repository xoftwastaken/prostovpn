document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    updateActiveNavLink();
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value
    };

    const formStatus = document.getElementById('formStatus');

    if (!formData.name || !formData.email || !formData.message) {
        showFormStatus('Пожалуйста, заполните все поля.', 'error', formStatus);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormStatus('Пожалуйста, введите корректный email адрес.', 'error', formStatus);
        return;
    }

    showFormStatus('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.', 'success', formStatus);
    
    form.reset();
    
    setTimeout(() => {
        formStatus.classList.remove('success', 'error');
        formStatus.textContent = '';
    }, 5000);
}

function showFormStatus(message, type, element) {
    element.textContent = message;
    element.className = `form-status ${type}`;
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}
