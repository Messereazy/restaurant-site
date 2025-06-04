document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Фильтрация меню
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Добавление в корзину
    document.querySelectorAll('.btn-warning').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const item = {
                name: card.querySelector('.card-title').textContent,
                price: card.querySelector('strong').textContent,
                image: card.querySelector('img').src
            };
            
            cart.push(item);
            updateCartCount();
            saveCartToLocalStorage();
            
            // Анимация добавления
            this.textContent = 'Добавлено!';
            this.classList.add('btn-success');
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.classList.remove('btn-success');
            }, 1000);
        });
    });

    // Обновление счетчика корзины
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // Сохранение корзины в localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Обработка формы бронирования
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Стол успешно забронирован! Мы вам перезвоним.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
            modal.hide();
            this.reset();
        });
    }
});