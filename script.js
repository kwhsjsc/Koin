// Global Variables
let isLoading = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeAnimations();
});

// Initialize Application
function initializeApp() {
    console.log('Koin App Initialized');
    
    // Initialize AOS (Animate On Scroll)
    initializeAOS();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Modal close events
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard events
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', handleParallax);
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    // Simple AOS implementation
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach((element, index) => {
        const delay = element.getAttribute('data-aos-delay') || 0;
        element.style.transitionDelay = delay + 'ms';
    });
}

// Setup Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// Setup Mobile Menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    // Already handled by CSS scroll-behavior: smooth
    // This function can be extended for custom scrolling behavior
}

// Handle Navbar Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// Close Mobile Menu
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Handle Parallax Effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}

// Scroll to Section
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Add visual feedback
        showNotification('جاري التنقل إلى القسم المطلوب...', 'info');
    } else {
        console.error('Section not found:', sectionId);
        showNotification('عذراً، لم يتم العثور على القسم المطلوب', 'error');
    }
}

// Download App
function downloadApp(platform = 'general') {
    console.log('Download app for platform:', platform);
    
    showLoading();
    
    // Simulate download process
    setTimeout(() => {
        hideLoading();
        
        let message = '';
        switch(platform) {
            case 'android':
                message = 'جاري توجيهك إلى متجر Google Play...';
                break;
            case 'ios':
                message = 'جاري توجيهك إلى App Store...';
                break;
            default:
                message = 'سيتم إطلاق التطبيق قريباً! سنبلغك عند توفره.';
        }
        
        showNotification(message, 'success');
        
        // Track download attempt
        trackEvent('download_attempt', { platform: platform });
    }, 1500);
}

// Show Feature Details
function showFeatureDetails(featureId) {
    console.log('Showing feature details for:', featureId);
    
    const featureDetails = {
        'portfolio': {
            title: 'مراقبة المحفظة',
            content: `
                <h3>مراقبة شاملة لمحفظتك الاستثمارية</h3>
                <p>تابع جميع استثماراتك في مكان واحد مع تحديثات فورية وتحليلات متقدمة.</p>
                <ul>
                    <li>تتبع الأداء في الوقت الفعلي</li>
                    <li>تحليلات مالية متقدمة</li>
                    <li>تقارير مفصلة</li>
                    <li>تنبيهات ذكية</li>
                </ul>
            `
        },
        'mastercard': {
            title: 'سحب وإيداع ماستر كارد',
            content: `
                <h3>تحويلات آمنة باستخدام ماستر كارد</h3>
                <p>قم بالسحب والإيداع بسهولة وأمان باستخدام بطاقات ماستر كارد.</p>
                <ul>
                    <li>تحويلات فورية</li>
                    <li>حماية عالية المستوى</li>
                    <li>رسوم منخفضة</li>
                    <li>دعم 24/7</li>
                </ul>
            `
        },
        'zaincash': {
            title: 'زين كاش',
            content: `
                <h3>تحويلات سريعة مع زين كاش</h3>
                <p>استخدم زين كاش للتحويلات السريعة والآمنة داخل العراق.</p>
                <ul>
                    <li>تحويلات فورية</li>
                    <li>سهولة في الاستخدام</li>
                    <li>متاح 24/7</li>
                    <li>رسوم تنافسية</li>
                </ul>
            `
        },
        'posts': {
            title: 'المنشورات',
            content: `
                <h3>شارك أفكارك ولحظاتك</h3>
                <p>انشر محتوى متنوع وتفاعل مع مجتمع Koin النشط.</p>
                <ul>
                    <li>نشر النصوص والصور</li>
                    <li>تفاعل مع المنشورات</li>
                    <li>مشاركة اللحظات المميزة</li>
                    <li>بناء شبكة اجتماعية قوية</li>
                </ul>
            `
        },
        'private-chat': {
            title: 'التواصل الخاص',
            content: `
                <h3>محادثات خاصة آمنة</h3>
                <p>تواصل مع أصدقائك وعائلتك بخصوصية تامة وأمان عالي.</p>
                <ul>
                    <li>تشفير من طرف إلى طرف</li>
                    <li>مشاركة الملفات</li>
                    <li>مكالمات صوتية ومرئية</li>
                    <li>حماية كاملة للخصوصية</li>
                </ul>
            `
        },
        'rooms': {
            title: 'الرومات',
            content: `
                <h3>غرف دردشة جماعية</h3>
                <p>انضم إلى مجتمعات تشارك اهتماماتك وكون صداقات جديدة.</p>
                <ul>
                    <li>غرف متنوعة حسب الاهتمامات</li>
                    <li>إدارة متقدمة للغرف</li>
                    <li>أنشطة جماعية</li>
                    <li>بيئة آمنة ومراقبة</li>
                </ul>
            `
        },
        'rewards': {
            title: 'الجوائز والهدايا',
            content: `
                <h3>احصل على جوائز حصرية</h3>
                <p>شارك وتفاعل واحصل على جوائز وهدايا قيمة من Koin.</p>
                <ul>
                    <li>نقاط مكافآت</li>
                    <li>جوائز شهرية</li>
                    <li>هدايا حصرية</li>
                    <li>مسابقات وتحديات</li>
                </ul>
            `
        }
    };
    
    const feature = featureDetails[featureId];
    if (feature) {
        showModal(feature.title, feature.content);
    } else {
        showNotification('عذراً، تفاصيل هذه الميزة غير متوفرة حالياً', 'error');
    }
    
    // Track feature view
    trackEvent('feature_view', { feature_id: featureId });
}

