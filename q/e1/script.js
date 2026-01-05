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

// 初始化免责确认弹窗
function initDisclaimerPopup() {
    const checkbox = document.getElementById('agree-checkbox');
    const confirmButton = document.getElementById('confirm-button');
    const popup = document.getElementById('disclaimer-popup');
    
    // 监听复选框状态变化
    checkbox.addEventListener('change', () => {
        confirmButton.disabled = !checkbox.checked;
    });
    
    // 监听确认按钮点击
    confirmButton.addEventListener('click', () => {
        if (checkbox.checked) {
            popup.style.display = 'none';
        }
    });
    
    // 阻止点击弹窗内容时关闭弹窗
    popup.querySelector('.disclaimer-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // 可以添加点击遮罩层关闭弹窗的功能（如果需要）
    // popup.querySelector('.disclaimer-overlay').addEventListener('click', () => {
    //     if (checkbox.checked) {
    //         popup.style.display = 'none';
    //     }
    // });
}

// 页面加载完成后初始化弹窗
window.addEventListener('load', initDisclaimerPopup);