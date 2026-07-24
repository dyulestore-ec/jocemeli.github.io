let carrito = [];
const NUMERO_WHATSAPP = "593996715122"; // Número oficial D'Yule

// CAMBIAR COLOR EN PRODUCTO CON SWATCHES
const estadoColorProductos = {
    1: { colorTexto: 'Negro', colorData: 'negro' }
};

function cambiarColorProducto(idProducto, nombreColor, dataColor, urlImagen) {
    // Cambiar imagen
    document.getElementById(`img-prod-${idProducto}`).src = urlImagen;
    
    // Cambiar texto
    document.getElementById(`nombre-color-${idProducto}`).innerText = nombreColor;

    // Actualizar estado interno
    estadoColorProductos[idProducto] = { colorTexto: nombreColor, colorData: dataColor };

    // Actualizar atributo data-color para el filtro
    const tarjeta = document.getElementById(`prod-vizzano-${idProducto}`);
    tarjeta.setAttribute('data-color', dataColor);

    // Resaltar el swatch seleccionado
    const swatches = tarjeta.querySelectorAll('.swatch');
    swatches.forEach(s => s.classList.remove('active'));
    event.target.classList.add('active');
}

function agregarAlCarritoConColor(idProducto, nombreBase, precio) {
    const infoColor = estadoColorProductos[idProducto] ? estadoColorProductos[idProducto].colorTexto : '';
    const nombreCompleto = `${nombreBase} (${infoColor})`;
    agregarAlCarrito(nombreCompleto, precio);
}

// FUNCIONES DEL CARRITO
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    toggleCart(true);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const container = document.getElementById('cart-items');
    const countElement = document.getElementById('cart-count');
    const totalElement = document.getElementById('cart-total');

    countElement.innerText = carrito.length;

    if (carrito.length === 0) {
        container.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
        totalElement.innerText = '$0.00';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <div class="cart-item-title">${item.nombre}</div>
                    <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                </div>
                <i class="fa-solid fa-trash remove-item" onclick="eliminarDelCarrito(${index})"></i>
            </div>
        `;
    });

    totalElement.innerText = `$${total.toFixed(2)}`;
}

function toggleCart(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');

    if (forceOpen) {
        drawer.classList.add('active');
        overlay.classList.add('active');
    } else {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    let mensaje = "¡Hola D'Yule Store! 👋 Quisiera realizar un pedido con los siguientes productos:\n\n";
    let total = 0;

    carrito.forEach((item, i) => {
        mensaje += `${i + 1}. *${item.nombre}* - $${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });

    mensaje += `\n*TOTAL A PAGAR: $${total.toFixed(2)}*`;
    mensaje += "\n\n¿Me ayudan indicándome la disponibilidad para coordinar la entrega?";

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// FILTRADO COMPLETO
function filtrarProductos() {
    const tipo = document.getElementById('filtro-tipo').value;
    const marca = document.getElementById('filtro-marca').value;
    const categoria = document.getElementById('filtro-categoria').value;
    const material = document.getElementById('filtro-material').value;
    const tacon = document.getElementById('filtro-tacon').value;
    const color = document.getElementById('filtro-color').value;
    const accesorio = document.getElementById('filtro-accesorio').value;
    const oferta = document.getElementById('filtro-oferta').value;

    const productos = document.querySelectorAll('.tarjeta-producto');

    productos.forEach(prod => {
        const pTipo = prod.getAttribute('data-tipo');
        const pMarca = prod.getAttribute('data-marca');
        const pCategoria = prod.getAttribute('data-categoria');
        const pMaterial = prod.getAttribute('data-material');
        const pTacon = prod.getAttribute('data-tacon');
        const pColor = prod.getAttribute('data-color');
        const pAccesorio = prod.getAttribute('data-accesorio');
        const pOferta = prod.getAttribute('data-oferta') || 'no';

        const coincideTipo = (tipo === 'todos' || pTipo === tipo);
        const coincideMarca = (marca === 'todas' || pMarca === marca);
        const coincideCategoria = (categoria === 'todas' || pCategoria === categoria);
        const coincideMaterial = (material === 'todos' || pMaterial === material);
        const coincideTacon = (tacon === 'todos' || pTacon === tacon);
        const coincideColor = (color === 'todos' || pColor === color);
        const coincideAccesorio = (accesorio === 'todos' || pAccesorio === accesorio);
        const coincideOferta = (oferta === 'todos' || pOferta === oferta);

        if (coincideTipo && coincideMarca && coincideCategoria && coincideMaterial && coincideTacon && coincideColor && coincideAccesorio && coincideOferta) {
            prod.style.display = 'flex';
        } else {
            prod.style.display = 'none';
        }
    });
}

function aplicarFiltroRapido(tipoFiltro, valor) {
    resetFiltros();
    if (tipoFiltro === 'marca') document.getElementById('filtro-marca').value = valor;
    if (tipoFiltro === 'categoria') {
        document.getElementById('filtro-tipo').value = 'calzado';
        document.getElementById('filtro-categoria').value = valor;
    }
    if (tipoFiltro === 'accesorio') {
        document.getElementById('filtro-tipo').value = 'accesorios';
        document.getElementById('filtro-accesorio').value = valor;
    }
    if (tipoFiltro === 'oferta') document.getElementById('filtro-oferta').value = valor;
    filtrarProductos();
}

function resetFiltros() {
    document.getElementById('filtro-tipo').value = 'todos';
    document.getElementById('filtro-marca').value = 'todas';
    document.getElementById('filtro-categoria').value = 'todas';
    document.getElementById('filtro-material').value = 'todos';
    document.getElementById('filtro-tacon').value = 'todos';
    document.getElementById('filtro-color').value = 'todos';
    document.getElementById('filtro-accesorio').value = 'todos';
    document.getElementById('filtro-oferta').value = 'todos';
    filtrarProductos();
}
function filtrarTodo() { resetFiltros(); }