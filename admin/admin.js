document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const preferDarkMode = localStorage.getItem('darkMode') === 'true';

    if (darkModeToggle) {
        darkModeToggle.checked = preferDarkMode;
        document.body.classList.toggle('dark-mode', preferDarkMode);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            const enabled = darkModeToggle.checked;
            document.body.classList.toggle('dark-mode', enabled);
            localStorage.setItem('darkMode', enabled ? 'true' : 'false');
        });
    }

    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.getElementById('page-title');

    function activateSection(id) {
        sections.forEach(s => s.classList.remove('active'));
        const target = document.getElementById(id);
        if (target) target.classList.add('active');

        menuItems.forEach(mi => {
            if (mi.dataset.section === id) mi.classList.add('active');
            else mi.classList.remove('active');
        });

        const menu = Array.from(menuItems).find(mi => mi.dataset.section === id);
        if (menu && pageTitle) pageTitle.textContent = menu.querySelector('span')?.textContent || id;
        else if (target && pageTitle) {
            const h = target.querySelector('h2');
            if (h) pageTitle.textContent = h.textContent;
        }

        history.replaceState(null, '', `#${id}`);
    }

    menuItems.forEach(btn => {
        btn.addEventListener('click', () => activateSection(btn.dataset.section));
    });

    window.mostrarSeccion = activateSection;

    // Reservas tabs
    const reservasTabs = document.querySelectorAll('#reservas .tab');
    function mostrarReservas(tab) {
        reservasTabs.forEach(t => {
            const text = t.textContent.trim().toLowerCase();
            const isActive = (tab === 'pendientes' && text.includes('pendientes')) || (tab === 'aceptadas' && text.includes('aceptadas'));
            t.classList.toggle('active', isActive);
        });

        const tbody = document.getElementById('tablaReservas');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (tab === 'pendientes') {
            tbody.innerHTML = `
				<tr>
					<td>María López</td>
					<td>Tour Río Magdalena</td>
					<td>15/09/2026</td>
					<td>3</td>
					<td><span class="status pending">Pendiente</span></td>
					<td><button class="action accept">✓</button><button class="action reject">✕</button></td>
				</tr>
			`;
        } else {
            tbody.innerHTML = `
				<tr>
					<td>Carlos Pérez</td>
					<td>Hotel El Parque</td>
					<td>18/09/2026</td>
					<td>2</td>
					<td><span class="status accepted">Aceptada</span></td>
					<td></td>
				</tr>
			`;
        }
    }

    window.mostrarReservas = mostrarReservas;
    if (document.getElementById('reservas')) mostrarReservas('pendientes');

    // Formulario servicios
    const formServicio = document.getElementById('formServicio');
    window.mostrarFormularioServicio = () => { if (formServicio) formServicio.classList.remove('hidden'); };
    window.ocultarFormularioServicio = () => { if (formServicio) formServicio.classList.add('hidden'); };

    const servicioForm = document.getElementById('servicioForm');
    if (servicioForm) {
        servicioForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nombreServicio')?.value || 'Servicio';
            const desc = document.getElementById('descripcionServicio')?.value || '';
            const price = document.getElementById('precioServicio')?.value || '';
            const tipo = document.getElementById('tipoServicio')?.value || '';
            const grid = document.getElementById('servicesGrid');
            if (grid) {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
					<div class="service-image">🏷️</div>
					<div class="service-info">
						<span class="service-type">${tipo || 'Servicio'}</span>
						<h3>${name}</h3>
						<p>${desc}</p>
						<strong>$${Number(price || 0).toLocaleString()}</strong>
					</div>
				`;
                grid.prepend(card);
            }
            servicioForm.reset();
            window.ocultarFormularioServicio();
        });
    }

    // Activar sección desde hash si existe
    const hash = location.hash.replace('#', '');
    if (hash) activateSection(hash);
});
