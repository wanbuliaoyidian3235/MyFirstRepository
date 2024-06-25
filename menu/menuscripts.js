document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;
    const totalItems = items.length;
    const visibleItems = 3; // 修改为3，以显示三个项目

    function updateCarousel() {
        items.forEach((item, index) => {
            let newIndex = (index - currentIndex + totalItems) % totalItems;
            if (newIndex < visibleItems) {
                item.style.transform = `translateX(${newIndex * (200 + 10)}px)`;
                item.style.display = 'block'; // 确保显示当前可见项
                // 设置.active类只为中间项
                if (newIndex === 1) {  // 中间项目的索引为1（0, 1, 2）
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            } else {
                item.style.display = 'none'; // 隐藏不在可见范围内的项
                item.classList.remove('active'); // 确保非可见项不是活跃状态
            }
        });
    }

    function showNext() {
        if (currentIndex + visibleItems >= totalItems) {
            // 当到达或超过最后一个项目时，重置currentIndex
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
            carousel.style.transition = 'none';  // 移除过渡效果
            carousel.style.transform = 'translateX(0)';  // 重置位置
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';  // 恢复过渡效果
                updateCarousel();
            }, 10);  // 微小延时确保过渡效果能重新应用
        } else {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
    }

    function showPrev() {
        if (currentIndex === 0) {
            // 当处于第一个项目时，设置为最后一个项目
            currentIndex = totalItems - visibleItems; // 设置为最后一组可见项的开始
            updateCarousel();
            carousel.style.transition = 'none'; // 移除过渡效果
            carousel.style.transform = `translateX(-${(totalItems - visibleItems) * 100 / visibleItems}%)`; // 调整位置到最后一组项目
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease'; // 恢复过渡效果
                updateCarousel();
            }, 10); // 微小延时确保过渡效果能重新应用
        } else {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }
    }

    nextButton.addEventListener('click', showNext);
    prevButton.addEventListener('click', showPrev);

    document.addEventListener('wheel', (e) => {
        e.preventDefault(); // 阻止默认滚动行为
        if (e.deltaY > 0) showNext();
        else showPrev();
    });

    window.addEventListener('resize', updateCarousel);

    updateCarousel(); // 初始化轮播
});
