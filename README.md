# Sistema de Delivery

## Análisis del Sistema

El sistema de Delivery/Logística debe permitir:
1. **Seguimiento de repartos**: Los usuarios pueden ver el estado actual de sus pedidos y su ubicación.
2. **Optimización de rutas**: El sistema debe calcular las rutas más eficientes para los repartidores basándose en diferentes factores como el tráfico y la distancia.
3. **Gestión de repartidores**: Incluir la asignación de pedidos, el seguimiento de su ubicación y la gestión de su disponibilidad.
4. **Estimación de tiempos**: Proveer estimaciones precisas del tiempo de entrega a los clientes.
5. **Notificaciones en tiempo real**: Informar a los usuarios sobre el estado de su pedido mediante notificaciones por Whatsaap, SMS o correo electrónico.

### Requerimientos Funcionales
1. Usuarios pueden crear, ver y gestionar sus pedidos.
2. El sistema debe registrar y mostrar el estado y la ubicación del pedido en tiempo real.
3. Repartidores pueden ver y actualizar el estado de los pedidos asignados.
4. El sistema debe optimizar y asignar rutas a los repartidores.
5. Notificaciones en tiempo real deben ser enviadas a los clientes sobre el estado de sus pedidos.
6. Administradores pueden gestionar repartidores, pedidos y rutas.

### Requerimientos No Funcionales
1. **Escalabilidad**: El sistema debe manejar un gran número de usuarios y pedidos.
2. **Disponibilidad**: Alta disponibilidad para asegurar que el sistema esté operativo 24/7.
3. **Seguridad**: Proteger los datos de los usuarios y asegurar comunicaciones seguras.
4. **Desempeño**: Respuestas rápidas y eficientes, especialmente para cálculos de rutas y seguimiento en tiempo real.

## Casos de Uso

### Registrar Usuario
- **Actor**: Usuario
- **Descripción**: Permitir a un nuevo usuario registrarse en el sistema.
- **Precondiciones**: Ninguna
- **Flujo Principal**:
  1. El usuario ingresa sus datos (nombre, email, contraseña, dirección, teléfono).
  2. El sistema valida la información y crea una cuenta.
- **Postcondiciones**: El usuario está registrado y puede iniciar sesión.

### Iniciar Sesión
- **Actor**: Usuario
- **Descripción**: Permitir a un usuario registrado iniciar sesión en el sistema.
- **Precondiciones**: El usuario debe estar registrado.
- **Flujo Principal**:
  1. El usuario ingresa su email y contraseña.
  2. El sistema verifica la información y permite el acceso.
- **Postcondiciones**: El usuario está autenticado.

### Crear Pedido
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente crear un nuevo pedido.
- **Precondiciones**: El cliente debe haber iniciado sesión.
- **Flujo Principal**:
  1. El cliente ingresa los detalles del pedido (dirección de entrega, descripción del producto).
  2. El sistema guarda el pedido y lo asigna a un repartidor.
- **Postcondiciones**: El pedido está creado y asignado.

### Actualizar Estado del Pedido
- **Actor**: Repartidor
- **Descripción**: Permitir a un repartidor actualizar el estado de un pedido.
- **Precondiciones**: El repartidor debe haber iniciado sesión.
- **Flujo Principal**:
  1. El repartidor selecciona un pedido asignado.
  2. El repartidor actualiza el estado del pedido (en camino, entregado).
  3. El sistema guarda el nuevo estado del pedido.
- **Postcondiciones**: El estado del pedido está actualizado.

### Ver Estado del Pedido
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente ver el estado de sus pedidos.
- **Precondiciones**: El cliente debe haber iniciado sesión.
- **Flujo Principal**:
  1. El cliente selecciona un pedido.
  2. El sistema muestra el estado actual y la ubicación del pedido.
- **Postcondiciones**: El cliente puede ver el estado y la ubicación de su pedido.

