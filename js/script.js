document.addEventListener('DOMContentLoaded', function() {
    // ������������� �������
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // ���������� ����
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ������� �������� ����� � ���� ������
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // ��������� �������� ����� ������� ������
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

    // ���������� � �������
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
            
            // �������� ����������
            this.textContent = '���������!';
            this.classList.add('btn-success');
            setTimeout(() => {
                this.textContent = '� �������';
                this.classList.remove('btn-success');
            }, 1000);
        });
    });

    // ���������� �������� �������
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // ���������� ������� � localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // ��������� ����� ������������
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('���� ������� ������������! �� ��� ����������.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
            modal.hide();
            this.reset();
        });
    }
});