// --- FUNCIONES DE NAVEGACIÓN Y MENÚ MÓVIL ---
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// --- CARRITO DE COMPRAS ---
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    toggleCart();
}

function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartCount) cartCount.innerText = carrito.length;

    if (cartItems) {
        if (carrito.length === 0) {
            cartItems.innerHTML = '<p class="empty-msg">Tu bolsa está vacía.</p>';
        } else {
            cartItems.innerHTML = '';
            carrito.forEach((prod, index) => {
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <div>
                            <h4>${prod.nombre}</h4>
                            <p>$${prod.precio.toFixed(2)}</p>
                        </div>
                        <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:#8b0000; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
            });
        }
    }

    if (cartTotal) {
        const total = carrito.reduce((sum, item) => sum + item.precio, 0);
        cartTotal.innerText = `$${total.toFixed(2)}`;
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu bolsa está vacía.");
        return;
    }
    let mensaje = "Hola D'Yule, deseo coordinar el pedido de los siguientes artículos:\n\n";
    let total = 0;
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} ($${item.precio.toFixed(2)})\n`;
        total += item.precio;
    });
    mensaje += `\n*TOTAL A PAGAR: $${total.toFixed(2)}*`;
    
    const numeroWhatsApp = "593996715122";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// --- SISTEMA DE FILTROS DEL CATÁLOGO ---
function filtrarProductos() {
    const filtroOferta = document.getElementById('filtro-oferta').value;
    const filtroTipo = document.getElementById('filtro-tipo').value;
    const filtroMarca = document.getElementById('filtro-marca').value;
    const filtroCategoria = document.getElementById('filtro-categoria').value;
    const filtroMaterial = document.getElementById('filtro-material').value;
    const filtroTacon = document.getElementById('filtro-tacon').value;
    const filtroTipoTacon = document.getElementById('filtro-tipo-tacon').value;
    const filtroColor = document.getElementById('filtro-color').value;

    const tarjetas = document.querySelectorAll('.tarjeta-producto');

    tarjetas.forEach(tarjeta => {
        const oferta = tarjeta.getAttribute('data-oferta');
        const tipo = tarjeta.getAttribute('data-tipo');
        const marca = tarjeta.getAttribute('data-marca');
        const categoria = tarjeta.getAttribute('data-categoria');
        const material = tarjeta.getAttribute('data-material');
        const tacon = tarjeta.getAttribute('data-tacon');
        const tipoTacon = tarjeta.getAttribute('data-tipo-tacon');
        const color = tarjeta.getAttribute('data-color');

        let coincide = true;

        if (filtroOferta !== 'todos' && oferta !== filtroOferta) coincide = false;
        if (filtroTipo !== 'todos' && tipo !== filtroTipo) coincide = false;
        if (filtroMarca !== 'todas' && marca !== filtroMarca) coincide = false;
        if (filtroCategoria !== 'todas' && categoria !== filtroCategoria) coincide = false;
        if (filtroMaterial !== 'todos' && material !== filtroMaterial) coincide = false;
        if (filtroTacon !== 'todos' && tacon !== filtroTacon) coincide = false;
        if (filtroTipoTacon !== 'todos' && tipoTacon !== filtroTipoTacon) coincide = false;
        if (filtroColor !== 'todos' && color !== filtroColor) coincide = false;

        if (coincide) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

function filtrarTodo() {
    document.querySelectorAll('.sidebar-filtros select').forEach(select => {
        select.value = 'todos' || 'todas';
    });
    filtrarProductos();
}

function resetFiltros() {
    document.getElementById('filtro-oferta').value = 'todos';
    document.getElementById('filtro-tipo').value = 'todos';
    document.getElementById('filtro-marca').value = 'todas';
    document.getElementById('filtro-categoria').value = 'todas';
    document.getElementById('filtro-material').value = 'todos';
    document.getElementById('filtro-tacon').value = 'todos';
    document.getElementById('filtro-tipo-tacon').value = 'todos';
    document.getElementById('filtro-color').value = 'todos';
    filtrarProductos();
}
