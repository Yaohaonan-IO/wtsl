// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;
    let slideInterval;

    // 创建指示器
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    // 切换到指定幻灯片
    function goToSlide(index) {
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.style.transform = 'translateX(0)';
                slide.style.zIndex = '10';
            } else if (i < currentSlide) {
                slide.style.transform = 'translateX(-100%)';
                slide.style.zIndex = '1';
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.style.zIndex = '1';
            }
        });
        
        updateIndicators();
    }

    // 更新指示器状态
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 自动播放
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // 暂停自动播放
    function pauseSlideInterval() {
        clearInterval(slideInterval);
    }

    // 事件监听
    prevBtn.addEventListener('click', () => {
        pauseSlideInterval();
        prevSlide();
        startSlideInterval();
    });

    nextBtn.addEventListener('click', () => {
        pauseSlideInterval();
        nextSlide();
        startSlideInterval();
    });

    carousel.addEventListener('mouseenter', pauseSlideInterval);
    carousel.addEventListener('mouseleave', startSlideInterval);

    // 初始化自动播放
    startSlideInterval();
}

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header.offsetHeight;
                const titleElement = targetElement.querySelector('.section-title');
                const targetPosition = titleElement ? (titleElement.getBoundingClientRect().top + window.pageYOffset) - headerHeight : targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏高亮功能
function initNavHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;

    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
}

// 响应式导航栏
function initResponsiveNav() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        nav.scrollLeft = 0;
    });

    // 点击导航链接后滚动到对应位置
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                nav.scrollLeft = 0;
            }, 500);
        });
    });
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSmoothScroll();
    initNavHighlight();
    initResponsiveNav();
    initHeaderScroll();
    
    // 为导航链接添加active样式
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 头部滚动效果
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 视差效果已移除，避免轮播图定位异常

// 图片懒加载功能
function initLazyLoading() {
    const images = document.querySelectorAll('.carousel-img');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                observer.unobserve(img);
            }
        });
    }, options);
    
    images.forEach(img => {
        observer.observe(img);
    });
}

// 移动端触摸滑动轮播图
function initTouchSwipe() {
    const carousel = document.querySelector('.carousel');
    let startX;
    let endX;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const threshold = 50;
        const diffX = endX - startX;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // 向左滑动
                const prevBtn = document.querySelector('.prev-btn');
                prevBtn.click();
            } else {
                // 向右滑动
                const nextBtn = document.querySelector('.next-btn');
                nextBtn.click();
            }
        }
        
        isDragging = false;
    });
}

// 初始化移动端触摸滑动
document.addEventListener('DOMContentLoaded', initTouchSwipe);

// 初始化图片懒加载
document.addEventListener('DOMContentLoaded', initLazyLoading);

// 初始化滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 初始化滚动动画
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// 添加导航栏点击效果
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 滚动到对应位置
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header.offsetHeight;
                const titleElement = targetElement.querySelector('.section-title');
                const targetPosition = titleElement ? (titleElement.getBoundingClientRect().top + window.pageYOffset) - headerHeight : targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});