// Browse Category
function browseCategory(categoryId) {
    console.log('Browsing category:', categoryId);
    
    showLoading();
    
    // Simulate category browsing
    setTimeout(() => {
        hideLoading();
        
        const categoryNames = {
            'phones': 'الهواتف',
            'electronics': 'الأجهزة الإلكترونية',
            'clothing': 'الملابس',
            'real-estate': 'العقارات',
            'cars': 'السيارات'
        };
        
        const categoryName = categoryNames[categoryId] || 'المنتجات';
        showNotification(`جاري تحضير قسم ${categoryName}... سيتم إطلاقه قريباً!`, 'info');
        
        // Track category browse
        trackEvent('category_browse', { category_id: categoryId });
    }, 1000);
}

// Track Social Click
function trackSocialClick(platform) {
    console.log('Social click tracked:', platform);
    
    showNotification(`جاري توجيهك إلى ${platform === 'facebook' ? 'فيسبوك' : 'تيليجرام'}...`, 'info');
    
    // Track social media click
    trackEvent('social_click', { platform: platform });
}

// Show Modal
function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalBody) {
        modalBody.innerHTML = `
            <h2>${title}</h2>
            ${content}
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('modal');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Show Loading
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
        isLoading = true;
    }
}

// Hide Loading
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
        isLoading = false;
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Cairo', sans-serif;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Get Notification Icon
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Get Notification Color
function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}

// Show Privacy Policy
function showPrivacyPolicy() {
    const content = `
        <h3>سياسة الخصوصية</h3>
        <p>نحن في Koin نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية.</p>
        <h4>جمع البيانات</h4>
        <p>نجمع البيانات الضرورية فقط لتقديم خدماتنا بأفضل شكل ممكن.</p>
        <h4>استخدام البيانات</h4>
        <p>نستخدم بياناتك لتحسين تجربتك وتقديم خدمات مخصصة لك.</p>
        <h4>حماية البيانات</h4>
        <p>نستخدم أحدث تقنيات التشفير لحماية بياناتك من أي وصول غير مصرح به.</p>
    `;
    
    showModal('سياسة الخصوصية', content);
    trackEvent('privacy_policy_view');
}

// Show Terms
function showTerms() {
    const content = `
        <h3>الشروط والأحكام</h3>
        <p>مرحباً بك في تطبيق Koin. باستخدام خدماتنا، فإنك توافق على هذه الشروط والأحكام.</p>
        <h4>استخدام الخدمة</h4>
        <p>يجب استخدام التطبيق وفقاً للقوانين المحلية والدولية.</p>
        <h4>المسؤوليات</h4>
        <p>أنت مسؤول عن الحفاظ على أمان حسابك وكلمة المرور.</p>
        <h4>التحديثات</h4>
        <p>قد نقوم بتحديث هذه الشروط من وقت لآخر، وسنبلغك بأي تغييرات مهمة.</p>
    `;
    
    showModal('الشروط والأحكام', content);
    trackEvent('terms_view');
}

// Show Support
function showSupport() {
    const content = `
        <h3>الدعم الفني</h3>
        <p>نحن هنا لمساعدتك! تواصل معنا عبر القنوات التالية:</p>
        <div style="margin: 20px 0;">
            <p><strong>الوكيل كرار تليغرام :</strong>@Kr_a_3</p>
            <p><strong>الهاتف:</strong>  07807311122</p>
            <p><strong>ساعات العمل:</strong> 24/24</p>
        </div>
        <h4>الأسئلة الشائعة</h4>
        <p><strong>كيف أقوم بإنشاء حساب؟</strong><br>
        حمل التطبيق واتبع خطوات التسجيل البسيطة.</p>
        <p><strong>هل خدماتكم آمنة؟</strong><br>
        نعم، نستخدم أحدث تقنيات الأمان والتشفير.</p>
    `;
    
    showModal('الدعم الفني', content);
    trackEvent('support_view');
}

// Track Event (Analytics)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    // Here you would integrate with your analytics service
    // For example: Google Analytics, Mixpanel, etc.
    
    // Example implementation:
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // You can send error reports to your logging service here
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Monitor page load performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Track performance
        trackEvent('page_load_time', { load_time: loadTime });
    }
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

console.log('Koin JavaScript loaded successfully!');

