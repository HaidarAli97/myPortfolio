// Simple scroll animation using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe the about elements
    const aboutImgDiv = document.querySelector('.about-img-div');
    const aboutTextDiv = document.querySelector('.about-text-div');

    if (aboutImgDiv) observer.observe(aboutImgDiv);
    if (aboutTextDiv) observer.observe(aboutTextDiv);
});