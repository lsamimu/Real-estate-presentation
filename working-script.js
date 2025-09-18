// Simple, working slide navigation script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');
    
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    console.log('Found slides:', totalSlides);
    
    // Get navigation elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressFill = document.getElementById('progressFill');
    const menuBtn = document.getElementById('menuBtn');
    const slideMenu = document.getElementById('slideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuItems = document.querySelectorAll('.menu-item');
    
    console.log('Navigation elements found:', {
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        slideCounter: !!slideCounter,
        progressFill: !!progressFill,
        menuBtn: !!menuBtn,
        slideMenu: !!slideMenu
    });
    
    // Show specific slide
    function showSlide(slideIndex) {
        console.log('Showing slide:', slideIndex);
        
        // Hide all slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === slideIndex) {
                slide.classList.add('active');
            }
        });
        
        // Update counter
        if (slideCounter) {
            slideCounter.textContent = `${slideIndex + 1} / ${totalSlides}`;
        }
        
        // Update progress bar
        if (progressFill) {
            const progress = ((slideIndex + 1) / totalSlides) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = slideIndex === 0;
            prevBtn.style.opacity = slideIndex === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = slideIndex === totalSlides - 1;
            nextBtn.style.opacity = slideIndex === totalSlides - 1 ? '0.5' : '1';
        }
        
        // Update menu items
        menuItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === slideIndex) {
                item.classList.add('active');
            }
        });
        
        currentSlide = slideIndex;
    }
    
    // Go to next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            showSlide(currentSlide + 1);
        }
    }
    
    // Go to previous slide
    function previousSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            showSlide(slideIndex);
        }
    }
    
    // Menu functions
    function toggleMenu() {
        if (slideMenu) {
            slideMenu.classList.toggle('active');
        }
    }
    
    function closeSlideMenu() {
        if (slideMenu) {
            slideMenu.classList.remove('active');
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSlide);
        console.log('Previous button event listener added');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('Next button event listener added');
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
        console.log('Menu button event listener added');
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeSlideMenu);
        console.log('Close menu event listener added');
    }
    
    // Menu item clicks
    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            goToSlide(index);
            closeSlideMenu();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
            case 'Escape':
                closeSlideMenu();
                break;
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
        
        startX = 0;
        startY = 0;
    });
    
    // Progress bar click navigation
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const targetSlide = Math.floor(percentage * totalSlides);
            goToSlide(Math.min(targetSlide, totalSlides - 1));
        });
    }
    
    // Initialize
    showSlide(0);
    console.log('Presentation initialized');
});

// Interactive functions for expandable content and quizzes
function toggleExpand(elementId) {
    const element = document.getElementById(elementId);
    const button = element.previousElementSibling;
    const icon = button.querySelector('i');
    
    if (element.classList.contains('expanded')) {
        element.classList.remove('expanded');
        icon.className = 'fas fa-plus';
        button.innerHTML = '<i class="fas fa-plus"></i> View Detailed Analysis';
    } else {
        element.classList.add('expanded');
        icon.className = 'fas fa-minus';
        button.innerHTML = '<i class="fas fa-minus"></i> Hide Detailed Analysis';
    }
}

function startQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    const button = quiz.previousElementSibling;
    
    if (quiz.classList.contains('active')) {
        quiz.classList.remove('active');
        button.innerHTML = '<i class="fas fa-question-circle"></i> Test Your Market Knowledge';
    } else {
        quiz.classList.add('active');
        button.innerHTML = '<i class="fas fa-times"></i> Close Quiz';
    }
}

function selectAnswer(button, isCorrect) {
    const options = button.parentElement.querySelectorAll('.quiz-option');
    
    // Remove previous selections
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
    
    // Mark selected answer
    if (isCorrect) {
        button.classList.add('correct');
        showNotification('Correct! Well done!', 'success');
    } else {
        button.classList.add('incorrect');
        showNotification('Incorrect. The correct answer is "Economic development".', 'error');
        
        // Show correct answer
        options.forEach(option => {
            if (option.onclick.toString().includes('true')) {
                option.classList.add('correct');
            }
        });
    }
    
    // Disable all options
    options.forEach(option => {
        option.disabled = true;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(0,0,0,0.1);
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);
