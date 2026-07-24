let marcaSeleccionada = 'todas';
let categoriaSeleccionada = 'todas';

document.querySelectorAll('.btn-filtro').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const tipo = e.target.getAttribute('data-tipo');
        const valor = e.target.getAttribute('data-valor');

        const grupo = e.target.parentElement;
        grupo.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        if (tipo === 'marca') {
            marcaSeleccionada = valor;
        } else if (tipo === 'categoria') {
            categoriaSeleccionada = valor;
        }

        aplicarFiltros();
    });
});

function aplicarFiltros() {
    const productos = document.querySelectorAll('.tarjeta-producto');

    productos.forEach(producto => {
        const marcaProducto = producto.getAttribute('data-marca');
        const categoriaProducto = producto.getAttribute('data-categoria');

        const coincideMarca = (marcaSeleccionada === 'todas' || marcaProducto === marcaSeleccionada);
        const coincideCategoria = (categoriaSeleccionada === 'todas' || categoriaProducto === categoriaSeleccionada);

        if (coincideMarca && coincideCategoria) {
            producto.style.display = 'flex';
        } else {
            producto.style.display = 'none';
        }
    });
}