### Optimizar Ruta
- **Actor**: Sistema
- **Descripción**: Calcular la ruta más eficiente para un repartidor.
- **Precondiciones**: Deben existir pedidos asignados al repartidor.
- **Flujo Principal**:
  1. El sistema toma la ubicación actual del repartidor y las direcciones de entrega.
  2. El sistema calcula la ruta más eficiente.
  3. El sistema guarda y muestra la ruta al repartidor.
- **Postcondiciones**: La ruta óptima está calculada y asignada.

### Enviar Notificación
- **Actor**: Sistema
- **Descripción**: Enviar notificaciones en tiempo real a los usuarios sobre el estado de sus pedidos.
- **Precondiciones**: Debe haber un cambio en el estado del pedido.
- **Flujo Principal**:
  1. El sistema detecta un cambio en el estado del pedido.
  2. El sistema envía una notificación al cliente por el método seleccionado (push, SMS, email).
- **Postcondiciones**: El cliente recibe una notificación con el estado actualizado del pedido.

### Gestionar Repartidores
- **Actor**: Administrador
- **Descripción**: Permitir a un administrador gestionar repartidores (asignar pedidos, actualizar disponibilidad).
- **Precondiciones**: El administrador debe haber iniciado sesión.
- **Flujo Principal**:
  1. El administrador selecciona un repartidor.
  2. El administrador asigna pedidos o actualiza la disponibilidad del repartidor.
- **Postcondiciones**: Los repartidores están gestionados correctamente.

### Gestionar Usuarios
- **Actor**: Administrador
- **Descripción**: Permitir a un administrador gestionar usuarios (crear, editar, bloquear, sancionar).
- **Precondiciones**: El administrador debe haber iniciado sesión.
- **Flujo Principal**:
  1. El administrador selecciona un usuario.
  2. El administrador realiza la acción deseada (crear, editar, eliminar).
- **Postcondiciones**: Los usuarios están gestionados correctamente.

### Ver Historial de Pedidos
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente ver el historial de sus pedidos.
- **Precondiciones**: El cliente debe haber iniciado sesión.
- **Flujo Principal**:
  1. El cliente selecciona la opción de historial de pedidos.
  2. El sistema muestra una lista de pedidos anteriores.
- **Postcondiciones**: El cliente puede ver el historial de sus pedidos.

### Ver Detalles del Pedido
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente ver los detalles de un pedido específico.
- **Precondiciones**: El cliente debe haber iniciado sesión.
- **Flujo Principal**:
  1. El cliente selecciona un pedido del historial.
  2. El sistema muestra los detalles del pedido.
- **Postcondiciones**: El cliente puede ver los detalles del pedido seleccionado.

### Cancelar Pedido
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente cancelar un pedido.
- **Precondiciones**: El cliente debe haber iniciado sesión y el pedido debe estar en un estado cancelable.
- **Flujo Principal**:
  1. El cliente selecciona un pedido en curso.
  2. El cliente elige cancelar el pedido.
  3. El sistema actualiza el estado del pedido a cancelado.
- **Postcondiciones**: El pedido está cancelado, el cliente recibe una notificación. Se genera una penalización si aplica.

### Generar Reportes
- **Actor**: Administrador
- **Descripción**: Permitir a un administrador generar reportes sobre el desempeño del sistema (pedidos, repartidores, tiempos de entrega).
- **Precondiciones**: El administrador debe haber iniciado sesión.
- **Flujo Principal**:
  1. El administrador selecciona el tipo de reporte.
  2. El sistema genera y muestra el reporte.
- **Postcondiciones**: El administrador puede ver y analizar el reporte generado.

### Actualizar Perfil de Usuario
- **Actor**: Usuario
- **Descripción**: Permitir a un usuario actualizar su perfil (nombre, dirección, teléfono, etc.).
- **Precondiciones**: El usuario debe haber iniciado sesión.
- **Flujo Principal**:
  1. El usuario selecciona la opción de editar perfil.
  2. El usuario actualiza la información deseada.
  3. El sistema guarda los cambios.
- **Postcondiciones**: El perfil del usuario está actualizado.

### Recuperar Contraseña
- **Actor**: Usuario
- **Descripción**: Permitir a un usuario recuperar su contraseña.
- **Precondiciones**: El usuario debe haber olvidado su contraseña.
- **Flujo Principal**:
  1. El usuario selecciona la opción de recuperar contraseña.
  2. El usuario ingresa su email.
  3. El sistema envía un enlace de recuperación de contraseña al email del usuario.
- **Postcondiciones**: El usuario puede restablecer su contraseña a través del enlace enviado.

### Ver Mapa de Entregas
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente ver un mapa con las ubicaciones de sus entregas.
- **Precondiciones**: El cliente debe haber iniciado sesión.
- **Flujo Principal**:
  1. El cliente selecciona la opción de ver mapa de entregas.
  2. El sistema muestra un mapa con las ubicaciones de las entregas en curso.
- **Postcondiciones**: El cliente puede ver las ubicaciones de sus entregas en un mapa.

### Soporte al Cliente
- **Actor**: Usuario
- **Descripción**: Permitir a un usuario contactar al soporte del sistema.
- **Precondiciones**: Ninguna
- **Flujo Principal**:
  1. El usuario selecciona la opción de soporte.
  2. El usuario ingresa su consulta o problema.
  3. El sistema envía la consulta al equipo de soporte.
- **Postcondiciones**: El usuario ha contactado al soporte y recibirá asistencia.

### Ver Estadísticas de Uso
- **Actor**: Administrador
- **Descripción**: Permitir a un administrador ver estadísticas de uso del sistema (número de usuarios, pedidos, repartidores activos, etc.).
- **Precondiciones**: El administrador debe haber iniciado sesión.
- **Flujo Principal**:
  1. El administrador selecciona la opción de ver estadísticas.
  2. El sistema muestra las estadísticas de uso actualizadas.
- **Postcondiciones**: El administrador puede ver las estadísticas de uso del sistema.

### Gestionar Notificaciones
- **Actor**: Administrador
- **Descripción**: Permitir a un administrador gestionar las notificaciones enviadas a los usuarios.
- **Precondiciones**: El administrador debe haber iniciado sesión.
- **Flujo Principal**:
  1. El administrador selecciona la opción de gestionar notificaciones.
  2. El administrador configura las notificaciones (contenido, destinatarios, métodos).
  3. El sistema guarda y aplica la configuración.
- **Postcondiciones**: Las notificaciones están gestionadas correctamente.

### Ver Opiniones de Clientes
- **Actor**: Administrador
- **Descripción**: Permitir a un administrador ver las opiniones y calificaciones de los clientes sobre el servicio.
- **Precondiciones**: El administrador debe haber iniciado sesión.
- **Flujo Principal**:
  1. El administrador selecciona la opción de ver opiniones.
  2. El sistema muestra las opiniones y calificaciones de los clientes.
- **Postcondiciones**: El administrador puede ver y analizar las opiniones de los clientes.

### Calificar Pedido
- **Actor**: Cliente
- **Descripción**: Permitir a un cliente calificar un pedido entregado.
- **Precondiciones**: El cliente debe haber iniciado sesión y el pedido debe haber sido entregado.
- **Flujo Principal**:
  1. El cliente selecciona un pedido entregado.
  2. El cliente ingresa su calificación y opinión.
  3. El sistema guarda la calificación y opinión.
- **Postcondiciones**: El pedido está calificado y la opinión del cliente está registrada.

### Actualizar Disponibilidad de Repartidor
- **Actor**: Repartidor
- **Descripción**: Permitir a un repartidor actualizar su disponibilidad.
- **Precondiciones**: El repartidor debe haber iniciado sesión.
- **Flujo Principal**:
  1. El repartidor selecciona la opción de actualizar disponibilidad.
  2. El repartidor cambia su estado de disponibilidad.
  3. El sistema guarda el nuevo estado de disponibilidad.
- **Postcondiciones**: La disponibilidad del repartidor está actualizada.